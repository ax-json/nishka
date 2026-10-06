import type { Metadata } from "next";
import { CountUp, Reveal } from "@/components/ui/motion";
import { PageHero, Photo, SectionIntro } from "@/components/ui/primitives";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Impact" };
export const dynamic = "force-dynamic";

const BUILDING = [
  "Financial literacy resources",
  "Regional-language learning modules",
  "Research",
  "Conversations with credit professionals",
  "Partnerships with NGOs",
  "Engagement with financial institutions",
];

const SHOWCASE: readonly { file: string; alt: string; tone: "light" | "dark" }[] = [
  { file: "showcase-weaving.jpg", alt: "Hands knotting thread on a woven mat", tone: "dark" },
  { file: "showcase-tailor.jpg", alt: "An elderly tailor working at a sewing machine", tone: "dark" },
  { file: "showcase-shoes.jpg", alt: "A man standing in his footwear shop", tone: "light" },
  { file: "showcase-garland.jpg", alt: "A woman stringing a flower garland", tone: "dark" },
];

// Vertical hairline before every cell that is not first in its row (2 columns on sm, 3 on lg).
const MILESTONE_RULES =
  "border-night-rule sm:max-lg:border-l sm:max-lg:[&:nth-child(2n+1)]:border-l-0 lg:border-l lg:[&:nth-child(3n+1)]:border-l-0";

export default async function ImpactPage() {
  const { milestones } = await getContent();
  return (
    <>
      <PageHero
        label="Impact"
        title={
          <>
            What we&apos;re building –<br /> and how we&apos;ll <em>measure it.</em>
          </>
        }
        lede="Nishka is an ongoing project. Rather than publishing impact numbers it cannot yet stand behind, this page states plainly what is underway — and where evidence will appear as it exists."
      />

      <section className="shell grid gap-14 pb-[clamp(72px,10vw,128px)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionIntro label="In progress" title="What we're building" />
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {BUILDING.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 80}
              className="flex items-baseline gap-6 border-b border-rule py-6 first:pt-2"
            >
              <span className="font-mono text-[10px] text-faint">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-serif text-[clamp(20px,1.9vw,24px)] text-ink">{item}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="band-night">
        <div className="shell section">
          <SectionIntro label="Progress" title="Counters fill only with verified milestones" tone="night" />
          <Reveal delay={100}>
            <p className="mt-6 max-w-[58ch] text-[14.5px] leading-[1.75] text-night-text/65">
              Nothing on this dashboard is projected or estimated. Each slot displays a verified number the moment one
              exists.
            </p>
          </Reveal>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone, index) => (
              <Reveal key={milestone.label} delay={index * 70} className={`py-12 sm:px-8 ${MILESTONE_RULES}`}>
                {milestone.value === null ? (
                  <span className="block h-[2px] w-7 bg-night-text/40" aria-hidden="true" />
                ) : (
                  <CountUp value={milestone.value} className="stat block !text-paper-light" />
                )}
                <p className="mt-10 text-[15px] text-paper-light">{milestone.label}</p>
                <p className="mono-label mt-3 !text-[9.5px] !text-night-text/35">
                  {milestone.value === null ? "Pending first verified milestone" : "Verified"}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="mono-label">The rural enterprise showcase</p>
          <h2 className="h2 mt-5">Enterprises, seen whole</h2>
          <p className="body mt-8">
            Numbers flatten people. The Showcase will profile real rural entrepreneurs and their enterprises — the work
            itself, the financial habits behind it, the decisions that keep a small business alive — as they actually
            are, not as statistics.
          </p>
          <p className="body mt-6">
            Each profile will sit alongside the data that credit systems do and do not capture, so that readers can feel
            the distance between a financial life and its record. It is a reminder of what the project is ultimately
            about: seeing borrowers clearly.
          </p>
          <p className="hand mt-10 rotate-[-1.5deg] !text-ink-soft">real profiles to come — nothing staged</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-16 lg:col-span-6 lg:col-start-7">
          {SHOWCASE.map((photo, index) => (
            <Reveal key={photo.file} delay={index * 100} className={index % 2 === 1 ? "translate-y-16" : ""}>
              <Photo
                file={photo.file}
                alt={photo.alt}
                aspect="aspect-[4/5]"
                tone={photo.tone}
                caption={
                  <>
                    Placeholder photograph —
                    <br />
                    enterprise profiles to come
                  </>
                }
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
