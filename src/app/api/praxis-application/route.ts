import { NextResponse } from "next/server";

type PraxisApplicationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  university?: string;
  graduationYear?: string;
  message?: string;
  // Honeypot field — real users never fill this in.
  website?: string;
};

export async function POST(request: Request) {
  let body: PraxisApplicationPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, university, graduationYear } = body;

  if (!name || !email || !university || !graduationYear) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // TODO: wire to real CRM/ATS provider set via environment variables. Never call it with a
  // client-exposed secret.
  console.info("[praxis-application] submission received", { name, email, university });

  return NextResponse.json({ ok: true });
}
