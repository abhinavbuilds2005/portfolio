import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, CheckCircle2, Award, BookOpen, Briefcase, Code2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface EditorialResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditorialResumeModal: React.FC<EditorialResumeModalProps> = ({ isOpen, onClose }) => {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#132532]/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-[#132532]/20 shadow-2xl z-10 my-8 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Top Control Bar */}
          <div className="bg-[#FAF8F5] border-b border-[#132532]/12 px-6 py-4 flex items-center justify-between flex-wrap gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#315CFF]" />
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#132532]">
                ABHINAV ANAND · OFFICIAL RÉSUMÉ (LATEST 2026 EDITION)
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Direct PDF Download */}
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                download="Abhinav_Anand_Resume_AIML_Specialized.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric py-1.5 px-3.5 text-xs flex items-center gap-1.5 no-underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PDF</span>
              </a>

              {/* Print Button */}
              <button
                onClick={() => window.print()}
                className="btn-editorial-outline py-1.5 px-3 text-xs flex items-center gap-1.5 hidden sm:inline-flex cursor-pointer"
                title="Print Résumé"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-[#132532]/60 hover:text-[#132532] hover:bg-[#132532]/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Printable Résumé Sheet */}
          <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto font-sans text-[#132532] space-y-8 bg-white print:p-0">
            {/* Header */}
            <header className="border-b-2 border-[#132532] pb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#132532] font-sans">
                    ABHINAV ANAND
                  </h1>
                  <p className="font-mono text-sm sm:text-base font-bold text-[#315CFF] mt-1">
                    Software Engineer Intern (Python / Backend) | Applied AI & ML
                  </p>
                </div>
              </div>

              {/* Contact Metadata Bar */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 font-mono text-xs text-[#132532]/80 mt-4 pt-3 border-t border-[#132532]/10">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F0784B]" />
                  <span>Jalandhar, Punjab, India</span>
                </span>
                <span className="hidden sm:inline text-[#132532]/30">•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#315CFF]" />
                  <span>+91 9153051907</span>
                </span>
                <span className="hidden sm:inline text-[#132532]/30">•</span>
                <a
                  href="mailto:abhinavanand9996@gmail.com"
                  className="flex items-center gap-1.5 text-[#132532] hover:text-[#315CFF] font-semibold underline underline-offset-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#315CFF]" />
                  <span>abhinavanand9996@gmail.com</span>
                </a>
                <span className="hidden sm:inline text-[#132532]/30">•</span>
                <a
                  href="https://github.com/abhinavbuilds2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#315CFF] font-semibold underline underline-offset-2"
                >
                  GitHub ↗
                </a>
                <span className="hidden sm:inline text-[#132532]/30">•</span>
                <a
                  href="https://www.linkedin.com/in/abhinav-anand-865926300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#315CFF] font-semibold underline underline-offset-2"
                >
                  LinkedIn ↗
                </a>
              </div>
            </header>

            {/* Summary */}
            <section className="space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#315CFF] border-b border-[#132532]/15 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>SUMMARY</span>
              </h2>
              <p className="text-sm sm:text-base text-[#132532]/90 leading-relaxed">
                B.Tech CSE (AI/ML) student building Python backend and applied AI systems with FastAPI, Docker, and end-to-end ML, NLP, and computer-vision pipelines. Built DocuShield, a document-forensics platform with a 90-test automated backend suite, plus two deployed applications, including an AI resume analyzer using Supabase and Groq (Llama 3).
              </p>
            </section>

            {/* Technical Projects */}
            <section className="space-y-6">
              <h2 className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#315CFF] border-b border-[#132532]/15 pb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>TECHNICAL PROJECTS</span>
              </h2>

              {/* Project 1: DocuShield */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-sans font-bold text-base text-[#132532]">
                    DocuShield — Fake ID & Document Forensic Screening System
                  </div>
                  <div className="font-mono text-xs text-[#F0784B] font-semibold">
                    Smart India Hackathon 2026 · PS SIH26188
                  </div>
                </div>
                <div className="font-mono text-xs text-[#315CFF] font-medium">
                  Stack: Python, FastAPI, React (Vite), OpenCV, EasyOCR, Tesseract, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#132532]/85 space-y-1.5 leading-relaxed">
                  <li>
                    Built a multi-stage OCR workflow for 5 identity-document types (passport, visa, national ID, driving licence, permit), combining EasyOCR/Tesseract with ICAO MRZ parsing and checksum validation (including Verhoeff for Aadhaar); served it through FastAPI with a decoupled React (Vite) client.
                  </li>
                  <li>
                    Analyzed potential image tampering using 3 forensic signals—Error Level Analysis, ORB + RANSAC copy-move detection, and EXIF metadata—in a rule-based evidence-fusion engine that produces an explainable authenticity risk score.
                  </li>
                  <li>
                    Added a 90-test automated backend suite covering document verification and tamper-detection workflows.
                  </li>
                </ul>
              </div>

              {/* Project 2: AI Resume ATS Analyzer */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-sans font-bold text-base text-[#132532]">
                    AI Resume ATS Analyzer
                  </div>
                  <div className="font-mono text-xs text-[#132532]/60 font-semibold">
                    Sep 2026 · Live & Open Source
                  </div>
                </div>
                <div className="font-mono text-xs text-[#315CFF] font-medium">
                  Stack: Python, FastAPI, Streamlit, spaCy, Sentence Transformers, Groq API (Llama 3), Supabase, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#132532]/85 space-y-1.5 leading-relaxed">
                  <li>
                    Built a 100-point resume-scoring engine covering formatting, keyword/skill matching, content quality, and ATS parseability, with a FastAPI backend and Streamlit frontend packaged in Docker.
                  </li>
                  <li>
                    Built a skill-context validator that compares listed skills with project evidence using spaCy and Sentence Transformer embeddings; added automated personally identifiable information (PII) screening.
                  </li>
                  <li>
                    Integrated the Groq API (Llama 3) to generate resume-improvement suggestions and used Supabase for authentication and persistent analysis history backed by PostgreSQL.
                  </li>
                </ul>
              </div>

              {/* Project 3: CreditWise */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-sans font-bold text-base text-[#132532]">
                    CreditWise — AI Loan Risk Intelligence System
                  </div>
                  <div className="font-mono text-xs text-[#132532]/60 font-semibold">
                    Mar 2026 · Live & Open Source
                  </div>
                </div>
                <div className="font-mono text-xs text-[#315CFF] font-medium">
                  Stack: Python, Scikit-Learn, Pandas, NumPy, Streamlit
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#132532]/85 space-y-1.5 leading-relaxed">
                  <li>
                    Classified loan applicants into 3 risk tiers (Low/Medium/High), reporting 87.5% accuracy with a Scikit-learn multiclass classifier and Pandas-based feature engineering.
                  </li>
                  <li>
                    Identified and removed a data-leakage issue from the feature set before release, then deployed the model as a Streamlit app for interactive what-if risk scoring.
                  </li>
                </ul>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#315CFF] border-b border-[#132532]/15 pb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>TECHNICAL SKILLS</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="bg-[#FAF8F5] p-3 border border-[#132532]/10 space-y-1">
                  <span className="text-[#315CFF] font-bold block uppercase text-[11px]">LANGUAGES</span>
                  <span className="text-[#132532] font-semibold">Python, C++, JavaScript, SQL</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 border border-[#132532]/10 space-y-1">
                  <span className="text-[#315CFF] font-bold block uppercase text-[11px]">BACKEND & DATABASES</span>
                  <span className="text-[#132532] font-semibold">FastAPI, REST APIs, PostgreSQL, Supabase</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 border border-[#132532]/10 space-y-1">
                  <span className="text-[#315CFF] font-bold block uppercase text-[11px]">MACHINE LEARNING & NLP</span>
                  <span className="text-[#132532] font-semibold">Scikit-learn, Pandas, NumPy, spaCy, Sentence Transformers, Groq Llama 3</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 border border-[#132532]/10 space-y-1">
                  <span className="text-[#315CFF] font-bold block uppercase text-[11px]">COMPUTER VISION & OCR</span>
                  <span className="text-[#132532] font-semibold">OpenCV, EasyOCR, Tesseract, ORB + RANSAC, ELA, ICAO MRZ</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 border border-[#132532]/10 space-y-1 sm:col-span-2">
                  <span className="text-[#315CFF] font-bold block uppercase text-[11px]">FRONTEND, DEVOPS & TOOLS</span>
                  <span className="text-[#132532] font-semibold">React (Vite), Streamlit, Docker, Git, GitHub, Linux Shell</span>
                </div>
              </div>
            </section>

            {/* Certifications & Hackathons */}
            <section className="space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#315CFF] border-b border-[#132532]/15 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>CERTIFICATIONS & HACKATHONS</span>
              </h2>
              <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#132532]/85 space-y-1">
                <li>
                  <strong>NPTEL & IIT Madras:</strong> Introduction to Large Language Models (LLMs) · Roll: NPTEL26CS171MANUAL0000154 (12-Week Intensive, 4 Credits).
                </li>
                <li>
                  <strong>Smart India Hackathon 2026:</strong> Built DocuShield for Problem Statement SIH26188 (Qualified).
                </li>
                <li>
                  <strong>HackerRank:</strong> SQL (Advanced) Certified (5★ Gold Badge).
                </li>
                <li>
                  <strong>Infosys Springboard:</strong> Python Certified.
                </li>
              </ul>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-widest font-extrabold text-[#315CFF] border-b border-[#132532]/15 pb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>EDUCATION</span>
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <div className="font-sans font-bold text-base text-[#132532]">
                    Lovely Professional University, Punjab, India
                  </div>
                  <div className="text-xs sm:text-sm text-[#132532]/80">
                    B.Tech in Computer Science and Engineering (AI/ML Specialization)
                  </div>
                </div>
                <div className="font-mono text-xs text-[#315CFF] font-bold">
                  Aug 2025 – Aug 2029
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Actions Footer */}
          <div className="bg-[#FAF8F5] border-t border-[#132532]/12 px-6 py-4 flex items-center justify-between flex-wrap gap-4 flex-shrink-0">
            <span className="font-mono text-xs text-[#132532]/60">
              Verified Candidate · Available for AI/ML Internships
            </span>
            <div className="flex items-center gap-3">
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                download="Abhinav_Anand_Resume_AIML_Specialized.pdf"
                className="btn-editorial-primary py-2 px-4 text-xs flex items-center gap-2 no-underline"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>DOWNLOAD OFFICIAL PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

