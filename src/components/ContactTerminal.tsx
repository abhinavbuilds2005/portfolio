import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram, 
  Copy, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Terminal,
  Clock,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

export const ContactTerminal: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'ML Intern / Full-Time',
    message: '',
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abhinavanand9996@gmail.com');
    setIsCopied(true);
    sfx.playSuccess();
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    sfx.playClick();

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      sfx.playSuccess();

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2ff', '#8b5cf6', '#10b981'],
        });
      } catch {
        // ignore
      }
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <Radio className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
            <span>COMM-LINK CONSOLE · INITIALIZE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Engineer The Future
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-xl mx-auto font-light">
            Available for remote Machine Learning internships, Data Analyst roles, and high-impact AI collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Transmission Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="rounded-2xl glass-panel-glow p-6 border border-cyber-cyan/30">
              <span className="text-[11px] font-mono text-cyber-cyan uppercase tracking-widest block mb-2">
                DIRECT SECURE CHANNEL
              </span>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                abhinavanand9996@gmail.com
              </h3>
              <p className="text-xs text-gray-300 font-light mb-5">
                Reach out directly for interviews, project inquiries, or AI engineering discussions. Typical response time under 12 hours.
              </p>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sfx.playHover()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-obsidian-950 border border-cyber-cyan/40 hover:border-cyber-cyan text-xs font-mono font-bold text-cyber-cyan shadow-[0_0_15px_rgba(0,242,255,0.15)] transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://linkedin.com/in/abhinav-anand-865926300"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="p-4 rounded-xl glass-panel-card border border-white/10 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between text-blue-400 mb-2">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-gray-400">Connect</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyber-cyan">LinkedIn</div>
                  <div className="text-[10px] font-mono text-gray-400">Abhinav Anand</div>
                </div>
              </a>

              <a
                href="https://github.com/abhinavbuilds2005"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="p-4 rounded-xl glass-panel-card border border-white/10 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between text-gray-200 mb-2">
                  <Github className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-gray-400">Repositories</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyber-cyan">GitHub</div>
                  <div className="text-[10px] font-mono text-gray-400">abhinavbuilds2005</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/cse.abhinav?igsh=MTcxdDR6N2VyMmIwMQ=="
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sfx.playHover()}
                className="p-4 rounded-xl glass-panel-card border border-white/10 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between text-rose-400 mb-2">
                  <Instagram className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-gray-400">Social</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyber-cyan">Instagram</div>
                  <div className="text-[10px] font-mono text-gray-400">@cse.abhinav</div>
                </div>
              </a>

              <div className="p-4 rounded-xl glass-panel-card border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-[10px] font-mono text-gray-400">Timezone</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">IST (UTC +5:30)</div>
                  <div className="text-[10px] font-mono text-emerald-400">Remote Ready</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Comm-Link Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel-card p-6 sm:p-8 border border-white/15 relative">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                  ENCRYPTED TRANSMISSION FORM
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  CHANNEL ACTIVE
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyber-cyan/15 border-2 border-cyber-cyan text-cyber-cyan shadow-[0_0_25px_rgba(0,242,255,0.4)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Transmission Received!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md font-light">
                    Thank you for reaching out! Your message has been routed to Abhinav's direct terminal. I will get back to you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', roleType: 'ML Intern / Full-Time', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-obsidian-900 border border-white/20 text-xs font-mono text-gray-300 hover:text-white"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono text-gray-300">Your Name / Organization</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins (Recruiting Lead)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/80 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-mono text-gray-300">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/80 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono text-gray-300">Inquiry Purpose / Role</label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                    >
                      <option value="ML Intern / Full-Time">ML Engineer / Data Analyst Role</option>
                      <option value="AI Collaboration / Contract">Generative AI / LLM Project</option>
                      <option value="Research / Open-Source">Research & Open-Source Collaboration</option>
                      <option value="General Conversation">General Networking & Tech Chat</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-mono text-gray-300">Transmission Payload (Message)</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss project requirements, open roles, or schedule a technical call..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/80 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    onMouseEnter={() => sfx.playHover()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyber-cyan via-blue-500 to-cyber-purple text-black font-extrabold text-sm tracking-tight shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_30px_rgba(0,242,255,0.7)] hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>TRANSMITTING ENCRYPTED PACKET...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>DISPATCH TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
