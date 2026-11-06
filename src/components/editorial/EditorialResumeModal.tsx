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
          <div className="p-8 sm:p-12 overflow-y-auto font-sans text-[#111827] space-y-6 bg-white print:p-0">
            {/* Header */}
            <header className="text-center border-b-2 border-[#132532] pb-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#132532] font-sans">
                ABHINAV ANAND
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#111827] mt-1">
                Software Engineer Intern (Python / Backend) | Applied AI & ML
              </p>

              {/* Contact Metadata */}
              <div className="text-xs sm:text-sm text-[#4b5563] mt-2 space-y-1">
                <div>
                  Jalandhar, Punjab, India &nbsp;|&nbsp; +91 9153051907 &nbsp;|&nbsp;{' '}
                  <a href="mailto:abhinavanand9996@gmail.com" className="text-[#132532] font-medium hover:underline">
                    abhinavanand9996@gmail.com
                  </a>
                </div>
                <div className="space-x-3 text-xs font-semibold">
                  <a href="https://coderabhinavanand.netlify.app/" className="text-[#315CFF] hover:underline">
                    Portfolio
                  </a>
                  <span>|</span>
                  <a href="https://github.com/abhinavbuilds2005" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">
                    GitHub
                  </a>
                  <span>|</span>
                  <a href="https://www.linkedin.com/in/abhinav-anand-865926300" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-[#1f2937] leading-relaxed">
                B.Tech CSE (AI/ML) student building Python backend and applied AI systems with FastAPI, Docker, and end-to-end ML, NLP, and computer-vision pipelines. Built DocuShield, a document-forensics platform with a 90-test automated backend suite, plus two deployed applications, including an AI resume analyzer using Supabase and Groq (Llama 3).
              </p>
            </section>

            {/* Technical Projects */}
            <section className="space-y-4">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                TECHNICAL PROJECTS
              </h2>

              {/* Project 1: DocuShield */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    DocuShield — Fake ID & Document Forensic Screening System &nbsp;|&nbsp; Smart India Hackathon 2026, PS SIH26188
                  </div>
                  <a href="https://github.com/abhinavbuilds2005/DocuShield" target="_blank" rel="noopener noreferrer" className="text-xs text-[#315CFF] font-semibold hover:underline">
                    GitHub
                  </a>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Stack: Python, FastAPI, React (Vite), OpenCV, EasyOCR, Tesseract, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
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
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    AI Resume ATS Analyzer &nbsp;|&nbsp; Sep 2026
                  </div>
                  <div className="text-xs space-x-1.5 font-semibold">
                    <a href="https://resumeatsanalyzer.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">Live</a>
                    <span>|</span>
                    <a href="https://github.com/abhinavbuilds2005/ai-resume-ats-analyzer" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">GitHub</a>
                  </div>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Stack: Python, FastAPI, Streamlit, spaCy, Sentence Transformers, Groq API (Llama 3), Supabase, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
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
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    CreditWise — AI Loan Risk Intelligence System &nbsp;|&nbsp; Mar 2026
                  </div>
                  <div className="text-xs space-x-1.5 font-semibold">
                    <a href="https://creditwise-intelligence.streamlit.app/" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">Live</a>
                    <span>|</span>
                    <a href="https://github.com/abhinavbuilds2005/CreditWise" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">GitHub</a>
                  </div>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Stack: Python, Scikit-Learn, Pandas, NumPy, Streamlit
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
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
            <section className="space-y-2">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                TECHNICAL SKILLS
              </h2>

              <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
                <div>
                  <strong className="text-[#111827]">Languages:</strong> <span className="text-[#374151]">Python, C++, JavaScript, SQL</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Backend & Databases:</strong> <span className="text-[#374151]">FastAPI, REST APIs, PostgreSQL, Supabase (Auth, Postgres)</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Frontend & App Frameworks:</strong> <span className="text-[#374151]">React (Vite), Streamlit</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Machine Learning & NLP:</strong> <span className="text-[#374151]">Scikit-learn, Pandas, NumPy, spaCy, Sentence Transformers, Groq/Llama 3 APIs, Feature Engineering</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Computer Vision & OCR:</strong> <span className="text-[#374151]">OpenCV, EasyOCR, Tesseract, ORB + RANSAC, Error Level Analysis, ICAO MRZ Parsing</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Tools & DevOps:</strong> <span className="text-[#374151]">Docker, Git, GitHub</span>
                </div>
              </div>
            </section>

            {/* Certifications & Hackathons */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                CERTIFICATIONS & HACKATHONS
              </h2>
              <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1">
                <li>Smart India Hackathon 2026 — built DocuShield for problem statement SIH26188</li>
                <li>HackerRank — SQL (Advanced)</li>
                <li>Infosys Springboard — Python</li>
              </ul>
            </section>

            {/* Education */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                EDUCATION
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="font-bold text-xs sm:text-sm text-[#111827]">
                  Lovely Professional University, Punjab, India
                </div>
                <div className="text-xs sm:text-sm text-[#4b5563] font-semibold">
                  Aug 2025 – Aug 2029
                </div>
              </div>
              <div className="text-xs sm:text-sm text-[#374151]">
                B.Tech, Computer Science (AI/ML)
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

