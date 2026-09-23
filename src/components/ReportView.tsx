'use client';

import React, { useState } from 'react';
import { AssessmentResult, CompetencyCode } from '@/lib/types';
import { ARCHETYPE_FAMILIES } from '@/lib/archetypes';
import { getBandColor } from '@/lib/competencies';
import { ROADMAP_STEPS } from '@/lib/roadmap';
import DimensionBar from './DimensionBar';
import OctagonChart from './OctagonChart';
import {
  Award,
  AlertTriangle,
  Calendar,
  Compass,
  Download,
  Share2,
  Users,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  Info,
  Copy,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';

interface ReportViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onExploreArchetypes: () => void;
}

export default function ReportView({
  result,
  onRetake,
  onExploreArchetypes,
}: ReportViewProps) {
  const [competencyFilter, setCompetencyFilter] = useState<'all' | 'strengths' | 'growth'>('all');
  const [copiedResults, setCopiedResults] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  const { archetype, dimensions, competencies, strengths, growthAreas, blindSpots, thirtyDayPlan } = result;
  const family = ARCHETYPE_FAMILIES[archetype.familyId];

  // Stage display label
  const stageLabels = {
    student: 'Student Explorer',
    undergraduate: 'Undergraduate Founder',
    graduate: 'Graduate Innovator',
    entrepreneur: 'Active Entrepreneur',
  };

  const generateProfileSummary = () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    return `🌟 NEDA ENTREPRENEUR PROFILE 🌟
Archetype: ${archetype.name} (${archetype.code})
Family: ${family.name}
Stage: ${stageLabels[result.stage]}
Essence: "${archetype.essence}"

⚡ CORE DIMENSIONS:
• Momentum: ${dimensions[0]?.dominantPole} (${dimensions[0]?.pole1Percentage}% Spark / ${dimensions[0]?.pole2Percentage}% Anchor)
• Execution: ${dimensions[1]?.dominantPole} (${dimensions[1]?.pole1Percentage}% Deliverer / ${dimensions[1]?.pole2Percentage}% Crafter)
• Risk Stance: ${dimensions[2]?.dominantPole} (${dimensions[2]?.pole1Percentage}% Bold / ${dimensions[2]?.pole2Percentage}% Planner)
• Influence: ${dimensions[3]?.dominantPole} (${dimensions[3]?.pole1Percentage}% Networker / ${dimensions[3]?.pole2Percentage}% Independent)

🏆 TOP SUPERPOWERS:
${strengths.map((s, i) => `${i + 1}. ${s.shortName} (${s.score}/25 - ${s.band})`).join('\n')}

🎯 PRIMARY GROWTH FOCUS:
• ${growthAreas[0]?.shortName} (${growthAreas[0]?.score}/25 - ${growthAreas[0]?.band})

🚀 30-Day Milestone Challenge:
${thirtyDayPlan.monthlyChallenge}

Discover what kind of entrepreneur you are: ${url}`;
  };

  const generateStatusText = () => {
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const topStrength = strengths[0]?.shortName || 'Opportunity Seeking';
    return `🚀 I just discovered my entrepreneurial archetype on Neda: I am ${archetype.name} (${archetype.code}) at the ${stageLabels[result.stage]} stage! My signature strength is ${topStrength}. Find your entrepreneurial profile: ${url}`;
  };

  const handleShareResults = async () => {
    const summary = generateProfileSummary();

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(summary);
        setCopiedResults(true);
        setTimeout(() => setCopiedResults(false), 3000);
      } catch {
        // fallback
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Neda Entrepreneur Profile: ${archetype.name} (${archetype.code})`,
          text: summary,
        });
      } catch {
        // user dismissed share sheet
      }
    }
  };

  const handleShareStatus = async () => {
    const statusText = generateStatusText();

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(statusText);
        setCopiedStatus(true);
        setTimeout(() => setCopiedStatus(false), 3000);
      } catch {
        // fallback
      }
    }
  };

  const handleOpenTwitter = () => {
    const text = encodeURIComponent(generateStatusText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenLinkedIn = () => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : 'https://neda-profile.app');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(generateStatusText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredCompetencies =
    competencyFilter === 'strengths'
      ? strengths
      : competencyFilter === 'growth'
      ? growthAreas
      : competencies;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* 1. HERO ARCHETYPE BANNER */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-colors">
        {/* Subtle top color strip */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: family.themeColor }}
        />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="font-mono text-sm px-3 py-1 rounded-md bg-slate-900 text-white font-bold">
                {archetype.code}
              </span>
              <span className="text-slate-400 dark:text-slate-600">&middot;</span>
              <span
                className="px-2.5 py-0.5 rounded text-xs font-bold"
                style={{
                  backgroundColor: `${family.themeColor}15`,
                  color: family.themeColor,
                }}
              >
                {family.name}
              </span>
              <span className="text-slate-400 dark:text-slate-600">&middot;</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {stageLabels[result.stage]}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {archetype.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
              &ldquo;{archetype.essence}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
              {archetype.portrait}
            </p>
          </div>

          {/* Quick Actions & Score Badge */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 md:min-w-[210px]">
            {/* Main 'Share Results' Button */}
            <button
              onClick={handleShareResults}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                copiedResults
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                  : 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-900 dark:text-blue-200'
              }`}
              title="Copy a full text summary of your entrepreneurial profile to clipboard"
            >
              {copiedResults ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              )}
              <span>{copiedResults ? 'Summary Copied to Clipboard!' : 'Share Results'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Save / Print PDF</span>
            </button>

            <button
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>

        {/* Superpowers & Vulnerabilities row */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
              <Award className="w-4 h-4" />
              Core Superpowers
            </span>
            <ul className="space-y-1.5">
              {archetype.superpowers.map((sp, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4" />
              Primary Flanks & Biases
            </span>
            <ul className="space-y-1.5">
              {archetype.vulnerabilities.map((v, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">&bull;</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR ENTREPRENEURIAL DIMENSIONS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              16Personalities Trait Breakdown
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The 4 Entrepreneurial Dimensions
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm text-right hidden sm:block">
            Percentages indicate your behavioral preference between two entrepreneurial poles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim) => (
            <DimensionBar key={dim.id} dimension={dim} />
          ))}
        </div>
      </section>

      {/* 3. THE PEC OCTAGON (RADAR) & SCORE SUMMARY */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Validated NEDA / McBer Framework
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              Personal Entrepreneurial Competency Octagon
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Each competency is scored from 5 to 25. Compare your personal polygon against the full-octagon benchmark of 25 in all dimensions.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block">
              Test Reliability Check
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 inline-block mt-0.5">
              {result.reliabilityLevel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart */}
          <div className="lg:col-span-7 flex justify-center">
            <OctagonChart scores={result.scores} />
          </div>

          {/* Side breakdown table */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Score Summary & Levels
            </span>
            <div className="space-y-1.5">
              {competencies.map((comp) => {
                const colors = getBandColor(comp.band);
                return (
                  <div
                    key={comp.code}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white w-4">
                        {comp.code}
                      </span>
                      <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[170px]" title={comp.name}>
                        {comp.shortName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${colors.bg} ${colors.text}`}>
                        {comp.band}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white w-6 text-right">
                        {comp.score}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALL 8 COMPETENCIES DEEP DIVE */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Detailed Assessment
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Competency Breakdown
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setCompetencyFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                competencyFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All 8 (A–H)
            </button>
            <button
              onClick={() => setCompetencyFilter('strengths')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                competencyFilter === 'strengths'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Top 3 Strengths
            </button>
            <button
              onClick={() => setCompetencyFilter('growth')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                competencyFilter === 'growth'
                  ? 'bg-white dark:bg-slate-700 text-amber-800 dark:text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Top 3 Growth Areas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompetencies.map((comp) => {
            const colors = getBandColor(comp.band);
            const isStrength = strengths.some((s) => s.code === comp.code);
            const isGrowth = growthAreas.some((g) => g.code === comp.code);

            return (
              <div
                key={comp.code}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {comp.code}
                        </span>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {comp.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                        &ldquo;{comp.tagline}&rdquo;
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-lg font-extrabold text-slate-900 dark:text-white block leading-none">
                        {comp.score}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 ${colors.bg} ${colors.text}`}>
                        {comp.band}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                    {comp.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        Shadow Side / Watch Out:
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                        {comp.shadowSide}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-blue-900 dark:text-blue-300 block text-[11px] uppercase tracking-wide">
                        Action for {result.stage}:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 block mt-0.5">
                        {comp.habitsByStage[result.stage]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  {isStrength && (
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Core Superpower
                    </span>
                  )}
                  {isGrowth && (
                    <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> High-Leverage Growth Target
                    </span>
                  )}
                  {!isStrength && !isGrowth && (
                    <span className="text-slate-400 dark:text-slate-500">Balanced Competency</span>
                  )}
                  <span className="font-mono">Max: 25</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ENTREPRENEURIAL BLIND SPOTS & TRAP COMBINATIONS */}
      <section className="bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 rounded-3xl p-6 sm:p-8 transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Critical Risk Diagnostic
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Entrepreneurial Blind Spots
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl mb-6">
          When certain competencies are high and complementary checks are low, specific structural vulnerabilities arise. Here are the specific failure modes your profile must safeguard against:
        </p>

        <div className="space-y-4">
          {blindSpots.map((bs) => (
            <div
              key={bs.id}
              className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-5 shadow-xs transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold">&bull;</span>
                  {bs.title}
                </h3>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {bs.synergy}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                {bs.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-rose-50/60 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-100 dark:border-rose-900/50">
                  <span className="font-bold text-rose-900 dark:text-rose-300 block mb-1">
                    Risk Warning:
                  </span>
                  <span className="text-rose-800 dark:text-rose-200 leading-relaxed">
                    {bs.riskWarning}
                  </span>
                </div>

                <div className="bg-blue-50/60 dark:bg-blue-950/40 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                  <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">
                    Tactical Safeguard:
                  </span>
                  <span className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    {bs.tacticalFix}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PERSONALIZED 30-DAY IMPROVEMENT PLAN */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Targeted Deliberate Practice
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your 30-Day Growth Plan
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl mb-6">
          To expand your octagon, focus on your single highest-leverage growth area:{' '}
          <strong className="text-slate-900 dark:text-white font-semibold">
            Competency {thirtyDayPlan.focusCompetency}
          </strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily/Weekly Habits */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              3 High-Impact Habits
            </h3>
            {thirtyDayPlan.habits.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="leading-relaxed">{h}</span>
              </div>
            ))}
          </div>

          {/* Monthly Milestone Challenge */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                The 30-Day Milestone Challenge
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Concrete Proof of Growth
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {thirtyDayPlan.monthlyChallenge}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200/60 dark:border-blue-800/60 flex items-center justify-between text-xs text-blue-800 dark:text-blue-300 font-semibold">
              <span>Goal: Expand {thirtyDayPlan.focusCompetency} score by +3 to +5</span>
              <span>30 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ZERO-TO-LAUNCH JOURNEY ROADMAP */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            End-to-End Progression
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Zero-to-Launch Roadmap
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Whether you are a student exploring an initial spark or an entrepreneur scaling revenue, follow the validated sequence. Your current active phase is highlighted below.
          </p>
        </div>

        <div className="space-y-3">
          {ROADMAP_STEPS.map((step) => {
            const isCurrent = step.phaseNumber === result.roadmapPhaseEntry;
            const isCompleted = step.phaseNumber < result.roadmapPhaseEntry;

            return (
              <div
                key={step.phaseNumber}
                className={`p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-500 ring-1 ring-blue-500 shadow-sm'
                    : isCompleted
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {step.phaseNumber}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {step.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCurrent && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                        Your Recommended Starting Phase
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        Prior Milestone
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                  <strong>Goal:</strong> {step.goal}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Key Actions:
                    </span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      {step.typicalActions.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                        Done When:
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                        {step.doneWhen}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">Tested Competencies:</span>
                      <div className="flex gap-1">
                        {step.relevantCompetencies.map((rc) => (
                          <span
                            key={rc}
                            className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {rc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CO-FOUNDER & TEAM FIT MATRIX */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Complementary Partner Search
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Co-Founder & Team Fit
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl mb-6">
          Great companies are rarely built by solo founders. A partner should not be your mirror; they should hold high competency exactly where you have operational blind spots.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 block mb-1">
              Your Ideal Co-Founder Profile
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              {archetype.idealCoFounder}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Look for someone who naturally enjoys the tasks you procrastinate on. If you are high-momentum (Spark), pair with high-persistence (Anchor). If you are bold and intuitive (Bold), pair with empirical rigor (Planner).
            </p>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
              Highly Compatible Archetypes
            </span>
            <div className="flex flex-wrap gap-2 mb-4">
              {archetype.complementaryArchetypes.map((ca) => (
                <span
                  key={ca}
                  className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {ca}
                </span>
              ))}
            </div>
            <button
              onClick={onExploreArchetypes}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore all 16 archetypes directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. TEST RELIABILITY & CALIBRATION NOTE */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Correction Factor (Social Desirability Index): {result.rawCorrectionScore}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                (Deduction: -{result.deduction} pts)
              </span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {result.reliabilityAdvice}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              * The NEDA self-rating instrument is an empirical self-reflection tool, not a clinical psychological test or predictive guarantee of commercial success.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL OUTPUT: SHARE YOUR STATUS & WRAP UP */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                Announce Your Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Share Your Entrepreneurial Status
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Let your peers, mentors, and prospective co-founders know what kind of entrepreneur you are and what superpowers you bring to the table.
              </p>
            </div>

            {/* Main "Share Status" button */}
            <button
              onClick={handleShareStatus}
              className={`px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 ${
                copiedStatus
                  ? 'bg-emerald-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-400 text-white active:scale-[0.98]'
              }`}
            >
              {copiedStatus ? (
                <Check className="w-4 h-4 text-white shrink-0" />
              ) : (
                <Send className="w-4 h-4 shrink-0" />
              )}
              <span>{copiedStatus ? 'Status Copied to Clipboard!' : 'Share Status'}</span>
            </button>
          </div>

          {/* Status Preview Card */}
          <div className="mt-6 bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
              Status Preview:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed select-all">
              {generateStatusText()}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Quick share directly to your networks:
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareStatus}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Copy status text to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </button>

                <button
                  onClick={handleOpenTwitter}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-sky-500/30"
                >
                  <span>Post on X</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={handleOpenLinkedIn}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-500/30"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={handleOpenWhatsApp}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FOOTER ACTIONS */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onRetake}
          className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Assessment</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareResults}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedResults ? 'Copied Summary!' : 'Copy Summary'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Print / PDF Report
          </button>
        </div>
      </div>

    </div>
  );
}
