"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;

type Fields = {
  name: string;
  email: string;
  organisation: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", organisation: "", message: "" };

const TEXT_FIELDS = [
  { key: "name", label: "Name", type: "text", placeholder: "Your name" },
  { key: "email", label: "Email", type: "email", placeholder: "you@organisation.org" },
  { key: "organisation", label: "Organisation (optional)", type: "text", placeholder: "Bank, NGO, university…" },
] as const;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim() === "") errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Please enter a valid email address.";
  if (fields.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `A sentence or two helps — at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  return errors;
}

const INPUT_CLASS =
  "mt-3 w-full border-b border-rule bg-transparent pb-3 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setServerError(null);
    if (Object.keys(found).length > 0) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result: { success?: boolean; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        setServerError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      setIsSent(true);
      setFields(EMPTY);
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  }

  if (isSent) {
    return (
      <div className="border border-dashed border-faint bg-card/70 px-8 py-14 text-center" role="status">
        <p className="hand">thank you</p>
        <p className="mt-3 font-serif text-[26px] italic">Your note has arrived.</p>
        <p className="body-sm mx-auto mt-3 max-w-[46ch]">We read every message and will reply from a real inbox.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-10">
      {TEXT_FIELDS.map((field) => (
        <label key={field.key} className="block">
          <span className="mono-label !text-[10px]">{field.label}</span>
          <input
            type={field.type}
            value={fields[field.key]}
            onChange={(event) => update(field.key, event.target.value)}
            placeholder={field.placeholder}
            aria-invalid={Boolean(errors[field.key])}
            className={INPUT_CLASS}
          />
          {errors[field.key] && <span className="mt-2 block text-[12.5px] text-accent">{errors[field.key]}</span>}
        </label>
      ))}
      <label className="block">
        <span className="mono-label !text-[10px]">What would you like to talk about?</span>
        <textarea
          rows={5}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="A question, a dataset, a collaboration…"
          aria-invalid={Boolean(errors.message)}
          className={`${INPUT_CLASS} resize-none`}
        />
        {errors.message && <span className="mt-2 block text-[12.5px] text-accent">{errors.message}</span>}
      </label>
      {serverError && (
        <p role="alert" className="text-[13px] text-accent">
          {serverError}
        </p>
      )}
      <button type="submit" className="btn-dark disabled:opacity-60" disabled={isSending}>
        {isSending ? "Sending…" : "Send note"}{" "}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}
