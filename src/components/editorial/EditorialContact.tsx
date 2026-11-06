import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Copy, ExternalLink, Github, Linkedin, Code, Send, Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const EditorialContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'abhinavanand2005.cse@gmail.com';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '' // Honeypot spam field
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam trap
    if (formData.botcheck) {
      setFormStatus('success');
      setStatusMsg('Transmission accepted.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setStatusMsg('Please provide your name, contact email, and a message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormStatus('error');
      setStatusMsg('Please enter a valid work or contact email address.');
      return;
    }

    setFormStatus('loading');
    setStatusMsg('');

    try {
      // 1. Try local Netlify serverless function
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      if (res.ok) {
        setFormStatus('success');
        setStatusMsg('Transmission successful! Your message has been delivered directly to abhinavanand2005.cse@gmail.com.');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
      } else {
        // 2. Direct fallback to Web3Forms API
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            subject: `Recruiter Transmission from Portfolio: ${formData.name.trim()}`
          })
        });

        if (web3Res.ok) {
          setFormStatus('success');
          setStatusMsg('Transmission successful! Your message has been delivered directly to abhinavanand2005.cse@gmail.com.');
          setFormData({ name: '', email: '', message: '', botcheck: '' });
        } else {
          throw new Error('Fallback failed');
        }
      }
    } catch (err) {
      setFormStatus('error');
      setStatusMsg('Direct transmission failed. Please email abhinavanand2005.cse@gmail.com directly.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10 scroll-mt-16">
      {/* Kicker */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block">
          05 / HIRE ME · RECRUITER TRANSMISSION
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-semibold uppercase">
          AVAILABLE FOR INTERNSHIPS & ROLES
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132532] font-sans mb-6 max-w-3xl leading-[1.05]">
        Let's build something dependable.
      </h2>

      {/* Narrative Subtitle */}
      <p className="text-base sm:text-lg text-[#132532] text-opacity-90 leading-relaxed max-w-3xl mb-12">
        I am currently open for AI/ML engineering internships, research collaborations, and production systems development. Whether you're a recruiter with an open role, an engineering team tackling computer vision or multimodal document forensics, or an organization building low-latency inference microservices, send a message below.
      </p>

      {/* ========================================================================= */}
      {/* 2-COLUMN EDITORIAL CONSOLE: DIRECT TRANSMISSION FORM + DIRECTORY          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start mb-16">
        {/* Left Column (5 cols): Direct Info, Quick Actions & Credentials */}
        <div className="lg:col-span-5 space-y-8">
          {/* Quick Action Buttons with Magnetic Pull */}
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton strength={0.3}>
              <a
                href={`mailto:${email}`}
                className="btn-editorial-primary text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>OPEN EMAIL APP</span>
                <span className="text-xs">↗</span>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <button
                onClick={copyToClipboard}
                className="btn-editorial-outline text-xs sm:text-sm flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#132532]" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </MagneticButton>
          </div>

          {/* Hiring Snapshot Card */}
          <div className="bg-[#FAF8F5] border border-[#132532]/15 p-6 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#315CFF] font-bold border-b border-[#132532]/10 pb-2">
              RECRUITER OVERVIEW
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[#132532]/60 block text-[11px] uppercase">STATUS</span>
                <span className="text-[#132532] font-semibold">Open for AI/ML Internships & Co-ops</span>
              </div>

              <div>
                <span className="text-[#132532]/60 block text-[11px] uppercase">CORE COMPETENCIES</span>
                <span className="text-[#132532] font-semibold">Computer Vision, Document Forensics, PyTorch, C++ (DSA), FastAPI</span>
              </div>

              <div>
                <span className="text-[#132532]/60 block text-[11px] uppercase">EDUCATION & LOCATION</span>
                <span className="text-[#132532] font-semibold">B.Tech CSE (AI & ML) · LPU (Class of 2029) · Punjab, India</span>
              </div>

              <div>
                <span className="text-[#132532]/60 block text-[11px] uppercase">TYPICAL RESPONSE TIME</span>
                <span className="text-emerald-700 font-semibold">&lt; 12 Hours</span>
              </div>
            </div>
          </div>

          {/* Directory Links */}
          <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="border border-[#132532]/15 p-3.5 bg-white">
              <span className="text-[#132532]/50 uppercase tracking-widest block text-[10px] mb-1">GITHUB REPO</span>
              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>abhinavbuilds2005 ↗</span>
              </a>
            </div>

            <div className="border border-[#132532]/15 p-3.5 bg-white">
              <span className="text-[#132532]/50 uppercase tracking-widest block text-[10px] mb-1">LINKEDIN</span>
              <a
                href="https://www.linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>abhinav-anand ↗</span>
              </a>
            </div>

            <div className="border border-[#132532]/15 p-3.5 bg-white">
              <span className="text-[#132532]/50 uppercase tracking-widest block text-[10px] mb-1">LEETCODE</span>
              <a
                href="https://leetcode.com/u/cseabhinav2005/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
              >
                <Code className="w-3.5 h-3.5" />
                <span>@cseabhinav2005 ↗</span>
              </a>
            </div>

            <div className="border border-[#132532]/15 p-3.5 bg-white">
              <span className="text-[#132532]/50 uppercase tracking-widest block text-[10px] mb-1">RÉSUMÉ</span>
              <a
                href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F0784B] font-bold hover:text-[#DC6437] transition-colors flex items-center gap-1"
              >
                <span>Download PDF ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Direct Transmission Form */}
        <div className="lg:col-span-7 bg-white border border-[#132532]/15 shadow-sm p-6 sm:p-10 relative">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#132532]/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-[#315CFF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#132532]">
                DIRECT TRANSMISSION TO INBOX
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#132532]/60 uppercase tracking-wider">
              ENCRYPTED · WEB3FORMS / SERVERLESS
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field (hidden from humans) */}
            <input
              type="text"
              name="botcheck"
              value={formData.botcheck}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Name Field */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#132532] font-semibold mb-2">
                Your Name / Organization <span className="text-[#F0784B]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Jenkins (Tech Recruiter / Founder)"
                disabled={formStatus === 'loading'}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#132532]/20 font-sans text-sm text-[#132532] focus:border-[#315CFF] focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#132532] font-semibold mb-2">
                Work / Contact Email <span className="text-[#F0784B]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sjenkins@company.ai"
                disabled={formStatus === 'loading'}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#132532]/20 font-sans text-sm text-[#132532] focus:border-[#315CFF] focus:bg-white focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#132532] font-semibold mb-2">
                Opportunity Brief / Message <span className="text-[#F0784B]">*</span>
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share details regarding the role, timeline, project scope, or interview schedule…"
                disabled={formStatus === 'loading'}
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#132532]/20 font-sans text-sm text-[#132532] focus:border-[#315CFF] focus:bg-white focus:outline-none transition-colors resize-y"
                required
              />
            </div>

            {/* Status Feedback Banner */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-wider">TRANSMISSION DELIVERED</div>
                    <div className="font-sans text-xs mt-1 text-emerald-700">{statusMsg}</div>
                  </div>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-rose-50 border border-rose-300 text-rose-800 font-mono text-xs flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-wider">TRANSMISSION NOTICE</div>
                    <div className="font-sans text-xs mt-1 text-rose-700">{statusMsg}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit CTA */}
            <div className="pt-2">
              <MagneticButton strength={0.25} className="w-full">
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-bold bg-[#315CFF] hover:bg-[#2047E5] text-white px-6 py-4 shadow-[4px_4px_0px_#F0784B] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>TRANSMITTING DIRECT TO INBOX…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>TRANSMIT MESSAGE TO ABHINAV'S EMAIL ↗</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </div>

            <div className="font-mono text-[11px] text-[#132532]/50 text-center pt-2">
              Protected by spam honeypot filters. Messages land directly in Abhinav's primary inbox.
            </div>
          </form>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="mt-16 pt-8 border-t border-[#132532]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#132532]/55 tracking-wider gap-4">
        <div>© 2026 ABHINAV ANAND · ALL RIGHTS RESERVED</div>
        <div>EDITORIAL ENGINEER V4 · PORCELAIN & INK</div>
        <div>PUNJAB, INDIA</div>
      </footer>
    </section>
  );
};
