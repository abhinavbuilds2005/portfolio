import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, RefreshCw, Trophy, Zap, CheckCircle2, ExternalLink } from 'lucide-react';

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
  totalSolved: 10,
  totalQuestions: 4042,
  easySolved: 7,
  totalEasy: 962,
  mediumSolved: 3,
  totalMedium: 2109,
  hardSolved: 0,
  totalHard: 971,
  ranking: '1,248,300',
  reputation: 0,
  recentSubmissions: [
    { id: 'sub-1', title: 'Valid Palindrome', titleSlug: 'valid-palindrome', lang: 'C++', timestamp: '1788381261', statusDisplay: 'Accepted' },
    { id: 'sub-2', title: 'Arranging Coins', titleSlug: 'arranging-coins', lang: 'C++', timestamp: '1787821704', statusDisplay: 'Accepted' },
    { id: 'sub-3', title: 'Boats to Save People', titleSlug: 'boats-to-save-people', lang: 'C++', timestamp: '1787819754', statusDisplay: 'Accepted' },
    { id: 'sub-4', title: 'Count of Matches in Tournament', titleSlug: 'count-of-matches-in-tournament', lang: 'C++', timestamp: '1787289501', statusDisplay: 'Accepted' },
  ],
};

const LC_CACHE_KEY = 'lc-v2-data';
const LC_CACHE_TIME_KEY = 'lc-v2-time';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

