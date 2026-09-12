import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PraxisApplicationPayload = {
  name?: string;
  email?: string;
  phone?: string;
  university?: string;
  graduationYear?: string;
  message?: string;
  // Honeypot field, real users never fill this in.
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

  const { name, email, phone, university, graduationYear, message } = body;

  if (!name || !email || !university || !graduationYear) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // TODO: also wire to a real ATS/CRM provider once one is chosen. Never call it with a
  // client-exposed secret.
  if (process.env.POSTGRES_PRISMA_URL) {
    await prisma.praxisApplication.create({
      data: { name, email, phone, university, graduationYear, message },
    });
  } else {
    console.info("[praxis-application] POSTGRES_PRISMA_URL not set, logging instead of persisting", {
      name,
      email,
      university,
    });
  }

  return NextResponse.json({ ok: true });
}
