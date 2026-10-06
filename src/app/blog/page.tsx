import type { Metadata } from "next";
import { Archive } from "@/components/blog/Archive";
import { EmptyNotes, PageHero } from "@/components/ui/primitives";
import { getContent } from "@/lib/store";

export const metadata: Metadata = { title: "Blog" };
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { posts } = await getContent();
  return (
    <>
      <PageHero
        label="Journal"
        title="Notes from Nishka"
        lede="Research, conversations and observations on credit, gender and financial inclusion."
      />
      <section className="shell pb-[clamp(72px,10vw,128px)]">
        <Archive
          posts={posts}
          emptyState={
            <EmptyNotes detail="The archive fills as research and field notes are published. For now, the shelves are being built." />
          }
        />
      </section>
    </>
  );
}
