'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/lib/questions';
import { JourneyStage, StartingStatus, AssessmentResult } from '@/lib/types';
import { calculateAssessmentResult } from '@/lib/scoring';
import { useLang } from '@/lib/i18n';

interface AssessmentWizardProps {
  stage: JourneyStage;
  status: StartingStatus;
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

export default function AssessmentWizard({
  stage,
  status,
  onComplete,
  onCancel,
}: AssessmentWizardProps) {
  const { lang, t } = useLang();
  const activeQuestions = questions[lang];
  const totalQuestions = activeQuestions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(totalQuestions).fill(0));
  const [showReviewGrid, setShowReviewGrid] = useState(false);

  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === totalQuestions - 1;

  // ponytail: picking an answer only selects it; Next (or Enter / →) moves on
  const select = (val: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = val;
      return updated;
    });
  };

  const goNext = () => {
    if (currentAnswer > 0 && !isLast) setCurrentIndex((i) => i + 1);
  };

  const handleFinish = () => {
    const unansweredIndex = answers.findIndex((ans) => ans === 0);
    if (unansweredIndex !== -1) {
      setCurrentIndex(unansweredIndex);
      setShowReviewGrid(false);
      return;
    }
    onComplete(calculateAssessmentResult(answers, stage, status));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showReviewGrid) return;
      const keyVal = parseInt(e.key, 10);
      if (keyVal >= 1 && keyVal <= 5) {
        select(keyVal);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLast) handleFinish();
        else goNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, answers, showReviewGrid, isLast]);

  const answeredCount = answers.filter((a) => a > 0).length;
  const isAllAnswered = answeredCount === totalQuestions;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="flex items-center justify-between text-sm text-mute mb-2">
        <button onClick={onCancel} className="hover:text-ink">
          {t.wizard.leave}
        </button>
        <button onClick={() => setShowReviewGrid(!showReviewGrid)} className="hover:text-ink">
          {showReviewGrid ? t.wizard.back : t.wizard.overview}
        </button>
      </div>

      <div className="h-px w-full bg-line mb-10">
        <div
          className="h-full bg-brand transition-[width] duration-300 ease-out"
          style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        />
      </div>

      {showReviewGrid ? (
        <div className="space-y-6">
          <p className="text-sm text-mute">{t.wizard.overviewNote}</p>

          <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
            {answers.map((ans, idx) => (
              <button
                key={idx}
                aria-current={idx === currentIndex ? 'step' : undefined}
                aria-pressed={ans > 0}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowReviewGrid(false);
                }}
                className="choice py-2 text-center text-sm aria-[current]:ring-2 aria-[current]:ring-brand"
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {isAllAnswered && (
            <button onClick={handleFinish} className="btn-primary w-full py-3">
              {t.wizard.seeProfile}
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-sm text-mute mb-6">
            <span>{t.wizard.of(currentIndex + 1, totalQuestions)}</span>
            <span className="hidden sm:inline">{t.wizard.keyHint}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={`${lang}-${currentIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="text-2xl sm:text-3xl leading-snug mb-10 min-h-[4.5rem]"
            >
              {activeQuestions[currentIndex]}
            </motion.h2>
          </AnimatePresence>

          <div className="space-y-2">
            {t.wizard.ratings.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={currentAnswer === opt.value}
                onClick={() => select(opt.value)}
                className="choice w-full px-4 py-3 flex items-baseline gap-4"
              >
                <span className="text-sm text-mute w-3 shrink-0">{opt.value}</span>
                <span className="text-sm font-medium">{opt.label}</span>
                <span className="text-sm text-mute hidden sm:inline">{opt.sub}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="btn-secondary"
            >
              {t.wizard.previous}
            </button>

            {isLast ? (
              <button type="button" onClick={handleFinish} disabled={currentAnswer === 0} className="btn-primary">
                {t.wizard.seeProfile}
              </button>
            ) : (
              <button type="button" onClick={goNext} disabled={currentAnswer === 0} className="btn-primary">
                {t.wizard.next}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