function formatTimeAgo(ts: string | number): string {
  const t = typeof ts === 'string' ? parseInt(ts, 10) * 1000 : Number(ts) * 1000;
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const DiffBar: React.FC<{
  label: string;
  solved: number;
  total: number;
  color: string;
  delay: number;
}> = ({ label, solved, total, color, delay }) => {
  const pct = total > 0 ? Math.max((solved / total) * 100, solved > 0 ? 3 : 0) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1">
        <span style={{ color }}>{label}</span>
        <span className="text-text-muted">{solved} / {total}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-base overflow-hidden border border-border-subtle">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

export const LeetCodeDashboard: React.FC = () => {
  const [data, setData] = useState<LCData>(() => {
    try {
      const cached = localStorage.getItem(LC_CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch (_) { /* ignore */ }
    return FALLBACK;
  });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncLabel, setSyncLabel] = useState('SYNC');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (force = false) => {
    if (!force) {
      try {
        const cachedTime = localStorage.getItem(LC_CACHE_TIME_KEY);
        const cachedData = localStorage.getItem(LC_CACHE_KEY);
        if (cachedTime && cachedData && Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS) {
          setData(JSON.parse(cachedData));
          return;
        }
      } catch (_) { /* ignore */ }
    }

    setLoading(true);
    setSyncing(true);
    setError(null);
    setSyncLabel('SYNCING…');

    const username = 'cseabhinav2005';
    const endpoints = [
      `/api/leetcode?username=${username}`,
      `https://coderabhinavanand.netlify.app/api/leetcode?username=${username}`,
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
    ];

    let success = false;
    for (const ep of endpoints) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(ep, { signal: controller.signal });
        clearTimeout(tid);

        if (res.ok) {
          const raw = await res.json();
          const parsed: LCData = {
            username: raw.username || username,
            totalSolved: raw.totalSolved ?? raw.matchedUser?.submitStatsGlobal?.acSubmissionNum?.[0]?.count ?? data.totalSolved,
            totalQuestions: raw.totalQuestions ?? 4042,
            easySolved: raw.easySolved ?? raw.matchedUser?.submitStatsGlobal?.acSubmissionNum?.[1]?.count ?? data.easySolved,
            totalEasy: raw.totalEasy ?? 962,
            mediumSolved: raw.mediumSolved ?? raw.matchedUser?.submitStatsGlobal?.acSubmissionNum?.[2]?.count ?? data.mediumSolved,
            totalMedium: raw.totalMedium ?? 2109,
            hardSolved: raw.hardSolved ?? raw.matchedUser?.submitStatsGlobal?.acSubmissionNum?.[3]?.count ?? data.hardSolved,
            totalHard: raw.totalHard ?? 971,
            ranking: raw.ranking ?? raw.matchedUser?.profile?.ranking ?? data.ranking,
            reputation: raw.reputation ?? raw.matchedUser?.profile?.reputation ?? 0,
            recentSubmissions: (raw.recentSubmissions || raw.recentAcSubmissionList || []).map((s: any, idx: number) => ({
              id: s.id || `s-${idx}`,
              title: s.title || s.titleSlug || 'Submission',
              titleSlug: s.titleSlug || '',
              lang: s.lang || 'C++',
              timestamp: s.timestamp || '0',
              statusDisplay: s.statusDisplay || 'Accepted'
            })),
            syncedAt: new Date().toLocaleTimeString()
          };

          setData(parsed);
          try {
            localStorage.setItem(LC_CACHE_KEY, JSON.stringify(parsed));
            localStorage.setItem(LC_CACHE_TIME_KEY, String(Date.now()));
          } catch (_) { /* ignore */ }

          setSyncLabel('SYNCED ✓');
          success = true;
          break;
        }
      } catch (_) {
        // Try next fallback endpoint
      }
    }

    if (!success) {
      setError('Live sync throttled. Displaying verified local cache.');
      setSyncLabel('SYNC');
    }

    setLoading(false);
    setSyncing(false);
    setTimeout(() => setSyncLabel('SYNC'), 3000);
  }, [data]);

  useEffect(() => { fetchData(false); }, []);

  const d = data ?? FALLBACK;
  const totalPct = d.totalQuestions > 0 ? Math.round((d.totalSolved / d.totalQuestions) * 100) : 0;
  const rankStr = typeof d.ranking === 'number' ? d.ranking.toLocaleString() : String(d.ranking);

  return (
    <div className="p-6 rounded-lg border border-border-subtle bg-surface shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold">
          <Code2 className="w-4 h-4" />
          <span>LEETCODE TELEMETRY // ALGORITHMIC DSA</span>
          <a
            href="https://leetcode.com/u/cseabhinav2005/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            title="LeetCode profile"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={() => fetchData(true)}
          disabled={syncing}
          className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded border border-border-subtle bg-base text-text-secondary hover:border-border-strong hover:text-accent transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncLabel}</span>
        </button>
      </div>

      {/* Error notice */}
      <AnimatePresence>
        {error && (
          <div className="font-mono text-xs text-text-secondary bg-base border border-border-subtle rounded-md px-3 py-2 mb-4">
            ℹ {error}
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left: Stat chips + Diff bars */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Solved', value: d.totalSolved, accent: true },
              { icon: <Trophy className="w-3.5 h-3.5" />, label: 'Ranking', value: rankStr, accent: false },
              { icon: <Zap className="w-3.5 h-3.5" />, label: 'Total Qs', value: d.totalQuestions, accent: false },
              { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Acceptance', value: `${totalPct}%`, accent: false },
            ].map(({ icon, label, value, accent }) => (
              <div
                key={label}
                className="p-3 rounded-md border border-border-subtle bg-base text-center"
              >
                <div className={`flex items-center justify-center gap-1 mb-1 ${accent ? 'text-accent' : 'text-text-muted'}`}>
                  {icon}
                </div>
                <div className={`font-mono text-base font-bold ${accent ? 'text-accent' : 'text-text-primary'}`}>
                  {value}
                </div>
                <div className="font-mono text-xs text-text-muted uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Difficulty Breakdown Bars */}
          <div className="space-y-3 p-4 rounded-md border border-border-subtle bg-base">
            <div className="font-mono text-xs text-text-muted uppercase">Difficulty Breakdown</div>
            <DiffBar label="Easy" solved={d.easySolved} total={d.totalEasy} color="#10b981" delay={0.1} />
            <DiffBar label="Medium" solved={d.mediumSolved} total={d.totalMedium} color="#f59e0b" delay={0.2} />
            <DiffBar label="Hard" solved={d.hardSolved} total={d.totalHard} color="#ef4444" delay={0.3} />
          </div>
        </div>

        {/* Right: Recent Submissions */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-text-muted uppercase">Recent Accepted Problems</div>
          <div className="space-y-2">
            {(d.recentSubmissions.length > 0 ? d.recentSubmissions.slice(0, 5) : FALLBACK.recentSubmissions).map((sub) => (
              <a
                key={sub.id}
                href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-md border border-border-subtle bg-base hover:border-border-strong transition-colors group"
              >
                <span className="font-mono text-xs text-text-primary group-hover:text-accent transition-colors truncate max-w-[160px]">
                  {sub.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-border-subtle text-accent">
                    {sub.lang || 'C++'}
                  </span>
                  {sub.timestamp && String(sub.timestamp) !== '0' && (
                    <span className="font-mono text-xs text-text-muted">{formatTimeAgo(sub.timestamp)}</span>
                  )}
                </div>
              </a>
            ))}
          </div>

          <a
            href="https://leetcode.com/u/cseabhinav2005/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs text-accent hover:underline"
          >
            <span>View Full LeetCode Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
