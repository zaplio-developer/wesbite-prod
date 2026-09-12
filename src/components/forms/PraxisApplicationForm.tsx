"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function PraxisApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/praxis-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-sm text-foreground">
        Thanks, we&apos;ve received your application and will be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" required autoComplete="name" />
        <FormField label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Phone" name="phone" type="tel" autoComplete="tel" />
        <FormField label="University / college" name="university" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Graduation year" name="graduationYear" required />
      </div>
      <FormField label="Why PRAXIS?" name="message" as="textarea" />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="praxis-website">Website</label>
        <input id="praxis-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
