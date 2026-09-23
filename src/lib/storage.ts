import { AssessmentResult } from './types';

const STORAGE_KEY = 'neda_assessment_history_v1';
const CURRENT_RESULT_KEY = 'neda_latest_assessment';

export function saveAssessmentResult(result: AssessmentResult): void {
  if (typeof window === 'undefined') return;

  try {
    // Save as current
    window.localStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(result));

    // Append to history
    const existing = getSavedAssessments();
    const filtered = existing.filter((item) => item.id !== result.id);
    const updated = [result, ...filtered].slice(0, 10); // keep up to 10 past assessments
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save assessment to localStorage', err);
  }
}

export function getLatestAssessment(): AssessmentResult | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(CURRENT_RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getSavedAssessments(): AssessmentResult[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteAssessment(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getSavedAssessments();
    const updated = existing.filter((item) => item.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const latest = getLatestAssessment();
    if (latest && latest.id === id) {
      if (updated.length > 0) {
        window.localStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(updated[0]));
      } else {
        window.localStorage.removeItem(CURRENT_RESULT_KEY);
      }
    }
  } catch (err) {
    console.error('Failed to delete assessment', err);
  }
}
