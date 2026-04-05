import { Site, Observation, CommunityMemory, MonthlyData, SpeciesTrend } from "./types";

export const sites: Site[] = [
  {
    id: "oakwood",
    name: "Oakwood Elementary School Nature Reserve",
    description: "Educational biodiversity survey site managed by students and teachers. Semester-long monitoring program.",
    latitude: 37.7749,
    longitude: -122.4194,
    lastSurveyDate: "2026-03-28",
  },
  {
    id: "riverside",
    name: "Riverside Wetland — Under Development Threat",
    description: "Emergency ecological survey of wetland area facing proposed urban development. Rapid assessment documentation.",
    latitude: 37.8044,
    longitude: -122.2712,
    lastSurveyDate: "2026-04-02",
  },
];

function makeObs(
  id: string,
  species: string,
  sciName: string,
  conf: number,
  cat: Observation["category"],
  siteId: string,
  observer: string,
  date: string,
  notes?: string
): Observation {
  const site = sites.find((s) => s.id === siteId)!;
  return {
    id,
    species,
    scientificName: sciName,
    confidence: conf,
    timestamp: date,
    latitude: site.latitude + (Math.random() - 0.5) * 0.01,
    longitude: site.longitude + (Math.random() - 0.5) * 0.01,
    observer,
    notes,
    siteId,
    category: cat,
  };
}

// --- Oakwood Elementary (47 observations, 19 species, 8 observers) ---

const oakwoodObservers = ["Ms. Chen", "Leo M.", "Priya K.", "Tomás R.", "Ava J.", "Dmitri S.", "Ms. Park", "Jamal W."];

