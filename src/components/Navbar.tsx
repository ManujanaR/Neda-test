"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLang, LANGUAGES } from "@/lib/i18n";

interface NavbarProps {
  currentView: "home" | "assessment" | "report" | "explorer";
  onNavigate: (view: "home" | "assessment" | "explorer") => void;
  onOpenHistory: () => void;
  hasSavedResults: boolean;
}

export default function Navbar({
  currentView,
  onNavigate,
  onOpenHistory,
  hasSavedResults,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  return (
    <header className="border-b border-line">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <button onClick={() => onNavigate("home")} className="flex items-baseline gap-2 shrink-0">
          <span className="font-semibold text-lg text-brand-ink">NEDA</span>
          <span className="text-sm text-mute hidden sm:inline">{t.nav.tagline}</span>
        </button>

        <nav className="flex items-center gap-4 text-sm">
          <button
            onClick={() => onNavigate("explorer")}
            className={currentView === "explorer" ? "font-medium text-brand-ink" : "text-mute hover:text-ink"}
          >
            {t.nav.archetypes}
          </button>

          {hasSavedResults && (
            <button onClick={onOpenHistory} className="text-mute hover:text-ink">
              {t.nav.saved}
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="text-mute hover:text-ink"
            aria-label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {currentView !== "assessment" && (
            <button onClick={() => onNavigate("assessment")} className="btn-primary py-2">
              {currentView === "report" ? t.nav.retake : t.nav.takeTest}
            </button>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm w-full sm:w-auto sm:order-first sm:basis-full sm:justify-end">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={lang === code ? "text-brand-ink font-medium" : "text-mute hover:text-ink"}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
