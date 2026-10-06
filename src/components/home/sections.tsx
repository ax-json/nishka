import Link from "next/link";
import { Reveal } from "@/components/ui/motion";
import { Arrow, EmptyNotes, Photo, SectionIntro } from "@/components/ui/primitives";
import { StatBand } from "@/components/ui/StatBand";
import type { Stat } from "@/components/ui/StatBand";
import { getContent } from "@/lib/store";

const HOME_STATS: readonly Stat[] = [
  { value: 1.37, decimals: 2, prefix: "₹", suffix: "T", label: "estimated demand–supply gap for women-led enterprises" },
  { value: 14, suffix: "%", label: "of credit-eligible women are served by providers" },
  { value: 43, suffix: "%", compare: "93%", label: "women's credit-to-deposit ratio, against 93% for men" },
  { value: 724, suffix: "M", label: "people underserved or unserved among India's credit-eligible population" },
];

export const SIGNALS = [
  "Income patterns",
  "Employment stability",
  "Utility & rent payment behaviour",
  "UPI activity",
  "Phone tenure",
  "E-commerce behaviour",
  "Income sources",
] as const;

const TRACES: readonly { title: string; note: string }[] = [
  { title: "Income patterns", note: "how money arrives, not just how much" },
  { title: "Employment stability", note: "continuity of work over time" },
  { title: "Utility & rent payment behaviour", note: "obligations met, month after month" },
  { title: "UPI activity", note: "digital transactions as a behavioural record" },
  { title: "Phone tenure", note: "years of a stable, verifiable identity" },
  { title: "E-commerce behaviour", note: "purchases that mirror cash-flow" },
  { title: "Income sources", note: "many small streams vs one formal salary" },
];

const CREDIT_FILE = ["Bureau record & repayment history", "Formal loans & collateral", "Documented income on file"];

const AUDIENCES = [
  "Financial institutions",
  "NGOs",
  "Researchers",
  "Educators",
  "Community organisations",
  "Credit professionals",
];

function PhotoTag({ children, className }: { children: string; className: string }) {
  return (
    <span className={`absolute bg-card/95 px-3 py-2 font-mono text-[9.5px] tracking-[0.2em] text-ink-soft uppercase shadow-[0_6px_24px_-12px_rgba(34,31,34,0.35)] ${className}`}>
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section className="shell grid items-center gap-16 pt-[clamp(56px,8vw,96px)] pb-[clamp(72px,10vw,120px)] lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <p className="mono-label flex items-center gap-3 lg:whitespace-nowrap">
          <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
          Project Nishka — a research initiative on credit &amp; financial inclusion
        </p>
        <h1 className="display mt-8">
          Credit should see
          <br />
          <em>more than</em>
          <br />a credit score.
        </h1>
        <p className="lede mt-10 max-w-[46ch]">
          Project Nishka explores how alternative data can help make formal credit more accessible to underserved women
          entrepreneurs in India.
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-8">
          <Link href="/research" className="btn-dark">
            Explore the research <Arrow />
          </Link>
          <Link href="/about" className="link-rule">
            Why Nishka?
          </Link>
        </div>
        <p className="mono-label mt-12 !text-faint">Not a lender · Not a credit bureau · A research initiative</p>
      </Reveal>

      <Reveal delay={150} className="lg:col-span-5 lg:pl-6">
        <Photo
          file="hero-vendor.jpg"
          alt="A woman vegetable vendor seated at her market stall, smiling"
          aspect="aspect-[4/5]"
          caption="Illustrative portrait · documentary reference, not a real borrower"
        >
          <PhotoTag className="top-6 -left-6">Rent · paid on time</PhotoTag>
          <PhotoTag className="top-[34%] -right-5">UPI · steady activity</PhotoTag>
          <PhotoTag className="bottom-[22%] -left-8">Phone tenure · 4 yrs</PhotoTag>
          <PhotoTag className="right-4 bottom-5">Income · small but steady</PhotoTag>
        </Photo>
        <p className="hand -mt-1 rotate-[-2deg] text-[19px]">the file only sees part of this ↓</p>
      </Reveal>
    </section>
  );
}

