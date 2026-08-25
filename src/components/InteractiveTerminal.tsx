import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Maximize2, Trash2 } from 'lucide-react';
import { sfx } from '../utils/audio';

interface CommandOutput {
  command: string;
  response: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      response: (
        <div className="space-y-1">
          <p className="text-cyber-cyan font-bold">⚡ NEURAL NEXUS OS [Version 2.4.0-PROD]</p>
          <p className="text-gray-400">Architect: Abhinav Anand · Type <span className="text-cyber-cyan font-bold">help</span> to view available terminal commands.</p>
        </div>
      ),
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    sfx.playTerminalBeep();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const time = new Date().toLocaleTimeString();
    let res: React.ReactNode;

    switch (cmd) {
      case 'help':
        res = (
          <div className="space-y-1.5 text-gray-300">
            <p className="text-cyber-cyan font-semibold">Available Neural Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
              <div><span className="text-cyber-cyan font-bold">projects</span> - View all deployed ML & AI systems</div>
              <div><span className="text-cyber-purple font-bold">skills</span> - Display full neural stack & tooling</div>
              <div><span className="text-emerald-400 font-bold">bio</span> - Read engineer profile & education</div>
              <div><span className="text-amber-400 font-bold">contact</span> - Retrieve comm-links and handles</div>
              <div><span className="text-rose-400 font-bold">resume</span> - Download Abhinav's latest resume</div>
              <div><span className="text-blue-400 font-bold">matrix</span> - Activate cyber matrix stream</div>
              <div><span className="text-cyber-cyan font-bold">hire</span> - Initialize recruitment transmission</div>
              <div><span className="text-gray-400 font-bold">clear</span> - Purge terminal console buffer</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyber-cyan font-bold">Production ML & AI Systems:</p>
            <div className="space-y-1.5">
              <div>
                <span className="text-white font-bold">1. CreditWise:</span> Loan Risk Scoring (98.4% ROC-AUC, SHAP explainability)
                <br /><a href="https://credishield-one.vercel.app/" target="_blank" rel="noreferrer" className="text-cyber-cyan underline ml-2">https://credishield-one.vercel.app/</a>
              </div>
              <div>
                <span className="text-white font-bold">2. SmartCart:</span> Customer Intelligence & PCA Churn Predictor
                <br /><a href="https://smartcart-recommendation-system.netlify.app/" target="_blank" rel="noreferrer" className="text-emerald-400 underline ml-2">https://smartcart-recommendation-system.netlify.app/</a>
              </div>
              <div>
                <span className="text-white font-bold">3. PresentAI:</span> Multimodal Biometric Attendance (FaceNet + Speaker Voiceprint)
                <br /><a href="https://presentai-attendance.onrender.com" target="_blank" rel="noreferrer" className="text-cyber-purple underline ml-2">https://presentai-attendance.onrender.com</a>
              </div>
              <div>
                <span className="text-white font-bold">4. ATS Resume Analyser:</span> GenAI & LLM Semantic Rescorer
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyber-purple font-bold">Active Competency Matrix:</p>
            <p><span className="text-cyber-cyan font-bold">ML & DL:</span> PyTorch, Scikit-Learn, SHAP, K-Means, PCA, CNNs, Feature Pipelines</p>
            <p><span className="text-cyber-purple font-bold">GenAI:</span> LLMs, Prompt Engineering, LangChain, RAG, ChromaDB/FAISS, Embeddings</p>
            <p><span className="text-emerald-400 font-bold">Backend & Languages:</span> Python, PostgreSQL, SQL, FastAPI, JavaScript, TypeScript, React</p>
            <p><span className="text-amber-400 font-bold">Data & Tools:</span> NumPy, Pandas, Matplotlib, OpenCV, Streamlit, Git, Docker, Linux</p>
          </div>
        );
        break;

      case 'bio':
        res = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-white font-bold">Abhinav Anand</p>
            <p>🎓 BTech Computer Science & Engineering (AIML) at Lovely Professional University (2025–2029).</p>
            <p>🚀 3+ deployed production applications blending machine learning with explainability and intuitive UI.</p>
            <p>⚡ Philosophy: Build first, iterate relentlessly, bridge math into production software.</p>
          </div>
        );
        break;

      case 'contact':
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyber-cyan font-bold">Comm-Link Coordinates:</p>
            <p>📧 Email: <a href="mailto:abhinavanand9996@gmail.com" className="text-white underline">abhinavanand9996@gmail.com</a></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/abhinav-anand-865926300" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/abhinav-anand-865926300</a></p>
            <p>🐙 GitHub: <a href="https://github.com/abhinavbuilds2005" target="_blank" rel="noreferrer" className="text-gray-300 underline">github.com/abhinavbuilds2005</a></p>
          </div>
        );
        break;

      case 'resume':
        window.open('/Abhinav_Resume.pdf', '_blank');
        res = <p className="text-emerald-400 text-xs">✅ Opening Abhinav_Resume.pdf in new tab...</p>;
        break;

      case 'hire':
        res = (
          <div className="p-3 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-xs text-gray-200">
            <p className="text-cyber-cyan font-bold">🎉 Excellent decision!</p>
            <p className="mt-1">Abhinav is open to remote Machine Learning Intern, Data Analyst, and Generative AI engineer roles.</p>
            <p className="mt-1">Direct message: <a href="mailto:abhinavanand9996@gmail.com" className="text-white font-bold underline">abhinavanand9996@gmail.com</a></p>
          </div>
        );
        break;

      case 'matrix':
        res = (
          <div className="font-mono text-emerald-400 text-[11px] leading-tight overflow-hidden">
            <p>01000001 01001001 00100000 01001101 01001100</p>
            <p>11001010 10101111 00110011 11010101 01010101</p>
            <p>NEURAL WEIGHTS SYNCHRONIZED · ACCURACY OPTIMAL</p>
            <p>00101010 11110000 10101010 01010101 11001100</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        res = (
          <p className="text-rose-400 text-xs">
            Command not recognized: <span className="font-bold">{cmd}</span>. Type <span className="text-cyber-cyan font-bold">help</span> for valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, response: res, time }]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE SHELL · CLI CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Developer Cyber Terminal
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Direct interface for power users, recruiters, and engineering leads.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl bg-obsidian-950/95 border border-white/15 shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-obsidian-900 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-[11px] text-gray-400">abhinav@neural-nexus:~ (bash)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sfx.playClick();
                  setHistory([]);
                }}
                className="text-gray-400 hover:text-white transition-colors"
                title="Clear Terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="p-5 max-h-96 min-h-[280px] overflow-y-auto space-y-4 cursor-text"
          >
            {history.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-cyber-cyan font-bold">abhinav@nexus:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-gray-400 ml-auto">{item.time}</span>
                </div>
                <div className="pl-4 border-l border-white/10">{item.response}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-obsidian-900/60 border-t border-white/10">
            <span className="text-cyber-cyan font-bold shrink-0">abhinav@nexus:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'projects', 'skills', 'hire'..."
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-xs font-mono"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="text-gray-400 hover:text-cyber-cyan transition-colors">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
