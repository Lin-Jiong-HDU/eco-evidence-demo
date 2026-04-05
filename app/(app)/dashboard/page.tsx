"use client";

import { useState, useMemo } from "react";
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
import {
  sites,
  oakwoodObservations,
  riversideObservations,
  oakwoodMonthly,
  riversideMonthly,
  oakwoodSpeciesTrends,
  riversideSpeciesTrends,
  getObservationsForSite,
} from "@/lib/demo-data";
import { shannonIndex, diversityLabel, formatDate } from "@/lib/utils";
import { CHART_COLORS, SPECIES_COLORS, LINE_COLORS } from "@/lib/chart-colors";
import type { Observation } from "@/lib/types";
import { BarChart3, MapPin } from "lucide-react";

const siteMap: Record<string, { monthly: typeof oakwoodMonthly; trends: typeof oakwoodSpeciesTrends; observations: Observation[] }> = {
  oakwood: {
    monthly: oakwoodMonthly,
    trends: oakwoodSpeciesTrends,
    observations: oakwoodObservations,
  },
  riverside: {
    monthly: riversideMonthly,
    trends: riversideSpeciesTrends,
    observations: riversideObservations,
  },
};

export default function DashboardPage() {
  const [selectedSite, setSelectedSite] = useState("oakwood");

  const site = useMemo(() => sites.find((s) => s.id === selectedSite)!, [selectedSite]);
  const data = useMemo(() => siteMap[selectedSite], [selectedSite]);

  const observations = useMemo(() => getObservationsForSite(selectedSite), [selectedSite]);

  const stats = useMemo(() => {
    const totalObs = observations.length;
    const uniqueSpecies = new Set(observations.map((o) => o.species)).size;
    const uniqueObservers = new Set(observations.map((o) => o.observer)).size;

    const speciesCounts: Record<string, number> = {};
    for (const o of observations) {
      speciesCounts[o.species] = (speciesCounts[o.species] || 0) + 1;
    }
    const sIndex = shannonIndex(Object.values(speciesCounts));

    return { totalObs, uniqueSpecies, uniqueObservers, shannonIndex: sIndex };
  }, [observations]);

  const speciesDistribution = useMemo(() => {
    const cats: Record<string, number> = {};
    for (const o of observations) {
      cats[o.category] = (cats[o.category] || 0) + 1;
    }
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [observations]);

  const trendKeys = useMemo(() => {
    if (data.trends.length === 0) return [];
    return Object.keys(data.trends[0]).filter((k) => k !== "month").slice(0, 5);
  }, [data.trends]);

  const recentObservations = useMemo(() => {
    return [...observations]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, [observations]);

  const diversity = diversityLabel(stats.shannonIndex);

  const tooltipStyle = {
    background: "#FFFFFF",
    border: "1px solid #8B6F47",
    borderRadius: "8px",
  };

  return (
    <div>
      {/* Site selector */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-stone" />
        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
          className="text-sm border border-bark/30 rounded-lg px-3 py-1.5 bg-paper text-ink focus:outline-none focus:ring-1 focus:ring-forest"
        >
          {sites.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Page header */}
      <h1 className="text-2xl font-semibold text-ink">{site.name}</h1>
      <p className="text-sm text-stone mt-1">
        {stats.totalObs} observations · {stats.uniqueSpecies} species · {stats.uniqueObservers} observers
      </p>

      {/* Stats bar */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="bg-parchment rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-forest">{stats.totalObs}</div>
          <div className="text-xs text-sand mt-1">observations</div>
        </div>
        <div className="bg-parchment rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-forest">{stats.uniqueSpecies}</div>
          <div className="text-xs text-sand mt-1">species</div>
        </div>
        <div className="bg-parchment rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-forest">{stats.uniqueObservers}</div>
          <div className="text-xs text-sand mt-1">observers</div>
        </div>
        <div className="bg-parchment rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold text-forest">{stats.shannonIndex}</div>
          <div className="mt-1">
            <span className="text-leaf bg-parchment rounded-full text-xs px-2">{diversity}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-bark/20 mt-4" />

      {/* Charts section */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Species Count Timeline */}
        <div className="bg-paper border border-bark/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-ink mb-3">Species Count Timeline</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EDE5" />
              <XAxis dataKey="month" tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <YAxis tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="speciesCount"
                stroke={CHART_COLORS.primary}
                fill={CHART_COLORS.primary}
                dot={{ fill: CHART_COLORS.primary }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Species Distribution */}
        <div className="bg-paper border border-bark/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-ink mb-3">Species Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={speciesDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                label={({ name }) => name}
                isAnimationActive={false}
              >
                {speciesDistribution.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SPECIES_COLORS[entry.name] || "#A8A29E"}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Species Trends */}
        <div className="bg-paper border border-bark/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-ink mb-3">Monthly Species Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EDE5" />
              <XAxis dataKey="month" tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <YAxis tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <Tooltip contentStyle={tooltipStyle} />
              {trendKeys.map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={LINE_COLORS[i % LINE_COLORS.length]}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {trendKeys.map((key, i) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-stone">
                <span
                  className="inline-block w-3 h-0.5 rounded"
                  style={{ backgroundColor: LINE_COLORS[i % LINE_COLORS.length] }}
                />
                {key}
              </div>
            ))}
          </div>
        </div>

        {/* Diversity Index Trend */}
        <div className="bg-paper border border-bark/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-ink mb-3">Diversity Index Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EDE5" />
              <XAxis dataKey="month" tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <YAxis tick={{ fill: "#A8A29E" }} axisLine={{ stroke: "#F0EDE5" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="shannonIndex"
                stroke="#5C8A3C"
                dot={{ fill: "#5C8A3C" }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Observations */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-ink">Recent Observations</h3>
        <div className="mt-2">
          {recentObservations.map((obs) => (
            <div key={obs.id} className="flex items-center gap-3 py-2 border-b border-bark/10">
              <div className="w-8 h-8 bg-parchment rounded flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink">{obs.species}</div>
                <div className="text-xs text-stone">{formatDate(obs.timestamp)}</div>
              </div>
              <span className="text-xs bg-forest text-white rounded-full px-2 flex-shrink-0">
                {obs.confidence}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
