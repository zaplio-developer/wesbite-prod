import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

  // TODO: also wire to a real CRM/email provider once one is chosen. Never call it with a
  // client-exposed secret.
  if (process.env.POSTGRES_PRISMA_URL) {
    await prisma.contactSubmission.create({
      data: { name, email, company, serviceArea, message },
    });
  } else {
    console.info("[contact] POSTGRES_PRISMA_URL not set, logging instead of persisting", {
      name,
      email,
      company,
    });
  }

  return NextResponse.json({ ok: true });
}
