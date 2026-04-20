import { NextResponse } from "next/server";
import { FOUNDING_SPOTS_TOTAL } from "@/config";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const revalidate = 30;

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      total: FOUNDING_SPOTS_TOTAL,
      remaining: FOUNDING_SPOTS_TOTAL,
      closed: false,
    });
  }

  const { count, error } = await supabase
    .from("signups")
    .select("*", { count: "exact", head: true })
    .in("status", ["pending_payment", "paid"]);

  if (error) {
    console.error("[counter] count failed", error);
    return NextResponse.json({
      total: FOUNDING_SPOTS_TOTAL,
      remaining: FOUNDING_SPOTS_TOTAL,
      closed: false,
    });
  }

  const taken = count ?? 0;
  const remaining = Math.max(0, FOUNDING_SPOTS_TOTAL - taken);

  return NextResponse.json({
    total: FOUNDING_SPOTS_TOTAL,
    remaining,
    closed: remaining === 0,
  });
}
