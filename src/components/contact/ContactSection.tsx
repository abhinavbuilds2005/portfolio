import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '' // Honeypot spam protection
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

    // Honeypot check
    if (formData.botcheck) {
      // Bot detected, silently succeed
      setStatus('success');
      setStatusMessage('Transmission accepted.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');

    try {
      // Attempt sending via Netlify serverless function (/api/contact)
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
        setStatusMessage('Transmission received. I will respond to your inquiry shortly.');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
      } else {
        // Fallback to Web3Forms directly if running in a client-only environment
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'New Transmission from AI Engineering Portfolio'
          })
        });

        if (web3Res.ok) {
          setStatus('success');
          setStatusMessage('Transmission received. I will respond to your inquiry shortly.');
          setFormData({ name: '', email: '', message: '', botcheck: '' });
        } else {
          throw new Error('Transmission endpoint failed.');
        }
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage('Unable to deliver message automatically. Please reach out directly to abhinavanand9996@gmail.com.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2b2a27]/60 relative overflow-hidden">

      {/* ── Orbiting accent decoration (top-right) ── */}
      <div className="absolute top-8 right-8 w-40 h-40 pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[#e58b24]/8" />
          {/* Middle ring */}
          <div className="absolute inset-6 rounded-full border border-[#e58b24]/5" />
          {/* Orbiting dot 1 */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50% calc(-50px)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#e58b24]/50" />
          </motion.div>
          {/* Orbiting dot 2 */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -mt-0.75 -ml-0.75"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50% calc(-30px)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#e58b24]/30" />
          </motion.div>
          {/* Center pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-[#e58b24]/20"
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Section Meta Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between py-2 border-b border-[#2b2a27]/60 mb-8 font-mono text-[11px] text-[#78716c]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e58b24] font-semibold">[05]</span>
          <span className="uppercase tracking-wider">CONTACT // TRANSMISSION CHANNELS</span>
        </div>
        <div>
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            STATUS: READY FOR TRANSMISSION
          </motion.span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct channels & availability */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] mb-3">
              Initiate Transmission
            </h2>
            <p className="text-sm text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed mb-6">
              Whether you are looking to hire for an AI/ML engineering role, exploring technical collaborations, or discussing machine learning pipelines—my channels are open.
            </p>
          </div>


          <div className="space-y-3 font-mono text-xs">
            {[
              {
                href: 'mailto:abhinavanand9996@gmail.com',
                icon: <Mail className="w-4 h-4" />,
                label: 'Direct Email',
                value: 'abhinavanand9996@gmail.com',
                external: false,
              },
              {
                href: 'https://github.com/abhinavbuilds2005',
                icon: <Github className="w-4 h-4" />,
                label: 'Source Repositories',
                value: 'github.com/abhinavbuilds2005',
                external: true,
              },
              {
                href: 'https://www.linkedin.com/in/abhinav-anand-865926300',
                icon: <Linkedin className="w-4 h-4" />,
                label: 'LinkedIn Profile',
                value: 'linkedin.com/in/abhinav-anand-865926300',
                external: true,
              },
            ].map((channel, i) => (
              <motion.a
                key={channel.href}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4, borderColor: 'rgba(229,139,36,0.5)' }}
                className="flex items-center gap-3 p-3.5 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] transition-colors group"
              >
                <motion.div
                  className="p-2 rounded bg-[#161616] text-[#e58b24]"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {channel.icon}
                </motion.div>
                <div className="truncate">
                  <div className="text-[10px] text-[#78716c] uppercase">{channel.label}</div>
                  <div className="font-semibold group-hover:text-[#e58b24] transition-colors">{channel.value}</div>
                </div>
              </motion.a>
            ))}
          </div>


          <div className="p-4 rounded border border-[#2b2a27] bg-[#161616] dark:bg-[#161616] light:bg-[#faf8f5]">
            <span className="font-mono text-[10px] text-[#e58b24] uppercase tracking-wider block mb-1">
              Availability Notice
            </span>
            <p className="text-xs text-[#a8a29e] dark:text-[#a8a29e] light:text-[#57534e] leading-relaxed">
              Targeting AI/ML Engineering internships, junior machine learning roles, and research assistantships. Immediate availability for remote and on-site opportunities.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Serverless Contact Form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-7 rounded border border-[#2b2a27] bg-[#1c1c1c] dark:bg-[#1c1c1c] light:bg-[#ffffff] shadow-sm space-y-4"
          >
            <div className="font-mono text-xs text-[#e58b24] font-semibold pb-2 border-b border-[#2b2a27]/60">
              DISPATCH COMMUNICATION PAYLOAD
            </div>

            {/* Honeypot anti-spam field */}
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
              <label htmlFor="name" className="block font-mono text-[11px] text-[#a8a29e] uppercase mb-1">
                Sender Name <span className="text-[#e58b24]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Connor / ML Recruiter"
                className="w-full px-3.5 py-2 rounded text-xs font-mono border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] focus:border-[#e58b24] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-[11px] text-[#a8a29e] uppercase mb-1">
                Transmission Email <span className="text-[#e58b24]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sarah@lab.ai"
                className="w-full px-3.5 py-2 rounded text-xs font-mono border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] focus:border-[#e58b24] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-[11px] text-[#a8a29e] uppercase mb-1">
                Project Specs / Message <span className="text-[#e58b24]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Detail role scope, project specifications, or collaboration details..."
                className="w-full px-3.5 py-2 rounded text-xs font-mono border border-[#2b2a27] bg-[#121212] dark:bg-[#121212] light:bg-[#faf8f5] text-[#f5f2eb] dark:text-[#f5f2eb] light:text-[#1c1917] focus:border-[#e58b24] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded font-mono text-xs font-medium tracking-wide bg-[#e58b24] hover:bg-[#d97706] text-[#121212] disabled:opacity-50 transition-colors shadow-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded border border-[#e58b24]/50 bg-[#e58b24]/10 text-[#f5f2eb] text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-[#e58b24] shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded border border-red-500/50 bg-red-950/20 text-[#f5f2eb] text-xs font-mono">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}
          </form>
        </motion.div>

      </div>

    </section>
  );
};
