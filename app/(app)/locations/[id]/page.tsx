"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { sites, getObservationsForSite } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { SPECIES_COLORS } from "@/lib/chart-colors";
import type { Observation } from "@/lib/types";

function confidenceColor(confidence: number): string {
  if (confidence >= 90) return "text-leaf";
  if (confidence >= 80) return "text-bark";
  return "text-sand";
}

export default function SiteDetailPage() {
  const params = useParams<{ id: string }>();
  const site = sites.find((s) => s.id === params.id);

  if (!site) {
    return (
      <div className="py-12 text-center text-stone">
        Site not found
      </div>
    );
  }

  const observations = getObservationsForSite(site.id);

  // Aggregate species counts
  const speciesSummary = useMemo(() => {
    const map = new Map<
      string,
      { sciName: string; category: string; count: number; latestDate: string }
    >();
    observations.forEach((obs) => {
      const existing = map.get(obs.species);
      if (existing) {
        existing.count++;
        if (obs.timestamp > existing.latestDate) {
          existing.latestDate = obs.timestamp;
        }
      } else {
        map.set(obs.species, {
          sciName: obs.scientificName,
          category: obs.category,
          count: 1,
          latestDate: obs.timestamp,
        });
      }
    });
    return Array.from(map.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [observations]);

  // Max count for bar width calculation
  const maxCount = Math.max(...speciesSummary.map((s) => s.count), 1);

  return (
    <div>
      {/* Back link */}
      <Link href="/locations" className="text-forest text-sm">
        &larr; Back to Sites
      </Link>

      {/* Site header */}
      <h1 className="text-2xl font-semibold text-ink mt-2">{site.name}</h1>
      <p className="text-sm text-stone mt-1">{site.description}</p>

      {/* Species Overview */}
      <div className="mt-6 bg-paper rounded-lg border border-bark/20">
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-semibold text-forest">
            Species Overview
          </h2>
          <p className="text-xs text-stone mt-0.5">
            {speciesSummary.length} species observed
          </p>
        </div>
        <div className="px-4 pb-4 space-y-1">
          {speciesSummary.map((sp) => (
            <div
              key={sp.name}
              className="flex items-center gap-3 py-1.5 group"
            >
              {/* Species name + sci name */}
              <div className="w-36 sm:w-44 shrink-0">
                <p className="text-sm font-medium text-ink leading-tight truncate">
                  {sp.name}
                </p>
                <p className="text-xs text-stone italic leading-tight truncate">
                  {sp.sciName}
                </p>
              </div>

              {/* Bar */}
              <div className="flex-1 h-5 bg-parchment rounded-sm overflow-hidden">
                <div
                  className="h-full rounded-sm transition-all"
                  style={{
                    width: `${Math.max((sp.count / maxCount) * 100, 8)}%`,
                    backgroundColor:
                      SPECIES_COLORS[sp.category] || "#A8A29E",
                    opacity: 0.75,
                  }}
                />
              </div>

              {/* Count badge */}
              <span className="text-xs font-medium text-ink tabular-nums w-7 text-right shrink-0">
                {sp.count}×
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Observation table */}
      <div className="mt-6 bg-paper rounded-lg border border-bark/20">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xs text-sand uppercase tracking-wider border-b border-bark/20 pb-2 text-left px-4 pt-4">
                Date
              </th>
              <th className="text-xs text-sand uppercase tracking-wider border-b border-bark/20 pb-2 text-left px-4 pt-4">
                Species
              </th>
              <th className="text-xs text-sand uppercase tracking-wider border-b border-bark/20 pb-2 text-left px-4 pt-4">
                Confidence
              </th>
              <th className="text-xs text-sand uppercase tracking-wider border-b border-bark/20 pb-2 text-left px-4 pt-4">
                Observer
              </th>
            </tr>
          </thead>
          <tbody>
            {observations.map((obs: Observation) => (
              <tr key={obs.id} className="border-b border-bark/10 last:border-b-0">
                <td className="text-sm text-stone py-3 px-4">
                  {formatDate(obs.timestamp)}
                </td>
                <td className="text-sm py-3 px-4">
                  <span className="font-medium text-ink">{obs.species}</span>
                  <br />
                  <span className="italic text-stone text-xs">
                    {obs.scientificName}
                  </span>
                </td>
                <td className={`text-sm py-3 px-4 ${confidenceColor(obs.confidence)}`}>
                  {obs.confidence}%
                </td>
                <td className="text-sm text-stone py-3 px-4">
                  {obs.observer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
