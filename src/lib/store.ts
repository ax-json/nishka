import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  /** ISO date, e.g. "2026-10-06". */
  date: string;
};

export type Milestone = {
  label: string;
  /** null until a verified number exists. */
  value: number | null;
};

export type ResourceFile = {
  title: string;
  href: string;
};

export type Shelf = {
  title: string;
  detail: string;
  files: ResourceFile[];
};

export type Content = {
  posts: Post[];
  milestones: Milestone[];
  shelves: Shelf[];
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  message: string;
  receivedAt: string;
};

const EMPTY_CONTENT: Content = { posts: [], milestones: [], shelves: [] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isContent(value: unknown): value is Content {
  return (
    isRecord(value) &&
    Array.isArray(value.posts) &&
    Array.isArray(value.milestones) &&
    Array.isArray(value.shelves)
  );
}

async function readJson(file: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error: unknown) {
    if (isRecord(error) && error.code === "ENOENT") return null;
    const reason = error instanceof Error ? error.message : "unknown error";
    throw new Error(`Could not read ${path.basename(file)}: ${reason}`);
  }
}

/** Write via temp file + rename so a crash never leaves half-written JSON. */
async function writeJson(file: string, data: unknown): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const temp = `${file}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(data, null, 2), "utf8");
  await rename(temp, file);
}

export async function getContent(): Promise<Content> {
  const raw = await readJson(CONTENT_FILE);
  if (raw === null) return EMPTY_CONTENT;
  if (!isContent(raw)) throw new Error("data/content.json must have posts, milestones and shelves arrays");
  const posts = [...raw.posts].sort((a, b) => b.date.localeCompare(a.date));
  return { ...raw, posts };
}

// Serialise writes in this process so concurrent submissions don't overwrite each other.
let writeQueue: Promise<unknown> = Promise.resolve();

export function saveMessage(input: Omit<ContactMessage, "id" | "receivedAt">): Promise<ContactMessage> {
  const task = writeQueue.then(async () => {
    const raw = await readJson(MESSAGES_FILE);
    const existing = Array.isArray(raw) ? (raw as ContactMessage[]) : [];
    const message: ContactMessage = { ...input, id: randomUUID(), receivedAt: new Date().toISOString() };
    await writeJson(MESSAGES_FILE, [...existing, message]);
    return message;
  });
  writeQueue = task.catch(() => undefined);
  return task;
}
