import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { Arrow, PageHero, Photo, SectionIntro } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "About" };

const IS = [
  "A research initiative",
  "An exploration of alternative credit data",
  "A bridge between research and financial institutions",
  "An effort to understand underserved borrowers",
];

const IS_NOT = [
  "A lender",
  "A replacement for credit bureaus",
  "A guaranteed loan-access platform",
  "A promise that alternative data alone eliminates lending risk",
];

function ScopeList({ label, items, tone }: { label: string; items: string[]; tone: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div className={`px-8 py-12 md:px-14 ${isDark ? "band-night" : "bg-card"}`}>
      <p className={`mono-label ${isDark ? "!text-night-text/50" : ""}`}>{label}</p>
      <ul className="mt-8 space-y-6">
        {items.map((item, index) => (
          <Reveal as="li" key={item} delay={index * 90} className="flex items-baseline gap-5">
            <span className={`h-[7px] w-[7px] shrink-0 rounded-full border ${isDark ? "border-night-text/40" : "border-faint"}`} />
            <span className={`font-serif text-[20px] leading-[1.35] ${isDark ? "text-paper-light" : "text-ink"}`}>{item}</span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Why Nishka exists"
        lede="Project Nishka began with a question that would not go away. Not a slogan — a genuine puzzle, noticed in the everyday financial lives of people who borrow, save and repay far from any formal file."
      />

      <div className="shell">
        <Reveal className="border-y border-rule py-16 md:py-20">
          <blockquote className="max-w-[44ch] font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.45] text-ink-soft italic">
            “How can financial systems recognise responsible borrowers whose financial lives are not fully represented by
            conventional credit histories?”
          </blockquote>
        </Reveal>
      </div>

      <section className="shell section grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionIntro label="The idea" title="Start where the record stops" />
          <Reveal delay={100}>
            <p className="body mt-8">
              Across India, millions of people — women especially — run enterprises, save in small disciplined amounts,
              clear community loans on time, and pay their bills with a regularity any lender would admire. Almost none of
              it appears in a credit bureau file.
            </p>
            <p className="body mt-6">
              Nishka focuses on alternative borrower-level data — the traces of financial responsibility that sit outside
              conventional reports — and on underserved women entrepreneurs, for whom the distance between a well-run
              financial life and a thin credit file is widest. The work is deliberately empirical: gather the data, test
              the signals, and say honestly what they do and do not show.
            </p>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
          <Photo
            file="ledger-pen.jpg"
            alt="A hand writing entries into a ledger with a fountain pen"
            aspect="aspect-[4/3]"
            tone="dark"
            caption="Placeholder photograph · documentary reference"
          />
          <p className="hand mt-4 rotate-[-1.5deg] !text-[19px] !text-ink-soft">notes first; conclusions later</p>
        </Reveal>
      </section>

      <section className="shell pb-[clamp(72px,10vw,128px)]">
        <SectionIntro label="Scope, stated plainly" title="What Nishka is – and isn't" />
        <div className="mt-14 grid border border-rule md:grid-cols-2">
          <ScopeList label="Nishka is" items={IS} tone="light" />
          <ScopeList label="Nishka is not" items={IS_NOT} tone="dark" />
        </div>
      </section>

      <section className="band-light border-y border-rule">
        <div className="shell section grid items-start gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Photo
              file="portrait-akshara.jpg"
              alt="Portrait of Akshara Dalan"
              aspect="aspect-[4/5]"
              caption="Portrait — placeholder, to be replaced"
            >
              <span className="absolute inset-0 flex items-center justify-center bg-paper-deep font-serif text-[64px] text-faint">
                A.D.
              </span>
            </Photo>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <p className="mono-label">Who is behind Nishka</p>
            <h2 className="h2 mt-5">Akshara Dalan</h2>
            <p className="mono-label mt-4 !text-[10px]">Founder &amp; lead researcher</p>
            <p className="body mt-8">
              Project Nishka began for me with a habit of paying attention. I kept meeting capable, careful business owners
              — most of them women — who were told “insufficient record” by systems that never looked at how they actually
              ran their money: the rent paid without fail, the community loan cleared on time, the income that arrives in
              small, irregular, remarkably reliable streams.
            </p>
            <p className="body mt-6">
              Nishka is my attempt to look again — carefully, statistically and in the open — and to ask whether the
              traces we leave outside the credit file can be read responsibly.
            </p>
            <blockquote className="hand mt-10 border-l border-ink-soft/50 pl-7 !text-[27px] !leading-[1.35] !text-ink">
              The evidence was always there. The file was never wide enough to hold it.
            </blockquote>
            <p className="mono-label mt-10 !text-[10px] !leading-[1.8] !text-faint">
              Placeholder biography — this vignette will be replaced with Akshara&apos;s own words
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-deep/60">
        <div className="shell flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <p className="font-serif text-[clamp(22px,2.2vw,28px)]">Curious about the work behind the question?</p>
          <Link href="/research" className="btn-dark">
            Explore the research <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
