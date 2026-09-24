'use client';

import React, { useState } from 'react';
import { AssessmentResult } from '@/lib/types';
import { ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { getBandColor } from '@/lib/competencies';
import { ROADMAP_STEPS } from '@/lib/roadmap';
import DimensionBar from './DimensionBar';
import OctagonChart from './OctagonChart';
import { useLang } from '@/lib/i18n';

interface ReportViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onExploreArchetypes: () => void;
}

export default function ReportView({ result, onRetake, onExploreArchetypes }: ReportViewProps) {
  const { t } = useLang();
  const r = t.report;
  const stageLabels = t.stageLabels;
  const [competencyFilter, setCompetencyFilter] = useState<'all' | 'strengths' | 'growth'>('all');
  const [copied, setCopied] = useState<'summary' | 'status' | null>(null);

  const { archetype, dimensions, competencies, strengths, growthAreas, blindSpots, thirtyDayPlan } = result;
  const family = ARCHETYPE_FAMILIES[archetype.familyId];
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const summaryText = `NEDA ${t.nav.tagline}
${archetype.name} (${archetype.code}), ${family.name}, ${stageLabels[result.stage]}
"${archetype.essence}"

${r.summaryDimensions}
${dimensions.map((d) => `${d.title}: ${d.dominantPole} (${d.pole1Name} ${d.pole1Percentage}%, ${d.pole2Name} ${d.pole2Percentage}%)`).join('\n')}

${r.summaryStrengths}
${strengths.map((s) => `${s.shortName}, ${r.of25(s.score)} (${s.band})`).join('\n')}

${r.summaryGrowth}
${growthAreas[0]?.shortName}, ${r.of25(growthAreas[0]?.score ?? 0)} (${growthAreas[0]?.band})

${r.summaryChallenge}
${thirtyDayPlan.monthlyChallenge}

${origin}`;

  const statusText = r.statusText(archetype.name, archetype.code, strengths[0]?.shortName ?? '', origin);

  const copy = async (text: string, which: 'summary' | 'status') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      // clipboard blocked; the text is visible on the page to select by hand
    }
  };

  const handleShareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `NEDA ${t.nav.tagline}: ${archetype.name}`, text: summaryText });
        return;
      } catch {
        // user dismissed the share sheet, fall through to copy
      }
    }
    copy(summaryText, 'summary');
  };

  const openShare = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const filteredCompetencies =
    competencyFilter === 'strengths' ? strengths : competencyFilter === 'growth' ? growthAreas : competencies;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-14">
      {/* Archetype */}
      <section className="space-y-6">
        <p className="text-sm text-mute flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: family.themeColor }} />
          {archetype.code}, {family.name}, {stageLabels[result.stage]}
        </p>
        <h1 className="text-5xl sm:text-6xl">{archetype.name}</h1>
        <p className="italic text-xl text-mute">{archetype.essence}</p>
        <p className="leading-relaxed max-w-xl">{archetype.portrait}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          <button onClick={handleShareResults} className="btn-secondary">
            {copied === 'summary' ? r.copied : r.share}
          </button>
          <button onClick={() => window.print()} className="btn-secondary">
            {r.print}
          </button>
          <button onClick={onRetake} className="btn-link text-mute self-center ml-2">
            {t.nav.retake}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div>
            <h3 className="font-medium mb-2">{r.shine}</h3>
            <ul className="space-y-1 text-sm list-disc pl-5">
              {archetype.superpowers.map((sp, idx) => (
                <li key={idx}>{sp}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">{r.slip}</h3>
            <ul className="space-y-1 text-sm list-disc pl-5">
              {archetype.vulnerabilities.map((v, idx) => (
                <li key={idx}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dimensions */}
      <section className="section space-y-8">
        <div>
          <h2 className="text-3xl">{r.dimensions}</h2>
          <p className="text-mute mt-2">{r.dimensionsSub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          {dimensions.map((dim) => (
            <DimensionBar key={dim.id} dimension={dim} />
          ))}
        </div>
      </section>

      {/* Octagon */}
      <section className="section space-y-8">
        <div>
          <h2 className="text-3xl">{r.octagon}</h2>
          <p className="text-mute mt-2 max-w-xl">{r.octagonSub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-3">
            <OctagonChart scores={result.scores} />
          </div>
          <ul className="lg:col-span-2 border-t border-line text-sm">
            {competencies.map((comp) => (
              <li key={comp.code} className="border-b border-line py-2 flex items-baseline justify-between gap-3">
                <span>{comp.shortName}</span>
                <span className="flex items-baseline gap-3 shrink-0">
                  <span className={`text-xs ${getBandColor(comp.band)}`}>{comp.band}</span>
                  <span className="font-medium w-6 text-right tabular-nums">{comp.score}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Competencies in detail */}
      <section className="section space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl">{r.detail}</h2>
          <div className="flex gap-2">
            {(
              [
                ['all', r.filterAll],
                ['strengths', r.filterStrengths],
                ['growth', r.filterGrowth],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                aria-pressed={competencyFilter === key}
                onClick={() => setCompetencyFilter(key)}
                className="choice px-3 py-1.5 text-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {filteredCompetencies.map((comp) => {
            const isStrength = strengths.some((s) => s.code === comp.code);
            const isGrowth = growthAreas.some((g) => g.code === comp.code);

            return (
              <article key={comp.code} className="space-y-3 max-w-xl">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="text-xl font-semibold">{comp.name}</h3>
                  <span className="shrink-0 text-sm">
                    <span className="text-mute">{r.of25(comp.score)}, </span>
                    <span className={getBandColor(comp.band)}>{comp.band}</span>
                  </span>
                </div>
                {(isStrength || isGrowth) && (
                  <p className="text-sm text-mute">
                    {isStrength ? r.topStrength : r.topGrowth}
                  </p>
                )}
                <p className="text-sm leading-relaxed">{comp.description}</p>
                <dl className="text-sm space-y-2">
                  <div>
                    <dt className="font-medium inline">{r.watchOut}: </dt>
                    <dd className="inline text-mute">{comp.shadowSide}</dd>
                  </div>
                  <div>
                    <dt className="font-medium inline">{r.tryThis}: </dt>
                    <dd className="inline">{comp.habitsByStage[result.stage]}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      {/* Blind spots */}
      <section className="section space-y-8">
        <div>
          <h2 className="text-3xl">{r.blindSpots}</h2>
          <p className="text-mute mt-2 max-w-xl">{r.blindSpotsSub}</p>
        </div>

        <div className="space-y-10">
          {blindSpots.map((bs) => (
            <article key={bs.id} className="space-y-3 max-w-xl">
              <h3 className="text-xl font-semibold">{bs.title}</h3>
              <p className="text-sm text-mute">{bs.synergy}</p>
              <p className="text-sm leading-relaxed">{bs.description}</p>
              <dl className="text-sm space-y-2">
                <div>
                  <dt className="font-medium inline">{r.risk}: </dt>
                  <dd className="inline">{bs.riskWarning}</dd>
                </div>
                <div>
                  <dt className="font-medium inline">{r.helps}: </dt>
                  <dd className="inline">{bs.tacticalFix}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* 30-day plan */}
      <section className="section space-y-8">
        <div>
          <h2 className="text-3xl">{r.thirtyDays}</h2>
          <p className="text-mute mt-2 max-w-xl">
            {r.thirtyDaysSub(
              competencies.find((c) => c.code === thirtyDayPlan.focusCompetency)?.name ?? thirtyDayPlan.focusCompetency
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-medium mb-3">{r.habits}</h3>
            <ol className="space-y-3 text-sm list-decimal pl-5 leading-relaxed">
              {thirtyDayPlan.habits.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-3">{r.challenge}</h3>
            <p className="text-sm leading-relaxed">{thirtyDayPlan.monthlyChallenge}</p>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section space-y-8">
        <div>
          <h2 className="text-3xl">{r.roadmap}</h2>
          <p className="text-mute mt-2 max-w-xl">{r.roadmapSub(result.roadmapPhaseEntry)}</p>
        </div>

        <ol className="border-t border-line">
          {ROADMAP_STEPS.map((step) => {
            const isCurrent = step.phaseNumber === result.roadmapPhaseEntry;
            const isPast = step.phaseNumber < result.roadmapPhaseEntry;

            return (
              <li
                key={step.phaseNumber}
                aria-current={isCurrent ? 'step' : undefined}
                className={`border-b border-line py-6 ${isPast ? 'text-mute' : ''}`}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">
                    {step.title}
                    {isCurrent && <span className="text-sm font-normal text-mute"> {r.youAreHere}</span>}
                  </h3>
                  <p className="text-sm">{step.goal}</p>
                  {isCurrent && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm pt-1">
                      <div>
                        <p className="font-medium mb-1">{r.phaseLooks}</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {step.typicalActions.map((act, i) => (
                            <li key={i}>{act}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-1">{r.doneWhen}</p>
                        <p>{step.doneWhen}</p>
                        <p className="text-mute mt-2">{r.leansOn(step.relevantCompetencies.join(', '))}</p>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Co-founder */}
      <section className="section space-y-6">
        <h2 className="text-3xl">{r.cofounder}</h2>
        <p className="text-mute max-w-xl">{r.cofounderSub}</p>
        <p className="text-lg font-semibold max-w-xl">{archetype.idealCoFounder}</p>
        <p className="text-sm">
          <span className="text-mute">{r.pairWell}: </span>
          {archetype.complementaryArchetypes.join(', ')}.{' '}
          <button onClick={onExploreArchetypes} className="btn-link">
            {r.readAbout}
          </button>
        </p>
      </section>

      {/* Reliability */}
      <section className="section space-y-3 text-sm">
        <h2 className="text-xl">{r.trust}</h2>
        <p>{r.trustLine(result.reliabilityLevel, result.rawCorrectionScore, result.deduction)}</p>
        <p className="text-mute leading-relaxed max-w-xl">{result.reliabilityAdvice}</p>
        <p className="text-mute max-w-xl">{r.disclaimer}</p>
      </section>

      {/* Share */}
      <section className="section space-y-4">
        <h2 className="text-3xl">{r.tell}</h2>
        <p className="text-mute max-w-xl">{r.tellSub}</p>
        <p className="text-lg max-w-xl select-all">{statusText}</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copy(statusText, 'status')} className="btn-secondary">
            {copied === 'status' ? r.copied : r.copy}
          </button>
          <button
            onClick={() => openShare(`https://twitter.com/intent/tweet?text=${encodeURIComponent(statusText)}`)}
            className="btn-secondary"
          >
            X
          </button>
          <button
            onClick={() => openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(origin)}`)}
            className="btn-secondary"
          >
            LinkedIn
          </button>
          <button
            onClick={() => openShare(`https://api.whatsapp.com/send?text=${encodeURIComponent(statusText)}`)}
            className="btn-secondary"
          >
            WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
