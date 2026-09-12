import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  serviceArea?: string;
  message?: string;
  // Honeypot field, real users never fill this in.
  website?: string;
};

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    // Honeypot triggered, silently accept without processing.
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, serviceArea, message } = body;

  if (!name || !email || !company || !serviceArea || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // TODO: wire to real CRM/email provider (e.g. via CONTACT_WEBHOOK_URL or an email API key
  // set in Vercel environment variables). Never call it with a client-exposed secret.
  console.info("[contact] submission received", { name, email, company });

  return NextResponse.json({ ok: true });
}
