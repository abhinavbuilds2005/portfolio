import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Eye, 
  X, 
  Database, 
  Terminal, 
  Cpu, 
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CertificateItem {
  id: string;
  badge: string;
  badgeColor: string;
  year: string;
  title: string;
  issuer: string;
  credentialId?: string;
  subtitle: string;
  description: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  pdfUrl?: string;
  imageUrl?: string;
  verifyUrl?: string;
  isFlagship?: boolean;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'nptel-llm',
    isFlagship: true,
    badge: 'IIT MADRAS & NPTEL',
    badgeColor: '#315CFF',
    year: '2026',
    title: 'Introduction to Large Language Models (LLMs)',
    issuer: 'Indian Institute of Technology Madras · NPTEL (MoE Govt. of India)',
    credentialId: 'NPTEL26CS171MANUAL0000154',
    subtitle: '12-Week Intensive IIT Madras Specialization (Jul - Oct 2026)',
    description:
      'Rigorous academic certification covering Transformer architectures, self-attention mechanics, tokenization, pre-training objectives, fine-tuning methodologies, context windows, and modern LLM inference systems. Verified through continuous proctored examination and computational assignments.',
    metrics: [
      { label: 'COHORT SIZE', value: '11,857 Candidates' },
      { label: 'ASSIGNMENTS', value: '23.16 / 25' },
      { label: 'PROCTORED EXAM', value: '33.75 / 75' },
      { label: 'ACADEMIC CREDITS', value: '4 Credits' },
    ],
    tags: ['Transformers', 'Attention Mechanisms', 'LLM Architectures', 'Tokenization', 'Fine-Tuning', 'IIT Madras'],
    pdfUrl: '/certificates/nptel_llm_certificate.pdf',
    imageUrl: '/certificates/nptel_llm_certificate.png',
  },
  {
    id: 'ibm-python',
    badge: 'IBM & COGNITIVE CLASS',
    badgeColor: '#0F62FE',
    year: '2026',
    title: 'Python 101 for Data Science',
    issuer: 'Cognitive Class · Powered by IBM Developer Skills Network',
    credentialId: 'ebedc993179f41149ed2a7fb0c83b612',
    subtitle: 'Course PY0101EN, provided by IBM (June 20, 2026)',
    description:
      'Rigorous computational evaluation in Python programming for Data Science. Certified in data structures (lists, tuples, dictionaries, sets), procedural logic, functions, exception handling, and data processing libraries including Pandas and NumPy.',
    metrics: [
      { label: 'COURSE CODE', value: 'PY0101EN' },
      { label: 'PROVIDER', value: 'IBM Developer Network' },
      { label: 'VERIFICATION', value: 'Passing Grade' },
      { label: 'DATE', value: 'June 20, 2026' },
    ],
    tags: ['Python', 'Data Science', 'IBM', 'Pandas', 'NumPy', 'Data Analysis'],
    verifyUrl: 'https://courses.cognitiveclass.ai/certificates/ebedc993179f41149ed2a7fb0c83b612',
    pdfUrl: '/certificates/ibm_python_data_science.pdf',
    imageUrl: '/certificates/ibm_python_data_science.png',
  },
  {
    id: 'hackerrank-sql',
    badge: 'GOLD BADGE · 5★',
    badgeColor: '#2563EB',
    year: 'VERIFIED',
    title: 'HackerRank SQL (Advanced)',
    issuer: 'HackerRank Certified Professional',
    credentialId: 'HackerRank Certified 5-Star Gold Badge',
    subtitle: 'Complex Relational Modeling & Query Plan Optimization',
    description:
      'Demonstrated mastery of advanced relational database architecture, recursive Common Table Expressions (CTEs), analytical window functions (RANK, DENSE_RANK, LEAD, LAG), query execution plan optimization, and multi-table integrity indexing.',
    metrics: [
      { label: 'PROFICIENCY', value: '5-Star Gold' },
      { label: 'FOCUS', value: 'Recursive CTEs & Windowing' },
      { label: 'OPTIMIZATION', value: 'Query Plans & Indexing' },
    ],
    tags: ['SQL', 'PostgreSQL', 'Window Functions', 'Query Optimization', 'Relational Schema'],
    verifyUrl: 'https://www.hackerrank.com/certificates/',
    imageUrl: '/certificates/hackerrank_sql_advanced.png',
  },
  {
    id: 'infosys-python',
    badge: 'PROFESSIONAL',
    badgeColor: '#10B981',
    year: 'VERIFIED',
    title: 'Infosys Springboard Python',
    issuer: 'Infosys Springboard Certification',
    credentialId: 'Infosys Springboard Accredited',
    subtitle: 'Object-Oriented Architecture & Algorithmic Systems',
    description:
      'Rigorous evaluation on Python language internals, object-oriented software engineering paradigms, memory references, asymptotic runtime complexity analysis, and defensive error-handling architectures.',
    metrics: [
      { label: 'DISCIPLINE', value: 'OOP & Internals' },
      { label: 'COMPLEXITY', value: 'Asymptotic O(N)' },
      { label: 'STATUS', value: 'Springboard Certified' },
    ],
    tags: ['Python', 'OOP Design', 'Data Structures', 'Algorithms', 'Defensive Programming'],
    imageUrl: '/certificates/infosys_python_certification.png',
  },
  {
    id: 'sih-2026',
    badge: 'NATIONAL QUALIFIER',
    badgeColor: '#F0784B',
    year: '2026',
    title: 'Smart India Hackathon 2026',
    issuer: 'Ministry of Education & AICTE Innovation Cell, Govt. of India',
    credentialId: 'Problem Statement: SIH26188',
    subtitle: 'DocuShield AI — Multimodal Forensic Document Screening System',
    description:
      'Qualified for Smart India Hackathon with DocuShield AI, an automated forensic pipeline detecting document tampering across 5 ID formats using Error Level Analysis (ELA), ORB copy-move homography, ICAO Doc 9303 MRZ parsing, and Verhoeff D5 cryptography.',
    metrics: [
      { label: 'PROBLEM STATEMENT', value: 'SIH26188' },
      { label: 'AUTOMATED TESTS', value: '90 Tests · 100%' },
      { label: 'LATENCY BENCHMARK', value: '<42ms Inference' },
    ],
    tags: ['Computer Vision', 'Image Forensics', 'Error Level Analysis', 'Verhoeff D5', 'FastAPI'],
    imageUrl: '/certificates/sih_2026_qualification.png',
  },
];

