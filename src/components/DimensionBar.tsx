'use client';

import React from 'react';
import { DimensionScore } from '@/lib/types';

interface DimensionBarProps {
  dimension: DimensionScore;
}

export default function DimensionBar({ dimension }: DimensionBarProps) {
  const isPole1Dominant = dimension.pole1Percentage >= 50;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {dimension.title} Dimension
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {dimension.dominantPole}
            </span>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {dimension.dominantLetter}
            </span>
            {dimension.isBalanced && (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                (Balanced traits)
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
          <span className={isPole1Dominant ? 'font-bold text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}>
            {dimension.pole1Name}: {dimension.pole1Percentage}%
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">|</span>
          <span className={!isPole1Dominant ? 'font-bold text-indigo-700 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}>
            {dimension.pole2Name}: {dimension.pole2Percentage}%
          </span>
        </div>
      </div>

      {/* The Visual Dual-Pole Bar */}
      <div className="relative w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
        {/* Pole 1 Bar */}
        <div
          style={{ width: `${dimension.pole1Percentage}%` }}
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-700 ease-out"
        />
        {/* Pole 2 Bar */}
        <div
          style={{ width: `${dimension.pole2Percentage}%` }}
          className="h-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-700 ease-out"
        />
      </div>

      {/* Pole Labels under the Bar */}
      <div className="flex justify-between items-start mt-2 text-xs">
        <div className="w-1/2 pr-2 text-left">
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
            {dimension.pole1Letter} &middot; {dimension.pole1Name}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight block mt-0.5">
            {dimension.pole1Desc}
          </span>
        </div>
        <div className="w-1/2 pl-2 text-right">
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">
            {dimension.pole2Name} &middot; {dimension.pole2Letter}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-tight block mt-0.5">
            {dimension.pole2Desc}
          </span>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/60 p-2.5 rounded-lg">
        <span className="font-medium text-slate-900 dark:text-white">Your tendency: </span>
        {dimension.insight}
      </div>
    </div>
  );
}
