'use client';

import React from 'react';
import { AssessmentResult } from '@/lib/types';
import { deleteAssessment } from '@/lib/storage';
import { X, Trash2, ArrowRight, Calendar } from 'lucide-react';

interface SavedAssessmentsModalProps {
  assessments: AssessmentResult[];
  activeId: string | null;
  onSelect: (result: AssessmentResult) => void;
  onClose: () => void;
  onRefresh: () => void;
}

export default function SavedAssessmentsModal({
  assessments,
  activeId,
  onSelect,
  onClose,
  onRefresh,
}: SavedAssessmentsModalProps) {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this saved assessment?')) {
      deleteAssessment(id);
      onRefresh();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative flex flex-col justify-between transition-colors">
        
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Saved Assessment Reports
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your entrepreneurial competency growth over time.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {assessments.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs">
              No saved assessment reports found yet. Complete the questionnaire to save your profile.
            </div>
          ) : (
            <div className="space-y-3">
              {assessments.map((item) => {
                const isSelected = item.id === activeId;
                const formattedDate = new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 ring-1 ring-blue-600'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {item.archetype.code}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {item.archetype.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formattedDate}
                        </span>
                        <span className="capitalize">{item.stage}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
