"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PointsChip } from "@/components/shared/PointsChip";

const links = [
  { href: "/", label: "Home" },
  { href: "/review", label: "Review" },
  { href: "/quiz", label: "Quiz" },
  { href: "/rewards", label: "Rewards" },
  { href: "/progress", label: "Progress" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-emerald-700">
          🧬 Interdependence
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <PointsChip />
      </div>
    </header>
  );
}