export const oakwoodObservations: Observation[] = [
  makeObs("oak-1", "American Robin", "Turdus migratorius", 96, "Birds", "oakwood", "Leo M.", "2026-01-15T09:30:00"),
  makeObs("oak-2", "Western Fence Lizard", "Sceloporus occidentalis", 91, "Others", "oakwood", "Priya K.", "2026-01-15T10:15:00"),
  makeObs("oak-3", "Coast Live Oak", "Quercus agrifolia", 98, "Plants", "oakwood", "Ms. Chen", "2026-01-18T14:00:00", "Dominant canopy species"),
  makeObs("oak-4", "Anna's Hummingbird", "Calypte anna", 93, "Birds", "oakwood", "Ava J.", "2026-01-22T08:45:00"),
  makeObs("oak-5", "Honey Bee", "Apis mellifera", 88, "Insects", "oakwood", "Tomás R.", "2026-01-25T11:30:00"),
  makeObs("oak-6", "California Poppy", "Eschscholzia californica", 97, "Plants", "oakwood", "Ms. Park", "2026-02-01T13:00:00"),
  makeObs("oak-7", "Dark-eyed Junco", "Junco hyemalis", 94, "Birds", "oakwood", "Jamal W.", "2026-02-03T09:00:00"),
  makeObs("oak-8", "Western Tiger Swallowtail", "Papilio rutulus", 82, "Insects", "oakwood", "Leo M.", "2026-02-05T10:30:00"),
  makeObs("oak-9", "Deer Mouse", "Peromyscus maniculatus", 78, "Mammals", "oakwood", "Dmitri S.", "2026-02-08T07:30:00", "Found near wood pile"),
  makeObs("oak-10", "California Towhee", "Melozone crissalis", 91, "Birds", "oakwood", "Priya K.", "2026-02-10T08:20:00"),
  makeObs("oak-11", "Lupine", "Lupinus nanus", 95, "Plants", "oakwood", "Ms. Chen", "2026-02-12T14:30:00"),
  makeObs("oak-12", "Cabbage White Butterfly", "Pieris rapae", 90, "Insects", "oakwood", "Ava J.", "2026-02-15T11:00:00"),
  makeObs("oak-13", "California Scrub-Jay", "Aphelocoma californica", 95, "Birds", "oakwood", "Tomás R.", "2026-02-18T09:45:00"),
  makeObs("oak-14", "Miner's Lettuce", "Claytonia perfoliata", 96, "Plants", "oakwood", "Ms. Park", "2026-02-20T13:15:00"),
  makeObs("oak-15", "Bushtit", "Psaltriparus minimus", 87, "Birds", "oakwood", "Jamal W.", "2026-02-22T08:00:00"),
  makeObs("oak-16", "Pacific Tree Frog", "Pseudacris regilla", 89, "Others", "oakwood", "Leo M.", "2026-02-25T16:00:00", "Near the creek"),
  makeObs("oak-17", "Western Fence Lizard", "Sceloporus occidentalis", 92, "Others", "oakwood", "Dmitri S.", "2026-02-28T10:00:00"),
  makeObs("oak-18", "House Finch", "Haemorhous mexicanus", 93, "Birds", "oakwood", "Priya K.", "2026-03-01T09:30:00"),
  makeObs("oak-19", "Lady Beetle", "Coccinellidae sp.", 85, "Insects", "oakwood", "Ms. Chen", "2026-03-03T11:45:00"),
  makeObs("oak-20", "Poison Oak", "Toxicodendron diversilobum", 94, "Plants", "oakwood", "Tomás R.", "2026-03-05T14:00:00", "Caution noted for students"),
  makeObs("oak-21", "Black Phoebe", "Sayornis nigricans", 96, "Birds", "oakwood", "Ava J.", "2026-03-07T08:15:00"),
  makeObs("oak-22", "Honey Bee", "Apis mellifera", 90, "Insects", "oakwood", "Leo M.", "2026-03-08T12:00:00"),
  makeObs("oak-23", "Douglas Iris", "Iris douglasiana", 97, "Plants", "oakwood", "Ms. Park", "2026-03-10T13:30:00"),
  makeObs("oak-24", "American Robin", "Turdus migratorius", 95, "Birds", "oakwood", "Jamal W.", "2026-03-12T09:00:00"),
  makeObs("oak-25", "Brush Rabbit", "Sylvilagus bachmani", 76, "Mammals", "oakwood", "Dmitri S.", "2026-03-14T07:00:00", "Spotted at dawn near fence"),
  makeObs("oak-26", "Monarch Butterfly", "Danaus plexippus", 88, "Insects", "oakwood", "Priya K.", "2026-03-15T11:30:00"),
  makeObs("oak-27", "Chestnut-backed Chickadee", "Poecile rufescens", 92, "Birds", "oakwood", "Leo M.", "2026-03-17T08:45:00"),
  makeObs("oak-28", "Coyote Brush", "Baccharis pilularis", 96, "Plants", "oakwood", "Ms. Chen", "2026-03-18T14:00:00"),
  makeObs("oak-29", "Anna's Hummingbird", "Calypte anna", 94, "Birds", "oakwood", "Tomás R.", "2026-03-20T10:00:00"),
  makeObs("oak-30", "Western Tiger Swallowtail", "Papilio rutulus", 84, "Insects", "oakwood", "Ava J.", "2026-03-21T11:15:00"),
  makeObs("oak-31", "California Newt", "Taricha torosa", 86, "Others", "oakwood", "Jamal W.", "2026-03-22T16:30:00"),
  makeObs("oak-32", "Song Sparrow", "Melospiza melodia", 93, "Birds", "oakwood", "Priya K.", "2026-03-23T09:15:00"),
  makeObs("oak-33", "Yerba Buena", "Clinopodium douglasii", 91, "Plants", "oakwood", "Ms. Park", "2026-03-24T13:00:00"),
  makeObs("oak-34", "European mantis", "Mantis religiosa", 80, "Insects", "oakwood", "Dmitri S.", "2026-03-25T10:30:00"),
  makeObs("oak-35", "California Scrub-Jay", "Aphelocoma californica", 96, "Birds", "oakwood", "Leo M.", "2026-03-25T08:00:00"),
  makeObs("oak-36", "Raccoon", "Procyon lotor", 82, "Mammals", "oakwood", "Ms. Chen", "2026-03-26T06:00:00", "Tracks and scat found"),
  makeObs("oak-37", "Sticky Monkey Flower", "Diplacus aurantiacus", 94, "Plants", "oakwood", "Tomás R.", "2026-03-26T14:30:00"),
  makeObs("oak-38", "Acorn Woodpecker", "Melanerpes formicivorus", 97, "Birds", "oakwood", "Ava J.", "2026-03-27T09:45:00"),
  makeObs("oak-39", "Cabbage White Butterfly", "Pieris rapae", 91, "Insects", "oakwood", "Jamal W.", "2026-03-27T11:00:00"),
  makeObs("oak-40", "Dark-eyed Junco", "Junco hyemalis", 95, "Birds", "oakwood", "Priya K.", "2026-03-28T08:30:00"),
  makeObs("oak-41", "California Poppy", "Eschscholzia californica", 98, "Plants", "oakwood", "Ms. Park", "2026-03-28T12:00:00"),
  makeObs("oak-42", "Pacific Tree Frog", "Pseudacris regilla", 88, "Others", "oakwood", "Leo M.", "2026-03-28T15:00:00"),
  makeObs("oak-43", "Bushtit", "Psaltriparus minimus", 89, "Birds", "oakwood", "Dmitri S.", "2026-03-28T09:00:00"),
  makeObs("oak-44", "Dragonfly", "Anisoptera sp.", 77, "Insects", "oakwood", "Tomás R.", "2026-03-28T14:00:00"),
  makeObs("oak-45", "Black-tailed Deer", "Odocoileus hemionus", 74, "Mammals", "oakwood", "Ms. Chen", "2026-03-28T06:30:00", "Seen from trail camera"),
  makeObs("oak-46", "Coast Live Oak", "Quercus agrifolia", 99, "Plants", "oakwood", "Ava J.", "2026-03-28T13:00:00"),
  makeObs("oak-47", "House Finch", "Haemorhous mexicanus", 94, "Birds", "oakwood", "Jamal W.", "2026-03-28T10:30:00"),
];

