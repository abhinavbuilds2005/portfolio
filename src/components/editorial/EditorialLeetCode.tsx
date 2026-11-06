import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, Code2, Trophy, CheckCircle2, ChevronRight, Terminal, Award } from 'lucide-react';

interface LCSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: string | number;
  lang?: string;
  statusDisplay?: string;
}

interface LCData {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number | string;
  reputation: number;
  recentSubmissions: LCSubmission[];
  syncedAt?: string;
}

const FALLBACK: LCData = {
  username: 'cseabhinav2005',
  totalSolved: 17,
  totalQuestions: 4073,
  easySolved: 10,
  totalEasy: 969,
  mediumSolved: 7,
  totalMedium: 2124,
  hardSolved: 0,
  totalHard: 980,
  ranking: '4,900,982',
  reputation: 0,
  recentSubmissions: [
    { id: 'sub-1', title: 'Single Number', titleSlug: 'single-number', lang: 'C++', timestamp: '1790865264', statusDisplay: 'Accepted' },
    { id: 'sub-2', title: '3Sum Closest', titleSlug: '3sum-closest', lang: 'C++', timestamp: '1790855367', statusDisplay: 'Accepted' },
    { id: 'sub-3', title: '3Sum', titleSlug: '3sum', lang: 'C++', timestamp: '1790853517', statusDisplay: 'Accepted' },
    { id: 'sub-4', title: 'Minimum Size Subarray Sum', titleSlug: 'minimum-size-subarray-sum', lang: 'C++', timestamp: '1790453930', statusDisplay: 'Accepted' },
    { id: 'sub-5', title: 'Majority Element', titleSlug: 'majority-element', lang: 'C++', timestamp: '1790108172', statusDisplay: 'Accepted' },
  ],
};

const LC_CACHE_KEY = 'lc-editorial-cache';
const LC_CACHE_TIME_KEY = 'lc-editorial-cache-time';
const CACHE_TTL_MS = 20 * 60 * 1000;

