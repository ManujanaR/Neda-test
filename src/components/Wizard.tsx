"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, categories } from "@/lib/questions";
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

const ratingOptions = [
    { value: 5, label: "5 - Always / At all" },
    { value: 4, label: "4 - Mostly" },
    { value: 3, label: "3 - Moderately" },
    { value: 2, label: "2 - Rarely" },
    { value: 1, label: "1 - Never" }
];

export default function Wizard() {
    // 0 = intro, 1..45 = questions, 46 = results
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(45).fill(0));

    const totalQuestions = questions.length;

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
                            <span className="font-semibold text-sm">Question {step} of {totalQuestions}</span>
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
                                <h1 className="text-3xl font-bold text-gray-900 mb-6">Self-Rating Questionnaire</h1>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Assess your entrepreneurial competencies. Rate yourself honestly on each statement.
                                </p>
                                <button 
                                    onClick={() => setStep(1)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center mx-auto gap-2 text-lg"
                                >
                                    Start Now <Play size={20} />
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
                                    "{questions[step - 1]}"
                                </h2>

                                <div className="space-y-3 max-w-md mx-auto">
                                    {ratingOptions.map((opt) => (
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
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Results</h2>
                                <p className="text-gray-500 mb-8">Entrepreneurial Competency Profile</p>
                                
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
                                        return categories.map((cat, i) => (
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
                                    <RotateCcw size={18} /> Retake Questionnaire
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
