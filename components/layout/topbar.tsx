"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sites = ["Oakwood Elementary", "Riverside Wetland"];

export default function Topbar() {
  const [selectedSite, setSelectedSite] = useState(sites[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-6 bg-paper border-b border-bark">
      <span className="text-lg font-semibold text-forest">Eco Evidence</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-bark bg-parchment text-sm text-ink hover:border-bark/80 transition-colors"
        >
          <span>{selectedSite}</span>
          <ChevronDown
            className={`w-4 h-4 text-stone transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <ul className="absolute right-0 mt-1 w-48 bg-paper border border-bark rounded-lg shadow-lg z-50 py-1">
            {sites.map((site) => (
              <li key={site}>
                <button
                  onClick={() => {
                    setSelectedSite(site);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    site === selectedSite
                      ? "bg-parchment text-forest font-medium"
                      : "text-ink hover:bg-parchment/60"
                  }`}
                >
                  {site}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
