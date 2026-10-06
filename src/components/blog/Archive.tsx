"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Post } from "@/lib/store";

const CATEGORIES = [
  "All",
  "Field notes",
  "Research",
  "Credit",
  "Women & work",
  "Policy",
  "Data",
  "Conversations",
] as const;

type Category = (typeof CATEGORIES)[number];

function matches(post: Post, category: Category, query: string): boolean {
  const inCategory = category === "All" || post.category === category;
  const needle = query.trim().toLowerCase();
  const inQuery = needle === "" || `${post.title} ${post.excerpt}`.toLowerCase().includes(needle);
  return inCategory && inQuery;
}

type Props = {
  /** Posts from data/content.json, newest first. */
  posts: readonly Post[];
  /** Rendered when no post matches the current filter. */
  emptyState: ReactNode;
};

export function Archive({ posts, emptyState }: Props) {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const visible = posts.filter((post) => matches(post, category, query));

  return (
    <>
      <div className="flex flex-col gap-6 border-y border-rule py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              data-active={item === category}
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 border-b border-rule pb-2 lg:w-[280px]">
          <svg
            viewBox="0 0 16 16"
            className="h-[13px] w-[13px] text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="m11 11 3.5 3.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Search the archive</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive…"
            className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-faint"
          />
        </label>
      </div>

      <div className="mt-14">
        {visible.length === 0 ? (
          emptyState
        ) : (
          <ul className="grid gap-10 md:grid-cols-2">
            {visible.map((post) => (
              <li key={post.slug} className="border-t border-rule pt-6">
                <p className="mono-label !text-[10px]">
                  {post.category} · {post.date}
                </p>
                <h2 className="h3 mt-3">{post.title}</h2>
                <p className="body-sm mt-3">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
