"use client";

import { useState, useMemo, useRef } from "react";
import {
  sites,
  getObservationsForSite,
  getMemoriesForSite,
  oakwoodMonthly,
  riversideMonthly,
} from "@/lib/demo-data";
import { shannonIndex, diversityLabel, formatDate } from "@/lib/utils";
import { CHART_COLORS, SPECIES_COLORS } from "@/lib/chart-colors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { FileText, Download, Link2, Check, Plus } from "lucide-react";

export default function ReportPage() {
  const [selectedSiteId, setSelectedSiteId] = useState(sites[0].id);
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-04-05");
  const [observers, setObservers] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const selectedSite = sites.find((s) => s.id === selectedSiteId)!;
  const observations = useMemo(
    () => getObservationsForSite(selectedSiteId),
    [selectedSiteId]
  );
  const memories = useMemo(
    () => getMemoriesForSite(selectedSiteId),
    [selectedSiteId]
  );
  const monthlyData =
    selectedSiteId === "oakwood" ? oakwoodMonthly : riversideMonthly;

  // Compute stats
  const speciesSet = new Set(observations.map((o) => o.species));
  const speciesCount = speciesSet.size;
  const uniqueObservers = new Set(observations.map((o) => o.observer)).size;

  // Shannon index from category counts
  const categoryCounts: Record<string, number> = {};
  observations.forEach((o) => {
    categoryCounts[o.category] = (categoryCounts[o.category] || 0) + 1;
  });
  const shannon = shannonIndex(Object.values(categoryCounts));
  const diversity = diversityLabel(shannon);

  // Top 10 species
  const speciesCounts: Record<string, { count: number; sciName: string; category: string }> = {};
  observations.forEach((o) => {
    if (!speciesCounts[o.species]) {
      speciesCounts[o.species] = {
        count: 0,
        sciName: o.scientificName,
        category: o.category,
      };
    }
    speciesCounts[o.species].count++;
  });
  const topSpecies = Object.entries(speciesCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  // Distribution data for pie chart
  const distributionData = Object.entries(categoryCounts).map(
    ([name, value]) => ({ name, value })
  );

  // Recommended actions based on site
  const recommendedActions =
    selectedSiteId === "riverside"
      ? [
          "Continue monthly monitoring of endangered Salt Marsh Harvest Mouse population",
          "Document seasonal migration patterns of Great Blue Heron nesting pairs",
          "Submit endangered species sighting to California Department of Fish and Wildlife",
          "Establish buffer zone markers around sensitive wetland habitats",
          "Coordinate with local authorities regarding development impact assessment",
        ]
      : [
          "Continue monthly monitoring of all species populations",
          "Document seasonal migration patterns of bird species",
          "Submit Monarch Butterfly sighting to Monarch Watch database",
          "Install additional trail cameras to monitor mammal activity",
          "Expand survey area to include adjacent meadow habitat",
        ];

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReportGenerated(true);
    }, 1500);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const handleExportPDF = async () => {
    if (!reportRef.current || exporting) return;
    setExporting(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const el = reportRef.current;
      const canvas = await html2canvas(el, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#FFFFFF",
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.85);

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `eco-evidence-report-${selectedSiteId}-${new Date().toISOString().slice(0, 10)}.pdf`
      );
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  // Configuration card
  if (!reportGenerated && !loading) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-lg mx-auto bg-paper rounded-lg border border-bark/20 p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-forest" />
            <h1 className="text-xl font-semibold text-ink">
              Generate Report
            </h1>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm text-stone mb-1">Location</label>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest/30"
            >
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          {/* Period */}
          <div className="mb-4">
            <label className="block text-sm text-stone mb-1">Period</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
              <span className="text-sm text-stone">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
            </div>
          </div>

          {/* Observers */}
          <div className="mb-4">
            <label className="block text-sm text-stone mb-1">Observers</label>
            <input
              type="text"
              value={observers}
              onChange={(e) => setObservers(e.target.value)}
              placeholder="Enter observer names"
              className="w-full rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-forest/30"
            />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            className="w-full h-12 rounded-lg bg-forest text-white font-medium hover:bg-leaf transition-colors mt-4"
          >
            Generate Report
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-lg mx-auto bg-paper rounded-lg border border-bark/20 p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-stone">Generating report...</p>
        </div>
      </div>
    );
  }

  // Report preview
  return (
    <div className="px-4 py-8">
      {/* A4-ratio report area */}
      <div ref={reportRef} className="max-w-3xl mx-auto bg-paper rounded-lg shadow-[0_2px_16px_rgba(240,237,229,0.6)] p-8 sm:p-10">
        {/* 1. Report Header */}
        <div className="border-b border-bark/10 pb-4">
          <h1 className="text-xl font-semibold text-forest">
            Ecological Evidence Report
          </h1>
          <p className="text-sm text-stone mt-1">
            {selectedSite.name} &middot; Survey period:{" "}
            {formatDate(startDate)} to {formatDate(endDate)}
          </p>

          {/* Summary stats badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center rounded-full bg-parchment px-3 py-1 text-xs font-medium text-ink">
              {observations.length} observations
            </span>
            <span className="inline-flex items-center rounded-full bg-parchment px-3 py-1 text-xs font-medium text-ink">
              {speciesCount} species
            </span>
            <span className="inline-flex items-center rounded-full bg-parchment px-3 py-1 text-xs font-medium text-ink">
              {uniqueObservers} observers
            </span>
            <span className="inline-flex items-center rounded-full bg-forest/10 px-3 py-1 text-xs font-medium text-forest">
              Shannon Index: {shannon} ({diversity})
            </span>
          </div>
        </div>

        {/* 2. Mini Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Species Timeline Mini Chart */}
          <div className="rounded-lg border border-bark/10 p-3">
            <h3 className="text-xs font-semibold text-stone mb-2">
              Species Timeline
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={CHART_COLORS.surface}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: CHART_COLORS.muted }}
                  axisLine={{ stroke: CHART_COLORS.surface }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: CHART_COLORS.muted }}
                  axisLine={{ stroke: CHART_COLORS.surface }}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "1px solid rgba(139,111,71,0.2)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="speciesCount"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={2}
                  dot={{ r: 3, fill: CHART_COLORS.primary }}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="observationCount"
                  stroke={CHART_COLORS.secondary}
                  strokeWidth={2}
                  dot={{ r: 3, fill: CHART_COLORS.secondary }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution Mini Pie Chart */}
          <div className="rounded-lg border border-bark/10 p-3">
            <h3 className="text-xs font-semibold text-stone mb-2">
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={55}
                  isAnimationActive={false}
                >
                  {distributionData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={SPECIES_COLORS[entry.name] || CHART_COLORS.muted}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "1px solid rgba(139,111,71,0.2)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Top 10 Species Table */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-forest mb-3">
            Top 10 Species
          </h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-stone border-b border-bark/10">
                <th className="text-left py-2 pr-2">#</th>
                <th className="text-left py-2 pr-2">Species</th>
                <th className="text-left py-2 pr-2">Scientific Name</th>
                <th className="text-right py-2 pr-2">Count</th>
                <th className="text-left py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {topSpecies.map(([species, data], idx) => (
                <tr
                  key={species}
                  className="text-sm border-b border-bark/10 last:border-b-0"
                >
                  <td className="py-2 pr-2 text-stone">{idx + 1}</td>
                  <td className="py-2 pr-2 text-ink font-medium">{species}</td>
                  <td className="py-2 pr-2 text-stone italic">
                    {data.sciName}
                  </td>
                  <td className="py-2 pr-2 text-right text-ink">{data.count}</td>
                  <td className="py-2">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor:
                          (SPECIES_COLORS[data.category] || CHART_COLORS.muted) +
                          "18",
                        color: SPECIES_COLORS[data.category] || CHART_COLORS.muted,
                      }}
                    >
                      {data.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Community Memory Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-forest mb-3">
            Community Memory
          </h3>
          {memories.length === 0 && (
            <p className="text-sm text-stone italic">
              No community memories recorded for this site.
            </p>
          )}
          {memories.map((memory) => (
            <div key={memory.id} className="mt-3">
              <div className="border-l-3 border-leaf pl-3">
                <p className="text-sm text-stone italic">
                  &ldquo;{memory.text}&rdquo;
                </p>
                <p className="text-xs text-stone mt-1">{memory.author}</p>
              </div>
            </div>
          ))}
          <button className="flex items-center gap-1 mt-4 text-sm text-forest cursor-pointer hover:underline">
            <Plus className="w-3.5 h-3.5" />
            Add a memory
          </button>
        </div>

        {/* 5. Recommended Actions */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-forest mb-3">
            Recommended Actions
          </h3>
          <ul className="space-y-2">
            {recommendedActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-4 h-4 shrink-0 rounded-sm border border-bark/40"
                  aria-hidden="true"
                />
                <span className="text-sm text-stone">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Observations by Volunteer */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-forest mb-3">
            Observations by Volunteer
          </h3>
          <div className="space-y-2">
            {[
              { name: "Ms. Chen", count: 8 },
              { name: "Leo M.", count: 7 },
              { name: "Priya K.", count: 6 },
              { name: "J. Rivera", count: 5 },
              { name: "A. Nakamura", count: 4 },
              { name: "Sam T.", count: 3 },
              { name: "Others", count: 5 },
            ].map((v) => (
              <div key={v.name} className="flex items-center gap-2 text-sm">
                <span className="w-24 shrink-0 text-stone text-right">{v.name}</span>
                <div className="flex-1 h-5 bg-bark/5 rounded-sm overflow-hidden">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${(v.count / 8) * 100}%`,
                      backgroundColor: "#5a7a50",
                    }}
                  />
                </div>
                <span className="w-6 text-right text-ink font-medium tabular-nums">{v.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Survey Methodology */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-forest mb-3">
            Survey Methodology
          </h3>
          <ul className="space-y-1.5 text-xs text-stone leading-relaxed">
            <li>• Observations collected via photo-identification using iNaturalist Computer Vision API (v2)</li>
            <li>• GPS coordinates recorded automatically via device geolocation</li>
            <li>• AI confidence threshold: ≥70% for accepted records</li>
            <li>• Survey protocol: standardized weekly photo-documentation</li>
            <li>• Data quality: all records include timestamp, GPS, species confidence score, and observer attribution</li>
            <li>• Analysis: Shannon Diversity Index (H&#x2032; = −Σpᵢ·ln(pᵢ)) computed across taxonomic categories</li>
          </ul>
        </div>

        {/* 8. Disclaimer & Footer */}
        <div className="mt-6 pt-4 border-t border-bark/10">
          <p className="text-xs text-stone leading-relaxed">
            <span className="font-semibold">Disclaimer:</span> This report is generated from community-contributed observations and AI-assisted species identification. Data may contain errors or omissions. Findings should be verified by qualified ecologists before use in official environmental assessments or regulatory submissions.
          </p>
          <p className="text-xs text-sand mt-3">
            Generated by Eco Evidence &middot; {formatDate(new Date().toISOString())}
          </p>
        </div>
      </div>

      {/* Export Actions */}
      <div className="max-w-3xl mx-auto mt-4 flex gap-3">
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="inline-flex items-center gap-2 rounded-lg bg-forest text-white px-5 h-10 text-sm font-medium hover:bg-leaf transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {exporting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export PDF
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border border-bark/30 text-ink px-5 h-10 text-sm font-medium hover:bg-parchment transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-forest" />
              <span className="text-forest">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              Share Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
