// Content lifecycle: every authored record carries a status so the UI can
// warn when text hasn't been checked against the official CPALMS wording yet.
export type ContentStatus = "draft" | "verified";

export interface ContentMeta {
  status: ContentStatus;
  statusNote?: string;
  lastUpdated: string; // ISO date
}

export const draftMeta = (note?: string): ContentMeta => ({
  status: "draft",
  statusNote:
    note ??
    "Benchmark code verified against CPALMS.org (2026); summaries and questions are Claude-authored — review wording before classroom use.",
  lastUpdated: "2026-07-07",
});

// The three overarching sub-ideas of SC.912.L.17 (Interdependence)
export type BigIdeaId = "A" | "B" | "C";

export interface BigIdea {
  id: BigIdeaId;
  title: string;
  shortLabel: string;
  description: string;
  colorTheme: "emerald" | "sky" | "amber";
  meta: ContentMeta;
}

export interface Benchmark {
  id: string; // slug, e.g. "population-dynamics"
  code: string; // draft/placeholder CPALMS-style code
  bigIdeaId: BigIdeaId;
  title: string;
  summary: string;
  examples: string[];
  analogy?: string;
  vocabulary?: { term: string; definition: string }[];
  /** Diagram keys shown on the review page; keys into the diagram registry. */
  diagramKeys?: string[];
  meta: ContentMeta;
}

export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionType = "multiple-choice";

export interface QuizQuestion {
  id: string;
  benchmarkId: string;
  type: QuestionType;
  prompt: string;
  /** Optional diagram shown with the question; key into the diagram registry. */
  diagramKey?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  difficulty: QuestionDifficulty;
  points: number;
  meta: ContentMeta;
}

export const POINTS_BY_DIFFICULTY: Record<QuestionDifficulty, number> = {
  easy: 10,
  medium: 15,
  hard: 25,
};

export const QUIZ_COMPLETION_BONUS = 20;