// --- Riverside Wetland (30 observations, 14 species, 5 observers) ---

const riversideObservers = ["Dr. Walsh", "Kim L.", "Sven A.", "Maria G.", "Pat T."];

export const riversideObservations: Observation[] = [
  makeObs("riv-1", "Great Blue Heron", "Ardea herodias", 97, "Birds", "riverside", "Dr. Walsh", "2026-03-10T07:00:00", "Nesting pair spotted"),
  makeObs("riv-2", "Cattail", "Typha latifolia", 98, "Plants", "riverside", "Kim L.", "2026-03-10T08:30:00"),
  makeObs("riv-3", "Pacific Chorus Frog", "Pseudacris regilla", 91, "Others", "riverside", "Sven A.", "2026-03-11T18:00:00", "Auditory survey — very active chorus"),
  makeObs("riv-4", "Mallard", "Anas platyrhynchos", 96, "Birds", "riverside", "Maria G.", "2026-03-11T09:15:00"),
  makeObs("riv-5", "Dragonfly", "Anisoptera sp.", 83, "Insects", "riverside", "Pat T.", "2026-03-12T11:00:00"),
  makeObs("riv-6", "Red-winged Blackbird", "Agelaius phoeniceus", 95, "Birds", "riverside", "Dr. Walsh", "2026-03-13T07:30:00"),
  makeObs("riv-7", "Salt Marsh Harvest Mouse", "Reithrodontomys raviventris", 72, "Mammals", "riverside", "Kim L.", "2026-03-13T20:00:00", "CRITICAL: Endangered species detected"),
  makeObs("riv-8", "Willow", "Salix lasiolepis", 97, "Plants", "riverside", "Sven A.", "2026-03-14T10:00:00"),
  makeObs("riv-9", "Marsh Wren", "Cistothorus palustris", 89, "Birds", "riverside", "Maria G.", "2026-03-15T08:00:00"),
  makeObs("riv-10", "Western Pond Turtle", "Actinemys marmorata", 85, "Others", "riverside", "Pat T.", "2026-03-15T12:30:00", "Basking on log"),
  makeObs("riv-11", "Damselfly", "Zygoptera sp.", 81, "Insects", "riverside", "Dr. Walsh", "2026-03-16T11:30:00"),
  makeObs("riv-12", "Snowy Egret", "Egretta thula", 94, "Birds", "riverside", "Kim L.", "2026-03-17T07:15:00"),
  makeObs("riv-13", "Pickweed", "Salicornia pacifica", 92, "Plants", "riverside", "Sven A.", "2026-03-18T13:00:00"),
  makeObs("riv-14", "River Otter", "Lontra canadensis", 88, "Mammals", "riverside", "Maria G.", "2026-03-19T06:45:00", "Family group — 3 individuals"),
  makeObs("riv-15", "Mallard", "Anas platyrhynchos", 97, "Birds", "riverside", "Pat T.", "2026-03-20T09:00:00"),
  makeObs("riv-16", "Cattail", "Typha latifolia", 99, "Plants", "riverside", "Dr. Walsh", "2026-03-20T14:00:00"),
  makeObs("riv-17", "Great Blue Heron", "Ardea herodias", 98, "Birds", "riverside", "Kim L.", "2026-03-21T07:30:00"),
  makeObs("riv-18", "Pacific Chorus Frog", "Pseudacris regilla", 90, "Others", "riverside", "Sven A.", "2026-03-22T19:00:00"),
  makeObs("riv-19", "Red-winged Blackbird", "Agelaius phoeniceus", 96, "Birds", "riverside", "Maria G.", "2026-03-23T08:15:00"),
  makeObs("riv-20", "Dragonfly", "Anisoptera sp.", 85, "Insects", "riverside", "Pat T.", "2026-03-24T12:00:00"),
  makeObs("riv-21", "Marsh Wren", "Cistothorus palustris", 91, "Birds", "riverside", "Dr. Walsh", "2026-03-25T07:45:00"),
  makeObs("riv-22", "Salt Marsh Harvest Mouse", "Reithrodontomys raviventris", 75, "Mammals", "riverside", "Kim L.", "2026-03-25T21:00:00", "Second detection — confirms presence"),
  makeObs("riv-23", "Snowy Egret", "Egretta thula", 95, "Birds", "riverside", "Sven A.", "2026-03-26T08:00:00"),
  makeObs("riv-24", "Western Pond Turtle", "Actinemys marmorata", 87, "Others", "riverside", "Maria G.", "2026-03-27T12:00:00"),
  makeObs("riv-25", "Pickweed", "Salicornia pacifica", 93, "Plants", "riverside", "Pat T.", "2026-03-28T14:30:00"),
  makeObs("riv-26", "River Otter", "Lontra canadensis", 90, "Mammals", "riverside", "Dr. Walsh", "2026-03-29T06:30:00"),
  makeObs("riv-27", "Damselfly", "Zygoptera sp.", 83, "Insects", "riverside", "Kim L.", "2026-03-30T11:00:00"),
  makeObs("riv-28", "Willow", "Salix lasiolepis", 98, "Plants", "riverside", "Sven A.", "2026-03-31T10:30:00"),
  makeObs("riv-29", "Great Blue Heron", "Ardea herodias", 97, "Birds", "riverside", "Maria G.", "2026-04-01T07:00:00"),
  makeObs("riv-30", "Red-winged Blackbird", "Agelaius phoeniceus", 94, "Birds", "riverside", "Pat T.", "2026-04-02T08:30:00"),
];

