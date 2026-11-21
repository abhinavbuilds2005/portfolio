import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export const TechStrip: React.FC = () => {
  const technologies = [
    {
      name: 'Python',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.91 2C6.91 2 7.21 4.17 7.21 4.17L7.22 6.42H12V7.17H4.41C2.32 7.17 2 9.5 2 9.5C2 12.39 3.82 12.54 3.82 12.54H5.32V10.42C5.32 7.89 7.47 7.89 7.47 7.89H11.96C14.37 7.89 14.37 5.61 14.37 5.61V3.94C14.37 2.05 11.91 2 11.91 2ZM9.07 3.33C9.57 3.33 9.98 3.74 9.98 4.24C9.98 4.74 9.57 5.15 9.07 5.15C8.57 5.15 8.16 4.74 8.16 4.24C8.16 3.74 8.57 3.33 9.07 3.33Z" fill="#3776AB" />
          <path d="M12.09 22C17.09 22 16.79 19.83 16.79 19.83L16.78 17.58H12V16.83H19.59C21.68 16.83 22 14.5 22 14.5C22 11.61 20.18 11.46 20.18 11.46H18.68V13.58C18.68 16.11 16.53 16.11 16.53 16.11H12.04C9.63 16.11 9.63 18.39 9.63 18.39V20.06C9.63 21.95 12.09 22 12.09 22ZM14.93 20.67C14.43 20.67 14.02 20.26 14.02 19.76C14.02 19.26 14.43 18.85 14.93 18.85C15.43 18.85 15.84 19.26 15.84 19.76C15.84 20.26 15.43 20.67 14.93 20.67Z" fill="#FFD43B" />
        </svg>
      ),
    },
    {
      name: 'PyTorch',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.5 6.5L16.5 4.5L14.5 9.5C17.5 11 19 14 18.5 17C17.8 21.2 13.5 22.8 10 21.8C6.5 20.8 4 17.5 4.5 14C5 10.5 8 8 11 8L12 2Z" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16.5" cy="5.5" r="1.5" fill="#EE4C2C" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: 'FastAPI',
      icon: (
        <svg className="w-5 h-5 text-[#059669]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2ZM11 16.5V11.5H8.5L13 5.5V10.5H15.5L11 16.5Z" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      icon: (
        <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7V17M8 10C8 8.9 9.8 8 12 8C14.2 8 16 8.9 16 10C16 11.1 14.2 12 12 12C9.8 12 8 12.9 8 14C8 15.1 9.8 16 12 16" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Docker',
      icon: (
        <svg className="w-5 h-5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 10h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2H7V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm3 0h2v2h-2V7zm-6-3h2v2h-2V4zm3 0h2v2h-2V4zm8.5 7.5c-.3-.2-.8-.4-1.3-.4-.2 0-.4 0-.6.1-.3-.7-.9-1.2-1.6-1.5v-.2c0-.3-.1-.5-.2-.7-.2-.4-.6-.7-1.1-.7-.2 0-.4 0-.5.1-.4-.6-1-1-1.7-1H2v3c0 .3.1.6.2.8C1.5 11.8 1 12.8 1 14c0 3.3 2.7 6 6 6h11c3.3 0 6-2.7 6-6 0-1-.3-1.9-.8-2.7-.2.1-.4.2-.7.2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full border-y border-black/[0.06] bg-[#FAF9F5]/80 py-5 my-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-wrap items-center justify-between gap-6">
        {/* Left Label with Horizontal Line */}
        <div className="flex items-center gap-4">
          <span className="font-sans font-bold text-sm text-[#111827] whitespace-nowrap">
            Tech I Work With
          </span>
          <div className="w-10 h-px bg-black/[0.15] hidden sm:block" />
        </div>

        {/* Tech Badges Row */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 group cursor-default transition-transform hover:-translate-y-0.5"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                {tech.icon}
              </span>
              <span className="font-sans font-semibold text-xs sm:text-sm text-[#1F2937] group-hover:text-[#6366F1] transition-colors">
                {tech.name}
              </span>
            </div>
          ))}

          {/* More Dot Icon */}
          <div className="flex items-center text-[#9CA3AF] hover:text-[#111827] transition-colors cursor-pointer">
            <MoreHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
