import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertTriangle, Loader2, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      setStatus('success');
      setStatusMessage('Message accepted.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Thank you for reaching out. I will respond to your message shortly.');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
      } else {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'New Inquiry from AI Engineering Portfolio'
          })
        });

        if (web3Res.ok) {
          setStatus('success');
          setStatusMessage('Thank you for reaching out. I will respond to your message shortly.');
          setFormData({ name: '', email: '', message: '', botcheck: '' });
        } else {
          throw new Error('Message dispatch failed.');
        }
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage('Unable to send automatically. Please reach out directly to abhinavanand9996@gmail.com.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] relative overflow-hidden">

      {/* Subtle animated background signal line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6366F1]/15 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-3xl mb-12 relative z-10">
        <div className="flex items-center gap-2 font-mono text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] mb-4">
          Build Something Intelligent.
        </h2>
        <p className="text-base text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
          Available for <strong className="text-white dark:text-white light:text-[#0F172A]">AI/ML internships</strong>, <strong className="text-white dark:text-white light:text-[#0F172A]">ML engineering opportunities</strong>, and <strong className="text-white dark:text-white light:text-[#0F172A]">collaborative systems projects</strong>. Immediate availability for remote and on-site roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Direct Action Buttons & Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 font-mono text-xs">
            <a
              href="mailto:abhinavanand9996@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] hover:border-[#6366F1]/50 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase">Email Direct</div>
                  <div className="font-semibold text-sm group-hover:text-[#6366F1] transition-colors">abhinavanand9996@gmail.com</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#667085] group-hover:text-[#6366F1] transition-colors" />
            </a>

            <a
              href="https://github.com/abhinavbuilds2005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] hover:border-[#6366F1]/50 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase">GitHub</div>
                  <div className="font-semibold text-sm group-hover:text-[#6366F1] transition-colors">github.com/abhinavbuilds2005</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#667085] group-hover:text-[#6366F1] transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/abhinav-anand-865926300"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] hover:border-[#6366F1]/50 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase">LinkedIn</div>
                  <div className="font-semibold text-sm group-hover:text-[#6366F1] transition-colors">linkedin.com/in/abhinav-anand-865926300</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#667085] group-hover:text-[#6366F1] transition-colors" />
            </a>

            <a
              href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] hover:border-[#6366F1]/50 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#6366F1]/10 text-[#6366F1]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#667085] uppercase">Resume (PDF)</div>
                  <div className="font-semibold text-sm group-hover:text-[#6366F1] transition-colors">Abhinav_Anand_Resume.pdf</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#667085] group-hover:text-[#6366F1] transition-colors" />
            </a>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.06] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-xs text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] leading-relaxed">
            <span className="font-mono text-[10px] text-[#34D399] uppercase font-semibold block mb-1">
              Location & Availability
            </span>
            Based in India (UTC+5:30). Open to internships, remote contracts, or relocation for compelling AI engineering opportunities.
          </div>
        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] dark:border-white/[0.08] light:border-black/[0.08] bg-[#11151A] dark:bg-[#11151A] light:bg-white shadow-xl space-y-4"
          >
            <div className="font-mono text-xs text-[#6366F1] font-semibold pb-2 border-b border-white/[0.06]">
              Send a Direct Message
            </div>

            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="botcheck"
              value={formData.botcheck}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="name" className="block text-xs font-medium text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mb-1.5">
                Your Name <span className="text-[#6366F1]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Connor / ML Recruiter"
                className="w-full px-4 py-2.5 rounded-lg text-xs font-sans border border-white/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] focus:border-[#6366F1] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mb-1.5">
                Your Email Address <span className="text-[#6366F1]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sarah@lab.ai"
                className="w-full px-4 py-2.5 rounded-lg text-xs font-sans border border-white/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] focus:border-[#6366F1] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-[#9AA4B2] dark:text-[#9AA4B2] light:text-[#475569] mb-1.5">
                Message / Opportunity Details <span className="text-[#6366F1]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe role scope, engineering requirements, or collaboration goals..."
                className="w-full px-4 py-2.5 rounded-lg text-xs font-sans border border-white/[0.08] bg-[#0D1014] dark:bg-[#0D1014] light:bg-[#F0F2F5] text-[#F5F7FA] dark:text-[#F5F7FA] light:text-[#0F172A] focus:border-[#6366F1] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-medium tracking-wide bg-[#6366F1] hover:bg-[#4F46E5] text-white disabled:opacity-50 transition-colors shadow-subtle-glow"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-xs font-mono">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}
          </form>
        </div>

      </div>

    </section>
  );
};
