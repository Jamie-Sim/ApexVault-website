import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { FOUNDING_FEE_GBP, LAUNCH_MONTH } from "@/config";

type Props = { firstName: string };

export function WelcomeFoundingEmail({ firstName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>You&apos;re on the founding list. Ross will be in touch within 48 hours.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={label}>APEX VAULT</Text>
          <Text style={heading}>You&apos;re in, {firstName}.</Text>
          <Text style={paragraph}>
            Your founding-member spot is held. Ross will be in touch within 48 hours with the
            payment link for the £{FOUNDING_FEE_GBP} joining fee &mdash; no spam between now and
            then.
          </Text>
          <Text style={paragraph}>
            Once that lands, you&apos;re locked in for {LAUNCH_MONTH}: permanent exemption from
            future joining fees, lifetime access to The Drive Club, and first-drive on every car
            we add to the fleet.
          </Text>
          <Hr style={hr} />
          <Section>
            <Text style={paragraph}>
              The whole point of Apex Vault is the drive &mdash; analog dials, real steering,
              gear changes that feel like conversations. We take the hit on the storage,
              maintenance, and insurance. You take the keys.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={muted}>
            Full refund if the launch doesn&apos;t proceed. Reply to this email if anything is
            unclear.
          </Text>
          <Text style={muted}>Ross Taylor &mdash; Founder, Apex Vault</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeFoundingEmail;

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
