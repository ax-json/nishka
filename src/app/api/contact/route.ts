import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;
const MAX_FIELD_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  hits.set(ip, [...recent, now]);
  return recent.length >= RATE_LIMIT;
}

function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) return fail("Too many messages — please try again in a minute.", 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Request body must be JSON.", 400);
  }
  if (typeof body !== "object" || body === null) return fail("Request body must be an object.", 400);

  const record = body as Record<string, unknown>;
  const name = field(record, "name");
  const email = field(record, "email");
  const organisation = field(record, "organisation");
  const message = field(record, "message");

  if (name === "" || name.length > MAX_FIELD_LENGTH) return fail("Please tell us your name.", 400);
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_FIELD_LENGTH) return fail("Please enter a valid email address.", 400);
  if (organisation.length > MAX_FIELD_LENGTH) return fail("Organisation name is too long.", 400);
  if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return fail(`Message must be between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters.`, 400);
  }

  try {
    const saved = await saveMessage({ name, email, organisation, message });
    return NextResponse.json({ success: true, data: { id: saved.id } }, { status: 201 });
  } catch (error: unknown) {
    console.error("[contact] failed to save message", error);
    return fail("We couldn't save your note. Please try again.", 500);
  }
}
