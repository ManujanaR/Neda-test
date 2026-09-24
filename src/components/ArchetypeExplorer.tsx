'use client';

import React, { useState } from 'react';
import { ARCHETYPES, ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { ArchetypeFamilyId, ArchetypeProfile } from '@/lib/types';
import { X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

interface ArchetypeExplorerProps {
  onBack: () => void;
  onTakeTest: () => void;
}

export default function ArchetypeExplorer({ onBack, onTakeTest }: ArchetypeExplorerProps) {
  const { t } = useLang();
  const [selectedFamily, setSelectedFamily] = useState<ArchetypeFamilyId | 'all'>('all');
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeProfile | null>(null);

  const archetypesList = Object.values(ARCHETYPES);
  const filteredList =
    selectedFamily === 'all'
      ? archetypesList
      : archetypesList.filter((a) => a.familyId === selectedFamily);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
      <div className="space-y-4">
        <button onClick={onBack} className="btn-link text-mute">
          {t.explorer.back}
        </button>
        <h1 className="text-4xl">{t.explorer.title}</h1>
        <p className="text-mute max-w-xl leading-relaxed">{t.explorer.intro}</p>
        <button onClick={onTakeTest} className="btn-primary">
          {t.explorer.findYours}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          aria-pressed={selectedFamily === 'all'}
          onClick={() => setSelectedFamily('all')}
          className="choice px-3 py-1.5 text-sm"
        >
          {t.explorer.all}
        </button>
        {Object.values(ARCHETYPE_FAMILIES).map((fam) => (
          <button
            key={fam.id}
            aria-pressed={selectedFamily === fam.id}
            onClick={() => setSelectedFamily(fam.id)}
            className="choice px-3 py-1.5 text-sm flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fam.themeColor }} />
            {fam.name}
          </button>
        ))}
      </div>

      <ul className="border-t border-line">
        {filteredList.map((archetype) => {
          const family = ARCHETYPE_FAMILIES[archetype.familyId];
          return (
            <li key={archetype.code} className="border-b border-line">
              <button
                onClick={() => setSelectedArchetype(archetype)}
                className="w-full text-left py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 hover:bg-well transition-colors px-2 -mx-2"
              >
                <span className="text-sm text-mute w-20 shrink-0 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: family.themeColor }} />
                  {archetype.code}
                </span>
                <span className="font-medium w-40 shrink-0">{archetype.name}</span>
                <span className="text-sm text-mute">{archetype.essence}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {selectedArchetype && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="archetype-title"
          className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4"
          onClick={() => setSelectedArchetype(null)}
        >
          <div
            className="bg-paper w-full max-w-xl max-h-[90vh] overflow-y-auto rounded p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-mute">
                  {selectedArchetype.code}, {ARCHETYPE_FAMILIES[selectedArchetype.familyId].name}
                </p>
                <h2 id="archetype-title" className="text-3xl mt-1">
                  {selectedArchetype.name}
                </h2>
                <p className="italic text-lg text-mute mt-2">{selectedArchetype.essence}</p>
              </div>
              <button
                onClick={() => setSelectedArchetype(null)}
                className="text-mute hover:text-ink shrink-0"
                aria-label={t.explorer.back}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm leading-relaxed">{selectedArchetype.portrait}</p>

            <div>
              <h3 className="font-medium mb-2">{t.explorer.shine}</h3>
              <ul className="space-y-1 text-sm list-disc pl-5">
                {selectedArchetype.superpowers.map((sp, idx) => (
                  <li key={idx}>{sp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">{t.explorer.slip}</h3>
              <ul className="space-y-1 text-sm list-disc pl-5">
                {selectedArchetype.vulnerabilities.map((v, idx) => (
                  <li key={idx}>{v}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-4">
              <h3 className="font-medium mb-1">{t.explorer.worksWith}</h3>
              <p className="text-sm">{selectedArchetype.idealCoFounder}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
