'use client';

import React from 'react';
import { Compass, History, Award, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface NavbarProps {
  currentView: 'home' | 'assessment' | 'report' | 'explorer';
  onNavigate: (view: 'home' | 'assessment' | 'explorer') => void;
  onOpenHistory: () => void;
  hasSavedResults: boolean;
}

export default function Navbar({
  currentView,
  onNavigate,
  onOpenHistory,
  hasSavedResults
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            N
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight block leading-tight">
              Neda Profile
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block leading-none">
              Entrepreneurial Archetypes
            </span>
          </div>
        </button>

        {/* Navigation Controls */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('explorer')}
            className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'explorer'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>16 Archetypes</span>
          </button>

          {hasSavedResults && (
            <button
              onClick={onOpenHistory}
              className="px-3 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
              title="View past assessment results"
            >
              <History className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Saved Reports</span>
            </button>
          )}

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300 animate-in fade-in zoom-in duration-200" />
            )}
          </button>

          <button
            onClick={() => onNavigate('assessment')}
            className={`ml-1 sm:ml-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 ${
              currentView === 'assessment'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{currentView === 'report' ? 'Retake Test' : 'Take Test'}</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
