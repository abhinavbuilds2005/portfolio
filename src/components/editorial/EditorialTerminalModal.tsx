import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

interface EditorialTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const EditorialTerminalModal: React.FC<EditorialTerminalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-emerald-400">
          <p className="font-bold text-white">Abhinav Anand — Interactive Runtime Environment [zsh v2.4.0]</p>
          <p className="text-xs text-[#F5F2EB]/70">
            Type <span className="text-[#315CFF] font-bold">help</span> to view available system diagnostics, or click any quick command below.
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const quickCommands = [
    'help',
    'projects',
    'skills',
    'resume',
    'sih',
    'certifications',
    'nptel',
    'c',
    'ibm',
    'metrics',
    'tamper-check',
    'whoami',
    'contact',
    'clear',
  ];

  const handleExecute = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-[#315CFF] font-bold">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-2 gap-2 text-[#F5F2EB]/80 pt-1">
              <div><span className="text-[#F0784B] font-bold">projects</span> — List production systems</div>
              <div><span className="text-[#F0784B] font-bold">resume</span> — Output resume dossier & PDF</div>
              <div><span className="text-[#F0784B] font-bold">sih</span> — Smart India Hackathon '26 details</div>
              <div><span className="text-[#F0784B] font-bold">certifications</span> — Verified accreditations</div>
              <div><span className="text-[#F0784B] font-bold">skills</span> — Working vocabulary & stack</div>
              <div><span className="text-[#F0784B] font-bold">metrics</span> — Production engineering invariants</div>
              <div><span className="text-[#F0784B] font-bold">tamper-check</span> — Run DocuShield ELA test</div>
              <div><span className="text-[#F0784B] font-bold">whoami</span> — Profile & credentials</div>
              <div><span className="text-[#F0784B] font-bold">contact</span> — Email, phone, GitHub, LinkedIn</div>
              <div><span className="text-[#F0784B] font-bold">clear</span> — Wipe terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#315CFF] font-bold">VERIFIED REPOSITORIES & SYSTEMS:</p>
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="border-l-2 border-[#315CFF] pl-2 text-[#F5F2EB]/85">
                <span className="text-white font-bold">{i + 1}. {p.title}</span> — {p.categoryLabel}
                <div className="text-[11px] text-[#F5F2EB]/60">{p.tagline}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'resume':
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#F5F2EB]/90">
            <p className="text-emerald-400 font-bold">RÉSUMÉ DOSSIER // ABHINAV ANAND</p>
            <p>Role: Software Engineer Intern (Python / Backend) | Applied AI & ML</p>
            <p>Education: B.Tech CSE (AI/ML) · Lovely Professional University (Aug 2025 - Aug 2029)</p>
            <p>Location: Jalandhar, Punjab, India · +91 9153051907 · abhinavanand9996@gmail.com</p>
            <p>Flagship: DocuShield AI (SIH 2026 PS SIH26188, 90 Automated Tests, ELA + ORB, &lt;42ms FastAPI)</p>
            <div className="pt-1">
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                download="Abhinav_Anand_Resume.pdf"
                className="inline-block bg-[#315CFF] text-white px-3 py-1 font-mono text-[11px] font-bold hover:bg-[#2047E5] transition-colors"
              >
                DOWNLOAD OFFICIAL RESUME (PDF) ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'sih':
        outputNode = (
          <div className="space-y-1 text-xs text-[#F5F2EB]/90">
            <p className="text-[#F0784B] font-bold">SMART INDIA HACKATHON 2026 // NATIONAL QUALIFIER</p>
            <p>Problem Statement: <span className="text-white font-bold">SIH26188</span></p>
            <p>Project: <span className="text-white font-bold">DocuShield AI</span> — Automated Forensic Screening System</p>
            <p>Forensic Modules: Error Level Analysis (95% recompression), ORB Copy-Move homography, ICAO Doc 9303 check digits, Verhoeff D5 dihedral arithmetic.</p>
            <p>Performance: 90 Automated Tests (100% pass), &lt;42ms FastAPI inference, 5 ID classes supported.</p>
          </div>
        );
        break;

      case 'nptel':
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#F5F2EB]/90">
            <p className="text-[#315CFF] font-bold">NPTEL & IIT MADRAS // LARGE LANGUAGE MODELS (LLMS)</p>
            <p>Course: <span className="text-white font-bold">Introduction to Large Language Models (LLMs)</span></p>
            <p>Institution: Indian Institute of Technology Madras · MoE Govt. of India</p>
            <p>Roll No: <span className="text-white font-bold">NPTEL26CS171MANUAL0000154</span> · Cohort: 11,857 registered</p>
            <p>Score: 57% Consolidated (Assignments: 23.16/25 | Proctored Exam: 33.75/75) · 4 Academic Credits</p>
            <div className="pt-1">
              <a
                href="/certificates/nptel_llm_certificate.pdf"
                download="Abhinav_Anand_NPTEL_LLM_Certificate.pdf"
                className="inline-block bg-[#315CFF] text-white px-3 py-1 font-mono text-[11px] font-bold hover:bg-[#2047E5] transition-colors"
              >
                DOWNLOAD OFFICIAL IIT MADRAS PDF ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'c':
      case 'c-prog':
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#F5F2EB]/90">
            <p className="text-[#315CFF] font-bold">LOVELY PROFESSIONAL UNIVERSITY & IAMNEO // COMPUTER PROGRAMMING (C LANGUAGE)</p>
            <p>Course: <span className="text-white font-bold">Computer Programming (C Language) · 150 Hours</span></p>
            <p>Provider: Lovely Professional University & iamneo (An NIIT Venture)</p>
            <p>Certificate No: <span className="text-white font-bold">23dK7aL4bM5Dj3Dk3BIl</span></p>
            <p>Duration: Jan 18, 2026 – May 20, 2026 (Issue Date: May 21, 2026)</p>
            <div className="pt-1 flex gap-2">
              <a
                href="https://lpucolab438.examly.io/certificate/U2FsdGVkX1%2B%2FuDSBq1oWD2CCNJq0i3IvFc%2F92Re%2F%2F6I%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#315CFF] text-white px-3 py-1 font-mono text-[11px] font-bold hover:bg-[#2047E5] transition-colors"
              >
                VERIFY ON EXAMLY / NEO COLAB ↗
              </a>
              <a
                href="/certificates/c_programming_certificate.pdf"
                download="Abhinav_Anand_C_Programming_Certificate.pdf"
                className="inline-block bg-[#FAF8F5] text-[#132532] px-3 py-1 font-mono text-[11px] font-bold hover:bg-white transition-colors"
              >
                DOWNLOAD PDF ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'ibm':
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#F5F2EB]/90">
            <p className="text-[#315CFF] font-bold">IBM & COGNITIVE CLASS // PYTHON 101 FOR DATA SCIENCE</p>
            <p>Course: <span className="text-white font-bold">Python 101 for Data Science (PY0101EN)</span></p>
            <p>Provider: Cognitive Class · Powered by IBM Developer Skills Network</p>
            <p>Certificate Hash: <span className="text-white font-bold">ebedc993179f41149ed2a7fb0c83b612</span></p>
            <p>Status: Passing Grade Verified (Issued June 20, 2026)</p>
            <div className="pt-1 flex gap-2">
              <a
                href="https://courses.cognitiveclass.ai/certificates/ebedc993179f41149ed2a7fb0c83b612"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#315CFF] text-white px-3 py-1 font-mono text-[11px] font-bold hover:bg-[#2047E5] transition-colors"
              >
                VERIFY ON COGNITIVE CLASS ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'certifications':
        outputNode = (
          <div className="space-y-1.5 text-xs text-[#F5F2EB]/90">
            <p className="text-[#315CFF] font-bold">VERIFIED TECHNICAL ACCREDITATIONS (6 TOTAL):</p>
            <p>1. <span className="text-white font-bold">NPTEL & IIT Madras</span> — Introduction to Large Language Models (LLMs) · Roll: NPTEL26CS171MANUAL0000154</p>
            <p>2. <span className="text-white font-bold">LPU & iamneo (NIIT Venture)</span> — Computer Programming in C (150 Hours) · Cert: 23dK7aL4bM5Dj3Dk3BIl</p>
            <p>3. <span className="text-white font-bold">Cognitive Class & IBM</span> — Python 101 for Data Science (PY0101EN) · ID: ebedc993179f41149ed2a7fb0c83b612</p>
            <p>4. <span className="text-white font-bold">Smart India Hackathon 2026</span> (PS SIH26188 Qualified) · Ministry of Education / AICTE</p>
            <p>5. <span className="text-white font-bold">HackerRank SQL (Advanced)</span> Certified · 5★ Gold Badge in Relational Modeling</p>
            <p>6. <span className="text-white font-bold">Infosys Springboard Python</span> Certified · OOP Architecture & Asymptotic Complexity</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-xs text-[#F5F2EB]/85">
            <p className="text-[#315CFF] font-bold">CORE TECHNICAL STACK:</p>
            <p>• Python, C++20, PyTorch, OpenCV, Scikit-Learn</p>
            <p>• FastAPI, Docker, SQL / PostgreSQL, Supabase</p>
            <p>• Sentence Transformers, Groq Llama 3, LangChain, React</p>
          </div>
        );
        break;

      case 'metrics':
      case 'stats':
        outputNode = (
          <div className="space-y-1 text-xs text-[#F5F2EB]/85">
            <p className="text-[#315CFF] font-bold">PRODUCTION INVARIANTS & BENCHMARKS:</p>
            <p>• DocuShield Inference: &lt;42ms via FastAPI + ONNX Runtime</p>
            <p>• Test Coverage: 90 Automated Unit & Integration Tests (100% Pass)</p>
            <p>• ATS Resume Scoring: 100-Point Algorithmic Rubric (spaCy + Sentence Transformers)</p>
            <p>• CreditWise Loan Classifier: 87.5% Benchmark Accuracy (3-tier risk stratification)</p>
            <p>• Checksum Coverage: 100% Mathematical Certainty (ICAO Doc 9303 + Verhoeff D5)</p>
          </div>
        );
        break;

      case 'tamper-check':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-bold">[DocuShield AI] INITIATING ELA TAMPER SCAN...</p>
            <p className="text-[#F5F2EB]/80">✓ 95% JPEG Recompression Differential: 0.042 RMSE</p>
            <p className="text-[#F5F2EB]/80">✓ ICAO Doc 9303 Checksum: 7-3-1 VALID</p>
            <p className="text-[#F5F2EB]/80">✓ Verhoeff D5 Identity Algorithm: PASS (Dihedral Group D5)</p>
            <p className="text-[#315CFF] font-bold">COMPOSITE FORENSIC VERDICT: AUTHENTIC (Risk: 4.2%)</p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs text-[#F5F2EB]/85">
            <p className="text-white font-bold">Abhinav Anand</p>
            <p>Role: Software Engineer Intern (Python / Backend) | Applied AI & ML</p>
            <p>Education: B.Tech CSE (AI/ML) · Lovely Professional University (Aug 2025 - Aug 2029)</p>
            <p>Smart India Hackathon (SIH 2026) National Finalist (PS SIH26188)</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-[#F5F2EB]/85">
            <p>Email: <span className="text-white font-bold">abhinavanand9996@gmail.com</span></p>
            <p>Phone: <span className="text-white font-bold">+91 9153051907</span></p>
            <p>Location: <span className="text-white font-bold">Jalandhar, Punjab, India</span></p>
            <p>GitHub: github.com/abhinavbuilds2005</p>
            <p>LinkedIn: linkedin.com/in/abhinav-anand-865926300</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            Command not recognized: '{trimmed}'. Type <span className="underline font-bold text-white">help</span> for available options.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output: outputNode }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecute(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#132532]/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-3xl bg-[#132532] text-[#F5F2EB] border border-[#132532]/40 shadow-2xl rounded-none flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0E1B24] border-b border-white/10 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-[#F5F2EB]/70">
                <TerminalIcon className="w-3.5 h-3.5 text-[#315CFF]" />
                <span className="font-bold text-white">visitor@portfolio: ~/terminal (zsh)</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close terminal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Run Command Pills */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#132532] border-b border-white/5 overflow-x-auto text-[11px] font-mono">
              <span className="text-white/40 uppercase tracking-wider text-[10px] mr-1">QUICK:</span>
              {quickCommands.map((c) => (
                <button
                  key={c}
                  onClick={() => handleExecute(c)}
                  className="px-2 py-0.5 bg-white/5 hover:bg-[#315CFF] text-[#F5F2EB]/80 hover:text-white border border-white/10 transition-colors rounded-none cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Terminal Log Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm">
              {history.map((h, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white/50">
                    <span className="text-emerald-400">visitor@portfolio</span>
                    <span>:</span>
                    <span className="text-[#315CFF]">~</span>
                    <span>$</span>
                    <span className="text-white font-semibold">{h.command}</span>
                  </div>
                  <div className="pl-4">{h.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-[#0E1B24] border-t border-white/10 font-mono text-xs sm:text-sm"
            >
              <span className="text-emerald-400">visitor@portfolio</span>
              <span>:</span>
              <span className="text-[#315CFF]">~</span>
              <span>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help' or command..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="p-1 text-[#315CFF] hover:text-white transition-colors"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

