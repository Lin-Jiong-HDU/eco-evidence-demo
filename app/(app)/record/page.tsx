'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, Check, Pencil, MapPin, Clock } from 'lucide-react';

const mockSpecies = [
  { name: 'American Robin', sciName: 'Turdus migratorius', conf: 96 },
  { name: 'Western Fence Lizard', sciName: 'Sceloporus occidentalis', conf: 91 },
  { name: 'Coast Live Oak', sciName: 'Quercus agrifolia', conf: 98 },
];

export default function RecordPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [identifying, setIdentifying] = useState(false);
  const [species, setSpecies] = useState<(typeof mockSpecies)[number] | null>(null);
  const [observerName, setObserverName] = useState('');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);
    setSpecies(null);
    setIdentifying(true);

    setTimeout(() => {
      const result = mockSpecies[Math.floor(Math.random() * mockSpecies.length)];
      setSpecies(result);
      setIdentifying(false);
    }, 2000);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-12">
      {/* Photo Upload Area */}
      <div className="relative">
        <div className="absolute -top-0 left-0 w-1 h-4 rounded-sm bg-leaf" />
        <div className="bg-parchment border-2 border-dashed border-bark rounded-lg p-8 text-center">
          <Camera className="mx-auto h-10 w-10 text-stone mb-3" />
          <p className="text-stone mb-4">Upload a photo to identify species</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-forest text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Upload className="inline h-4 w-4 mr-1 -mt-0.5" />
              Take Photo
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="border border-bark bg-transparent text-bark px-5 py-2 rounded-lg text-sm font-medium hover:bg-bark/5 transition-colors"
            >
              Choose File
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
          {photoName && (
            <p className="text-xs text-stone mt-3">{photoName}</p>
          )}
        </div>
      </div>

      {/* Loading State */}
      {identifying && (
        <div className="flex items-center gap-2 text-stone text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-leaf animate-spin" />
          Identifying species...
        </div>
      )}

      {/* Species Identification Result */}
      {species && !identifying && (
        <div className="relative">
          <div className="absolute -top-0 left-0 w-1 h-4 rounded-sm bg-leaf" />
          <div className="bg-paper border border-bark/20 rounded-lg p-5">
            <p className="font-semibold text-ink">{species.name}</p>
            <p className="italic text-stone text-sm">{species.sciName}</p>
            <p className="text-sm text-stone mt-1">
              Confidence: <span className="text-leaf font-medium">{species.conf}%</span>
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => {}}
                className="bg-forest text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Check className="inline h-4 w-4 mr-1 -mt-0.5" />
                Accept
              </button>
              <button className="text-forest text-sm font-medium hover:underline">
                <Pencil className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metadata Section */}
      {species && !identifying && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-stone">
            <Clock className="h-4 w-4 text-stone" />
            {timestamp}
          </div>
          <div className="flex items-center gap-2 text-sm text-stone">
            <MapPin className="h-4 w-4 text-stone" />
            37.7749&deg; N, 122.4194&deg; W
          </div>
        </div>
      )}

      {/* Manual Inputs Section */}
      {species && !identifying && (
        <div className="space-y-4">
          <div>
            <label htmlFor="observer" className="block text-sm font-medium text-ink mb-1">
              Observer Name
            </label>
            <input
              id="observer"
              type="text"
              value={observerName}
              onChange={(e) => setObserverName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink placeholder:text-sand focus:outline-none focus:ring-2 focus:ring-leaf/40"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-ink mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional observations..."
              className="w-full rounded-lg border border-bark/30 bg-paper px-3 py-2 text-sm text-ink placeholder:text-sand focus:outline-none focus:ring-2 focus:ring-leaf/40 resize-none"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      {species && !identifying && (
        <>
          <button
            onClick={handleSave}
            className="w-full bg-forest text-white rounded-lg h-12 font-medium hover:opacity-90 transition-opacity mt-6"
          >
            Save Observation
          </button>
          {saved && (
            <p className="text-center text-leaf text-sm font-medium animate-pulse">
              Observation saved!
            </p>
          )}
        </>
      )}
    </div>
  );
}
