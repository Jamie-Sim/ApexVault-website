import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SignupStatus = "pending_payment" | "waitlist" | "paid" | "refunded";

export type SignupRow = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  status: SignupStatus;
  phone: string | null;
  tier_interest: string | null;
  notes: string | null;
};

let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
