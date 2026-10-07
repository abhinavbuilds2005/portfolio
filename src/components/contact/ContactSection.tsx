import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
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
      setStatus('success');
      setStatusMessage('Message sent successfully.');
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
        setStatusMessage('Thank you for reaching out! I will respond to your message shortly.');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
      } else {
        // Fallback to Web3Forms
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'd95cbc2e-a628-4836-b956-a1b038407133',
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'New Message from AI Engineering Portfolio'
          })
        });

        if (web3Res.ok) {
          setStatus('success');
          setStatusMessage('Thank you for reaching out! I will respond to your message shortly.');
          setFormData({ name: '', email: '', message: '', botcheck: '' });
        } else {
          throw new Error('Endpoint failure');
        }
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage('Message delivery failed. Please send an email directly to abhinavanand2005.cse@gmail.com.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border-subtle">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-accent mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            Initiate Conversation
          </h2>
        </div>
        <p className="text-sm text-text-secondary max-w-md">
          Available for Summer & Fall AI/ML and Machine Learning Engineering internships. Always interested in discussing technical challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Direct Contact Cards (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 rounded-lg border border-border-subtle bg-surface space-y-4 card-hover">
            <h3 className="text-base font-bold text-text-primary">
              Direct Channels
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              For internship opportunities, code reviews, or engineering discussions, reach out directly via email or professional profiles.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:abhinavanand2005.cse@gmail.com"
                className="flex items-center gap-3 p-3 rounded-md border border-border-subtle bg-base hover:border-border-strong text-text-primary hover:text-accent transition-colors"
              >
                <div className="p-2 rounded bg-surface border border-border-subtle text-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase">Email</div>
                  <div className="text-xs sm:text-sm font-medium">abhinavanand2005.cse@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-md border border-border-subtle bg-base hover:border-border-strong text-text-primary hover:text-accent transition-colors"
              >
                <div className="p-2 rounded bg-surface border border-border-subtle text-accent">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase">LinkedIn</div>
                  <div className="text-xs sm:text-sm font-medium">in/abhinav-anand-865926300</div>
                </div>
              </a>

              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-md border border-border-subtle bg-base hover:border-border-strong text-text-primary hover:text-accent transition-colors"
              >
                <div className="p-2 rounded bg-surface border border-border-subtle text-accent">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-mono uppercase">GitHub</div>
                  <div className="text-xs sm:text-sm font-medium">github.com/abhinavbuilds2005</div>
                </div>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface text-xs text-text-secondary flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-live shrink-0 animate-live-pulse" />
            <span>Response latency: typically within 24 hours (IST, UTC+5:30).</span>
          </div>
        </motion.div>

        {/* Message Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-lg border border-border-subtle bg-surface card-hover">
            <h3 className="text-lg font-bold text-text-primary mb-1">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-6">
              Delivered through our serverless pipeline with immediate notification.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for bot detection */}
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
                  <label htmlFor="name" className="block text-xs font-mono text-text-secondary mb-1">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    required
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-base text-text-primary text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-text-secondary mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-base text-text-primary text-sm focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-text-secondary mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your team, role requirements, or project..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-md border border-border-subtle bg-base text-text-primary text-sm focus:border-accent focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Status Message Alert */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-md text-xs flex items-start gap-2 border ${
                    status === 'success'
                      ? 'border-live/40 bg-live/10 text-live'
                      : 'border-accent/40 bg-accent/10 text-accent'
                  }`}
                  role="alert"
                >
                  {status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium bg-accent hover:bg-accent-hover text-base transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

      </div>

    </section>
  );
};
