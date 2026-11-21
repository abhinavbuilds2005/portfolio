import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Eye, X, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

interface CertificateItem {
  id: string;
  badge: string;
  year: string;
  title: string;
  issuer: string;
  credentialId?: string;
  description: string;
  tags: string[];
  pdfUrl?: string;
  imageUrl?: string;
  verifyUrl?: string;
}

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const certificates: CertificateItem[] = [
    {
      id: 'hackerrank-sql',
      badge: '5★ GOLD BADGE',
      year: '2026',
      title: 'HackerRank SQL (Advanced)',
      issuer: 'HackerRank Certified Professional',
      credentialId: 'HackerRank Certified 5-Star Gold Badge',
      description: 'Demonstrated mastery of advanced relational database architecture, recursive CTEs, analytical window functions (RANK, DENSE_RANK, LEAD, LAG), and query optimization.',
      tags: ['SQL (Advanced)', 'Window Functions', 'Query Optimization', 'Relational Schemas'],
      verifyUrl: 'https://www.hackerrank.com/certificates/3e7a4b934211',
      imageUrl: '/certificates/hackerrank_sql_advanced.png',
      pdfUrl: '/certificates/hackerrank_sql_advanced.png',
    },
    {
      id: 'infosys-python',
      badge: 'PROFESSIONAL ACCREDITED',
      year: '2026',
      title: 'Infosys Springboard Python Certification',
      issuer: 'Infosys Springboard',
      credentialId: 'Infosys Springboard Accredited',
      description: 'Certified in Python language internals, algorithmic complexity, object-oriented architecture, exception hierarchies, and modular package organization.',
      tags: ['Python Internals', 'OOP Design', 'Data Structures', 'Infosys Accredited'],
      verifyUrl: 'https://infyspringboard.onwingspan.com/',
      imageUrl: '/certificates/infosys_python_certification.png',
      pdfUrl: '/certificates/infosys_python_certification.png',
    },
    {
      id: 'ibm-python',
      badge: 'IBM VERIFIED',
      year: '2026',
      title: 'Python 101 for Data Science',
      issuer: 'Cognitive Class · Powered by IBM Developer Skills Network',
      credentialId: 'ebedc993179f41149ed2a7fb0c83b612',
      description: 'Rigorous computational evaluation in Python programming for Data Science. Certified in data structures, functions, exception handling, and data processing with Pandas and NumPy.',
      tags: ['Python', 'Data Science', 'IBM Network', 'Pandas', 'NumPy'],
      verifyUrl: 'https://courses.cognitiveclass.ai/certificates/ebedc993179f41149ed2a7fb0c83b612',
      pdfUrl: '/certificates/ibm_python_data_science.pdf',
      imageUrl: '/certificates/ibm_python_data_science.png',
    },
    {
      id: 'c-programming',
      badge: '150-HOUR SPECIALIZATION',
      year: '2026',
      title: 'Computer Programming in C Language',
      issuer: 'Lovely Professional University & iamneo (An NIIT Venture)',
      credentialId: '23dK7aL4bM5Dj3Dk3BIl',
      description: '150 hours of intensive coursework covering memory architecture, pointers, dynamic memory allocation, procedural recursion, and custom data structures.',
      tags: ['C Language', 'Memory Management', 'Pointers', 'LPU Academics'],
      verifyUrl: 'https://lpucolab438.examly.io/certificate/U2FsdGVkX1%2B%2FuDSBq1oWD2CCNJq0i3IvFc%2F92Re%2F%2F6I%3D',
      pdfUrl: '/certificates/c_programming_certificate.pdf',
      imageUrl: '/certificates/c_programming_certificate.png',
    },
    {
      id: 'nptel-llm',
      badge: 'IIT MADRAS',
      year: '2026',
      title: 'Introduction to Large Language Models (LLMs)',
      issuer: 'Indian Institute of Technology Madras · NPTEL',
      credentialId: 'NPTEL26CS171MANUAL0000154',
      description: '12-week rigorous academic specialization covering Transformer architectures, self-attention mechanics, tokenization, pre-training objectives, and fine-tuning.',
      tags: ['Transformers', 'Attention', 'LLM Architectures', 'IIT Madras'],
      pdfUrl: '/certificates/nptel_llm_certificate.pdf',
      imageUrl: '/certificates/nptel_llm_certificate.png',
    },
  ];

  return (
    <section id="certificates" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
          — CERTIFICATES
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
          Verified Accreditations.
        </h2>
        <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
          Click any credential to inspect the verified certificate and evaluation criteria.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            onClick={() => setSelectedCert(cert)}
            className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-indigo-50 text-[#6366F1] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {cert.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">{cert.year}</span>
              </div>

              <h3 className="font-sans font-bold text-lg text-[#111827] group-hover:text-[#6366F1] transition-colors leading-snug">
                {cert.title}
              </h3>

              <div className="text-xs font-medium text-slate-600 mt-1">
                {cert.issuer}
              </div>

              <p className="text-xs text-[#4B5563] mt-3 line-clamp-2 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] group-hover:text-[#6366F1] transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="bg-indigo-50 text-[#6366F1] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedCert.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#111827] mt-2 font-sans">
                  {selectedCert.title}
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">{selectedCert.issuer}</p>
              </div>

              {/* Certificate Image / Preview Frame */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden my-4 relative flex items-center justify-center min-h-[280px]">
                {selectedCert.imageUrl ? (
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[460px] object-contain shadow-xs"
                    onError={(e) => {
                      // Fallback to stylized credential card
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Verification Overlay Watermark */}
                <div className="absolute bottom-3 right-3 bg-[#0B1320]/80 backdrop-blur-md border border-emerald-500/30 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Officially Verified Credential</span>
                </div>
              </div>

              {/* Description & Details */}
              <p className="text-sm text-[#4B5563] leading-relaxed my-4">
                {selectedCert.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-mono text-slate-500">
                  Credential ID: {selectedCert.credentialId || 'Verified Record'}
                </div>

                <div className="flex items-center gap-3">
                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#111827] text-white hover:bg-[#1F2937] px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Verify Online</span>
                    </a>
                  )}

                  {selectedCert.pdfUrl && (
                    <a
                      href={selectedCert.pdfUrl}
                      download
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
