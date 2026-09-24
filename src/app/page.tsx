'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import AssessmentWizard from '@/components/AssessmentWizard';
import ReportView from '@/components/ReportView';
import ArchetypeExplorer from '@/components/ArchetypeExplorer';
import SavedAssessmentsModal from '@/components/SavedAssessmentsModal';
import { JourneyStage, StartingStatus, AssessmentResult } from '@/lib/types';
import { getLatestAssessment, getSavedAssessments, saveAssessmentResult } from '@/lib/storage';
import { useLang } from '@/lib/i18n';

export default function Home() {
  const { t } = useLang();
  const [currentView, setCurrentView] = useState<'home' | 'assessment' | 'report' | 'explorer'>('home');
  const [stage, setStage] = useState<JourneyStage>('undergraduate');
  const [status, setStatus] = useState<StartingStatus>('not_started');
  const [activeResult, setActiveResult] = useState<AssessmentResult | null>(null);
  const [savedAssessments, setSavedAssessments] = useState<AssessmentResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Initialize from storage if present
  useEffect(() => {
    const saved = getSavedAssessments();
    setSavedAssessments(saved);

    const latest = getLatestAssessment();
    if (latest) {
      setActiveResult(latest);
      setStage(latest.stage);
      setStatus(latest.status);
    }
  }, []);

  const refreshHistory = () => {
    const saved = getSavedAssessments();
    setSavedAssessments(saved);
  };

  const handleCompleteAssessment = (result: AssessmentResult) => {
    saveAssessmentResult(result);
    setActiveResult(result);
    refreshHistory();
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPastAssessment = (result: AssessmentResult) => {
    setActiveResult(result);
    setStage(result.stage);
    setStatus(result.status);
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'assessment') {
            setCurrentView('assessment');
          } else if (view === 'explorer') {
            setCurrentView('explorer');
          } else {
            setCurrentView('home');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        hasSavedResults={savedAssessments.length > 0}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <LandingHero
            stage={stage}
            onSelectStage={setStage}
            status={status}
            onSelectStatus={setStatus}
            onStartAssessment={() => {
              setCurrentView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreArchetypes={() => {
              setCurrentView('explorer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'assessment' && (
          <AssessmentWizard
            stage={stage}
            status={status}
            onComplete={handleCompleteAssessment}
            onCancel={() => {
              if (activeResult) {
                setCurrentView('report');
              } else {
                setCurrentView('home');
              }
            }}
          />
        )}

        {currentView === 'report' && activeResult && (
          <ReportView
            result={activeResult}
            onRetake={() => {
              setCurrentView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreArchetypes={() => {
              setCurrentView('explorer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'explorer' && (
          <ArchetypeExplorer
            onBack={() => {
              if (activeResult) {
                setCurrentView('report');
              } else {
                setCurrentView('home');
              }
            }}
            onTakeTest={() => {
              setCurrentView('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Saved Assessments History Modal */}
      {isHistoryOpen && (
        <SavedAssessmentsModal
          assessments={savedAssessments}
          activeId={activeResult?.id || null}
          onSelect={handleSelectPastAssessment}
          onClose={() => setIsHistoryOpen(false)}
          onRefresh={refreshHistory}
        />
      )}

      <footer className="border-t border-line py-8 px-4 sm:px-6 mt-16">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-mute">
          <span>{t.footer.text}</span>
          <button onClick={() => { setCurrentView('explorer'); window.scrollTo({ top: 0 }); }} className="btn-link text-left">
            {t.footer.link}
          </button>
        </div>
      </footer>
    </div>
  );
}
