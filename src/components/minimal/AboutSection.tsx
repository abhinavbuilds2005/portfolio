import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      label: 'Automated Tests',
      value: '90+',
      detail: 'Comprehensive test suite covering forensic tamper-detection and checksum validation.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      label: 'Inference Latency',
      value: '<42ms',
      detail: 'Benchmarked CPU/GPU runtime with optimized ONNX pipelines and decoupled FastAPI.',
      icon: <Zap className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      label: 'Verified Categories',
      value: '5 ID Types',
      detail: 'Passports, Visas, Indian Aadhaar, Driving Licences and Travel Permits.',
      icon: <ShieldCheck className="w-5 h-5 text-[#6366F1]" />,
    },
    {
      label: 'SIH 2026 Target',
      value: 'SIH26188',
      detail: 'Smart India Hackathon problem statement for national document forensic security.',
      icon: <GraduationCap className="w-5 h-5 text-[#6366F1]" />,
    },
  ];

  return (
    <section id="about" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
          — ABOUT ME
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
          The Mind Behind the Systems.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Narrative (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#4B5563] leading-relaxed">
          <p className="text-lg text-[#111827] font-medium leading-relaxed">
            I'm Abhinav Anand, an AI/ML engineering student at Lovely Professional University. I design and build production-grade machine learning pipelines, forensic document screening systems, and deterministic cryptographic checksum algorithms.
          </p>

          <p>
            My engineering work bridges the gap between statistical AI models and deterministic reliability. While traditional classifiers can be bypassed by graphic manipulation, my architectures combine <strong className="text-[#111827] font-semibold">Error Level Analysis (ELA)</strong>, <strong className="text-[#111827] font-semibold">ORB copy-move homography</strong>, and mathematical check digits like <strong className="text-[#111827] font-semibold">Verhoeff D5</strong> and <strong className="text-[#111827] font-semibold">ICAO 7-3-1</strong> to produce explainable audit scores.
          </p>

          <p>
            When I'm not training models or optimizing inference kernels, I solve algorithmic challenges on LeetCode (5★ Gold Badge in SQL on HackerRank) and participate in national hackathons like Smart India Hackathon 2026.
          </p>

          {/* Education Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs mt-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6366F1] shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#6366F1] uppercase tracking-wider">
                Education · 2025 – 2029
              </div>
              <h3 className="font-sans font-bold text-base text-[#111827] mt-1">
                Lovely Professional University (LPU)
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                Bachelor of Technology in Computer Science and Engineering (Specialization: AI & Machine Learning)
              </p>
              <div className="text-xs font-mono text-slate-500 mt-2">
                Jalandhar, Punjab, India
              </div>
            </div>
          </div>
        </div>

        {/* Right Metric Cards (Cols 8-12) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 bg-indigo-50 rounded-lg">{item.icon}</span>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>

              <div>
                <div className="font-sans font-extrabold text-2xl text-[#111827] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-[#1F2937] mt-1">
                  {item.label}
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1.5 leading-snug">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
