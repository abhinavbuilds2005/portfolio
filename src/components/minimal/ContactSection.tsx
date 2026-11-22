import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Copy, Send, Loader2, AlertCircle, CheckCircle2, ArrowRight, Github, Linkedin, Instagram } from 'lucide-react';
import { MagneticButton } from '../editorial/MagneticButton';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'abhinavanand9996@gmail.com';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '',
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
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botcheck) {
      setFormStatus('success');
      setStatusMsg('Message sent successfully!');
      return;
    }

    const name = formData.name.trim();
    const emailInput = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !emailInput || !message) {
      setFormStatus('error');
      setStatusMsg('Please provide your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setFormStatus('error');
      setStatusMsg('Please enter a valid email address.');
      return;
    }

    setFormStatus('loading');
    setStatusMsg('');

    let sent = false;

    // 1. Primary Attempt: Send via /api/contact (Serverless Netlify Function / Vite Dev Server)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email: emailInput, message }),
      });

      if (res.ok) {
        sent = true;
      }
    } catch {
      // Continue to fallback
    }

    // 2. Secondary Attempt: Send via Native Netlify Forms (URL-encoded submission)
    if (!sent) {
      try {
        const netlifyRes = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            name,
            email: emailInput,
            message,
          }).toString(),
        });
        if (netlifyRes.ok) {
          sent = true;
        }
      } catch {
        // Continue to fallback
      }
    }

    // 3. Direct Fallback: FormSubmit.co endpoint
    if (!sent) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name,
            email: emailInput,
            message,
            _subject: `New Transmission from AI Engineering Portfolio: ${name}`,
          }),
        });
        if (fsRes.ok) {
          sent = true;
        }
      } catch {
        // Fallback failed
      }
    }

    if (sent) {
      setFormStatus('success');
      setStatusMsg("Message delivered directly to Abhinav's inbox! I'll get back to you shortly.");
      setFormData({ name: '', email: '', message: '', botcheck: '' });
    } else {
      setFormStatus('error');
      setStatusMsg(
        'Direct dispatch failed to connect. You can email abhinavanand9996@gmail.com directly.'
      );
    }
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/[0.06]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#6366F1] block mb-2">
          — CONTACT
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight font-sans">
          Let's Build Something Dependable.
        </h2>
        <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mt-2 leading-relaxed font-normal">
          Available for software engineering & AI/ML internships for 2026/27. Let's talk systems, pipelines, or collaborative opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Copy Button (Cols 1-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
            <div className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-2">
              DIRECT INBOX
            </div>
            <div className="font-sans font-bold text-base sm:text-lg text-[#111827] break-all">
              {email}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6366F1] hover:underline"
              >
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
            <div className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-3">
              CONNECT & FOLLOW
            </div>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-[#1F2937] hover:text-[#6366F1] transition-colors p-2 rounded-lg hover:bg-slate-50"
              >
                <span className="flex items-center gap-2.5 font-medium">
                  <Linkedin className="w-4 h-4 text-[#6366F1]" />
                  <span>LinkedIn Profile</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">/abhinav-anand ↗</span>
              </a>

              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-[#1F2937] hover:text-[#6366F1] transition-colors p-2 rounded-lg hover:bg-slate-50"
              >
                <span className="flex items-center gap-2.5 font-medium">
                  <Github className="w-4 h-4 text-[#111827]" />
                  <span>GitHub Repositories</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">/abhinavbuilds2005 ↗</span>
              </a>

              <a
                href="https://www.instagram.com/cse.abhinav/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-sm text-[#1F2937] hover:text-[#E1306C] transition-colors p-2 rounded-lg hover:bg-slate-50"
              >
                <span className="flex items-center gap-2.5 font-medium">
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">/cse.abhinav ↗</span>
              </a>

              <a
                href="mailto:abhinavanand9996@gmail.com"
                className="flex items-center justify-between text-sm text-[#1F2937] hover:text-[#6366F1] transition-colors p-2 rounded-lg hover:bg-slate-50"
              >
                <span className="flex items-center gap-2.5 font-medium">
                  <Mail className="w-4 h-4 text-[#6366F1]" />
                  <span>Direct Email</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">abhinavanand9996@gmail.com ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (Cols 6-12) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm">
          <h3 className="font-sans font-bold text-xl text-[#111827] mb-6">
            Send a Direct Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="botcheck"
              value={formData.botcheck}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                Message / Inquiry
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Hi Abhinav, I'd like to discuss an AI/ML internship or project collaboration..."
                className="w-full bg-[#FAF9F5] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#6366F1] transition-colors resize-none"
              />
            </div>

            {statusMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between gap-2 ${
                  formStatus === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {formStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{statusMsg}</span>
                </div>
                {formStatus === 'error' && (
                  <a
                    href={`mailto:${email}?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(formData.message)}`}
                    className="font-bold underline text-red-900 shrink-0 hover:text-red-950 ml-2"
                  >
                    Draft Email ↗
                  </a>
                )}
              </div>
            )}

            <MagneticButton strength={0.25}>
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="inline-flex items-center justify-center gap-2 bg-[#111827] text-white hover:bg-[#1F2937] active:scale-95 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {formStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
};
