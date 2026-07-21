import { createClient } from "@supabase/supabase-js";

// These are the project's public URL and publishable key. They are safe to
// embed in client-side code: all data access is gated by Row Level Security
// and the SECURITY DEFINER RPC functions (see the game_code_system migration).
const SUPABASE_URL = "https://wbbprhdtlhohbidtbbiz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_vylsK6h3H8ZzGk_pKvogOQ_teS65eXh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});
