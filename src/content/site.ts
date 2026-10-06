export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/the-problem", label: "The Problem" },
  { href: "/research", label: "Research" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" },
  { href: "/resources", label: "Resources" },
];

export const FOOTER_LINKS: readonly NavItem[] = [
  ...NAV_ITEMS.filter((item) => item.href !== "/"),
  { href: "/contact", label: "Contact" },
];

export const ELSEWHERE: readonly NavItem[] = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
];

export const SITE_TAGLINE = "Exploring better ways to see financial responsibility.";
