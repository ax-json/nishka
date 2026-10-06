import Link from "next/link";

type Props = {
  tone?: "ink" | "light";
  size?: "sm" | "lg";
};

/** Small "signal" glyph — traces radiating outward — followed by the wordmark. */
export function Logo({ tone = "ink", size = "sm" }: Props) {
  const wordColor = tone === "ink" ? "text-ink" : "text-paper-light";
  const glyphColor = tone === "ink" ? "text-ink-soft" : "text-accent-soft";
  const wordSize = size === "sm" ? "text-[22px]" : "text-[32px]";

  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="Nishka — home">
      <svg
        viewBox="0 0 20 16"
        className={`h-[13px] w-[16px] ${glyphColor}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M1.5 6.5a12 12 0 0 1 17 0" />
        <path d="M4.5 9.5a7.5 7.5 0 0 1 11 0" />
        <path d="M7.5 12.5a3.4 3.4 0 0 1 5 0" />
        <circle cx="10" cy="14.6" r="0.6" fill="currentColor" stroke="none" />
      </svg>
      <span className={`font-serif tracking-[-0.01em] ${wordSize} ${wordColor}`}>Nishka</span>
    </Link>
  );
}
