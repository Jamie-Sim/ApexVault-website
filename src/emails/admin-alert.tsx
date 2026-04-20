import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import type { SignupStatus } from "@/lib/supabase";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  status: SignupStatus;
  createdAt: string;
  signupId: string;
  dashboardUrl: string | null;
};

export function AdminAlertEmail({
  firstName,
  lastName,
  email,
  status,
  createdAt,
  signupId,
  dashboardUrl,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`New signup: ${firstName} ${lastName} (${status})`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={label}>APEX VAULT &mdash; ADMIN</Text>
          <Text style={heading}>New signup</Text>
          <Row k="Name" v={`${firstName} ${lastName}`} />
          <Row k="Email" v={email} />
          <Row k="Status" v={status} />
          <Row k="When" v={createdAt} />
          <Row k="ID" v={signupId} />
          <Hr style={hr} />
          {dashboardUrl ? (
            <Text style={paragraph}>
              <Link href={dashboardUrl} style={link}>
                Open Supabase signups table &rarr;
              </Link>
            </Text>
          ) : (
            <Text style={muted}>Set SUPABASE_URL to enable a dashboard link.</Text>
          )}
        </Container>
      </Body>
    </Html>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <Text style={rowText}>
      <span style={rowKey}>{k}: </span>
      <span style={rowValue}>{v}</span>
    </Text>
  );
}

export default AdminAlertEmail;

const body: React.CSSProperties = {
  backgroundColor: "#0b0b0d",
  color: "#e8eaf0",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 28px",
};

const label: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.24em",
  color: "#9aa0ad",
  margin: "0 0 12px 0",
};

const heading: React.CSSProperties = {
  fontSize: "22px",
  lineHeight: "1.2",
  fontWeight: 600,
  color: "#f5f6f8",
  margin: "0 0 24px 0",
};

const rowText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.55",
  color: "#cdd1da",
  margin: "0 0 6px 0",
};

const rowKey: React.CSSProperties = {
  color: "#7a7f8c",
};

const rowValue: React.CSSProperties = {
  color: "#e8eaf0",
};

const paragraph: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.55",
  color: "#cdd1da",
  margin: "0 0 12px 0",
};

const link: React.CSSProperties = {
  color: "#cdd1da",
  textDecoration: "underline",
};

const muted: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.55",
  color: "#7a7f8c",
  margin: "0",
};

const hr: React.CSSProperties = {
  borderColor: "#22242b",
  borderStyle: "solid",
  borderWidth: "1px 0 0 0",
  margin: "20px 0",
};
