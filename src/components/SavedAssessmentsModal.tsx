'use client';

import React from 'react';
import { AssessmentResult } from '@/lib/types';
import { deleteAssessment } from '@/lib/storage';
import { X } from 'lucide-react';
import { useLang } from '@/lib/i18n';

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
  const { t } = useLang();
  const handleDelete = (id: string) => {
    if (confirm(t.saved.confirm)) {
      deleteAssessment(id);
      onRefresh();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-title"
      className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-paper w-full max-w-lg max-h-[85vh] overflow-y-auto rounded p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="saved-title" className="text-2xl">
              {t.saved.title}
            </h2>
            <p className="text-sm text-mute">{t.saved.sub}</p>
          </div>
          <button onClick={onClose} className="text-mute hover:text-ink" aria-label={t.wizard.back}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {assessments.length === 0 ? (
          <p className="py-8 text-sm text-mute">
            {t.saved.empty}
          </p>
        ) : (
          <ul className="border-t border-line">
            {assessments.map((item) => {
              const isSelected = item.id === activeId;
              const formattedDate = new Date(item.timestamp).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <li key={item.id} className="border-b border-line flex items-center gap-3">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="flex-1 text-left py-3 hover:bg-well px-2 -mx-2 transition-colors"
                  >
                    <span className="font-medium">
                      {item.archetype.name}
                      {isSelected && <span className="text-mute font-normal"> {t.saved.openNow}</span>}
                    </span>
                    <span className="block text-sm text-mute">
                      {item.archetype.code}, {t.stageLabels[item.stage]}, {formattedDate}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn-link text-mute hover:text-ink"
                  >
                    {t.saved.delete}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
