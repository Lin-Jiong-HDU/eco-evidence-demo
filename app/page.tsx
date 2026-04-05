import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-warm-white flex flex-col">
      {/* Top topographic wave — inverted, peaks descend from top */}
      <div className="absolute top-0 left-0 w-full pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,40 C1380,38 1340,52 1280,58 C1220,64 1180,48 1120,56 C1060,64 1020,80 960,76 C900,72 860,54 800,62 C740,70 700,88 640,84 C580,80 540,60 480,66 C420,72 380,92 320,86 C260,80 220,58 160,68 C100,78 60,96 0,90 Z"
            fill="#F0EDE5"
            opacity="0.4"
          />
          <path
            d="M0,0 L1440,0 L1440,60 C1380,62 1320,78 1260,82 C1200,86 1140,68 1080,76 C1020,84 960,104 900,98 C840,92 780,72 720,80 C660,88 600,108 540,102 C480,96 420,76 360,84 C300,92 240,112 180,104 C120,96 60,78 0,82 Z"
            fill="#F0EDE5"
            opacity="0.6"
          />
          <path
            d="M0,0 L1440,0 L1440,80 C1380,82 1320,98 1260,102 C1200,106 1140,88 1080,96 C1020,104 960,124 900,118 C840,112 780,92 720,100 C660,108 600,128 540,122 C480,116 420,96 360,104 C300,112 240,132 180,124 C120,116 60,98 0,102 Z"
            fill="#F0EDE5"
            opacity="1"
          />
        </svg>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h1 className="text-4xl font-semibold text-forest">
            <span className="mr-2" role="img" aria-label="leaf">🌿</span>
            Eco Evidence
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-lg text-stone">
            Turn nature observations into ecological evidence
          </p>
          <p className="text-lg text-stone">
            Community-powered biodiversity documentation
          </p>

          {/* Description */}
          <p className="mt-4 text-sm text-stone max-w-md text-center leading-relaxed">
            Eco Evidence helps communities, students, and researchers document
            local biodiversity. Record species observations, track ecological
            changes, and generate evidence reports for conservation.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/record"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-forest text-white font-medium hover:bg-leaf transition-colors"
            >
              Start a Survey
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-parchment border border-bark text-ink font-medium hover:bg-paper transition-colors"
            >
              View Demo
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-16 text-xs text-sand">
            Open source · Free · Community-first
          </p>
        </div>
      </div>

      {/* Bottom topographic wave — peaks ascend from bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L1440,220 L1440,180 C1380,178 1340,164 1280,158 C1220,152 1180,168 1120,160 C1060,152 1020,136 960,140 C900,144 860,162 800,154 C740,146 700,128 640,132 C580,136 540,156 480,150 C420,144 380,124 320,130 C260,136 220,158 160,148 C100,138 60,120 0,126 Z"
            fill="#F0EDE5"
            opacity="0.4"
          />
          <path
            d="M0,220 L1440,220 L1440,160 C1380,158 1320,142 1260,138 C1200,134 1140,152 1080,144 C1020,136 960,116 900,122 C840,128 780,148 720,140 C660,132 600,112 540,118 C480,124 420,144 360,136 C300,128 240,108 180,116 C120,124 60,142 0,138 Z"
            fill="#F0EDE5"
            opacity="0.6"
          />
          <path
            d="M0,220 L1440,220 L1440,140 C1380,138 1320,122 1260,118 C1200,114 1140,132 1080,124 C1020,116 960,96 900,102 C840,108 780,128 720,120 C660,112 600,92 540,98 C480,104 420,124 360,116 C300,108 240,88 180,96 C120,104 60,122 0,118 Z"
            fill="#F0EDE5"
            opacity="1"
          />
        </svg>
      </div>
    </div>
  );
}
