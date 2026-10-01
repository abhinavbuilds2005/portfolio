export type ProjectCategory = 'vision' | 'nlp' | 'predictive' | 'fullstack';

export interface ProjectMetric {
  label: string;
  value: string;
  isSample?: boolean; // clearly labelled as sample data until user replaces
  notes?: string;
}

export interface ProjectPipelineStep {
  label: string;
  sub: string;
}

export interface ProjectDecision {
  decision: string;
  rationale: string;
  tradeoff: string;
  status: string; // e.g. "[Draft, to be confirmed by Abhinav]"
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: 'LIVE' | 'ROADMAP';
  tagline: string;
  outcome: string; // 1-line outcome required for top projects
  image: string;
  elaImage?: string; // For DocuShield forensic tamper reveal slider
  liveUrl: string | null;
  repoUrl: string | null;
  summary: string;
  problem: string;
  solution: string;
  constraints?: string[];
  approach?: string;
  decisionsAndTradeoffs?: ProjectDecision[];
  results?: ProjectMetric[];
  nextImprovements?: string[];
  features: string[];
  tech: string[];
  metrics: ProjectMetric[];
  pipeline: ProjectPipelineStep[];
  // 2D coordinates for embedding scatter plot
  embedding: {
    x: number; // 0 to 100
    y: number; // 0 to 100
  };
  rocCurve?: {
    auc: string;
    isSample: boolean;
    points: { fpr: number; tpr: number }[];
  };
}

export interface Certification {
  id: string;
  title: string;
  platform: string;
  url: string;
  tag: string;
  date?: string;
}

export interface CurrentlyLearning {
  topic: string;
  focus: string;
  status: 'Active' | 'Deep Dive' | 'Applying';
}

export interface PipelineStageInfo {
  id: string;
  step: string;
  title: string;
  summary: string;
  tools: string[];
  projectExample: {
    projectName: string;
    detail: string;
  };
}

export interface BuildLogEntry {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  content: string;
}
