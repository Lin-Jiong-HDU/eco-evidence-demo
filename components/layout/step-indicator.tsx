"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { href: "/record", label: "Record" },
  { href: "/locations", label: "Locations" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/report", label: "Report" },
];

export default function StepIndicator() {
  const pathname = usePathname();

  const currentIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <div className="h-10 flex items-center justify-center gap-0 bg-paper border-t border-bark/20">
      {steps.map((step, index) => {
        let dotClass: string;
        if (index < currentIndex) {
          dotClass = "bg-forest";
        } else if (index === currentIndex) {
          dotClass = "border-2 border-leaf bg-transparent";
        } else {
          dotClass = "bg-sand";
        }

        return (
          <div key={step.href} className="flex items-center">
            {index > 0 && (
              <div
                className={`h-px w-6 ${
                  index <= currentIndex ? "bg-forest" : "bg-sand"
                }`}
              />
            )}
            <Link
              href={step.href}
              className="flex flex-col items-center gap-1"
            >
              <div className={`w-3 h-3 rounded-full ${dotClass}`} />
              <span className="text-xs text-stone">{step.label}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
