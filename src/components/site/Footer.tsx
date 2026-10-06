import Link from "next/link";
import { ELSEWHERE, FOOTER_LINKS, SITE_TAGLINE } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="band-night">
      <div className="shell pt-24 pb-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo tone="light" size="lg" />
            <p className="mt-6 text-[14px] text-night-text/70">{SITE_TAGLINE}</p>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label !text-accent-soft">Explore</p>
            <ul className="mt-6 space-y-4">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14px] text-night-text transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label !text-accent-soft">Elsewhere</p>
            <ul className="mt-6 space-y-4">
              {ELSEWHERE.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className="text-[14px] text-night-text">{item.label}</span>
                  <span className="font-mono text-[11px] text-night-text/40">— link to come</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex items-center justify-between border-t border-night-rule pt-8">
          <p className="mono-label !text-night-text/40">© Project Nishka {year}</p>
          <a href="#top" className="text-[13px] text-night-text/60 transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
