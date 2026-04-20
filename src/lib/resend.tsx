import { Resend } from "resend";
import { render } from "@react-email/components";
import { WelcomeFoundingEmail } from "@/emails/welcome-founding";
import { WelcomeWaitlistEmail } from "@/emails/welcome-waitlist";
import { AdminAlertEmail } from "@/emails/admin-alert";
import type { SignupStatus } from "@/lib/supabase";

let cached: Resend | null | undefined;

function getResend(): Resend | null {
  if (cached !== undefined) return cached;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    cached = null;
    return cached;
  }

  cached = new Resend(key);
  return cached;
}

function getFromAddress(): string {
  return process.env.RESEND_FROM_EMAIL || "Apex Vault <onboarding@resend.dev>";
}

function getAdminRecipients(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function getDashboardUrl(): string | null {
  const url = process.env.SUPABASE_URL;
  if (!url) return null;
  const match = url.match(/^https?:\/\/([^.]+)\.supabase\.co/);
  if (!match) return null;
  return `https://supabase.com/dashboard/project/${match[1]}/editor`;
}

type SignupEmailInput = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: SignupStatus;
  createdAt: string;
};

export async function sendSignupEmails(input: SignupEmailInput): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const from = getFromAddress();
  const admins = getAdminRecipients();
  const dashboardUrl = getDashboardUrl();

  const memberSubject =
    input.status === "pending_payment"
      ? "You're in. Welcome to Apex Vault."
      : "On the launch waitlist.";

  const memberTemplate =
    input.status === "pending_payment" ? (
      <WelcomeFoundingEmail firstName={input.firstName} />
    ) : (
      <WelcomeWaitlistEmail firstName={input.firstName} />
    );

  const adminSubject = `[Apex Vault] New signup — ${input.firstName} ${input.lastName} (${input.status})`;

  try {
    const memberHtml = await render(memberTemplate);
    const memberText = await render(memberTemplate, { plainText: true });

    await resend.emails.send({
      from,
      to: input.email,
      subject: memberSubject,
      html: memberHtml,
      text: memberText,
    });
  } catch (err) {
    console.error("[resend] member email failed", err);
  }

  if (admins.length === 0) return;

  try {
    const adminTemplate = (
      <AdminAlertEmail
        firstName={input.firstName}
        lastName={input.lastName}
        email={input.email}
        status={input.status}
        createdAt={input.createdAt}
        signupId={input.id}
        dashboardUrl={dashboardUrl}
      />
    );

    const adminHtml = await render(adminTemplate);
    const adminText = await render(adminTemplate, { plainText: true });

    await resend.emails.send({
      from,
      to: admins,
      subject: adminSubject,
      html: adminHtml,
      text: adminText,
    });
  } catch (err) {
    console.error("[resend] admin email failed", err);
  }
}
