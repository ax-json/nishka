import { existsSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

type PageHeroProps = {
  label: string;
  title: ReactNode;
  lede: ReactNode;
};

export function PageHero({ label, title, lede }: PageHeroProps) {
  return (
    <section className="shell pt-[clamp(72px,10vw,120px)] pb-[clamp(56px,8vw,96px)]">
      <Reveal>
        <p className="mono-label">{label}</p>
        <h1 className="display display-page mt-7 max-w-[22ch]">{title}</h1>
        <p className="lede mt-10 max-w-[62ch]">{lede}</p>
      </Reveal>
    </section>
  );
}

type SectionIntroProps = {
  label: string;
  title: ReactNode;
  tone?: "paper" | "night";
  className?: string;
};

export function SectionIntro({ label, title, tone = "paper", className = "" }: SectionIntroProps) {
  const labelClass = tone === "night" ? "mono-label !text-accent-soft" : "mono-label";
  const titleClass = tone === "night" ? "h2 mt-5 text-paper-light" : "h2 mt-5";
  return (
    <Reveal className={className}>
      <p className={labelClass}>{label}</p>
      <h2 className={titleClass}>{title}</h2>
    </Reveal>
  );
}

type EmptyNotesProps = {
  detail: string;
};

export function EmptyNotes({ detail }: EmptyNotesProps) {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center border border-dashed border-faint/70 bg-card/60 px-6 py-20 text-center">
      <p className="hand">something is being written…</p>
      <p className="mt-4 font-serif text-[28px] italic text-ink">First notes are on their way.</p>
      <p className="body-sm mt-4 max-w-[44ch]">{detail}</p>
    </div>
  );
}

type PhotoProps = {
  /** File name inside /public/images. Shows a tonal placeholder until the file exists. */
  file: string;
  alt: string;
  aspect: string;
  caption?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

function hasImage(file: string): boolean {
  return existsSync(path.join(process.cwd(), "public", "images", file));
}

export function Photo({ file, alt, aspect, caption, tone = "light", className = "", children }: PhotoProps) {
  const placeholder =
    tone === "dark"
      ? "bg-[radial-gradient(120%_90%_at_30%_25%,#5d585b_0%,#2c292b_55%,#1d1b1c_100%)]"
      : "bg-[radial-gradient(120%_90%_at_35%_30%,#d9d4d3_0%,#a8a2a3_55%,#7c7678_100%)]";

  return (
    <figure className={className}>
      <div className={`relative ${aspect}`}>
        <div className="absolute inset-0 overflow-hidden">
          {hasImage(file) ? (
            // eslint-disable-next-line @next/next/no-img-element -- local photos, grayscale treatment applied in CSS
            <img src={`/images/${file}`} alt={alt} className="h-full w-full object-cover grayscale contrast-[1.05]" />
          ) : (
            <div role="img" aria-label={alt} className={`h-full w-full ${placeholder}`} />
          )}
        </div>
        {children}
      </div>
      {caption && <figcaption className="mono-label mt-4 !text-[10px] !leading-[1.7]">{caption}</figcaption>}
    </figure>
  );
}
