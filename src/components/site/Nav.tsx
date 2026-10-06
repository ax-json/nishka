"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/content/site";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="shell flex h-[76px] items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-[13.5px] transition-colors hover:text-ink ${active ? "text-ink" : "text-ink-soft/80"}`}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <span className="absolute -bottom-[9px] left-0 h-[3px] w-[3px] rounded-full bg-accent" />
                  )}
                </li>
              );
            })}
          </ul>
          <Link href="/contact" className="btn-dark !px-6 !py-[13px] !text-[13px]">
            Work with us
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="relative block h-[9px] w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-transform ${isOpen ? "top-1 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-ink transition-transform ${isOpen ? "top-1 -rotate-45" : "top-2"}`}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <nav aria-label="Mobile" className="border-t border-rule bg-paper lg:hidden">
          <ul className="shell flex flex-col py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 font-serif text-2xl ${isActive(pathname, item.href) ? "text-accent" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-dark">
                Work with us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