export function Stats() {
  return (
    <section className="band-light border-y border-rule">
      <div className="shell">
        <StatBand stats={HOME_STATS} />
        <div className="flex flex-col gap-6 border-t border-rule py-7 md:flex-row md:items-center md:justify-between">
          <p className="mono-label max-w-[78ch] !text-[10px] !leading-[1.8] !text-faint">
            Figures from public reports · full source citations are being compiled and will be published with
            Nishka&apos;s first research outputs
          </p>
          <Link href="/the-problem#sources" className="link-rule shrink-0 !text-[12.5px]">
            Sources &amp; methodology <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SignalMarquee() {
  const row = [...SIGNALS, ...SIGNALS];
  return (
    <div className="overflow-hidden border-b border-rule bg-paper-light py-5" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {row.map((signal, index) => (
              <span key={`${copy}-${index}`} className="mono-label flex items-center gap-10 pr-10 !text-ink-soft/70">
                {signal}
                <span className="h-[4px] w-[4px] rounded-full bg-accent-soft" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TheIdea() {
  return (
    <section className="shell section grid gap-16 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <p className="mono-label">The idea</p>
        <h2 className="h2 mt-5">What if financial responsibility leaves traces beyond a credit report?</h2>
        <p className="body mt-8">
          Many people demonstrate financial responsibility through behaviours that conventional credit histories may not
          fully capture — rent paid without fail, a phone bill cleared for years, income that arrives in small, irregular
          but reliable streams.
        </p>
        <p className="body mt-6">
          Nishka investigates whether borrower-level alternative data can provide additional information for assessing
          credit risk — and whether that information can help financial institutions see underserved borrowers more
          clearly.
        </p>
        <div className="mt-10 border-l-2 border-ink bg-card px-7 py-6">
          <p className="text-[14px] leading-[1.7] text-ink-soft">
            <strong className="font-semibold text-ink">
              Nishka is not a lender and does not replace existing credit scores.
            </strong>{" "}
            It is a research and impact initiative exploring alternative data that can help financial institutions better
            understand underserved borrowers.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
        <div className="border border-rule bg-card px-8 py-9">
          <p className="mono-label">The traditional view</p>
          <h3 className="h3 mt-3">What a credit file sees</h3>
          <ul className="mt-7 space-y-4">
            {CREDIT_FILE.map((item) => (
              <li key={item} className="flex items-center gap-4 text-[14px] text-ink-soft">
                <span className="h-[4px] w-[4px] rounded-full bg-muted" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center py-7">
          <span className="relative flex h-14 w-px items-center justify-center bg-rule">
            <span className="h-[7px] w-[7px] rounded-full bg-accent" />
          </span>
        </div>

        <div className="border border-rule bg-card px-8 py-9">
          <p className="mono-label">Additional signals</p>
          <h3 className="h3 mt-3">What else leaves traces</h3>
          <ol className="mt-7">
            {TRACES.map((trace, index) => (
              <li
                key={trace.title}
                className="group flex items-baseline gap-5 border-b border-rule/70 py-[14px] last:border-b-0"
              >
                <span className="font-mono text-[10px] text-faint">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[14.5px] text-ink transition-colors group-hover:text-accent">{trace.title}</span>
                <span className="ml-auto hidden text-right text-[12px] text-muted sm:block">{trace.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

export function WhyWomen() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="band-night flex min-h-[560px] items-end px-[clamp(20px,5vw,64px)] py-20 lg:min-h-[760px] lg:pl-[max(64px,calc((100vw-1240px)/2+64px))]">
        <Reveal>
          <p className="mono-label !text-accent-soft">Why women</p>
          <p className="mt-8 max-w-[19ch] font-serif text-[clamp(28px,2.8vw,38px)] leading-[1.32] text-paper-light">
            The gap is not simply about whether women borrow. It is about whether financial systems can{" "}
            <em className="text-accent-soft">see them clearly enough</em> to lend.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col justify-center gap-14 px-[clamp(20px,5vw,64px)] py-20 lg:pr-[max(64px,calc((100vw-1240px)/2+64px))] lg:pl-16">
        <Reveal>
          <p className="body">
            Women entrepreneurs form a substantial share of India&apos;s informal and semi-formal economy, yet remain
            under-represented in formal credit portfolios. The reasons are structural: thinner credit files, lower
            collateral ownership, and assessment systems built around financial lives that look different from the
            standard borrower profile.
          </p>
          <p className="body mt-6">
            None of this suggests women are riskier borrowers. It suggests the data used to judge them is thinner than the
            lives it is meant to describe. Nishka focuses on women entrepreneurs because that is where the mismatch
            between financial responsibility and its representation is sharpest.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:ml-10">
          <Photo
            file="garland-maker.jpg"
            alt="A woman in a polka-dot sari stringing a flower garland"
            aspect="aspect-[16/10]"
            tone="dark"
            caption="Placeholder photograph · documentary reference"
          />
        </Reveal>
      </div>
    </section>
  );
}

const LATEST_COUNT = 3;

export async function LatestNotes() {
  const { posts } = await getContent();
  const latest = posts.slice(0, LATEST_COUNT);
  return (
    <section className="border-y border-rule">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro label="Latest from Nishka" title="Notes from the work" />
          <Link href="/blog" className="link-rule">
            View all writing <Arrow />
          </Link>
        </div>
        <Reveal className="mt-14">
          {latest.length === 0 ? (
            <EmptyNotes detail="The archive fills as research and field notes are published." />
          ) : (
            <ul className="grid gap-10 md:grid-cols-3">
              {latest.map((post) => (
                <li key={post.slug} className="border-t border-rule pt-6">
                  <p className="mono-label !text-[10px]">
                    {post.category} · {post.date}
                  </p>
                  <h3 className="h3 mt-3">{post.title}</h3>
                  <p className="body-sm mt-3">{post.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function WorkWithUs() {
  return (
    <section className="shell section grid gap-14 lg:grid-cols-12">
      <Reveal className="lg:col-span-8">
        <h2 className="font-serif text-[clamp(34px,3.8vw,52px)] leading-[1.1] tracking-[-0.02em]">
          Better credit decisions begin
          <br />
          with <em className="accent-italic">better questions.</em>
        </h2>
        <p className="body mt-8 max-w-[56ch]">
          Nishka works with people who want to examine — not just assume — what responsible borrowing looks like. That
          includes financial institutions, NGOs, researchers, educators, community organisations and credit professionals.
        </p>
        <div className="mt-11 flex flex-wrap items-center gap-8">
          <Link href="/contact" className="btn-dark">
            Get in touch
          </Link>
          <span className="hand rotate-[-2deg] !text-[19px] !text-muted">no cold outreach — just a conversation</span>
        </div>
      </Reveal>
      <Reveal delay={150} className="lg:col-span-3 lg:col-start-10">
        <ul className="space-y-5 border-l border-rule pl-7">
          {AUDIENCES.map((audience) => (
            <li key={audience} className="mono-label !text-[10.5px]">
              {audience}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
