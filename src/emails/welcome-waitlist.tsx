import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { LAUNCH_MONTH } from "@/config";

type Props = { firstName: string };

export function WelcomeWaitlistEmail({ firstName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Founding intake is closed. You&apos;re on the launch waitlist.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={label}>APEX VAULT</Text>
          <Text style={heading}>You&apos;re on the list, {firstName}.</Text>
          <Text style={paragraph}>
            Founding intake is closed &mdash; all 30 spots are committed. You&apos;re first in
            line for public memberships when we open in {LAUNCH_MONTH}.
          </Text>
          <Text style={paragraph}>
            If a founding spot opens up before launch (it happens), we&apos;ll come to you in
            order. Either way, no broadcast emails between now and then.
          </Text>
          <Hr style={hr} />
          <Text style={muted}>
            Reply to this email if anything is unclear.
          </Text>
          <Text style={muted}>Ross Taylor &mdash; Founder, Apex Vault</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeWaitlistEmail;

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
  margin: "0 0 28px 0",
};

const heading: React.CSSProperties = {
  fontSize: "26px",
  lineHeight: "1.2",
  fontWeight: 600,
  color: "#f5f6f8",
  margin: "0 0 20px 0",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.65",
  color: "#cdd1da",
  margin: "0 0 16px 0",
};

const hr: React.CSSProperties = {
  borderColor: "#22242b",
  borderStyle: "solid",
  borderWidth: "1px 0 0 0",
  margin: "28px 0",
};

const muted: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.55",
  color: "#7a7f8c",
  margin: "0 0 8px 0",
};
