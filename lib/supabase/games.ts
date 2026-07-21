import { supabase } from "./client";

export interface CreatedGame {
  game_id: string;
  code: string;
  host_pin: string;
}

export interface JoinedGame {
  game_id: string;
  player_id: string;
  name: string;
}

export interface PlayerQuizResult {
  quiz_id: string | null;
  score: number;
  total: number;
  points: number;
  breakdown: Record<string, { correct: number; total: number }> | null;
  created_at: string;
}

export interface PlayerResults {
  player_id: string;
  name: string;
  joined_at: string;
  results: PlayerQuizResult[];
}

export interface GameResults {
  game: { code: string; title: string | null; created_at: string };
  players: PlayerResults[];
}

/** Friendly message from a raw Postgres RPC error. */
function friendlyError(message: string): string {
  if (message.includes("GAME_NOT_FOUND")) return "No game found with that code.";
  if (message.includes("BAD_PIN")) return "That results PIN is incorrect.";
  if (message.includes("NAME_REQUIRED")) return "Please enter your name.";
  if (message.includes("PLAYER_NOT_FOUND")) return "Your player session is invalid — rejoin the game.";
  return message;
}

export async function createGame(title?: string): Promise<CreatedGame> {
  const { data, error } = await supabase.rpc("create_game", { p_title: title ?? null });
  if (error) throw new Error(friendlyError(error.message));
  return data as CreatedGame;
}

export async function joinGame(code: string, name: string): Promise<JoinedGame> {
  const { data, error } = await supabase.rpc("join_game", { p_code: code, p_name: name });
  if (error) throw new Error(friendlyError(error.message));
  return data as JoinedGame;
}

export async function submitResult(args: {
  playerId: string;
  quizId: string;
  benchmarkIds: string[];
  score: number;
  total: number;
  points: number;
  breakdown: Record<string, { correct: number; total: number }>;
}): Promise<void> {
  const { error } = await supabase.rpc("submit_result", {
    p_player_id: args.playerId,
    p_quiz_id: args.quizId,
    p_benchmark_ids: args.benchmarkIds,
    p_score: args.score,
    p_total: args.total,
    p_points: args.points,
    p_breakdown: args.breakdown,
  });
  if (error) throw new Error(friendlyError(error.message));
}

export async function getResults(code: string, pin: string): Promise<GameResults> {
  const { data, error } = await supabase.rpc("get_results", { p_code: code, p_pin: pin });
  if (error) throw new Error(friendlyError(error.message));
  return data as GameResults;
}
