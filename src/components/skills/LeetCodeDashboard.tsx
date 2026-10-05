import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, RefreshCw, Trophy, Zap, CheckCircle2, ExternalLink } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────
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

// ── Fallback / baseline data ───────────────────────────────────────────
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
  ranking: '5,000,001+',
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

// ── Sub-components ─────────────────────────────────────────────────────
const DiffBar: React.FC<{
  label: string;
  solved: number;
  total: number;
  color: string;
  delay: number;
}> = ({ label, solved, total, color, delay }) => {
  const pct = total > 0 ? Math.max((solved / total) * 100, solved > 0 ? 2 : 0) : 0;
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono mb-1">
        <span style={{ color }}>{label}</span>
        <span className="text-[#78716c]">{solved} / {total}</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#121212] overflow-hidden border border-[#2b2a27]/50">
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-y-0 w-6 bg-white/30 skew-x-[-20deg]"
            initial={{ x: '-100%' }}
            whileInView={{ x: '300%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────
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
        const cached = localStorage.getItem(LC_CACHE_KEY);
        const cachedTime = localStorage.getItem(LC_CACHE_TIME_KEY);
        if (cached && cachedTime && Date.now() - Number(cachedTime) < CACHE_TTL_MS) {
          setData(JSON.parse(cached));
          setLoading(false);
          return;
        }
      } catch (_) { /* ignore */ }
    }

    setSyncing(true);
    setSyncLabel('SYNCING...');
    setError(null);

    const username = 'cseabhinav2005';
    const endpoints = [
      `/api/leetcode?username=${username}`,
      `https://coderabhinavanand.netlify.app/api/leetcode?username=${username}`,
      `https://leetcode-api-1.vercel.app/${username}`,
    ];

    let fetched: LCData | null = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const raw = await res.json();
        if (raw && (raw.totalSolved !== undefined || raw.solvedProblem !== undefined)) {
          // Normalise alternate API shape
          fetched = {
            username: raw.username || username,
            totalSolved: raw.totalSolved ?? raw.solvedProblem ?? 0,
            totalQuestions: raw.totalQuestions ?? raw.totalQuestion ?? 3000,
            easySolved: raw.easySolved ?? raw.easySolvedProblem ?? 0,
            totalEasy: raw.totalEasy ?? raw.totalEasyQuestion ?? 800,
            mediumSolved: raw.mediumSolved ?? raw.mediumSolvedProblem ?? 0,
            totalMedium: raw.totalMedium ?? raw.totalMediumQuestion ?? 1600,
            hardSolved: raw.hardSolved ?? raw.hardSolvedProblem ?? 0,
            totalHard: raw.totalHard ?? raw.totalHardQuestion ?? 600,
            ranking: raw.ranking ?? '—',
            reputation: raw.reputation ?? 0,
            recentSubmissions: (raw.recentSubmissions ?? raw.recentAcSubmissionList ?? []).map((s: LCSubmission & { titleName?: string; submitTime?: string | number; langName?: string; status?: string }) => ({
              id: s.id,
              title: s.title || s.titleName || 'Problem',
              titleSlug: s.titleSlug || 'problem',
              timestamp: s.timestamp || s.submitTime || '0',
              lang: s.lang || s.langName || 'C++',
              statusDisplay: s.statusDisplay || s.status || 'Accepted',
            })),
            syncedAt: new Date().toISOString(),
          };
          break;
        }
      } catch (_) { continue; }
    }

    if (fetched) {
      try {
        localStorage.setItem(LC_CACHE_KEY, JSON.stringify(fetched));
        localStorage.setItem(LC_CACHE_TIME_KEY, Date.now().toString());
      } catch (_) { /* ignore */ }
      setData(fetched);
      setSyncLabel('SYNCED');
    } else {
      setError('Gateway unreachable — showing cached baseline');
      setSyncLabel('RETRY');
      if (!data) setData(FALLBACK);
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="p-6 rounded border border-[#2b2a27] bg-[#1c1c1c] shadow-sm relative overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(229,139,36,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(229,139,36,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ── Header ── */}
      <div className="relative flex items-center justify-between mb-5 pb-2 border-b border-[#2b2a27]/60">
        <div className="flex items-center gap-2 font-mono text-xs text-[#e58b24] font-semibold">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Code2 className="w-4 h-4" />
          </motion.div>
          <span>LEETCODE TELEMETRY</span>
          <a
            href="https://leetcode.com/u/cseabhinav2005/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#78716c] hover:text-[#e58b24] transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <motion.button
          onClick={() => fetchData(true)}
          disabled={syncing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border border-[#2b2a27] text-[#78716c] hover:border-[#e58b24]/50 hover:text-[#e58b24] transition-colors disabled:opacity-50"
        >
          <motion.div animate={syncing ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1, repeat: syncing ? Infinity : 0, ease: 'linear' }}>
            <RefreshCw className="w-2.5 h-2.5" />
          </motion.div>
          {syncLabel}
        </motion.button>
      </div>

      {/* ── Error notice ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-[10px] text-[#78716c] bg-[#121212] border border-[#2b2a27]/60 rounded px-2 py-1 mb-3"
          >
            ⚠ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && !data ? (
        /* Skeleton pulse */
        <div className="space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-[#2b2a27]/60 rounded" style={{ width: `${80 - i * 10}%` }} />
          ))}
        </div>
      ) : (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* ── Left: Stat cards + diff bars ── */}
          <div className="space-y-4">
            {/* 4 stat chips */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: <CheckCircle2 className="w-3 h-3" />, label: 'Solved', value: d.totalSolved, accent: true },
                { icon: <Trophy className="w-3 h-3" />, label: 'Ranking', value: rankStr, accent: false },
                { icon: <Zap className="w-3 h-3" />, label: 'Total Qs', value: d.totalQuestions, accent: false },
                { icon: <CheckCircle2 className="w-3 h-3" />, label: 'Acceptance', value: `${totalPct}%`, accent: false },
              ].map(({ icon, label, value, accent }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="p-2.5 rounded border border-[#2b2a27] bg-[#161616] text-center"
                >
                  <div className={`flex items-center justify-center gap-1 mb-1 ${accent ? 'text-[#e58b24]' : 'text-[#78716c]'}`}>
                    {icon}
                  </div>
                  <div className={`font-mono text-base font-bold ${accent ? 'text-[#e58b24]' : 'text-[#f5f2eb]'}`}>
                    {value}
                  </div>
                  <div className="font-mono text-[9px] text-[#78716c] uppercase">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-2.5 p-3 rounded border border-[#2b2a27]/60 bg-[#161616]">
              <div className="font-mono text-[9px] text-[#78716c] uppercase mb-2">Difficulty Breakdown</div>
              <DiffBar label="Easy"   solved={d.easySolved}   total={d.totalEasy}   color="#22c55e" delay={0.1} />
              <DiffBar label="Medium" solved={d.mediumSolved} total={d.totalMedium} color="#f59e0b" delay={0.2} />
              <DiffBar label="Hard"   solved={d.hardSolved}   total={d.totalHard}   color="#ef4444" delay={0.3} />
            </div>
          </div>

          {/* ── Right: Recent AC submissions ── */}
          <div>
            <div className="font-mono text-[9px] text-[#78716c] uppercase mb-2">Recent Accepted</div>
            <div className="space-y-1.5">
              {(d.recentSubmissions.length > 0 ? d.recentSubmissions.slice(0, 5) : [
                { id: '1', title: 'Two Sum', titleSlug: 'two-sum', timestamp: '0', lang: 'C++', statusDisplay: 'Accepted' },
                { id: '2', title: 'Valid Parentheses', titleSlug: 'valid-parentheses', timestamp: '0', lang: 'C++', statusDisplay: 'Accepted' },
                { id: '3', title: 'Merge Intervals', titleSlug: 'merge-intervals', timestamp: '0', lang: 'Python3', statusDisplay: 'Accepted' },
              ]).map((sub, i) => (
                <motion.a
                  key={sub.id}
                  href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  whileHover={{ x: 3 }}
                  className="flex items-center justify-between p-2 rounded border border-[#2b2a27]/50 bg-[#161616] hover:border-[#e58b24]/30 transition-colors group"
                >
                  <span className="font-mono text-[11px] text-[#a8a29e] group-hover:text-[#f5f2eb] transition-colors truncate max-w-[130px]">
                    {sub.title}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span className="font-mono text-[9px] px-1 rounded bg-[#e58b24]/10 text-[#e58b24] border border-[#e58b24]/20">
                      {sub.lang || 'C++'}
                    </span>
                    {sub.timestamp && String(sub.timestamp) !== '0' && (
                      <span className="font-mono text-[9px] text-[#78716c]">{formatTimeAgo(sub.timestamp)}</span>
                    )}
                  </div>
                </motion.a>
              ))}
              {d.recentSubmissions.length === 0 && !loading && (
                <p className="font-mono text-[10px] text-[#78716c] text-center py-4">
                  No recent submissions cached yet — hit SYNC to load.
                </p>
              )}
            </div>

            {/* Footer link */}
            <motion.a
              href="https://leetcode.com/u/cseabhinav2005/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 font-mono text-[10px] text-[#e58b24] hover:underline"
              whileHover={{ x: 3 }}
            >
              View full profile
              <ExternalLink className="w-2.5 h-2.5" />
            </motion.a>
          </div>
        </div>
      )}
    </motion.div>
  );
};
