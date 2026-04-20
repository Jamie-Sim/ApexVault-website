import { NextResponse } from "next/server";
import { z } from "zod";
import { FOUNDING_SPOTS_TOTAL } from "@/config";
import { getSupabaseAdmin, type SignupStatus } from "@/lib/supabase";
import { sendSignupEmails } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SignupSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(200),
  tierInterest: z.string().trim().max(40).optional(),
  phone: z.string().trim().max(40).optional(),
});

export async function POST(req: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Signup is not yet configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, tierInterest, phone } = parsed.data;

  const { data: existing, error: existingError } = await supabase
    .from("signups")
    .select("id, status")
    .eq("email", email)
    .maybeSingle();

  if (existingError) {
    console.error("[signup] lookup failed", existingError);
    return NextResponse.json(
      { ok: false, error: "Could not reach the signup database." },
      { status: 500 },
    );
  }

  let status: SignupStatus;
  if (existing && (existing.status === "pending_payment" || existing.status === "paid")) {
    status = existing.status as SignupStatus;
  } else {
    const { count, error: countError } = await supabase
      .from("signups")
      .select("*", { count: "exact", head: true })
      .in("status", ["pending_payment", "paid"]);

    if (countError) {
      console.error("[signup] count failed", countError);
      return NextResponse.json(
        { ok: false, error: "Could not reach the signup database." },
        { status: 500 },
      );
    }

    status = (count ?? 0) < FOUNDING_SPOTS_TOTAL ? "pending_payment" : "waitlist";
  }

  const { data, error } = await supabase
    .from("signups")
    .upsert(
      {
        first_name: firstName,
        last_name: lastName,
        email,
        status,
        phone: phone ?? null,
        tier_interest: tierInterest ?? null,
      },
      { onConflict: "email" },
    )
    .select("id, status, created_at")
    .single();

  if (error || !data) {
    console.error("[signup] upsert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your signup. Try again shortly." },
      { status: 500 },
    );
  }

  if (!existing) {
    await sendSignupEmails({
      id: data.id as string,
      firstName,
      lastName,
      email,
      status: data.status as SignupStatus,
      createdAt: (data.created_at as string) ?? new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true, status: data.status as SignupStatus });
}
