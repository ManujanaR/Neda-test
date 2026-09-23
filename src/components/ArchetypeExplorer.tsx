'use client';

import React, { useState } from 'react';
import { ARCHETYPES, ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { ArchetypeFamilyId, ArchetypeProfile } from '@/lib/types';
import { ArrowLeft, Sparkles, Check, Users, ShieldAlert, Award, X } from 'lucide-react';

interface ArchetypeExplorerProps {
  onBack: () => void;
  onTakeTest: () => void;
}

export default function ArchetypeExplorer({ onBack, onTakeTest }: ArchetypeExplorerProps) {
  const [selectedFamily, setSelectedFamily] = useState<ArchetypeFamilyId | 'all'>('all');
  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeProfile | null>(null);

  const archetypesList = Object.values(ARCHETYPES);
  const filteredList =
    selectedFamily === 'all'
      ? archetypesList
      : archetypesList.filter((a) => a.familyId === selectedFamily);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Assessment</span>
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            The 16 Entrepreneurial Archetypes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Explore how the 4 dimensions shape 16 distinct operational styles, their primary strengths, and their ideal co-founders.
          </p>
        </div>

        <button
          onClick={onTakeTest}
          className="self-start sm:self-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Find Your Archetype</span>
        </button>
      </div>

      {/* Filter Tabs by Family */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-fit transition-colors">
        <button
          onClick={() => setSelectedFamily('all')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            selectedFamily === 'all'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All 16 Profiles
        </button>

        {Object.values(ARCHETYPE_FAMILIES).map((fam) => (
          <button
            key={fam.id}
            onClick={() => setSelectedFamily(fam.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              selectedFamily === fam.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: fam.themeColor }}
            />
            <span>{fam.name}</span>
          </button>
        ))}
      </div>

      {/* Grid of Archetypes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredList.map((archetype) => {
          const family = ARCHETYPE_FAMILIES[archetype.familyId];
          return (
            <div
              key={archetype.code}
              onClick={() => setSelectedArchetype(archetype)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {archetype.code}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${family.themeColor}15`,
                      color: family.themeColor,
                    }}
                  >
                    {family.name}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {archetype.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                  {archetype.essence}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                <span>View Full Profile</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedArchetype && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 sm:p-8 relative transition-colors">
            
            <button
              onClick={() => setSelectedArchetype(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {selectedArchetype.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {ARCHETYPE_FAMILIES[selectedArchetype.familyId].name}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {selectedArchetype.name}
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1 italic">
                &ldquo;{selectedArchetype.essence}&rdquo;
              </p>
            </div>

            {/* Portrait */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Operational Portrait
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/70 dark:border-slate-800">
                {selectedArchetype.portrait}
              </p>
            </div>

            {/* Superpowers */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <Award className="w-4 h-4" />
                <span>Signature Superpowers</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedArchetype.superpowers.map((sp, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vulnerabilities */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Operational Vulnerabilities</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedArchetype.vulnerabilities.map((v, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500 shrink-0 font-bold">&bull;</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal Co-Founder */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Ideal Co-Founder Fit</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {selectedArchetype.idealCoFounder}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
