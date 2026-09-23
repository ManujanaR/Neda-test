import {
  CompetencyCode,
  JourneyStage,
  StartingStatus,
  AssessmentResult,
  CompetencyInfo
} from './types';
import { COMPETENCY_METADATA, getCompetencyBand } from './competencies';
import { resolveArchetype } from './archetypes';
import { detectBlindSpots } from './blindspots';
import { determineEntryPhase } from './roadmap';

export const calculateScores = (answers: number[]) => {
  const result = calculateAssessmentResult(answers);
  const scores = [
    result.scores.A,
    result.scores.B,
    result.scores.C,
    result.scores.D,
    result.scores.E,
    result.scores.F,
    result.scores.G,
    result.scores.H,
  ];
  return { scores, cfScore: result.rawCorrectionScore, deduction: result.deduction };
};

export function calculateAssessmentResult(
  answers: number[],
  stage: JourneyStage = 'undergraduate',
  status: StartingStatus = 'not_started'
): AssessmentResult {
  const getVal = (n: number) => answers[n - 1] || 0;

  // Correction factor calculation (Questions 9, 18, 27, 36, 45)
  const cfScore = -getVal(9) - getVal(18) - getVal(27) + getVal(36) + getVal(45) + 18;
  const deduction = cfScore >= 24 ? 7 : cfScore >= 22 ? 5 : cfScore >= 20 ? 3 : 0;

  // Raw score formulas from verified PEC NEDA instrument
  const rawA = getVal(1) + getVal(10) + getVal(19) - getVal(28) + getVal(37) + 6 - deduction;
  const rawB = getVal(2) + getVal(11) + getVal(20) - getVal(29) + getVal(38) + 6 - deduction;
  const rawC = getVal(3) + getVal(12) + getVal(21) + getVal(30) - getVal(39) + 6 - deduction;
  const rawD = getVal(4) + getVal(13) + getVal(22) + getVal(31) - getVal(40) + 6 - deduction;
  const rawE = -getVal(5) + getVal(14) + getVal(23) + getVal(32) + getVal(41) + 6 - deduction;
  const rawF = -getVal(6) + getVal(15) + getVal(24) + getVal(33) + getVal(42) + 6 - deduction;
  const rawG = -getVal(7) + getVal(16) + getVal(25) + getVal(34) + getVal(43) + 6 - deduction;
  const rawH = -getVal(8) + getVal(17) + getVal(26) + getVal(35) + getVal(44) + 6 - deduction;

  // Clamp within the valid 5-25 range for standard octagon scoring
  const clamp = (val: number) => Math.max(5, Math.min(25, val));

  const scoreMap: Record<CompetencyCode, number> = {
    A: clamp(rawA),
    B: clamp(rawB),
    C: clamp(rawC),
    D: clamp(rawD),
    E: clamp(rawE),
    F: clamp(rawF),
    G: clamp(rawG),
    H: clamp(rawH),
  };

  // Build CompetencyInfo items
  const competencyCodes: CompetencyCode[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const competencies: CompetencyInfo[] = competencyCodes.map((code) => {
    const meta = COMPETENCY_METADATA[code];
    const score = scoreMap[code];
    return {
      code,
      name: meta.name,
      shortName: meta.shortName,
      tagline: meta.tagline,
      description: meta.description,
      strongBehavior: meta.strongBehavior,
      lowBehavior: meta.lowBehavior,
      shadowSide: meta.shadowSide,
      score,
      band: getCompetencyBand(score),
      habitsByStage: meta.habitsByStage,
      microHabit: meta.microHabit,
    };
  });

  // Archetype & Dimensions
  const { archetype, dimensions } = resolveArchetype(scoreMap);

  // Strengths & Growth Areas
  const sortedCompetencies = [...competencies].sort((a, b) => b.score - a.score);
  const strengths = sortedCompetencies.slice(0, 3);
  const growthAreas = sortedCompetencies.slice(-3).reverse();

  // Blind Spots
  const blindSpots = detectBlindSpots(scoreMap);

  // Reliability Assessment
  let reliabilityLevel: 'Objective' | 'Slightly Favorable' | 'High Social Desirability' = 'Objective';
  let reliabilityAdvice = 'Your self-evaluation shows balanced, realistic self-awareness with minimal response distortion.';

  if (cfScore >= 24) {
    reliabilityLevel = 'High Social Desirability';
    reliabilityAdvice = 'Your responses reflect a strong tendency to rate yourself in an ideal light. A calibration deduction of 7 points has been applied. We recommend inviting a mentor or co-founder to review this profile with you.';
  } else if (cfScore >= 22) {
    reliabilityLevel = 'Slightly Favorable';
    reliabilityAdvice = 'A mild positive response bias was detected. A calibration adjustment of 5 points has been applied to emphasize your true relative superpowers.';
  } else if (cfScore >= 20) {
    reliabilityLevel = 'Slightly Favorable';
    reliabilityAdvice = 'Slight favorable skew detected (3-point calibration deduction). The resulting profile provides an accurate ranking of your core strengths.';
  }

  // 30-Day Action Plan
  const focusGrowthComp = growthAreas[0] || competencies[0];
  const thirtyDayPlan = {
    focusCompetency: focusGrowthComp.code,
    habits: [
      focusGrowthComp.microHabit,
      focusGrowthComp.habitsByStage[stage],
      'Weekly Reflection: Reserve 20 minutes every Sunday to log instances where you applied this habit in real projects.'
    ],
    monthlyChallenge: getMonthlyChallenge(focusGrowthComp.code, stage)
  };

  const roadmapPhaseEntry = determineEntryPhase(stage, status);

  return {
    id: `neda_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    stage,
    status,
    answers,
    scores: scoreMap,
    rawCorrectionScore: cfScore,
    deduction,
    reliabilityLevel,
    reliabilityAdvice,
    archetype,
    dimensions,
    competencies,
    strengths,
    growthAreas,
    blindSpots,
    thirtyDayPlan,
    roadmapPhaseEntry
  };
}

function getMonthlyChallenge(code: CompetencyCode, stage: JourneyStage): string {
  const challenges: Record<CompetencyCode, Record<JourneyStage, string>> = {
    A: {
      student: 'Identify 5 small annoyances experienced by classmates; build a simple one-page guide or tool to solve one of them.',
      undergraduate: 'Interview 10 campus students about a daily bottleneck and publish a research summary proposing a viable campus service.',
      graduate: 'Pitch a low-code or template solution to 5 business owners in your local area or industry niche.',
      entrepreneur: 'Run 10 customer discovery interviews focused entirely on unserved problems in your adjacent market.'
    },
    B: {
      student: 'Choose a skill or academic topic you previously abandoned; commit to a 21-day consecutive practice streak without missing a day.',
      undergraduate: 'Commit to a 30-day "no-quit" project sprint: complete and present a functional prototype regardless of obstacles.',
      graduate: 'Log every rejection or setback across 30 days and write down 2 alternative routes for each before taking any pause.',
      entrepreneur: 'Conduct a formal pivot review: test 3 distinct hypothesis angles for your lowest-converting sales funnel.'
    },
    C: {
      student: 'Deliver every group task and homework assignment at least 24 hours prior to deadline for an entire month.',
      undergraduate: 'Publish a public weekly sprint commitment on LinkedIn or GitHub and hit 100% of your self-set deadlines for 4 weeks.',
      graduate: 'Implement a zero-slip delivery policy with all clients or team leads; communicate status updates 48 hours before any due date.',
      entrepreneur: 'Review and streamline your customer fulfillment SLAs to reduce turnaround time by at least 20%.'
    },
    D: {
      student: 'Take a routine school presentation and completely elevate its visual design, clarity, and pacing to professional standards.',
      undergraduate: 'Perform a deep UX/business teardown of a top-tier startup product and redesign 2 core user flows.',
      graduate: 'Automate one repetitive administrative or reporting workflow at your work or project using modern tools.',
      entrepreneur: 'Implement a monthly customer delight initiative: audit your product onboarding and eliminate the top 3 user friction points.'
    },
    E: {
      student: 'Sign up to deliver a public pitch, speech, or performance in front of an audience outside your comfort zone.',
      undergraduate: 'Launch a micro-offering online (such as a paid workshop, digital template, or freelance gig) with a $15 marketing test.',
      graduate: 'Pitch an ambitious, unproven proposal or new initiative directly to department leadership or prospective clients.',
      entrepreneur: 'Allocate a 2-week experimental sprint budget to test a daring, non-traditional acquisition channel.'
    },
    F: {
      student: 'Establish one concrete 90-day academic or creative milestone; break it down into weekly targets and review it every Sunday.',
      undergraduate: 'Build a comprehensive 90-day financial model and milestones Gantt chart for your startup or honors project.',
      graduate: 'Map a detailed 12-month career and financial runway model with scenario sensitivity analysis.',
      entrepreneur: 'Adopt an OKR framework for the upcoming quarter with explicit leading KPIs tracked weekly in a visible dashboard.'
    },
    G: {
      student: 'Prepare and deliver a 60-second elevator pitch for an idea to 3 teachers or community mentors.',
      undergraduate: 'Reach out to 5 alumni working in your target industry; conduct 20-minute informational coffee chats with each.',
      graduate: 'Attend 2 industry meetups; initiate conversations with 5 new professionals and follow up with a personalized value-add note.',
      entrepreneur: 'Form an advisory board of 2 experienced founders; hold your first monthly strategic check-in.'
    },
    H: {
      student: 'Volunteer to lead a class discussion or debate without asking for permission first.',
      undergraduate: 'Publish your original insights, code, or design project publicly and share it across professional social channels.',
      graduate: 'Voice your researched counter-opinion in a high-stakes meeting where you would normally stay silent.',
      entrepreneur: 'Record a transparent founder update video discussing your company mission and share it directly with your community.'
    }
  };

  return challenges[code]?.[stage] || 'Complete a 30-day deliberate practice challenge focused on your primary growth competency.';
}
