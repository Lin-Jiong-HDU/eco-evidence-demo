"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { sites, getObservationsForSite } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
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

  return (
    <div>
      {/* Back link */}
      <Link href="/locations" className="text-forest text-sm">
        &larr; Back to Sites
      </Link>

      {/* Site header */}
      <h1 className="text-2xl font-semibold text-ink mt-2">{site.name}</h1>
      <p className="text-sm text-stone mt-1">{site.description}</p>

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
