"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const serviceAreaOptions = [
  "Cybersecurity Services",
  "Cloud & Data Center",
  "Managed IT Services",
  "Network Transformation",
  "Digital Workplace",
  "Professional Services / Consulting",
  "Not sure yet",
];

export function ContactForm() {
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
      const response = await fetch("/api/contact", {
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
        Thanks, we&apos;ve received your message and will be in touch within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" name="name" required autoComplete="name" />
        <FormField label="Work email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Company" name="company" required autoComplete="organization" />
        <Select
          label="Service area"
          name="serviceArea"
          placeholder="Select a service area"
          options={serviceAreaOptions}
          required
        />
      </div>
      <FormField label="Project description" name="message" as="textarea" required placeholder="Tell us about your project" />

      {/* Honeypot field, hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
