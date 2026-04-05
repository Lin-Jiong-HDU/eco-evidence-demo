/**
 * Calculate Shannon Diversity Index
 * H = -Σ(pi * ln(pi)) where pi is the proportion of species i
 */
export function shannonIndex(counts: number[]): number {
  const total = counts.reduce((sum, c) => sum + c, 0);
  if (total === 0) return 0;

  let h = 0;
  for (const count of counts) {
    if (count > 0) {
      const p = count / total;
      h -= p * Math.log(p);
    }
  }
  return Math.round(h * 100) / 100;
}

export function diversityLabel(index: number): "High" | "Medium" | "Low" {
  if (index >= 2.5) return "High";
  if (index >= 1.5) return "Medium";
  return "Low";
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
