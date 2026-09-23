'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, type Language } from '@/lib/questions';
import { JourneyStage, StartingStatus, AssessmentResult } from '@/lib/types';
import { calculateAssessmentResult } from '@/lib/scoring';
import { ArrowLeft, ArrowRight, CheckCircle2, Grid, Sparkles } from 'lucide-react';

interface AssessmentWizardProps {
  stage: JourneyStage;
  status: StartingStatus;
  onComplete: (result: AssessmentResult) => void;
  onCancel: () => void;
}

const ratingOptions: Record<Language, { value: number; label: string; sub: string }[]> = {
  en: [
    { value: 5, label: '5 — Always / Strongly Agree', sub: 'Completely describes my natural default behavior' },
    { value: 4, label: '4 — Mostly / Agree', sub: 'True most of the time across various situations' },
    { value: 3, label: '3 — Moderately / Neutral', sub: 'Depends on the specific context or 50/50' },
    { value: 2, label: '2 — Rarely / Disagree', sub: 'Only occasionally or under rare circumstances' },
    { value: 1, label: '1 — Never / Strongly Disagree', sub: 'Does not describe my mindset or actions at all' },
  ],
  ta: [
    { value: 5, label: '5 — எப்போதும் / முழுமையாக ஒப்புக்கொள்கிறேன்', sub: 'என் இயல்பான நடத்தையை முழுவதும் விவரிக்கிறது' },
    { value: 4, label: '4 — பெரும்பாலும் / ஒப்புக்கொள்கிறேன்', sub: 'பெரும்பாலான சூழல்களில் உண்மை' },
    { value: 3, label: '3 — சில நேரங்களில் / நடுநிலை', sub: 'குறிப்பிட்ட சூழலைப் பொறுத்தது அல்லது 50/50' },
    { value: 2, label: '2 — அரிதாக / கருத்து மாறுபாடு', sub: 'அரிதான சந்தர்ப்பங்களில் மட்டுமே' },
    { value: 1, label: '1 — ஒருபோதும் இல்லை / முற்றிலும் மாறுபடுகிறேன்', sub: 'என் மனநிலை அல்லது செயல்களை விவரிக்கவே இல்லை' },
  ],
  si: [
    { value: 5, label: '5 — සෑම විටම / දැඩිව එකඟ වෙමි', sub: 'මගේ ස්වාභාවික හැසිරීම සම්පූර්ණයෙන් විස්තර කරයි' },
    { value: 4, label: '4 — බොහෝ විට / එකඟ වෙමි', sub: 'බොහෝ අවස්ථාවල සත්‍ය වේ' },
    { value: 3, label: '3 — සමහර විට / තටස්ථ', sub: 'නිශ්චිත සන්දර්භය අනුව හෝ 50/50' },
    { value: 2, label: '2 — කලාතුරකින් / එකඟ නොවෙමි', sub: 'කලාතුරකින් හෝ දුර්ලභ අවස්ථාවල පමණි' },
    { value: 1, label: '1 — කිසිවිටෙක නැත / දැඩිව එකඟ නොවෙමි', sub: 'මගේ චින්තනය හෝ ක්‍රියාවන් විස්තර නොකරයි' },
  ],
};

const uiStrings = {
  en: {
    statementOf: (cur: number, total: number) => `STATEMENT ${cur} OF ${total}`,
    keyHint: 'Use keys 1–5 or click an option',
    overview: (answered: number, total: number) => `Overview (${answered}/${total})`,
    overviewTitle: 'Question Progress Navigator',
    overviewNote: 'Click any numbered box to jump directly to that statement and review your response.',
    returnToQuestion: 'Return to Active Question',
    allCompleted: 'All 45 Completed — View My Entrepreneur Profile',
    generateProfile: 'Generate My Profile',
    previous: 'Previous',
    next: 'Next',
    exit: 'Exit',
    assessment: 'Assessment',
  },
  ta: {
    statementOf: (cur: number, total: number) => `கேள்வி ${cur} / ${total}`,
    keyHint: '1–5 விசைகளை அல்லது ஒரு விருப்பத்தை கிளிக் செய்யுங்கள்',
    overview: (answered: number, total: number) => `மேலோட்டம் (${answered}/${total})`,
    overviewTitle: 'கேள்வி முன்னேற்ற வழிசெலுத்தி',
    overviewNote: 'நேரடியாக அந்த கூற்றுக்கு செல்ல எந்த எண் பெட்டியையும் கிளிக் செய்யுங்கள்.',
    returnToQuestion: 'செயலில் உள்ள கேள்விக்கு திரும்பு',
    allCompleted: '45 கேள்விகளும் முடிந்தன — என் சுயவிவரத்தை காண்க',
    generateProfile: 'என் சுயவிவரத்தை உருவாக்கு',
    previous: 'முந்தைய',
    next: 'அடுத்த',
    exit: 'வெளியேறு',
    assessment: 'மதிப்பீடு',
  },
  si: {
    statementOf: (cur: number, total: number) => `ප්‍රකාශය ${cur} / ${total}`,
    keyHint: '1–5 යතුරු හෝ විකල්පයක් ක්ලික් කරන්න',
    overview: (answered: number, total: number) => `දළ විශ්ලේෂණය (${answered}/${total})`,
    overviewTitle: 'ප්‍රශ්න ප්‍රගති සංචාලකය',
    overviewNote: 'එම ප්‍රකාශයට සෘජුවම යාමට ඕනෑම අංකිත කොටුවක් ක්ලික් කරන්න.',
    returnToQuestion: 'ක්‍රියාකාරී ප්‍රශ්නයට ආපසු',
    allCompleted: '45 ම සම්පූර්ණ — මගේ පැතිකඩ බලන්න',
    generateProfile: 'මගේ පැතිකඩ සාදන්න',
    previous: 'පෙර',
    next: 'ඊළඟ',
    exit: 'පිටවීම',
    assessment: 'තක්සේරු කිරීම',
  },
};

const langOptions: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'si', label: 'සිං' },
];

export default function AssessmentWizard({
  stage,
  status,
  onComplete,
  onCancel,
}: AssessmentWizardProps) {
  const [lang, setLang] = useState<Language>('en');
  const activeQuestions = questions[lang];
  const activeRatingOptions = ratingOptions[lang];
  const t = uiStrings[lang];
  const totalQuestions = activeQuestions.length;
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

  const currentStatement = activeQuestions[currentIndex];

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
                {t.exit}
              </button>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-slate-200 capitalize">
                {stage} {t.assessment}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center gap-1">
                {langOptions.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      lang === code
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowReviewGrid(!showReviewGrid)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-[11px] font-medium"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{t.overview(answeredCount, totalQuestions)}</span>
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
                  {t.overviewTitle}
                </h3>
                <button
                  onClick={() => setShowReviewGrid(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  {t.returnToQuestion}
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                {t.overviewNote}
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
                  <span>{t.allCompleted}</span>
                </button>
              )}
            </div>
          ) : (
            /* Active Question Card */
            <div className="flex-1 flex flex-col justify-between">
              
              <div>
                {/* Meta indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold mb-4">
                  <span>{t.statementOf(currentIndex + 1, totalQuestions)}</span>
                  <span className="hidden sm:inline text-[11px] font-normal text-slate-400 dark:text-slate-500">
                    {t.keyHint}
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
                  {activeRatingOptions.map((opt) => {
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
                  <span>{t.previous}</span>
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
                    <span>{t.generateProfile}</span>
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
                    <span>{t.next}</span>
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
