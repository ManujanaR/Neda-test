"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, categories, type Language } from "@/lib/questions";
import { calculateScores } from "@/lib/scoring";
import { Radar } from "react-chartjs-2";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ratingOptions: Record<Language, { value: number; label: string }[]> = {
  en: [
    { value: 5, label: "5 - Always / At all" },
    { value: 4, label: "4 - Mostly" },
    { value: 3, label: "3 - Moderately" },
    { value: 2, label: "2 - Rarely" },
    { value: 1, label: "1 - Never" },
  ],
  ta: [
    { value: 5, label: "5 - எப்போதும்" },
    { value: 4, label: "4 - பெரும்பாலும்" },
    { value: 3, label: "3 - சில நேரங்களில்" },
    { value: 2, label: "2 - அரிதாக" },
    { value: 1, label: "1 - ஒருபோதும் இல்லை" },
  ],
  si: [
    { value: 5, label: "5 - සෑම විටම" },
    { value: 4, label: "4 - බොහෝ විට" },
    { value: 3, label: "3 - සමහර විට" },
    { value: 2, label: "2 - කලාතුරකින්" },
    { value: 1, label: "1 - කිසිවිටෙක නැත" },
  ],
};

const ui = {
  en: {
    title: "Self-Rating Questionnaire",
    subtitle: "Assess your entrepreneurial competencies. Rate yourself honestly on each statement.",
    startBtn: "Start Now",
    questionOf: (cur: number, total: number) => `Question ${cur} of ${total}`,
    resultsTitle: "Your Results",
    resultsSubtitle: "Entrepreneurial Competency Profile",
    retake: "Retake Questionnaire",
  },
  ta: {
    title: "சுய மதிப்பீட்டு கேள்வித்தாள்",
    subtitle: "உங்கள் தொழில்முனைவோர் திறன்களை மதிப்பிடுங்கள். ஒவ்வொரு கூற்றிலும் உங்களை நேர்மையாக மதிப்பிடுங்கள்.",
    startBtn: "இப்போது தொடங்கு",
    questionOf: (cur: number, total: number) => `கேள்வி ${cur} / ${total}`,
    resultsTitle: "உங்கள் முடிவுகள்",
    resultsSubtitle: "தொழில்முனைவோர் திறன் சுயவிவரம்",
    retake: "மீண்டும் மதிப்பிடு",
  },
  si: {
    title: "ස්ව-ශ්‍රේණිගත ප්‍රශ්නාවලිය",
    subtitle: "ඔබේ ව්‍යවසායික කුසලතා තක්සේරු කරන්න. එක් එක් ප්‍රකාශය ගැන ඔබව සත්‍යාපිතව ශ්‍රේණිගත කරන්න.",
    startBtn: "දැන් ආරම්භ කරන්න",
    questionOf: (cur: number, total: number) => `ප්‍රශ්නය ${cur} / ${total}`,
    resultsTitle: "ඔබේ ප්‍රතිඵල",
    resultsSubtitle: "ව්‍යවසායික කුසලතා පැතිකඩ",
    retake: "නැවත ශ්‍රේණිගත කරන්න",
  },
};

const langOptions: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "si", label: "සිංහල" },
];

export default function Wizard() {
  // 0 = intro, 1..45 = questions, 46 = results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(45).fill(0));
  const [lang, setLang] = useState<Language>("en");

  const activeQuestions = questions[lang];
  const activeCategories = categories[lang];
  const activeRatingOptions = ratingOptions[lang];
  const t = ui[lang];
  const totalQuestions = activeQuestions.length;

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = val;
    setAnswers(newAnswers);

    // Auto-advance with slight delay for visual feedback
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestart = () => {
    setAnswers(new Array(45).fill(0));
    setStep(0);
  };

  // Shared framer-motion variants
  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: { zIndex: 0, x: -50, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">

        {/* Header / Progress */}
        {step > 0 && step <= totalQuestions && (
          <div className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center mb-2">
              <button onClick={handleBack} className="p-2 hover:bg-blue-700 rounded-full transition" aria-label="Go Back">
                <ArrowLeft size={20} />
              </button>
              <span className="font-semibold text-sm">{t.questionOf(step, totalQuestions)}</span>
              <div className="w-8"></div> {/* Spacer for centering */}
            </div>
            <div className="w-full bg-blue-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">

            {/* INTRO SCREEN */}
            {step === 0 && (
              <motion.div
                key="intro"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
                <p className="text-gray-600 mb-6 text-lg">{t.subtitle}</p>

                {/* Language selector */}
                <div className="flex justify-center gap-3 mb-8">
                  {langOptions.map(({ code, label }) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`px-5 py-2 rounded-full border-2 font-semibold text-sm transition-all
                        ${lang === code
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 text-gray-600 hover:border-blue-400"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center mx-auto gap-2 text-lg"
                >
                  {t.startBtn} <Play size={20} />
                </button>
              </motion.div>
            )}

            {/* QUESTION SCREEN */}
            {step > 0 && step <= totalQuestions && (
              <motion.div
                key={`question-${step}`}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 text-center leading-relaxed">
                  &ldquo;{activeQuestions[step - 1]}&rdquo;
                </h2>

                <div className="space-y-3 max-w-md mx-auto">
                  {activeRatingOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className={`w-full py-4 px-6 text-left border-2 rounded-xl text-lg font-medium transition-all
                        ${answers[step - 1] === opt.value
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULTS SCREEN */}
            {step > totalQuestions && (
              <motion.div
                key="results"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-center"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.resultsTitle}</h2>
                <p className="text-gray-500 mb-8">{t.resultsSubtitle}</p>

                <div className="w-full max-w-md aspect-square mb-8">
                  {(() => {
                    const { scores } = calculateScores(answers);
                    const data = {
                      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
                      datasets: [{
                        label: 'Competency Score',
                        data: scores,
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
                      }]
                    };
                    return (
                      <Radar
                        data={data}
                        options={{
                          responsive: true,
                          scales: {
                            r: { min: 0, max: 25, ticks: { stepSize: 5 } }
                          },
                          plugins: { legend: { display: false } }
                        }}
                      />
                    );
                  })()}
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {(() => {
                    const { scores } = calculateScores(answers);
                    return activeCategories.map((cat, i) => (
                      <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="text-xs sm:text-sm text-gray-600 truncate mr-2" title={cat}>{cat}</span>
                        <span className="font-bold text-blue-600">{scores[i]}</span>
                      </div>
                    ));
                  })()}
                </div>

                <button
                  onClick={handleRestart}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                >
                  <RotateCcw size={18} /> {t.retake}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
