import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Work with us" };

const AUDIENCES = [
  "Financial institutions",
  "NGOs",
  "Researchers",
  "Educators",
  "Community organisations",
  "Credit professionals",
];

// Not shown in the source recording — built in the same style so every "Work with us" link lands somewhere real.
export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Work with us"
        title={
          <>
            Begin with a <em>better question.</em>
          </>
        }
        lede="Nishka works with people who want to examine — not just assume — what responsible borrowing looks like. Tell us what you are working on."
      />
      <section className="shell grid gap-16 pb-[clamp(72px,10vw,128px)] lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <ContactForm />
        </Reveal>
        <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
          <p className="mono-label">Who we talk to</p>
          <ul className="mt-6 space-y-5 border-l border-rule pl-7">
            {AUDIENCES.map((audience) => (
              <li key={audience} className="mono-label !text-[10.5px] !text-ink-soft">
                {audience}
              </li>
            ))}
          </ul>
          <p className="hand mt-10 rotate-[-2deg] !text-muted">no cold outreach — just a conversation</p>
        </Reveal>
      </section>
    </>
  );
}
