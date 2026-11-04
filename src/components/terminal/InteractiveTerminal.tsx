import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Copy, 
  Check, 
  Trash2, 
  Maximize2, 
  Minimize2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { CERTIFICATIONS } from '../../data/certifications';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

const COMMAND_LIST = [
  'help',
  'skills',
  'projects',
  'contact',
  'whoami',
  'experience',
  'certifications',
  'cat resume',
  'stats',
  'tamper-check',
  'clear',
  'sudo',
  'banner'
];

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize with welcome MOTD banner on mount
  useEffect(() => {
    const welcomeItem: HistoryItem = {
      id: 'init-0',
      command: 'welcome',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      output: (
        <div className="space-y-2 text-slate-300">
          <pre className="text-cyan-400 font-mono text-[10px] sm:text-xs leading-none select-none font-bold">
{`
  ______               _             __
 /_  __/__  ______ _  (_)___  ____ _/ /
  / / / _ \\/ ___/  ' \\/ / __ \\/ __ \`/ / 
 / / /  __/ /  / /\\  / / / / / /_/ / /  
/_/  \\___/_/  /_/  /_/_/_/ /_/\\__,_/_/   
`}
          </pre>
          <div className="text-xs text-slate-300">
            Welcome to <span className="text-cyan-400 font-semibold">Terminal v2.4.0</span> [x86_64-ml-linux].
          </div>
          <div className="text-xs text-slate-400">
            Type <span className="text-cyan-400 font-bold bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-800/40">help</span> to view available system diagnostics, or click any quick command below.
          </div>
        </div>
      )
    };
    setHistory([welcomeItem]);
  }, []);

  // Auto-scroll to bottom on output change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Update command history for Up/Down arrow navigation
    setPastCommands((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output: React.ReactNode;

    switch (lower) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold mb-2">Available System Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div><span className="text-cyan-300 font-bold">help</span> — Display this diagnostic command list</div>
              <div><span className="text-cyan-300 font-bold">skills</span> — Enumerate categorized ML, Vision & Backend stack</div>
              <div><span className="text-cyan-300 font-bold">projects</span> — List 5 verified production AI architectures</div>
              <div><span className="text-cyan-300 font-bold">tamper-check</span> — Run simulated DocuShield ELA forensic trace</div>
              <div><span className="text-cyan-300 font-bold">contact</span> — Get direct contact endpoints and socials</div>
              <div><span className="text-cyan-300 font-bold">whoami</span> — Display engineer bio and academic credentials</div>
              <div><span className="text-cyan-300 font-bold">experience</span> — Hackathon milestones and research roles</div>
              <div><span className="text-cyan-300 font-bold">certifications</span> — Verified course credentials & honors</div>
              <div><span className="text-cyan-300 font-bold">cat resume</span> — View formatted ASCII summary of resume</div>
              <div><span className="text-cyan-300 font-bold">stats</span> — Key verified performance & code telemetry</div>
              <div><span className="text-cyan-300 font-bold">clear</span> — Wipe current terminal buffer</div>
              <div><span className="text-cyan-300 font-bold">banner</span> — Display system ASCII art</div>
            </div>
          </div>
        );
        break;

      case 'tamper-check':
      case 'forensics':
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>DocuShield Forensics Engine [ELA Diagnostic Trace]:</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/30 text-slate-200 space-y-1.5 leading-relaxed">
              <div className="text-slate-400 font-bold">// EXECUTING MULTIMODAL VERIFICATION RUN #DS-8924</div>
              <div>[1] Format Check: Passport MRZ TD3 (ICAO Doc 9303 compliant)</div>
              <div>[2] ELA Disparity: <span className="text-amber-400 font-bold">COMPRESSION ERROR ELEVATED (Δ = 0.384 &gt; 0.12 baseline)</span></div>
              <div>[3] MRZ Checksums: <span className="text-emerald-400 font-bold">100% Valid (Pass 7-3-1 Weight Verification)</span></div>
              <div>[4] Facial Vector: Cosine distance 0.142 (99.2% match against ID chip portrait)</div>
              <div className="pt-1.5 border-t border-white/[0.08] text-cyan-300 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Verdict: Potential digital splice in expiry date cluster. Flagged for secondary audit.</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold">Production Tech Stack Matrix:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <div className="text-cyan-300 font-bold mb-1">Deep Learning & ML:</div>
                <div className="text-slate-300 space-y-0.5">
                  <div>• PyTorch & TorchVision</div>
                  <div>• Hugging Face Transformers</div>
                  <div>• Scikit-Learn & LightGBM</div>
                  <div>• SentenceTransformers & FAISS</div>
                  <div>• ONNX Runtime Quantization</div>
                </div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <div className="text-purple-300 font-bold mb-1">Vision & Forensics:</div>
                <div className="text-slate-300 space-y-0.5">
                  <div>• OpenCV Image Processing</div>
                  <div>• Error Level Analysis (ELA)</div>
                  <div>• OCR (EasyOCR / Tesseract)</div>
                  <div>• Biometric Facial Alignment</div>
                  <div>• ICAO & Verhoeff Checksums</div>
                </div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <div className="text-emerald-300 font-bold mb-1">Systems & Deploy:</div>
                <div className="text-slate-300 space-y-0.5">
                  <div>• Python 3.12 & C++20 STL</div>
                  <div>• FastAPI Async Microservices</div>
                  <div>• Docker Multi-Stage Builds</div>
                  <div>• PostgreSQL & Redis</div>
                  <div>• Linux / Bash & Git CI/CD</div>
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold">Verified Engineered Systems:</div>
            <div className="space-y-2">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-2 rounded bg-black/40 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{proj.title}</span>
                      <span className="text-[10px] text-cyan-400 px-1 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                        {proj.categoryLabel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{proj.tagline}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-0.5 text-[11px]">
                        <span>Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proj.repoUrl && (
                      <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-0.5 text-[11px]">
                        <span>Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        output = (
          <div className="space-y-2 text-xs font-mono py-1 text-slate-200">
            <div>
              <span className="text-cyan-400 font-bold">Abhinav Anand</span> — AI/ML Engineer & Systems Developer.
            </div>
            <div className="text-slate-300 leading-relaxed">
              B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Lovely Professional University (Class of 2029).
              Focusing on computer vision pipelines, multimodal forensic verification, deterministic cryptographic checksums (ICAO 9303, Verhoeff D5), and low-latency microservice architectures with rigorous evaluation methodologies.
            </div>
            <div className="text-slate-400 text-[11px]">
              Location: Punjab, India · Status: Open to AI/ML Research & Engineering Internships.
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold">Direct Communication Channels:</div>
            <div className="space-y-1 text-slate-300">
              <div>• Email: <a href="mailto:abhinavanand2005.cse@gmail.com" className="text-cyan-300 hover:underline">abhinavanand2005.cse@gmail.com</a></div>
              <div>• GitHub: <a href="https://github.com/abhinavbuilds2005" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">github.com/abhinavbuilds2005</a></div>
              <div>• LinkedIn: <a href="https://www.linkedin.com/in/abhinav-anand-865926300" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">linkedin.com/in/abhinav-anand-865926300</a></div>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold">Engineering & Research Timeline:</div>
            <div className="space-y-2 text-slate-200">
              <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <div className="font-bold text-slate-100">Smart India Hackathon (SIH 2026) — Finalist</div>
                <div className="text-[11px] text-cyan-400">Problem Statement SIH26188: Multimodal Document Forensics</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Architected DocuShield AI combining Error Level Analysis, OCR layout parsing, and 128D facial verification under sub-2s latency.
                </div>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                <div className="font-bold text-slate-100">AI Systems Engineering Student — LPU (2025–2029)</div>
                <div className="text-[11px] text-purple-400">Computer Science & Engineering Specializing in AI/ML</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Deep foundations in Data Structures & Algorithms (C++), Linear Algebra, Distributed Systems, and Deep Learning architectures.
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'certifications':
        output = (
          <div className="space-y-2 text-xs font-mono py-1">
            <div className="text-cyan-400 font-semibold">Verified Credentials:</div>
            <div className="space-y-1.5">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-1.5 rounded bg-black/30 text-slate-200">
                  <div>
                    <span className="font-bold text-slate-100">{cert.title}</span>{' '}
                    <span className="text-slate-400">({cert.platform})</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'cat resume':
      case 'resume':
        output = (
          <div className="p-3 rounded bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-200 space-y-2">
            <div className="text-cyan-400 font-bold">ABHINAV ANAND — RESUME CURATED SUMMARY</div>
            <div className="text-[11px] text-slate-400">Email: abhinavanand2005.cse@gmail.com | GitHub: @abhinavbuilds2005</div>
            <div className="border-t border-white/[0.06] pt-1.5">
              <span className="text-purple-400 font-bold">EDUCATION:</span> B.Tech CSE (AI/ML) · Lovely Professional University (2025–2029)
            </div>
            <div>
              <span className="text-purple-400 font-bold">FLAGSHIP WORK:</span> DocuShield AI (SIH 2026), CreditWise (PR-AUC 0.842), ATS Resume Analyzer (FAISS).
            </div>
            <div>
              <span className="text-purple-400 font-bold">SKILLS:</span> PyTorch, OpenCV, Hugging Face, FastAPI, Docker, C++ STL, PostgreSQL, Verhoeff D5.
            </div>
            <div className="text-cyan-300">
              Download formal PDF via top navigation bar or dock button.
            </div>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono py-1">
            <div className="p-2 rounded bg-black/40 border border-white/[0.06] text-center">
              <div className="text-cyan-400 font-bold text-base">5</div>
              <div className="text-[10px] text-slate-400">Production AI Systems</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/[0.06] text-center">
              <div className="text-purple-400 font-bold text-base">&lt; 1.84s</div>
              <div className="text-[10px] text-slate-400">Forensic Pipeline Latency</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/[0.06] text-center">
              <div className="text-emerald-400 font-bold text-base">100%</div>
              <div className="text-[10px] text-slate-400">Mathematical Checksums</div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/[0.06] text-center">
              <div className="text-cyan-400 font-bold text-base">100+</div>
              <div className="text-[10px] text-slate-400">LeetCode Solved (C++)</div>
            </div>
          </div>
        );
        break;

      case 'sudo':
        output = (
          <div className="text-xs font-mono text-red-400 py-1">
            Permission denied: user 'visitor' is not in the sudoers file. This incident has been logged and sent to Abhinav Anand.
          </div>
        );
        break;

      case 'banner':
        output = (
          <pre className="text-cyan-400 font-mono text-[9px] sm:text-xs leading-none select-none font-bold py-1">
{`
  ______               _             __
 /_  __/__  ______ _  (_)___  ____ _/ /
  / / / _ \\/ ___/  ' \\/ / __ \\/ __ \`/ / 
 / / /  __/ /  / /\\  / / / / / /_/ / /  
/_/  \\___/_/  /_/  /_/_/_/ /_/\\__,_/_/   
`}
          </pre>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-amber-300 py-1">
            zsh: command not found: <span className="text-white font-bold">{trimmed}</span>. Type{' '}
            <button
              type="button"
              onClick={() => handleCommand('help')}
              className="text-cyan-400 font-bold underline cursor-pointer"
            >
              help
            </button>{' '}
            for a list of verified commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output,
        timestamp,
      },
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIndex = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInputVal(pastCommands[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex === -1) return;
      if (cmdIndex < pastCommands.length - 1) {
        const nextIndex = cmdIndex + 1;
        setCmdIndex(nextIndex);
        setInputVal(pastCommands[nextIndex]);
      } else {
        setCmdIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      if (!current) return;
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const copyTerminalOutput = () => {
    const textOutput = history.map((h) => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="scroll-mt-20 py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-cyan-400 mb-2">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Runtime Environment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
            Terminal
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-mono">
          Query system diagnostics, inspect audited ML models, and execute real-time developer commands.
        </p>
      </div>

      {/* Terminal Window Box */}
      <div
        className={`relative rounded-xl border border-white/[0.1] bg-[#080B11]/95 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 ${
          isExpanded ? 'min-h-[600px]' : 'min-h-[420px]'
        }`}
      >
        {/* Terminal Title Bar / Chrome */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A]/90 border-b border-white/[0.08] select-none">
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-600/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block border border-yellow-600/60" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/60" />
            <span className="ml-3 font-mono text-xs text-slate-300 font-medium hidden sm:inline">
              visitor@portfolio: ~/terminal <span className="text-cyan-400 font-bold">(zsh)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyTerminalOutput}
              className="p-1.5 rounded hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
              title="Copy session output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={() => setHistory([])}
              className="p-1.5 rounded hover:bg-white/[0.08] text-slate-400 hover:text-red-400 transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
              title="Clear terminal buffer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors hidden sm:block cursor-pointer"
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 px-4 py-2.5 bg-[#080B11]/60 border-b border-white/[0.04]">
          <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Quick run:</span>
          {['help', 'skills', 'projects', 'tamper-check', 'contact', 'whoami', 'certifications', 'stats', 'clear'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-800/40 transition-colors cursor-pointer active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Log Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-y-auto max-h-[460px] space-y-4 cursor-text"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-emerald-400 font-bold">visitor@portfolio</span>
                <span className="text-slate-600">:</span>
                <span className="text-cyan-400 font-bold">~</span>
                <span className="text-slate-400">$</span>
                <span className="text-slate-100 font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-cyan-500/20">{item.output}</div>
            </div>
          ))}

          {/* Active Input Prompt */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold text-xs select-none">visitor@portfolio</span>
            <span className="text-slate-600 select-none">:</span>
            <span className="text-cyan-400 font-bold text-xs select-none">~</span>
            <span className="text-slate-400 font-bold select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or tab to autocomplete..."
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-xs sm:text-sm focus:ring-0 placeholder:text-slate-600 caret-cyan-400"
              autoComplete="off"
              spellCheck="false"
              aria-label="Interactive terminal command input"
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              title="Execute command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
};
