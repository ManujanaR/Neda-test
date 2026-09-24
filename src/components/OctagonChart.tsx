'use client';

import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { CompetencyCode } from '@/lib/types';
import { COMPETENCY_METADATA } from '@/lib/competencies';
import { useTheme } from '@/lib/theme';
import { useLang } from '@/lib/i18n';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface OctagonChartProps {
  scores: Record<CompetencyCode, number>;
}

export default function OctagonChart({ scores }: OctagonChartProps) {
  const { theme } = useTheme();
  const { t } = useLang();
  const isDark = theme === 'dark';
  const ink = isDark ? '#ECECEA' : '#32373C';
  const brand = isDark ? '#F4823C' : '#DE6418';
  const mute = isDark ? '#A0A5AA' : '#6B7279';
  const line = isDark ? '#34383C' : '#E5E7E9';

  const [showBaseline, setShowBaseline] = useState(false);

  const codes: CompetencyCode[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  // ponytail: split on ' & ' so long names wrap to two lines instead of clipping
  const labels = codes.map((c) => COMPETENCY_METADATA[c].shortName.split(' & '));

  const datasets = [
    {
      label: t.report.chartYou,
      data: codes.map((c) => scores[c]),
      backgroundColor: isDark ? 'rgba(244, 130, 60, 0.2)' : 'rgba(222, 100, 24, 0.12)',
      borderColor: brand,
      pointBackgroundColor: brand,
      pointBorderColor: isDark ? '#181A1C' : '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      borderWidth: 2,
    },
    ...(showBaseline
      ? [
          {
            label: t.report.chartTypical,
            data: codes.map(() => 15),
            backgroundColor: 'transparent',
            borderColor: mute,
            borderDash: [4, 4],
            pointRadius: 0,
            borderWidth: 1,
          },
        ]
      : []),
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: { padding: 8 },
    scales: {
      r: {
        min: 0,
        max: 25,
        ticks: { stepSize: 5, backdropColor: 'transparent', color: mute, font: { size: 10 } },
        grid: { color: line },
        angleLines: { color: line },
        pointLabels: { font: { size: 12 }, color: ink },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: ink,
        titleColor: isDark ? '#181A1C' : '#ffffff',
        bodyColor: isDark ? '#181A1C' : '#ffffff',
        padding: 10,
        callbacks: {
          label: (context: { dataset: { label?: string }; raw: unknown }) =>
            ` ${context.dataset.label}: ${context.raw} of 25`,
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-[420px] aspect-square">
        <Radar data={{ labels, datasets }} options={chartOptions} />
      </div>
      <label className="flex items-center gap-2 text-sm text-mute cursor-pointer">
        <input
          type="checkbox"
          checked={showBaseline}
          onChange={(e) => setShowBaseline(e.target.checked)}
          className="accent-brand"
        />
        {t.report.chartToggle}
      </label>
    </div>
  );
}
