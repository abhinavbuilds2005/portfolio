import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../lib/types';

interface TiltProjectCardProps {
  project: Project;
  num: string;
  index: number;
  onOpenCaseStudy?: (project: Project) => void;
}

export const TiltProjectCard: React.FC<TiltProjectCardProps> = ({
  project,
  num,
  index,
  onOpenCaseStudy,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  // 3D tilt spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-180, 180], [7, -7]);
  const rotateY = useTransform(smoothX, [-250, 250], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set(x - centerX);
    mouseY.set(y - centerY);
    setSpotlightPos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="bg-white border border-[#132532]/15 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#132532]/40 transition-colors relative"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(49, 92, 255, 0.08), transparent 70%)`,
        }}
      />

      <div>
        {/* Project Image Frame */}
        <div className="relative aspect-[16/10] bg-[#FAF8F5] border-b border-[#132532]/10 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle Number Tag with Persimmon border */}
          <div className="absolute top-3 left-3 bg-[#132532] text-white font-mono text-xs px-2.5 py-1 uppercase font-bold tracking-wider shadow-[2px_2px_0px_#F0784B]">
            {num}
          </div>
        </div>

        {/* Editorial Content */}
        <div className="p-6 sm:p-8">
          {/* Category kicker in Electric Blue */}
          <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#315CFF] mb-2 flex items-center gap-2">
            <span>{num} — {project.categoryLabel}</span>
          </div>

          {/* Title with dot */}
          <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#132532] font-sans mb-3 group-hover:text-[#315CFF] transition-colors">
            {project.title}.
          </h4>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#132532] text-opacity-90 leading-relaxed mb-6 font-normal">
            {project.summary}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-[#FAF8F5] border border-[#132532]/12 text-[11px] font-mono text-[#132532] hover:border-[#315CFF] transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Links */}
      <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-[#132532]/10 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-[#132532] z-20">
        <div className="flex items-center gap-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors inline-flex items-center gap-1"
            >
              <span>LIVE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-2 decoration-[#132532] hover:decoration-[#315CFF] hover:text-[#315CFF] transition-colors inline-flex items-center gap-1"
            >
              <span>CODE</span>
              <Github className="w-3 h-3" />
            </a>
          )}
        </div>

        {onOpenCaseStudy && (
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="text-[#315CFF] hover:text-[#2047E5] underline underline-offset-4 transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>CASE STUDY</span>
            <span>↘</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
