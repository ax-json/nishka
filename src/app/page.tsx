import { HowItWorks } from "@/components/home/HowItWorks";
import {
  Hero,
  LatestNotes,
  SignalMarquee,
  Stats,
  TheIdea,
  WhyWomen,
  WorkWithUs,
} from "@/components/home/sections";
import { SectionIntro } from "@/components/ui/primitives";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <SignalMarquee />
      <TheIdea />
      <WhyWomen />
      <section className="shell section">
        <SectionIntro label="How Nishka works" title="From data to action" />
        <HowItWorks />
      </section>
      <LatestNotes />
      <WorkWithUs />
    </>
  );
}
