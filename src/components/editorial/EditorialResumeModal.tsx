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
                AI/ML Intern | Python, NLP, Computer Vision
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
                  <a href="https://coderabhinavanand.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">
                    coderabhinavanand.netlify.app
                  </a>
                  <span>|</span>
                  <a href="https://github.com/abhinavbuilds2005" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">
                    github.com/abhinavbuilds2005
                  </a>
                  <span>|</span>
                  <a href="https://www.linkedin.com/in/abhinav-anand-865926300" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">
                    linkedin.com/in/abhinav-anand-865926300
                  </a>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                Summary
              </h2>
              <p className="text-xs sm:text-sm text-[#1f2937] leading-relaxed">
                B.Tech CSE (AI/ML) student building end-to-end machine learning, NLP, and computer-vision systems in Python. Fine-tuned a Sentence Transformer for resume–JD matching (70% lower MAE), built DocuShield, an OCR and YOLO-based document-forensics pipeline for Smart India Hackathon 2026, and shipped a loan-approval classifier. Comfortable taking models from data cleaning to FastAPI services and Docker deployment.
              </p>
            </section>

            {/* Education */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                Education
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
                B.Tech, Computer Science and Engineering (AI/ML)
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-4">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                Projects
              </h2>

              {/* Project 1: AI Resume ATS Analyzer */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    AI Resume ATS Analyzer &nbsp;|&nbsp; Sep 2026
                  </div>
                  <div className="text-xs space-x-1.5 font-semibold">
                    <a href="https://ats-resume-analyzer.onrender.com" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">Live</a>
                    <span>|</span>
                    <a href="https://github.com/abhinavbuilds2005/ATS-RESUME-ANALYZER" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">GitHub</a>
                  </div>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Python, FastAPI, spaCy, Sentence Transformers, Groq (Llama 3.1), Supabase, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
                  <li>
                    Fine-tuned <span className="font-mono text-[11px] bg-[#f1f5f9] px-1 py-0.5 rounded">all-mpnet-base-v2</span> with cosine-similarity loss on 266 resume–job-description pairs (186/40/40 split), cutting test MAE from 0.156 to 0.047 (70% lower) versus the base model.
                  </li>
                  <li>
                    Built a 100-point ATS scoring engine (formatting, skills, content quality, skill validation, parseability) using spaCy and chunked semantic embeddings, with PII screening and an LLM-feedback layer (Groq) that falls back to rule-based output.
                  </li>
                  <li>
                    Shipped a FastAPI backend with Supabase JWT auth and per-user history, a 75-test pytest suite, and a Dockerized deployment on Render.
                  </li>
                </ul>
              </div>

              {/* Project 2: DocuShield */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    DocuShield – Fake ID and Document Forensic Screening &nbsp;|&nbsp; Smart India Hackathon 2026
                  </div>
                  <div className="text-xs space-x-1.5 font-semibold">
                    <a href="https://docushield-ai.onrender.com" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">Live</a>
                    <span>|</span>
                    <a href="https://github.com/abhinavbuilds2005/DocuShield" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">GitHub</a>
                  </div>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Python, FastAPI, OpenCV, EasyOCR, YOLO (Ultralytics), React, Docker
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
                  <li>
                    Built an OCR and computer-vision pipeline: document classification, YOLO field detectors for Aadhaar, PAN, and Driving Licence, EasyOCR/Tesseract extraction, and ICAO MRZ and Verhoeff checksum validation.
                  </li>
                  <li>
                    Detected tampering with Error Level Analysis, ORB + RANSAC copy-move detection, and EXIF checks, fused into an explainable risk score.
                  </li>
                  <li>
                    Evaluated on a frozen, SHA-256-verified synthetic test set of 150 documents: 96% 5-class classification accuracy and 0 false positives on 100 clean cards; 21% of hard cases routed to manual review.
                  </li>
                  <li>
                    Backed by a 219-test automated pytest suite covering OCR, MRZ, forensics, validation, and API security.
                  </li>
                </ul>
              </div>

              {/* Project 3: CreditWise */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-bold text-xs sm:text-sm text-[#111827]">
                    CreditWise – Loan Approval Prediction &nbsp;|&nbsp; Mar 2026
                  </div>
                  <div className="text-xs space-x-1.5 font-semibold">
                    <a href="https://credishield-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">Live</a>
                    <span>|</span>
                    <a href="https://github.com/abhinavbuilds2005/credit-wise-loan-system" target="_blank" rel="noopener noreferrer" className="text-[#315CFF] hover:underline">GitHub</a>
                  </div>
                </div>
                <div className="text-xs italic text-[#4b5563]">
                  Python, Scikit-learn, Pandas, NumPy, JavaScript, Chart.js
                </div>
                <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1 leading-relaxed">
                  <li>
                    Built a binary loan-approval classifier on a 1,000-record applicant dataset: imputation, one-hot and label encoding, scaling, and squared DTI and credit-score features.
                  </li>
                  <li>
                    Compared several scikit-learn classifiers on a 20% hold-out; the deployed Logistic Regression reaches 86.5% accuracy, 78% precision, 77% recall (F1 0.78).
                  </li>
                  <li>
                    Exported the model and encoders with joblib and ported preprocessing to a client-side JavaScript web app for in-browser predictions.
                  </li>
                </ul>
              </div>
            </section>

            {/* Technical Skills */}
            <section className="space-y-2">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                Technical Skills
              </h2>

              <div className="grid grid-cols-1 gap-1.5 text-xs sm:text-sm">
                <div>
                  <strong className="text-[#111827]">Languages:</strong> <span className="text-[#374151]">Python, C++, SQL, JavaScript</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Machine Learning:</strong> <span className="text-[#374151]">Scikit-learn, PyTorch (via Sentence Transformers fine-tuning, Ultralytics YOLO), Pandas, NumPy, Feature Engineering, Model Evaluation, Matplotlib, Seaborn</span>
                </div>
                <div>
                  <strong className="text-[#111827]">NLP and LLMs:</strong> <span className="text-[#374151]">spaCy, Sentence Transformers (embedding fine-tuning), Groq / Llama 3 API</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Computer Vision:</strong> <span className="text-[#374151]">OpenCV, YOLO, EasyOCR, Tesseract, ORB + RANSAC, Error Level Analysis</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Backend and Data:</strong> <span className="text-[#374151]">FastAPI, REST APIs, PostgreSQL, Supabase, Streamlit, React</span>
                </div>
                <div>
                  <strong className="text-[#111827]">Tools:</strong> <span className="text-[#374151]">Git, GitHub, Docker, Jupyter, pytest</span>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="space-y-1.5">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#1f4e79] border-b border-[#cbd5e1] pb-1">
                Certifications
              </h2>
              <ul className="list-disc list-outside ml-5 text-xs sm:text-sm text-[#1f2937] space-y-1">
                <li>HackerRank – SQL (Advanced)</li>
                <li>NPTEL (IIT Madras) – Introduction to Large Language Models (LLMs), 12-week course, Jul–Oct 2026</li>
              </ul>
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

