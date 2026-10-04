import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/projects';

interface CommandOutput {
  id: string;
  command: string;
  result: React.ReactNode;
}

export const InteractiveTerminalDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialOutputs: CommandOutput[] = [
    {
      id: 'welcome',
      command: 'init',
      result: (
        <div className="space-y-1 text-[#9AA4B2]">
          <div className="text-[#6366F1] font-bold">
            Abhinav Anand · AI Systems Kernel Environment (x86_64-pc-windows)
          </div>
          <div>Type <span className="text-[#34D399] font-semibold">help</span> to view diagnostic commands, or run <span className="text-[#22D3EE] font-semibold">projects</span>.</div>
          <div className="text-[10px] text-[#667085]">Shortcut: press <kbd className="px-1 py-0.5 rounded bg-white/10 text-white">~</kbd> or <kbd className="px-1 py-0.5 rounded bg-white/10 text-white">Esc</kbd> anytime to toggle.</div>
        </div>
      ),
    },
  ];

  const [outputs, setOutputs] = useState<CommandOutput[]>(initialOutputs);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const cmdLower = trimmed.toLowerCase();
    let resultNode: React.ReactNode = null;

    if (cmdLower === 'help') {
      resultNode = (
        <div className="space-y-1.5 text-[#9AA4B2]">
          <div className="text-white font-semibold mb-1">Available System Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
            <div><span className="text-[#6366F1] font-bold">about</span> - Background & engineering philosophy</div>
            <div><span className="text-[#6366F1] font-bold">projects</span> - List verified production systems</div>
            <div><span className="text-[#6366F1] font-bold">skills</span> - Engineering stack & competencies</div>
            <div><span className="text-[#6366F1] font-bold">stack</span> - Core frameworks & tools</div>
            <div><span className="text-[#6366F1] font-bold">nvidia-smi</span> - Local GPU hardware & VRAM profile</div>
            <div><span className="text-[#6366F1] font-bold">contact</span> - Direct communication coordinates</div>
            <div><span className="text-[#6366F1] font-bold">resume</span> - Open specialized CV (PDF)</div>
            <div><span className="text-[#6366F1] font-bold">clear</span> - Clear terminal session</div>
            <div><span className="text-[#6366F1] font-bold">exit</span> - Dismiss console</div>
          </div>
        </div>
      );
    } else if (cmdLower === 'about') {
      resultNode = (
        <div className="text-xs text-[#9AA4B2] leading-relaxed space-y-2">
          <p>
            <strong className="text-white">Abhinav Anand</strong> is an AI/ML Engineer and 2nd-year B.Tech CSE (AI/ML) student at Lovely Professional University (Class of 2029).
          </p>
          <p>
            Focus: Building practical intelligent systems that turn noisy multimodal data into calibrated decisions. Core competencies include PyTorch tensor architectures, OpenCV computer vision, forensic document verification (DocuShield AI), predictive ML with PR-AUC auditing (CreditWise), and rolling-chunk NLP semantic matching (ATS Resume Analyzer).
          </p>
        </div>
      );
    } else if (cmdLower === 'projects') {
      resultNode = (
        <div className="space-y-2 text-xs">
          <div className="text-white font-semibold">Active Verified Systems:</div>
          <div className="space-y-1.5">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/[0.04] border border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#818CF8]">{p.title}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{p.categoryLabel}</span>
                </div>
                <div className="text-[11px] text-[#9AA4B2] mt-0.5">{p.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (cmdLower === 'skills' || cmdLower === 'stack') {
      resultNode = (
        <div className="text-xs text-[#9AA4B2] space-y-2">
          <div><strong className="text-white">Machine Learning:</strong> Scikit-Learn, SMOTE, PCA, K-Means, PR-AUC, Logistic Regression</div>
          <div><strong className="text-white">Deep Learning & Vision:</strong> PyTorch, OpenCV, EasyOCR, FaceNet, Error Level Analysis (ELA)</div>
          <div><strong className="text-white">NLP & GenAI:</strong> Sentence Transformers (all-MiniLM-L6-v2), spaCy, Groq Llama 3, Prompt Engineering</div>
          <div><strong className="text-white">Backend & Deploy:</strong> FastAPI, Docker, PostgreSQL, Supabase, Streamlit, Netlify Functions</div>
          <div><strong className="text-white">Foundations:</strong> Python, C++ (DSA & Pointers), SQL, Linear Algebra, Probability</div>
        </div>
      );
    } else if (cmdLower === 'contact') {
      resultNode = (
        <div className="text-xs space-y-1 text-[#9AA4B2]">
          <div>Email: <a href="mailto:abhinavanand9996@gmail.com" className="text-[#6366F1] underline">abhinavanand9996@gmail.com</a></div>
          <div>GitHub: <a href="https://github.com/abhinavbuilds2005" target="_blank" rel="noreferrer" className="text-[#22D3EE] underline">github.com/abhinavbuilds2005</a></div>
          <div>LinkedIn: <a href="https://www.linkedin.com/in/abhinav-anand-865926300" target="_blank" rel="noreferrer" className="text-[#34D399] underline">linkedin.com/in/abhinav-anand-865926300</a></div>
        </div>
      );
    } else if (cmdLower === 'resume') {
      window.open('/Abhinav_Anand_Resume_AIML_Specialized.pdf', '_blank');
      resultNode = <div className="text-emerald-400">Opening Curriculum Vitae (PDF)...</div>;
    } else if (cmdLower === 'nvidia-smi') {
      resultNode = (
        <pre className="text-[10px] leading-tight text-emerald-400 font-mono overflow-x-auto whitespace-pre p-3 bg-[#08090B] rounded-lg border border-white/[0.08]">
{`+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.54.14              Driver Version: 550.54.14      CUDA Version: 12.4     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX 3050 Laptop GPU     On  |   00000000:01:00.0  On |                  N/A |
| 45%   52C    P0             45W /  60W  |    2450MiB /  6144MiB  |    28%       Default |
+-----------------------------------------+------------------------+----------------------+
| Processes:                                                                              |
|  GPU   GI   CI        PID   Type   Process name                              GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A      8412      C   python (PyTorch 2.4.0+cu124)                 2120MiB |
+-----------------------------------------------------------------------------------------+`}
        </pre>
      );
    } else if (cmdLower === 'clear') {
      setOutputs([]);
      setInputVal('');
      return;
    } else if (cmdLower === 'exit') {
      onClose();
      setInputVal('');
      return;
    } else {
      resultNode = (
        <div className="text-red-400 text-xs">
          command not found: {trimmed}. Type <span className="text-white underline">help</span> for valid commands.
        </div>
      );
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        result: resultNode,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${
            isMaximized ? 'max-w-6xl h-[92vh]' : 'max-w-3xl h-[65vh]'
          } rounded-2xl border border-white/10 bg-[#08090B] text-[#F5F7FA] shadow-2xl flex flex-col overflow-hidden font-mono text-xs transition-all`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#0D1014]">
            <div className="flex items-center gap-2 text-[#6366F1] font-semibold text-xs">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span>abhinav@ai-lab:~</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded text-[#9AA4B2] hover:text-white"
                title={isMaximized ? 'Restore size' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-[#9AA4B2] hover:text-white"
                title="Close console (~ key)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Console Output Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-xs">
            {outputs.map((out) => (
              <div key={out.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#6366F1]">
                  <span className="text-emerald-400 font-bold">abhinav@ai-lab:~$</span>
                  <span className="text-white font-medium">{out.command}</span>
                </div>
                <div className="pl-4 border-l border-white/[0.08]">{out.result}</div>
              </div>
            ))}
          </div>

          {/* Prompt Input Line */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0D1014] flex items-center gap-2 font-mono text-xs">
            <span className="text-emerald-400 font-bold whitespace-nowrap">
              abhinav@ai-lab:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or any command..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-[#667085]"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded text-[#9AA4B2] hover:text-white"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