export const EditorialCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section id="certificates" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10 scroll-mt-24">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
            04 / VERIFIED ACCREDITATIONS & HONORS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans leading-[1.05]">
            Benchmarked Competency.
          </h2>
        </div>

        <div className="font-mono text-xs text-[#132532]/70 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold uppercase tracking-wider">
            {CERTIFICATES.length} Officially Accredited Credentials
          </span>
        </div>
      </div>

      {/* Flagship Hero Card: IIT Madras & NPTEL Large Language Models */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white border-2 border-[#315CFF] shadow-[6px_6px_0px_#132532] p-6 sm:p-10 mb-10 relative overflow-hidden group"
      >
        {/* Top Flagship Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#132532]/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold tracking-widest uppercase bg-[#315CFF] text-white px-3 py-1 shadow-sm">
              ★ FLAGSHIP SPECIALIZATION
            </span>
            <span className="font-mono text-xs font-bold text-[#F0784B] bg-[#F0784B]/10 px-2.5 py-1 border border-[#F0784B]/20">
              IIT MADRAS & NPTEL
            </span>
          </div>
          <div className="font-mono text-xs text-[#132532]/60 font-semibold">
            ROLL NO: <span className="text-[#132532] font-bold">NPTEL26CS171MANUAL0000154</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details & Rigor (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="font-mono text-xs text-[#315CFF] font-semibold tracking-wide uppercase">
              JUL - OCT 2026 · 12-WEEK RIGOROUS IITM COURSE · 4 ACADEMIC CREDITS
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#132532] font-sans tracking-tight leading-tight">
              Introduction to Large Language Models (LLMs)
            </h3>
            <p className="font-mono text-xs text-[#132532]/75 font-semibold">
              Indian Institute of Technology Madras · Ministry of Education, Govt. of India · SWAYAM & Skill India
            </p>
            <p className="text-sm sm:text-base text-[#132532] text-opacity-85 leading-relaxed pt-1">
              {CERTIFICATES[0].description}
            </p>

            {/* Score & Telemetry Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {CERTIFICATES[0].metrics?.map((m) => (
                <div key={m.label} className="bg-[#FAF8F5] border border-[#132532]/15 p-2.5">
                  <div className="font-mono text-[9px] text-[#132532]/60 uppercase font-semibold">
                    {m.label}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#315CFF] mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => setSelectedCert(CERTIFICATES[0])}
                className="bg-[#315CFF] text-white hover:bg-[#2047E5] font-mono text-xs font-bold px-4 py-2.5 flex items-center gap-2 shadow-[2px_2px_0px_#132532] transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT CERTIFICATE</span>
              </button>

              <a
                href="/certificates/nptel_llm_certificate.pdf"
                download="Abhinav_Anand_NPTEL_LLM_Certificate.pdf"
                className="bg-[#FAF8F5] hover:bg-white text-[#132532] border border-[#132532]/25 font-mono text-xs font-semibold px-4 py-2.5 flex items-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-[#315CFF]" />
                <span>DOWNLOAD OFFICIAL PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Certificate Preview Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setSelectedCert(CERTIFICATES[0])}
              className="relative cursor-pointer group/img border-2 border-[#132532]/20 shadow-md overflow-hidden bg-white hover:border-[#315CFF] transition-all"
              title="Click to view full certificate"
            >
              <img
                src="/certificates/nptel_llm_certificate.png"
                alt="NPTEL IIT Madras Large Language Models Certificate - Abhinav Anand"
                className="w-full h-auto object-cover group-hover/img:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#132532]/0 group-hover/img:bg-[#132532]/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover/img:opacity-100 bg-[#132532] text-white font-mono text-xs font-bold px-3 py-1.5 shadow-lg flex items-center gap-1.5 transition-opacity duration-200">
                  <Eye className="w-3.5 h-3.5 text-[#315CFF]" />
                  <span>CLICK TO EXPAND</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Secondary Credential Cards Grid (2x2 on large screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATES.slice(1).map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedCert(cert)}
            className="bg-[#FAF8F5] border border-[#132532]/15 p-6 flex flex-col justify-between hover:border-[#315CFF] hover:shadow-[4px_4px_0px_#315CFF] transition-all cursor-pointer group"
          >
            <div>
              {/* Badge & Year */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border"
                  style={{
                    backgroundColor: `${cert.badgeColor}15`,
                    color: cert.badgeColor,
                    borderColor: `${cert.badgeColor}30`,
                  }}
                >
                  {cert.badge}
                </span>
                <span className="font-mono text-xs text-[#132532]/50 font-bold">{cert.year}</span>
              </div>

              {/* Title & Subtitle */}
              <h4 className="text-xl font-bold text-[#132532] font-sans group-hover:text-[#315CFF] transition-colors mb-1">
                {cert.title}
              </h4>
              <p className="font-mono text-xs text-[#315CFF] font-semibold mb-3">
                {cert.subtitle}
              </p>

              <p className="text-xs text-[#132532]/75 leading-relaxed mb-4">
                {cert.description}
              </p>

              {/* Metrics */}
              {cert.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 pt-2 border-t border-[#132532]/10 font-mono text-[10px]">
                  {cert.metrics.map((m) => (
                    <div key={m.label} className="bg-white border border-[#132532]/10 p-2">
                      <div className="text-[#132532]/50 uppercase text-[9px]">{m.label}</div>
                      <div className="font-bold text-[#132532] mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Inspect Button & Authority */}
            <div className="pt-4 border-t border-[#132532]/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#132532]/65 text-[11px] font-medium">{cert.issuer}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCert(cert);
                }}
                className="bg-[#132532] text-white hover:bg-[#315CFF] px-3 py-1.5 font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>INSPECT</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#132532]/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-4xl bg-white border-2 border-[#132532] shadow-2xl rounded-none flex flex-col max-h-[92vh] overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#132532] text-white select-none">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <Award className="w-4 h-4 text-[#F0784B]" />
                  <span className="font-bold tracking-wider uppercase">
                    {selectedCert.title} · {selectedCert.badge}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Close certificate modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                {selectedCert.imageUrl && (
                  <div className="border border-[#132532]/20 shadow-md overflow-hidden bg-white">
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="w-full h-auto object-contain max-h-[60vh] mx-auto"
                    />
                  </div>
                )}

                <div className="bg-[#FAF8F5] border border-[#132532]/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <div className="font-bold text-[#132532] text-sm">{selectedCert.issuer}</div>
                    <div className="text-[#132532]/65 text-[11px] mt-0.5">
                      {selectedCert.credentialId ? `ID / Roll: ${selectedCert.credentialId}` : 'Verified Competency'}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {selectedCert.verifyUrl && (
                      <a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-[#FAF8F5] text-[#315CFF] border border-[#315CFF]/30 font-mono text-xs font-bold py-2 px-3.5 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>VERIFY ONLINE</span>
                      </a>
                    )}

                    {selectedCert.pdfUrl && (
                      <a
                        href={selectedCert.pdfUrl}
                        download="Abhinav_Anand_Certificate.pdf"
                        className="btn-editorial-primary text-xs flex items-center gap-2 py-2 px-4 whitespace-nowrap"
                      >
                        <Download className="w-4 h-4 text-white" />
                        <span>DOWNLOAD OFFICIAL PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
