import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SUBJECT_BY_INTENT = {
  "early-access": "Evrlink — Early access request",
  investors: "Evrlink — Investor inquiry",
} as const;

type ContactIntent = keyof typeof SUBJECT_BY_INTENT;

function isAllowedIntent(s: string): s is ContactIntent {
  return Object.prototype.hasOwnProperty.call(SUBJECT_BY_INTENT, s);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, name, message, intent } = body as Record<string, unknown>;

  if (typeof intent !== "string" || !isAllowedIntent(intent)) {
    return NextResponse.json({ error: "Invalid intent" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const messageText = typeof message === "string" ? message.trim() : "";
  if (!messageText || messageText.length > 8000) {
    return NextResponse.json(
      { error: "Message is required (max 8000 characters)" },
      { status: 400 }
    );
  }

  const nameText =
    typeof name === "string" ? name.trim().slice(0, 200) : "";

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass =
    process.env.SMTP_PASSWORD ?? process.env.SMTP_APP_PASSWORD ?? "";
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_TO;

  if (!host || !portRaw || !user || !pass || !to) {
    return NextResponse.json(
      { error: "Email is not configured on the server" },
      { status: 503 }
    );
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port < 1) {
    return NextResponse.json(
      { error: "Email is not configured on the server" },
      { status: 503 }
    );
  }

  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = SUBJECT_BY_INTENT[intent];
  const text = [
    `Intent: ${intent}`,
    nameText ? `Name: ${nameText}` : null,
    `Reply-To: ${email.trim()}`,
    "",
    messageText,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      from: `"Evrlink website" <${user}>`,
      to,
      replyTo: email.trim(),
      subject,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact mail error:", err);
    return NextResponse.json({ error: "Could not send message" }, { status: 502 });
  }
}
