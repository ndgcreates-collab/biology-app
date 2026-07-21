import { supabase } from "./client";
import { QuizQuestion } from "@/content/schema";

export interface DbQuiz {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
}

interface DbQuestionRow {
  id: string;
  position: number;
  prompt: string;
  choices: string[];
  correct_index: number;
  explanation: string | null;
  difficulty: string;
  points: number;
  benchmark_id: string | null;
  diagram_key: string | null;
}

/** All published quizzes authored in Supabase. */
export async function listDbQuizzes(): Promise<DbQuiz[]> {
  const { data, error } = await supabase
    .from("quizzes")
    .select("id, slug, title, description, status")
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as DbQuiz[];
}

function toDifficulty(d: string): QuizQuestion["difficulty"] {
  return d === "easy" || d === "hard" ? d : "medium";
}

/** Loads a quiz by slug and maps its rows into the app's QuizQuestion shape. */
export async function getDbQuiz(
  slug: string
): Promise<{ quiz: DbQuiz; questions: QuizQuestion[] } | null> {
  const { data: quiz, error: quizErr } = await supabase
    .from("quizzes")
    .select("id, slug, title, description, status")
    .eq("slug", slug)
    .maybeSingle();
  if (quizErr) throw new Error(quizErr.message);
  if (!quiz) return null;

  const { data: rows, error: qErr } = await supabase
    .from("quiz_questions")
    .select(
      "id, position, prompt, choices, correct_index, explanation, difficulty, points, benchmark_id, diagram_key"
    )
    .eq("quiz_id", quiz.id)
    .order("position", { ascending: true });
  if (qErr) throw new Error(qErr.message);

  const questions: QuizQuestion[] = (rows ?? []).map((r: DbQuestionRow) => ({
    id: r.id,
    benchmarkId: r.benchmark_id ?? slug,
    type: "multiple-choice",
    prompt: r.prompt,
    diagramKey: r.diagram_key ?? undefined,
    choices: r.choices,
    correctIndex: r.correct_index,
    explanation: r.explanation ?? "",
    difficulty: toDifficulty(r.difficulty),
    points: r.points,
    meta: {
      status: (quiz as DbQuiz).status === "verified" ? "verified" : "draft",
      statusNote: "Loaded from Supabase",
      lastUpdated: new Date().toISOString().slice(0, 10),
    },
  }));

  return { quiz: quiz as DbQuiz, questions };
}
