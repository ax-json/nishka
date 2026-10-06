import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { DotGrid, RatioBars } from "@/components/problem/charts";
import type { Bar } from "@/components/problem/charts";
import { CountUp, Reveal } from "@/components/ui/motion";
import { Arrow, PageHero, Photo } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "The Problem" };

const PEOPLE_PER_DOT_MILLIONS = 2;
const UNDERSERVED_MILLIONS = 724;

const RATIO_BARS: readonly Bar[] = [
  { label: "Women", value: 43, tone: "accent" },
  { label: "Men", value: 93, tone: "ink" },
];

const CAPTURED = ["Formal loan history", "Credit card repayments", "Bureau enquiries"];
const UNSEEN = [
  "Rent paid monthly",
  "UPI transactions",
  "Phone tenure",
  "Irregular but steady income",
  "Community lending",
  "Supplier credit",
];

function SourceNote() {
  return (
    <p className="mono-label mt-6 !text-[10px] !leading-[1.8] !text-faint">
      Source: full citation to be added — see{" "}
      <Link href="#sources" className="underline underline-offset-4 hover:text-accent">
        sources &amp; methodology
      </Link>
    </p>
  );
}

type ChapterProps = {
  number: string;
  title: string;
  band?: boolean;
  children: ReactNode;
  aside: ReactNode;
};

function Chapter({ number, title, band = false, children, aside }: ChapterProps) {
  return (
    <section className={band ? "band-light border-y border-rule" : ""}>
      <div className="shell section grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-[11px] text-muted">{number}</p>
          <h2 className="h2 mt-4">{title}</h2>
          <div className="mt-8">{children}</div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
          {aside}
        </Reveal>
      </div>
    </section>
  );
}

export default function ProblemPage() {
  return (
    <>
      <PageHero
        label="The problem"
        title={
          <>
            The people credit systems<br /> <em>struggle to see</em>
          </>
        }
        lede="Financial exclusion in India is rarely dramatic. It is quiet and procedural — an application declined, a file marked insufficient, a borrower whose financial life is perfectly legible to her community and invisible to a system."
      />

      <Chapter
        number="01"
        title="The credit gap"
        aside={
          <>
            <p className="font-mono text-[clamp(48px,5vw,68px)] leading-none tracking-[-0.03em]">
              <CountUp value={UNDERSERVED_MILLIONS} suffix="M" />
            </p>
            <p className="body-sm mt-4 max-w-[46ch]">
              people underserved or unserved among India&apos;s credit-eligible population
            </p>
            <div className="mt-10">
              <DotGrid
                dots={UNDERSERVED_MILLIONS / PEOPLE_PER_DOT_MILLIONS}
                label="362 dots, each standing for two million people"
              />
            </div>
            <p className="mono-label mt-6 !text-[10px]">Each dot ≈ {PEOPLE_PER_DOT_MILLIONS} million people</p>
            <SourceNote />
          </>
        }
      >
        <p className="body">
          A large share of India&apos;s credit-eligible population remains underserved or unserved by formal credit. The
          gap is not only about money reaching people — it is about information reaching lenders.
        </p>
      </Chapter>

      <Chapter
        number="02"
        title="Women entrepreneurs"
        band
        aside={
          <div className="lg:pt-6">
            <p className="mono-label">Credit-to-deposit ratio</p>
            <div className="mt-8">
              <RatioBars bars={RATIO_BARS} />
            </div>
            <p className="body-sm mt-8 max-w-[52ch]">
              A measure of how much of what women deposit returns to them as formal credit.
            </p>
            <SourceNote />
          </div>
        }
      >
        <p className="stat">
          <CountUp value={1.37} decimals={2} prefix="₹" suffix="T" />
        </p>
        <p className="body-sm mt-2">estimated demand–supply gap for women-led enterprises</p>
        <p className="stat mt-10">
          <CountUp value={14} suffix="%" />
        </p>
        <p className="body-sm mt-2">of credit-eligible women are served by providers</p>
        <SourceNote />
      </Chapter>

      <Chapter
        number="03"
        title="Informal financial behaviour"
        aside={
          <Photo
            file="ledger-book.jpg"
            alt="An open handwritten account ledger"
            aspect="aspect-[4/3]"
            caption="Placeholder photograph · documentary reference"
          />
        }
      >
        <p className="body">
          Much of India&apos;s financial life runs on paper ledgers, cash and trust. Repayment happens weekly, in small
          amounts. Income arrives in streams, not salaries.
        </p>
        <p className="body mt-6">
          These behaviours demonstrate discipline and consistency — but they leave no standard record. The evidence
          exists; the format does not.
        </p>
      </Chapter>

      <Chapter
        number="04"
        title="The limits of conventional data"
        band
        aside={
          <div className="border border-rule bg-paper-deep/50 px-8 py-10 md:px-12">
            <p className="mono-label">Credit file — standard view</p>
            <ul className="mt-7 space-y-4 text-[14px]">
              {CAPTURED.map((item) => (
                <li key={item} className="flex items-center gap-4 text-ink">
                  <span className="h-[5px] w-[5px] rounded-full bg-ink" />
                  {item}
                </li>
              ))}
              {UNSEEN.map((item) => (
                <li key={item} className="flex items-center gap-4 text-faint">
                  <span className="h-[5px] w-[5px] rounded-full border border-faint" />
                  <span className="border-b border-dashed border-faint pb-px">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-8 !text-[10px]">Solid = captured · dashed = tends to go unseen</p>
          </div>
        }
      >
        <p className="body">
          A credit file is a partial sketch: it records formal borrowing and little else. For borrowers whose financial
          lives are mostly informal, the sketch is thinner still — and the assessment inherits the gaps.
        </p>
      </Chapter>

      <section className="shell section grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="font-mono text-[11px] text-muted">05</p>
          <h2 className="h2 mt-4">Why alternative data is worth investigating</h2>
          <p className="body mt-8">
            If responsibility leaves traces — in payments, digital activity and work patterns — then the question becomes
            an empirical one: do those traces carry usable information about credit risk? That is a testable question, and
            Nishka treats it as one.
          </p>
          <Link href="/research" className="link-rule mt-10">
            See how we test it <Arrow />
          </Link>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
          <p className="hand border-l border-accent-soft pl-6">invisible is not the same as absent</p>
        </Reveal>
      </section>

      <section id="sources" className="band-night scroll-mt-24">
        <div className="shell py-24">
          <p className="mono-label !text-accent-soft">Sources &amp; methodology</p>
          <p className="mt-6 max-w-[72ch] text-[15px] leading-[1.75] text-night-text/80">
            The figures on this page come from Project Nishka&apos;s desk research. Full source citations are being
            compiled and will be published with Nishka&apos;s first research outputs — nothing here is presented as a
            final citation. No statistic has been invented or extrapolated for this page.
          </p>
          <p className="mono-label mt-10 !text-[10px] !leading-[1.8] !text-night-text/35">
            Figures from Project Nishka&apos;s desk research · full source citations are being compiled and will be
            published with Nishka&apos;s first research outputs
          </p>
        </div>
      </section>
    </>
  );
}