export const EditorialLeetCode: React.FC = () => {
  const [data, setData] = useState<LCData>(() => {
    try {
      const cached = localStorage.getItem(LC_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed.totalSolved === 'number' && parsed.totalSolved > 0) {
          return parsed;
        }
      }
    } catch (_) {}
    return FALLBACK;
  });

  const [syncing, setSyncing] = useState(false);
  const [syncLabel, setSyncLabel] = useState('LIVE SYNC');

  const fetchData = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cachedTime = localStorage.getItem(LC_CACHE_TIME_KEY);
        const cachedData = localStorage.getItem(LC_CACHE_KEY);
        if (cachedTime && cachedData && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
          const parsed = JSON.parse(cachedData);
          if (parsed && typeof parsed.totalSolved === 'number' && parsed.totalSolved > 0) {
            setData(parsed);
            return;
          }
        }
      } catch (_) {}
    }

    setSyncing(true);
    setSyncLabel('SYNCING…');

    const username = 'cseabhinav2005';
    const endpoints = [
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
      `https://coderabhinavanand.netlify.app/api/leetcode?username=${username}`,
    ];

    let success = false;
    for (const ep of endpoints) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(ep, { signal: controller.signal });
        clearTimeout(tid);

        if (res.ok) {
          const raw = await res.json();
          const rawSolved = Number(raw.totalSolved ?? raw.matchedUserStats?.acSubmissionNum?.[0]?.count ?? 17);
          const rawEasy = Number(raw.easySolved ?? raw.matchedUserStats?.acSubmissionNum?.[1]?.count ?? 10);
          const rawMedium = Number(raw.mediumSolved ?? raw.matchedUserStats?.acSubmissionNum?.[2]?.count ?? 7);
          const rawHard = Number(raw.hardSolved ?? raw.matchedUserStats?.acSubmissionNum?.[3]?.count ?? 0);

          const parsed: LCData = {
            username: raw.username || username,
            totalSolved: rawSolved > 0 ? rawSolved : 17,
            totalQuestions: Number(raw.totalQuestions) || 4073,
            easySolved: rawEasy,
            totalEasy: Number(raw.totalEasy) || 969,
            mediumSolved: rawMedium,
            totalMedium: Number(raw.totalMedium) || 2124,
            hardSolved: rawHard,
            totalHard: Number(raw.totalHard) || 980,
            ranking: raw.ranking ?? '4,900,982',
            reputation: raw.reputation ?? 0,
            recentSubmissions: (raw.recentSubmissions || raw.recentAcSubmissionList || []).map((s: any, idx: number) => ({
              id: s.id || `s-${idx}`,
              title: s.title || s.titleSlug || 'Submission',
              titleSlug: s.titleSlug || '',
              lang: s.lang === 'cpp' ? 'C++' : (s.lang || 'C++'),
              timestamp: s.timestamp || '0',
              statusDisplay: s.statusDisplay || 'Accepted'
            })),
            syncedAt: new Date().toLocaleTimeString()
          };

          setData(parsed);
          try {
            localStorage.setItem(LC_CACHE_KEY, JSON.stringify(parsed));
            localStorage.setItem(LC_CACHE_TIME_KEY, String(Date.now()));
          } catch (_) {}

          setSyncLabel('SYNCED ✓');
          success = true;
          break;
        }
      } catch (_) {}
    }

    if (!success) {
      setSyncLabel('OFFLINE CACHE');
    }

    setSyncing(false);
    setTimeout(() => setSyncLabel('LIVE SYNC'), 2500);
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const d = data || FALLBACK;
  const rankDisplay = typeof d.ranking === 'number' ? d.ranking.toLocaleString() : String(d.ranking || '4,900,982');

  const easyPct = Math.round((d.easySolved / (d.totalSolved || 1)) * 100);
  const medPct = Math.round((d.mediumSolved / (d.totalSolved || 1)) * 100);

  return (
    <section id="leetcode" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-16">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            04 / PROBLEM SOLVING & ALGORITHMIC RIGOR
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans mb-4">
            LeetCode Telemetry.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#132532] text-opacity-80 max-w-xl">
            Live telemetry synced from LeetCode verifying computational problem-solving, pointer memory arithmetic, and asymptotic algorithmic optimization in C++.
          </p>
        </div>

        {/* Right Action Header */}
        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(true)}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-[#132532]/20 bg-white hover:border-[#132532] text-[#132532] transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin text-[#315CFF]' : ''}`} />
              <span>{syncLabel}</span>
            </button>

            <a
              href="https://leetcode.com/u/cseabhinav2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 bg-[#132532] text-white hover:bg-[#315CFF] shadow-[3px_3px_0px_#F0784B] transition-all font-semibold uppercase tracking-wider"
            >
              <span>@cseabhinav2005</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <span className="font-mono text-[11px] text-[#132532]/60">
            Primary Language: C++ (STL & Algorithmic Complexity)
          </span>
        </div>
      </div>

      {/* Main Grid: Telemetry Cards & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Metrics Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Stat Card with Persimmon Offset */}
          <div className="bg-white border border-[#132532]/15 p-8 shadow-sm relative">
            <div className="flex items-center justify-between border-b border-[#132532]/10 pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#315CFF] font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>SOLVED PROBLEMS</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                ACTIVE
              </span>
            </div>

            {/* Giant Number */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#132532] font-sans">
                {d.totalSolved}
              </span>
              <span className="font-mono text-sm text-[#132532]/60">
                / {d.totalQuestions} Questions
              </span>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-4 pt-2 border-t border-[#132532]/10">
              {/* Easy Bar */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="font-bold text-emerald-600">EASY</span>
                  <span className="text-[#132532] font-semibold">{d.easySolved} <span className="text-[#132532]/50 font-normal">({easyPct}%)</span></span>
                </div>
                <div className="w-full h-2 bg-[#FAF8F5] border border-[#132532]/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(easyPct, 5)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              {/* Medium Bar */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="font-bold text-amber-600">MEDIUM</span>
                  <span className="text-[#132532] font-semibold">{d.mediumSolved} <span className="text-[#132532]/50 font-normal">({medPct}%)</span></span>
                </div>
                <div className="w-full h-2 bg-[#FAF8F5] border border-[#132532]/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.max(medPct, 5)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </div>

              {/* Hard Bar */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1.5">
                  <span className="font-bold text-rose-600">HARD</span>
                  <span className="text-[#132532] font-semibold">{d.hardSolved} <span className="text-[#132532]/50 font-normal">(0%)</span></span>
                </div>
                <div className="w-full h-2 bg-[#FAF8F5] border border-[#132532]/10 overflow-hidden">
                  <div className="h-full bg-rose-500 w-[2%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Ranking & Global Telemetry Strip */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FAF8F5] border border-[#132532]/15 p-5">
              <span className="font-mono text-[11px] text-[#132532]/60 uppercase tracking-wider block mb-1">
                GLOBAL RANK
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#132532] font-mono">
                #{rankDisplay}
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#132532]/15 p-5">
              <span className="font-mono text-[11px] text-[#132532]/60 uppercase tracking-wider block mb-1">
                ACCEPTANCE RATE
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#315CFF] font-mono">
                51.5%
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Verified Submissions Table */}
        <div className="lg:col-span-7 bg-white border border-[#132532]/15 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[#132532]/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#F0784B]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#132532]">
                RECENT ACCEPTED C++ SUBMISSIONS
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#132532]/60">
              Verified Algorithmic Patterns
            </span>
          </div>

          {/* Table of Submissions */}
          <div className="divide-y divide-[#132532]/10">
            {d.recentSubmissions.map((sub, idx) => (
              <div
                key={sub.id || idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#FAF8F5] px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#132532]/40 font-semibold w-6">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <a
                      href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-bold text-[#132532] text-sm sm:text-base group-hover:text-[#315CFF] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{sub.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#315CFF]" />
                    </a>
                    <div className="font-mono text-[11px] text-[#132532]/60 mt-0.5">
                      Problem Slug: <span className="text-[#132532]">{sub.titleSlug || 'leetcode-algorithm'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:self-center pl-9 sm:pl-0">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Accepted</span>
                  </span>

                  <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#132532] border border-[#132532]/15 font-mono text-[11px] font-bold">
                    {sub.lang || 'C++'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-8 pt-4 border-t border-[#132532]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#132532]/70">
              Focus: Bit manipulation, 2-pointer techniques, sliding windows, and greedy algorithms.
            </span>
            <a
              href="https://leetcode.com/u/cseabhinav2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#315CFF] font-bold hover:underline inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>View full profile on LeetCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
