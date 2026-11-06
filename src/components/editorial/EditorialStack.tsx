import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface SkillRow {
  left: { name: string; role: string; details?: string };
  right: { name: string; role: string; details?: string };
}

export const EditorialStack: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillRows: SkillRow[] = [
    {
      left: {
        name: 'Python',
        role: 'PRIMARY LANGUAGE',
        details: 'Core language for tensor computations, scientific computing, PyTorch architectures, and asynchronous microservices across all 5 projects.'
      },
      right: {
        name: 'PyTorch',
        role: 'DEEP LEARNING',
        details: 'Neural network training loops, autograd differentiation graphs, tensor operations, and model quantization.'
      }
    },
    {
      left: {
        name: 'Scikit-learn',
        role: 'MACHINE LEARNING',
        details: 'Supervised classifiers, regularized estimators, pipeline transformers, SMOTE class imbalance mitigation, and cross-validation.'
      },
      right: {
        name: 'OpenCV',
        role: 'COMPUTER VISION',
        details: 'Perspective rectification, Error Level Analysis (ELA) compression discrepancy, facial landmark tracking, and image preprocessing.'
      }
    },
    {
      left: {
        name: 'FastAPI',
        role: 'BACKEND & APIS',
        details: 'Asynchronous REST microservices, Pydantic type validation, ONNX Runtime model inference serving with sub-45ms latency.'
      },
      right: {
        name: 'React',
        role: 'FRONTEND',
        details: 'Modern component-driven web interfaces, state management, interactive canvas tools, and responsive typography.'
      }
    },
    {
      left: {
        name: 'SQL / PostgreSQL',
        role: 'DATA',
        details: 'Relational schema design, 3NF normalization, ACID transaction guarantees, index tuning, and Supabase integration.'
      },
      right: {
        name: 'Docker',
        role: 'DEPLOYMENT',
        details: 'Reproducible multi-stage container builds, environment isolation, and production containerized deployments.'
      }
    },
    {
      left: {
        name: 'Git & GitHub',
        role: 'WORKFLOW',
        details: 'Semantic versioning, clean commit hygiene, branch isolation, CI/CD automated verification, and repository management.'
      },
      right: {
        name: 'Pandas / NumPy',
        role: 'DATA TOOLING',
        details: 'Vectorized tensor operations, exploratory data analysis, memory-efficient dataframes, and matrix factorizations.'
      }
    },
    {
      left: {
        name: 'LangChain',
        role: 'LLM APPLICATIONS',
        details: 'Prompt engineering chains, rolling chunk sentence embeddings, semantic search, and deterministic fallback controllers.'
      },
      right: {
        name: 'C++',
        role: 'PROBLEM SOLVING',
        details: 'Low-level memory management, pointers, dynamic programming, and asymptotic algorithmic complexity reduction verified on LeetCode.'
      }
    }
  ];

  return (
    <section id="stack" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Top Header Row with Kicker, Subhead, and Annotation */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            03 / TOOLS OF THE TRADE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans mb-4">
            My working vocabulary.
          </h2>
          <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/60 space-y-0.5">
            <div>A PRACTICAL TOOLKIT</div>
            <div>FOR BUILDING AND SHIPPING</div>
            <div>INTELLIGENT PRODUCTS.</div>
          </div>
        </div>

        {/* Right Editorial Note */}
        <div className="font-mono text-xs uppercase tracking-widest text-[#132532]/50 text-left sm:text-right pt-2 space-y-0.5">
          <div>ALWAYS LEARNING</div>
          <div>NEVER COLLECTING BADGES</div>
        </div>
      </div>

      {/* Two-Column Editorial Table with Hairline Horizontal Dividers (Matching Image 5) */}
      <div className="mt-12 border-t border-[#132532]/15">
        {skillRows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-2 border-b border-[#132532]/15 divide-y md:divide-y-0 md:divide-x divide-[#132532]/15"
          >
            {/* Left Column Item */}
            <div
              onClick={() => setSelectedSkill(selectedSkill === row.left.name ? null : row.left.name)}
              className="py-6 sm:py-7 px-4 sm:px-8 group hover:bg-[#FAF8F5] transition-colors cursor-pointer select-none"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#132532] font-sans group-hover:text-[#315CFF] transition-colors">
                  {row.left.name}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#132532]/55 font-medium">
                  {row.left.role}
                </span>
              </div>
              {selectedSkill === row.left.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-xs sm:text-sm text-[#132532]/75 leading-relaxed font-sans border-t border-[#132532]/10 pt-2"
                >
                  {row.left.details}
                </motion.p>
              )}
            </div>

            {/* Right Column Item */}
            <div
              onClick={() => setSelectedSkill(selectedSkill === row.right.name ? null : row.right.name)}
              className="py-6 sm:py-7 px-4 sm:px-8 group hover:bg-[#FAF8F5] transition-colors cursor-pointer select-none"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#132532] font-sans group-hover:text-[#315CFF] transition-colors">
                  {row.right.name}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#132532]/55 font-medium">
                  {row.right.role}
                </span>
              </div>
              {selectedSkill === row.right.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-xs sm:text-sm text-[#132532]/75 leading-relaxed font-sans border-t border-[#132532]/10 pt-2"
                >
                  {row.right.details}
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Hint */}
      <div className="mt-6 text-right font-mono text-[11px] text-[#132532]/45">
        CLICK ANY ENTRY TO INSPECT PRODUCTION USAGE
      </div>
    </section>
  );
};

