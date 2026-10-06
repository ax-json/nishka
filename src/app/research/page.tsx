import type { Metadata } from "next";
import { SignalsExplorer, StagesAccordion } from "@/components/research/interactive";
import { Reveal } from "@/components/ui/motion";
import { PageHero, SectionIntro } from "@/components/ui/primitives";
import { StatBand } from "@/components/ui/StatBand";
import type { Stat } from "@/components/ui/StatBand";

export const metadata: Metadata = { title: "Research" };

const DATASET: readonly Stat[] = [
  { value: 10000, label: "borrowers in the dataset" },
  { value: 7000, label: "training observations" },
  { value: 3000, label: "testing observations" },
  { value: 41, label: "variables under study" },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        label="Research"
        title={
          <>
            Testing the question,<br /> <em>not assuming the answer.</em>
          </>
        }
        lede="Nishka is using quantitative analysis to investigate whether alternative borrower-level variables have measurable relationships with loan default — the same discipline, and the same caution, that any serious question deserves."
      />

      <div className="shell">
        <Reveal>
          <p role="note" className="border-l-2 border-accent bg-accent-wash px-7 py-6 text-[13.5px] text-ink">
            Research in progress. Findings should not be interpreted as a validated lending model or recommendation for
            credit decisions.
          </p>
        </Reveal>
      </div>

      <section className="shell section grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro label="Methodology" title="Six stages, one honest sequence" />
            <Reveal delay={100}>
              <p className="body-sm mt-6 max-w-[36ch]">
                Click a stage to read what happens at each step. The sequence is deliberately conventional — the care is in
                the execution.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={150} className="lg:col-span-7 lg:col-start-6">
          <StagesAccordion />
        </Reveal>
      </section>

      <section className="band-light border-y border-rule">
        <div className="shell section">
          <SectionIntro label="Dataset" title="What the current dataset holds" />
          <Reveal delay={100} className="mt-12 bg-paper-deep/60 px-8 md:px-10">
            <StatBand stats={DATASET} />
          </Reveal>
        </div>
      </section>

      <section className="shell section">
        <SectionIntro label="Variables we are exploring" title="Signals grouped by where they come from" />
        <SignalsExplorer />
      </section>
    </>
  );
}
