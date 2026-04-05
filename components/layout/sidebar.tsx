"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, MapPin, BarChart3, FileText } from "lucide-react";

const navItems = [
  { href: "/record", icon: Camera, label: "Record" },
  { href: "/locations", icon: MapPin, label: "Sites" },
  { href: "/dashboard", icon: BarChart3, label: "Data" },
  { href: "/report", icon: FileText, label: "Report" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-14 flex flex-col items-center py-4 gap-2 bg-paper border-r border-bark/20">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-1 w-12 min-h-[76px] py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-forest text-white"
                : "text-stone hover:bg-parchment"
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
            <span
              className="text-xs leading-none"
              style={{ writingMode: "vertical-rl" }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
