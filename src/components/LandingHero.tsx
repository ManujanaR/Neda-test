'use client';

import React from 'react';
import { JourneyStage, StartingStatus } from '@/lib/types';
import { ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { GraduationCap, Briefcase, Rocket, BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, Compass } from 'lucide-react';

interface LandingHeroProps {
  stage: JourneyStage;
  onSelectStage: (s: JourneyStage) => void;
  status: StartingStatus;
  onSelectStatus: (st: StartingStatus) => void;
  onStartAssessment: () => void;
  onExploreArchetypes: () => void;
}

export default function LandingHero({
  stage,
  onSelectStage,
  status,
  onSelectStatus,
  onStartAssessment,
  onExploreArchetypes,
}: LandingHeroProps) {
  const stageOptions: { id: JourneyStage; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'student',
      label: 'Student',
      desc: 'School level or pre-uni. Exploring interests and building habits from scratch.',
      icon: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 'undergraduate',
      label: 'Undergraduate',
      desc: 'University or college. Surrounded by peers, campus clubs, and early projects.',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'graduate',
      label: 'Graduate',
      desc: 'Early career, post-grad, or evaluating the job vs venture fork in the road.',
      icon: <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 'entrepreneur',
      label: 'Entrepreneur',
      desc: 'Currently running or scaling a venture, removing bottlenecks and growing teams.',
      icon: <Rocket className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    },
  ];

  const statusOptions: { id: StartingStatus; label: string }[] = [
    { id: 'not_started', label: 'Starting from Zero' },
    { id: 'idea', label: 'I Have a Problem / Idea' },
    { id: 'building', label: 'Building or Launched' },
    { id: 'revenue', label: 'Generating Revenue' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-10 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>16Personalities-Style Entrepreneur Profile</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight mb-6 max-w-4xl mx-auto">
          What Kind of <span className="text-blue-600 dark:text-blue-400">Entrepreneur</span> Are You?
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Go beyond raw scores. Uncover your 4-letter entrepreneurial archetype, 8-competency octagon, dangerous blind spots, and a tailored action roadmap for your exact stage.
        </p>

        {/* Step 1: Stage & Status Customizer Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-left mb-12 transition-colors">
          
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Personalize Your Assessment
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your results and 30-day challenge will adapt to where you currently stand in your entrepreneurial journey.
            </p>
          </div>

          {/* Question: Stage */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              1. Where are you on your journey?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectStage(opt.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    stage === opt.id
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-xs shrink-0 mt-0.5">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      {opt.label}
                      {stage === opt.id && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question: Status */}
          <div className="mb-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              2. Have you started anything yet?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onSelectStatus(st.id)}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-center transition-all ${
                    status === st.id
                      ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Big CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                45 statements &middot; ~8 min
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Private & client-side
              </span>
            </div>

            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Begin Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4 Archetype Families Preview */}
        <div className="mt-16 text-left max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                The 16 Archetypes
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                4 Entrepreneurial Families
              </h3>
            </div>
            <button
              onClick={onExploreArchetypes}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore all 16 profiles</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(ARCHETYPE_FAMILIES).map((fam) => (
              <div
                key={fam.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {fam.codePrefix}-*
                  </span>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: fam.themeColor }}
                  />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {fam.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {fam.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works 3-Step Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          <div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Rate 45 Statements Honestly
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Rate your actual behavior from 1 (Never) to 5 (Always). A built-in social desirability check corrects for natural optimism.
            </p>
          </div>

          <div>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Unpack Your Archetype & Octagon
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Receive your 4-letter type, 4 dual-pole dimension percentages, and the full 8-competency Personal Entrepreneurial Competency octagon.
            </p>
          </div>

          <div>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Follow Your 30-Day Blueprint
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Receive tactical blind-spot alerts, an unfair advantage checklist, co-founder fit matrix, and a 30-day challenge adapted to your stage.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