export const allObservations: Observation[] = [...oakwoodObservations, ...riversideObservations];

// --- Community Memories ---

export const communityMemories: CommunityMemory[] = [
  {
    id: "mem-1",
    text: "I remember when this wetland stretched all the way to the highway. My grandfather used to fish here every Sunday morning. The herons have been nesting in those same willows for as long as anyone can remember.",
    author: "Margaret Torres, Local Resident (40+ years)",
    siteId: "riverside",
    date: "2026-03-20",
  },
  {
    id: "mem-2",
    text: "We found a family of river otters last spring — three pups playing in the shallows right where the proposed parking lot would go. They're the reason I started volunteering for these surveys.",
    author: "James Liu, Community Volunteer",
    siteId: "riverside",
    date: "2026-03-22",
  },
  {
    id: "mem-3",
    text: "The students named this oak 'Grandmother Tree' during our first survey. Its canopy shelters at least eight different species we've documented. It's become the centerpiece of our outdoor classroom.",
    author: "Ms. Sarah Chen, 4th Grade Teacher",
    siteId: "oakwood",
    date: "2026-02-15",
  },
  {
    id: "mem-4",
    text: "When the third graders found the endangered harvest mouse, you should have seen their faces. One of them said 'Now they can't build here, right?' That's when I knew this project was really teaching them something.",
    author: "Dr. Pat Walsh, Ecology Advisor",
    siteId: "riverside",
    date: "2026-03-25",
  },
  {
    id: "mem-5",
    text: "Every Monday morning, Leo rushes to check the trail camera before anyone else. Last week he spotted a deer at dawn — his first wild mammal sighting. He's been drawing it in his nature journal ever since.",
    author: "Ms. Park, Art & Science Teacher",
    siteId: "oakwood",
    date: "2026-03-28",
  },
];

