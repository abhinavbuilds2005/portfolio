import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink, Github, Linkedin, Code } from 'lucide-react';

export const EditorialContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'abhinavanand2005.cse@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#132532]/10">
      {/* Kicker */}
      <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[#F0784B] block mb-3">
        04 / GET IN TOUCH
      </span>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#132532] font-sans mb-6 max-w-3xl leading-[1.05]">
        Let's build something dependable.
      </h2>

      {/* Narrative Subtitle */}
      <p className="text-base sm:text-lg text-[#132532]/80 leading-relaxed max-w-2xl mb-12">
        I am currently open for AI/ML engineering internships, research collaborations, and production
        systems development. Whether you want to discuss multimodal document forensics, handling
        class imbalance with statistical rigor, or low-latency inference microservices, I'd love to connect.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-16">
        {/* Primary Email CTA with Persimmon Offset Shadow */}
        <a
          href={`mailto:${email}`}
          className="btn-editorial-primary text-xs sm:text-sm"
        >
          <Mail className="w-4 h-4 text-white" />
          <span>SEND AN EMAIL</span>
          <span className="text-xs">↗</span>
        </a>

        {/* Copy Email Button */}
        <button
          onClick={copyToClipboard}
          className="btn-editorial-outline text-xs sm:text-sm flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">COPIED TO CLIPBOARD</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#132532]" />
              <span>COPY EMAIL ADDRESS</span>
            </>
          )}
        </button>
      </div>

      {/* Social and Profile Directory */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-[#132532]/12 font-mono text-xs">
        <div>
          <span className="text-[#132532]/50 uppercase tracking-widest block mb-2">CODE</span>
          <a
            href="https://github.com/abhinavbuilds2005"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub ↗</span>
          </a>
        </div>

        <div>
          <span className="text-[#132532]/50 uppercase tracking-widest block mb-2">CONNECT</span>
          <a
            href="https://www.linkedin.com/in/abhinav-anand-865926300"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn ↗</span>
          </a>
        </div>

        <div>
          <span className="text-[#132532]/50 uppercase tracking-widest block mb-2">DSA PRACTICE</span>
          <a
            href="https://leetcode.com/u/abhinavanand/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#132532] font-bold hover:text-[#315CFF] transition-colors flex items-center gap-1"
          >
            <Code className="w-3.5 h-3.5" />
            <span>LeetCode ↗</span>
          </a>
        </div>

        <div>
          <span className="text-[#132532]/50 uppercase tracking-widest block mb-2">CREDENTIALS</span>
          <a
            href="/Abhinav_Anand_Resume_AIML_Specialized.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F0784B] font-bold hover:text-[#DC6437] transition-colors flex items-center gap-1"
          >
            <span>RÉSUMÉ PDF ↗</span>
          </a>
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

