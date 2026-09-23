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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface OctagonChartProps {
  scores: Record<CompetencyCode, number>;
}

export default function OctagonChart({ scores }: OctagonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showBenchmark, setShowBenchmark] = useState(true);
  const [showAverage, setShowAverage] = useState(false);

  const codes: CompetencyCode[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const labels = codes.map((c) => `${c}: ${COMPETENCY_METADATA[c].shortName}`);
  const userScores = codes.map((c) => scores[c]);

  const idealScores = [25, 25, 25, 25, 25, 25, 25, 25];
  const averageScores = [15, 15, 15, 15, 15, 15, 15, 15];

  const datasets = [
    {
      label: 'Your Score',
      data: userScores,
      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.35)' : 'rgba(37, 99, 235, 0.22)',
      borderColor: isDark ? 'rgba(96, 165, 250, 0.95)' : 'rgba(37, 99, 235, 0.95)',
      pointBackgroundColor: isDark ? '#60a5fa' : 'rgba(37, 99, 235, 1)',
      pointBorderColor: isDark ? '#0f172a' : '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2.5,
    },
    ...(showBenchmark
      ? [
          {
            label: 'Full Octagon (Target 25)',
            data: idealScores,
            backgroundColor: 'transparent',
            borderColor: isDark ? 'rgba(52, 211, 153, 0.55)' : 'rgba(16, 185, 129, 0.45)',
            borderDash: [4, 4],
            pointBackgroundColor: isDark ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.7)',
            pointBorderColor: isDark ? '#0f172a' : '#ffffff',
            pointRadius: 2,
            borderWidth: 1.5,
          },
        ]
      : []),
    ...(showAverage
      ? [
          {
            label: 'Typical Benchmark (15)',
            data: averageScores,
            backgroundColor: 'transparent',
            borderColor: isDark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.6)',
            borderDash: [2, 2],
            pointRadius: 0,
            borderWidth: 1.5,
          },
        ]
      : []),
  ];

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        min: 0,
        max: 25,
        ticks: {
          stepSize: 5,
          backdropColor: 'transparent',
          color: isDark ? '#94a3b8' : '#64748b',
          font: {
            size: 10,
          },
        },
        grid: {
          color: isDark ? 'rgba(71, 85, 105, 0.4)' : 'rgba(226, 232, 240, 0.9)',
        },
        angleLines: {
          color: isDark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(203, 213, 225, 0.8)',
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 600,
          },
          color: isDark ? '#f1f5f9' : '#1e293b',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          color: isDark ? '#cbd5e1' : '#475569',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        titleFont: { size: 12, weight: 'bold' as const },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: ${context.raw} / 25`,
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toggles */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-xs">
        <button
          onClick={() => setShowBenchmark(!showBenchmark)}
          className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
            showBenchmark
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {showBenchmark ? '✓ Target Octagon (25) Active' : '+ Show Target Octagon'}
        </button>

        <button
          onClick={() => setShowAverage(!showAverage)}
          className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
            showAverage
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {showAverage ? '✓ Benchmark Line (15) Active' : '+ Show Baseline (15)'}
        </button>
      </div>

      {/* Radar Container */}
      <div className="w-full max-w-[420px] aspect-square relative">
        <Radar data={chartData} options={chartOptions} />
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 text-center max-w-sm">
        The original NEDA instrument guides entrepreneurs to expand their competency polygon outward towards the full 25 perimeter.
      </p>
    </div>
  );
}
