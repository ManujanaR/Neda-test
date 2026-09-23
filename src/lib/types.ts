export type JourneyStage = 'student' | 'undergraduate' | 'graduate' | 'entrepreneur';

export type StartingStatus = 'not_started' | 'idea' | 'building' | 'revenue';

export type CompetencyCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export type CompetencyBand = 'Emerging' | 'Developing' | 'Strong' | 'Exceptional';

export interface CompetencyInfo {
  code: CompetencyCode;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  strongBehavior: string;
  lowBehavior: string;
  shadowSide: string;
  score: number;
  band: CompetencyBand;
  habitsByStage: Record<JourneyStage, string>;
  microHabit: string;
}

export type ArchetypeFamilyId = 'visionary_catalysts' | 'strategic_drivers' | 'relentless_builders' | 'master_craftsmen';

export interface ArchetypeFamily {
  id: ArchetypeFamilyId;
  name: string;
  codePrefix: string;
  themeColor: string; // Tailwind color class / hex representation
  accentBg: string;
  borderClass: string;
  badgeBg: string;
  description: string;
  iconName: string;
}

export interface DimensionScore {
  id: 'momentum' | 'execution' | 'risk' | 'influence';
  title: string;
  pole1Letter: string;
  pole1Name: string;
  pole1Desc: string;
  pole2Letter: string;
  pole2Name: string;
  pole2Desc: string;
  pole1Percentage: number; // 0 to 100
  pole2Percentage: number; // 0 to 100
  dominantPole: string;
  dominantLetter: string;
  isBalanced: boolean;
  insight: string;
}

export interface ArchetypeProfile {
  code: string; // e.g. "S-D-B-N"
  cleanCode: string; // e.g. "SDBN"
  name: string; // e.g. "The Catalyst"
  familyId: ArchetypeFamilyId;
  essence: string;
  portrait: string;
  superpowers: string[];
  vulnerabilities: string[];
  idealCoFounder: string;
  complementaryArchetypes: string[];
  growthAdvice: string;
}

export interface BlindSpotRule {
  id: string;
  title: string;
  synergy: string;
  description: string;
  riskWarning: string;
  tacticalFix: string;
}

export interface RoadmapStep {
  phaseNumber: number;
  title: string;
  goal: string;
  typicalActions: string[];
  doneWhen: string;
  relevantCompetencies: CompetencyCode[];
}

export interface AssessmentResult {
  id: string;
  timestamp: number;
  stage: JourneyStage;
  status: StartingStatus;
  answers: number[];
  scores: Record<CompetencyCode, number>;
  rawCorrectionScore: number;
  deduction: number;
  reliabilityLevel: 'Objective' | 'Slightly Favorable' | 'High Social Desirability';
  reliabilityAdvice: string;
  archetype: ArchetypeProfile;
  dimensions: DimensionScore[];
  competencies: CompetencyInfo[];
  strengths: CompetencyInfo[];
  growthAreas: CompetencyInfo[];
  blindSpots: BlindSpotRule[];
  thirtyDayPlan: {
    habits: string[];
    monthlyChallenge: string;
    focusCompetency: CompetencyCode;
  };
  roadmapPhaseEntry: number;
}
