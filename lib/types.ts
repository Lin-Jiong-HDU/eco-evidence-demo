export interface Observation {
  id: string;
  species: string;
  scientificName: string;
  confidence: number;
  photoUrl?: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  observer: string;
  notes?: string;
  siteId: string;
  category: "Birds" | "Insects" | "Plants" | "Mammals" | "Others";
}

export interface Site {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  lastSurveyDate: string;
}

export interface CommunityMemory {
  id: string;
  text: string;
  author: string;
  siteId: string;
  date: string;
}

export interface MonthlyData {
  month: string;
  speciesCount: number;
  observationCount: number;
  shannonIndex: number;
}

export interface SpeciesTrend {
  month: string;
  [species: string]: string | number;
}

export type Step = "record" | "locations" | "dashboard" | "report";
