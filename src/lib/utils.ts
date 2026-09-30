import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Project } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TechUsage {
  name: string;
  count: number;
  percentage: number;
  projects: string[];
}

/**
 * Calculates feature importance / technology usage frequencies directly from real project data.
 */
export function calculateTechUsage(projects: Project[]): TechUsage[] {
  const counts: Record<string, { count: number; projects: string[] }> = {};

  projects.forEach((proj) => {
    proj.tech.forEach((t) => {
      const normalized = t.trim();
      if (!counts[normalized]) {
        counts[normalized] = { count: 0, projects: [] };
      }
      counts[normalized].count += 1;
      counts[normalized].projects.push(proj.title);
    });
  });

  const totalProjects = projects.length;
  const list = Object.entries(counts).map(([name, data]) => ({
    name,
    count: data.count,
    percentage: Math.round((data.count / totalProjects) * 100),
    projects: data.projects,
  }));

  // Sort descending by count, then alphabetically
  return list.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
