import type { Metadata } from "next";
import { Reveal } from "@/components/ui/motion";
import { PageHero } from "@/components/ui/primitives";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Resources" };
export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const { shelves } = await getContent();
  return (
    <>
      <PageHero
        label="Resources"
        title={
          <>
            Made to be used,<br /> <em>not admired.</em>
          </>
        }
        lede="A growing library organised by the people it is for. Downloadable files appear here as they are finalised — each one is marked with what it contains and who it serves."
      />

      <section className="shell pb-[clamp(72px,10vw,128px)]">
        {shelves.map((shelf, index) => (
          <Reveal
            key={shelf.title}
            className="grid gap-10 border-t border-rule py-16 first:border-t-0 first:pt-4 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="h2 mt-3 !text-[clamp(28px,2.6vw,36px)]">{shelf.title}</h2>
              <p className="body-sm mt-5 max-w-[44ch]">{shelf.detail}</p>
            </div>
            <div className="border-t border-dashed border-faint bg-card/70 px-8 py-8 lg:col-span-6 lg:col-start-7">
              {shelf.files.length === 0 ? (
                <>
                  <p className="text-[15px] text-ink">First materials in preparation</p>
                  <p className="body-sm mt-2">
                    Nothing here has been rush-released. Files will appear as they are finalised.
                  </p>
                  <button type="button" disabled className="chip mt-6 cursor-not-allowed opacity-80">
                    Coming soon
                  </button>
                </>
              ) : (
                <ul className="space-y-4">
                  {shelf.files.map((file) => (
                    <li key={file.href}>
                      <a href={file.href} download className="link-rule">
                        {file.title} <span aria-hidden="true">↓</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
