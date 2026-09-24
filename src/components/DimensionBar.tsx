'use client';

import React from 'react';
import { DimensionScore } from '@/lib/types';
import { useLang } from '@/lib/i18n';

interface DimensionBarProps {
  dimension: DimensionScore;
}

export default function DimensionBar({ dimension }: DimensionBarProps) {
  const { t } = useLang();
  const pole1Wins = dimension.pole1Percentage >= 50;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-mute">{dimension.title}</span>
        <span className="font-medium">
          {dimension.dominantPole}
          {dimension.isBalanced && <span className="text-mute font-normal"> {t.report.closeToEven}</span>}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className={pole1Wins ? 'font-medium' : 'text-mute'}>
          {dimension.pole1Name} {dimension.pole1Percentage}%
        </span>
        <span className={pole1Wins ? 'text-mute' : 'font-medium'}>
          {dimension.pole2Percentage}% {dimension.pole2Name}
        </span>
      </div>

      <div className="h-2 w-full bg-line rounded-full overflow-hidden">
        <div
          className={`h-full bg-brand rounded-full transition-[width] duration-700 ease-out ${pole1Wins ? '' : 'ml-auto'}`}
          style={{ width: `${pole1Wins ? dimension.pole1Percentage : dimension.pole2Percentage}%` }}
        />
      </div>

      <div className="flex justify-between gap-6 text-xs text-mute leading-snug">
        <span className="w-1/2">{dimension.pole1Desc}</span>
        <span className="w-1/2 text-right">{dimension.pole2Desc}</span>
      </div>

      <p className="text-sm leading-relaxed">{dimension.insight}</p>
    </div>
  );
}
