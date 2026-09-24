'use client';

import React from 'react';
import { JourneyStage, StartingStatus } from '@/lib/types';
import { ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { useLang } from '@/lib/i18n';

interface LandingHeroProps {
  stage: JourneyStage;
  onSelectStage: (s: JourneyStage) => void;
  status: StartingStatus;
  onSelectStatus: (st: StartingStatus) => void;
  onStartAssessment: () => void;
  onExploreArchetypes: () => void;
}

const STAGES: JourneyStage[] = ['student', 'undergraduate', 'graduate', 'entrepreneur'];
const STATUSES: StartingStatus[] = ['not_started', 'idea', 'building', 'revenue'];

export default function LandingHero({
  stage,
  onSelectStage,
  status,
  onSelectStatus,
  onStartAssessment,
  onExploreArchetypes,
}: LandingHeroProps) {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 space-y-14">
      <section className="space-y-6">
        <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-xl">{t.home.title}</h1>
        <p className="text-lg text-mute max-w-xl leading-relaxed">{t.home.intro}</p>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="font-medium">{t.home.whereAreYou}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STAGES.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={stage === id}
                onClick={() => onSelectStage(id)}
                className="choice px-4 py-3"
              >
                <span className="block font-medium text-sm">{t.stageLabels[id]}</span>
                <span className="block text-sm text-mute">{t.home.stageDesc[id]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium">{t.home.started}</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={status === id}
                onClick={() => onSelectStatus(id)}
                className="choice px-4 py-2 text-sm"
              >
                {t.home.statuses[id]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button onClick={onStartAssessment} className="btn-primary px-6 py-3">
            {t.home.start}
          </button>
          <p className="text-sm text-mute">{t.home.privacy}</p>
        </div>
      </section>

      <section className="section space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl">{t.home.families}</h2>
          <button onClick={onExploreArchetypes} className="btn-link text-mute">
            {t.home.seeAll}
          </button>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {Object.values(ARCHETYPE_FAMILIES).map((fam) => (
            <div key={fam.id}>
              <dt className="font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: fam.themeColor }} />
                {fam.name}
              </dt>
              <dd className="text-sm text-mute mt-1 leading-relaxed">{fam.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
