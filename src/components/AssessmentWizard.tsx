'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/lib/questions';
import { JourneyStage, StartingStatus, AssessmentResult } from '@/lib/types';
import { calculateAssessmentResult } from '@/lib/scoring';
import { ArrowLeft, ArrowRight, CheckCircle2, Grid, Sparkles } from 'lucide-react';

interface AssessmentWizardProps {
  stage: JourneyStage;
  status: StartingStatus;
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

const ratingOptions = [
  { value: 5, label: '5 — Always / Strongly Agree', sub: 'Completely describes my natural default behavior' },
  { value: 4, label: '4 — Mostly / Agree', sub: 'True most of the time across various situations' },
  { value: 3, label: '3 — Moderately / Neutral', sub: 'Depends on the specific context or 50/50' },
  { value: 2, label: '2 — Rarely / Disagree', sub: 'Only occasionally or under rare circumstances' },
  { value: 1, label: '1 — Never / Strongly Disagree', sub: 'Does not describe my mindset or actions at all' },
];

export default function AssessmentWizard({
  stage,
  status,
  onComplete,
  onCancel,
}: AssessmentWizardProps) {
  const totalQuestions = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(totalQuestions).fill(0));
  const [showReviewGrid, setShowReviewGrid] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleAnswer = useCallback((val: number) => {
    if (isAdvancing) return;

    setAnswers((prevAnswers) => {
      const updated = [...prevAnswers];
      updated[currentIndex] = val;
      return updated;
    });

    if (currentIndex < totalQuestions - 1) {
      setIsAdvancing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAdvancing(false);
      }, 240);
    }
  }, [currentIndex, isAdvancing, totalQuestions]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showReviewGrid) return;

      const keyVal = parseInt(e.key, 10);
      if (keyVal >= 1 && keyVal <= 5) {
        handleAnswer(keyVal);
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      } else if (e.key === 'ArrowRight') {
        if (answers[currentIndex] > 0 && currentIndex < totalQuestions - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers, showReviewGrid, totalQuestions, handleAnswer]);

  const handleFinish = () => {
    // Check if any unanswered
    const unansweredIndex = answers.findIndex((ans) => ans === 0);
    if (unansweredIndex !== -1) {
      setCurrentIndex(unansweredIndex);
      alert(`Please answer question ${unansweredIndex + 1} before submitting.`);
      return;
    }

    const result = calculateAssessmentResult(answers, stage, status);
    onComplete(result);
  };

  const answeredCount = answers.filter((a) => a > 0).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const currentAnswer = answers[currentIndex];
  const isAllAnswered = answeredCount === totalQuestions;

  const currentStatement = questions[currentIndex];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/60 dark:bg-slate-950 py-8 px-4 sm:px-6 flex flex-col justify-center items-center transition-colors">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden flex flex-col min-h-[580px] transition-colors">
        
        {/* Progress Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white px-6 py-4 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="text-slate-400 hover:text-white transition-colors"
                title="Return to Home"
              >
                Exit
              </button>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-slate-200 capitalize">
                {stage} Assessment
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowReviewGrid(!showReviewGrid)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-[11px] font-medium"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Overview ({answeredCount}/{totalQuestions})</span>
              </button>
              <span className="font-mono text-slate-300 font-semibold">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Area or Overview Grid */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between">
          
          {showReviewGrid ? (
            /* Overview Grid */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Question Progress Navigator
                </h3>
                <button
                  onClick={() => setShowReviewGrid(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Return to Active Question
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Click any numbered box to jump directly to that statement and review your response.
              </p>

              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 mb-8">
                {answers.map((ans, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowReviewGrid(false);
                    }}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                      idx === currentIndex
                        ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200'
                        : ans > 0
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {isAllAnswered && (
                <button
                  onClick={handleFinish}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>All 45 Completed — View My Entrepreneur Profile</span>
                </button>
              )}
            </div>
          ) : (
            /* Active Question Card */
            <div className="flex-1 flex flex-col justify-between">
              
              <div>
                {/* Meta indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold mb-4">
                  <span>STATEMENT {currentIndex + 1} OF {totalQuestions}</span>
                  <span className="hidden sm:inline text-[11px] font-normal text-slate-400 dark:text-slate-500">
                    Use keys 1–5 or click an option
                  </span>
                </div>

                {/* Statement */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-snug mb-8">
                      &ldquo;{currentStatement}&rdquo;
                    </h2>
                  </motion.div>
                </AnimatePresence>

                {/* Rating Options */}
                <div className="space-y-2.5">
                  {ratingOptions.map((opt) => {
                    const isSelected = currentAnswer === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleAnswer(opt.value)}
                        className={`w-full py-3.5 px-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/90 dark:bg-blue-950/70 text-blue-900 dark:text-blue-100 ring-1 ring-blue-600 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {opt.value}
                          </span>
                          <div>
                            <span className="text-sm font-semibold block leading-tight text-slate-900 dark:text-white">
                              {opt.label}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">
                              {opt.sub}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation Toolbar */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
                  }}
                  disabled={currentIndex === 0}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                    currentIndex === 0
                      ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex === totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={handleFinish}
                    disabled={currentAnswer === 0}
                    className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-all ${
                      currentAnswer > 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    <span>Generate My Profile</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentAnswer > 0) setCurrentIndex(currentIndex + 1);
                    }}
                    disabled={currentAnswer === 0}
                    className={`flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                      currentAnswer > 0
                        ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-bold'
                        : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
