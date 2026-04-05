"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { sites, getObservationsForSite } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import type { Site } from "@/lib/types";

function getUniqueSpeciesCount(siteId: string): number {
  const observations = getObservationsForSite(siteId);
  return new Set(observations.map((o) => o.species)).size;
}

function getUniqueObservers(siteId: string): string[] {
  const observations = getObservationsForSite(siteId);
  return [...new Set(observations.map((o) => o.observer))];
}

export default function LocationsPage() {
  const [showNewSiteForm, setShowNewSiteForm] = useState(false);
  const [newSite, setNewSite] = useState({ name: "", description: "", coordinates: "" });

  const inputClasses = "rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm w-full";

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Survey Sites</h1>
          <p className="text-sm text-stone mt-1">
            {sites.length} active survey location{sites.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowNewSiteForm(!showNewSiteForm)}
          className="flex items-center gap-1 text-forest text-sm"
        >
          <Plus className="w-4 h-4" />
          New Site
        </button>
      </div>

      {/* New site form */}
      {showNewSiteForm && (
        <div className="mt-4 bg-paper border border-bark/20 rounded-lg p-5">
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Site name"
              value={newSite.name}
              onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
              className={inputClasses}
            />
            <input
              type="text"
              placeholder="Description"
              value={newSite.description}
              onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
              className={inputClasses}
            />
            <input
              type="text"
              placeholder="Coordinates (lat, lng)"
              value={newSite.coordinates}
              onChange={(e) => setNewSite({ ...newSite, coordinates: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button className="text-sm bg-forest text-paper px-4 py-2 rounded-lg">
              Save
            </button>
            <button
              onClick={() => setShowNewSiteForm(false)}
              className="text-sm text-stone px-4 py-2 rounded-lg border border-bark/30"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Site cards grid */}
      <div className="grid gap-6 mt-6">
        {sites.map((site) => {
          const observations = getObservationsForSite(site.id);
          const speciesCount = getUniqueSpeciesCount(site.id);
          const observers = getUniqueObservers(site.id);

          return (
            <div
              key={site.id}
              className="relative bg-paper border border-bark rounded-lg p-5 hover:shadow-sm transition"
            >
              {/* Left leaf stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-leaf rounded-l-lg" />

              <div className="pl-3">
                <h2 className="font-medium text-ink">{site.name}</h2>
                <p className="text-sm text-stone mt-1">{site.description}</p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm">
                  <span className="text-leaf">
                    {observations.length} observation{observations.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-leaf">
                    {speciesCount} species
                  </span>
                  <span className="text-stone">
                    {observers.join(", ")}
                  </span>
                </div>

                {/* Last survey date */}
                <p className="text-xs text-sand mt-2">
                  Last surveyed {formatDate(site.lastSurveyDate)}
                </p>

                {/* Open link */}
                <div className="flex justify-end mt-2">
                  <Link
                    href={`/locations/${site.id}`}
                    className="text-forest text-sm hover:underline"
                  >
                    Open &rarr;
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