// --- Monthly Aggregated Data ---

export const oakwoodMonthly: MonthlyData[] = [
  { month: "Jan", speciesCount: 5, observationCount: 5, shannonIndex: 1.42 },
  { month: "Feb", speciesCount: 12, observationCount: 14, shannonIndex: 2.18 },
  { month: "Mar", speciesCount: 19, observationCount: 28, shannonIndex: 2.74 },
];

export const riversideMonthly: MonthlyData[] = [
  { month: "Mar W1", speciesCount: 5, observationCount: 6, shannonIndex: 1.52 },
  { month: "Mar W2", speciesCount: 10, observationCount: 12, shannonIndex: 2.05 },
  { month: "Mar W3", speciesCount: 12, observationCount: 14, shannonIndex: 2.31 },
  { month: "Mar W4", speciesCount: 14, observationCount: 16, shannonIndex: 2.56 },
  { month: "Apr W1", speciesCount: 11, observationCount: 12, shannonIndex: 2.38 },
];

// --- Species Trends for multi-line chart ---

export const oakwoodSpeciesTrends: SpeciesTrend[] = [
  { month: "Jan", "American Robin": 2, "Anna's Hummingbird": 1, "California Scrub-Jay": 0, "Western Fence Lizard": 1, "Honey Bee": 1 },
  { month: "Feb", "American Robin": 0, "Anna's Hummingbird": 1, "California Scrub-Jay": 1, "Western Fence Lizard": 1, "Honey Bee": 0 },
  { month: "Mar", "American Robin": 2, "Anna's Hummingbird": 2, "California Scrub-Jay": 2, "Western Fence Lizard": 0, "Honey Bee": 1 },
];

export const riversideSpeciesTrends: SpeciesTrend[] = [
  { month: "Mar W1", "Great Blue Heron": 1, "Mallard": 1, "Red-winged Blackbird": 1, "Marsh Wren": 0, "Snowy Egret": 0 },
  { month: "Mar W2", "Great Blue Heron": 1, "Mallard": 1, "Red-winged Blackbird": 1, "Marsh Wren": 1, "Snowy Egret": 1 },
  { month: "Mar W3", "Great Blue Heron": 1, "Mallard": 1, "Red-winged Blackbird": 1, "Marsh Wren": 1, "Snowy Egret": 1 },
  { month: "Mar W4", "Great Blue Heron": 1, "Mallard": 0, "Red-winged Blackbird": 1, "Marsh Wren": 1, "Snowy Egret": 1 },
  { month: "Apr W1", "Great Blue Heron": 1, "Mallard": 0, "Red-winged Blackbird": 1, "Marsh Wren": 0, "Snowy Egret": 0 },
];

// --- Helper: get observations for a site ---
export function getObservationsForSite(siteId: string): Observation[] {
  return allObservations.filter((o) => o.siteId === siteId);
}

export function getMemoriesForSite(siteId: string): CommunityMemory[] {
  return communityMemories.filter((m) => m.siteId === siteId);
}
