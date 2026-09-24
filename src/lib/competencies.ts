import { CompetencyCode, CompetencyBand, JourneyStage } from './types';

export interface CompetencyStaticMeta {
  code: CompetencyCode;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  strongBehavior: string;
  lowBehavior: string;
  shadowSide: string;
  microHabit: string;
  habitsByStage: Record<JourneyStage, string>;
}

export const COMPETENCY_METADATA: Record<CompetencyCode, CompetencyStaticMeta> = {
  A: {
    code: 'A',
    name: 'Seeking Opportunities',
    shortName: 'Opportunity Seeking',
    tagline: 'Notices unserved needs and acts swiftly before being prompted',
    description: 'The innate reflex to perceive market gaps, inefficiencies, and emerging trends as personal invitations to build something useful.',
    strongBehavior: 'Anticipates shifts, proactively tests new product angles, and jumps into unexplored niches.',
    lowBehavior: 'Waits for clear signals, instructions, or safety rails before taking initiative; defaults to comfortable routines.',
    shadowSide: 'Shiny Object Syndrome — chasing new ideas relentlessly without finishing or solidifying existing projects.',
    microHabit: 'Daily "Friction Log": Write down 1 daily annoyance you or someone around you experienced, and brainstorm 2 ways to solve it.',
    habitsByStage: {
      student: 'Start a 2-week "problem journal"; observe one repeated friction in school life and prototype a tiny fix.',
      undergraduate: 'Interview 5 students or club leaders outside your department about their biggest administrative or social headache.',
      graduate: 'Map 3 emerging workflow bottlenecks in your industry; test a paid micro-consulting or template offer on weekends.',
      entrepreneur: 'Schedule a monthly customer problem discovery call; test one adjacent product hypothesis each quarter.'
    }
  },
  B: {
    code: 'B',
    name: 'Persistence',
    shortName: 'Persistence',
    tagline: 'Refuses to fold when facing resistance; iterates through multiple routes',
    description: 'The psychological stamina to confront setbacks, regulatory friction, and customer rejections without abandoning the mission.',
    strongBehavior: 'Views obstacles as puzzles to solve; pivots methodology while keeping the destination intact.',
    lowBehavior: 'Abandons projects quickly when the initial excitement fades or upon encountering first resistance.',
    shadowSide: 'Dogged obstinacy — clinging to a failed premise or unviable product long after data proves customers do not want it.',
    microHabit: 'The "Rule of Three": Whenever you hit a dead end, force yourself to write 3 distinct alternative solutions before stopping.',
    habitsByStage: {
      student: 'When stuck on a project or skill, commit to trying 2 different tutorials or peer discussions before giving up.',
      undergraduate: 'Set a mandatory "4-week grit sprint" for campus projects before deciding whether to pivot or shut down.',
      graduate: 'Track your rejection-to-learning ratio: document what each rejection taught you and how your approach adapted.',
      entrepreneur: 'Institute a pre-mortem before tough launches and define clear stop/go metric gates to prevent stubborn sunk-cost traps.'
    }
  },
  C: {
    code: 'C',
    name: 'Commitment to Work Contracts & Targets',
    shortName: 'Commitment & Reliability',
    tagline: 'Keeps promises, hits deadlines, and places user trust above convenience',
    description: 'The unwavering discipline to honor commitments to clients, partners, and team members even at personal inconvenience.',
    strongBehavior: 'Under-promises and over-delivers; steps in to fix crises regardless of whose fault it was.',
    lowBehavior: 'Allows personal mood or distractions to slip deadlines; overcommits and ghosts stakeholders.',
    shadowSide: 'Martyrdom & Burnout — taking on everyone else’s burden at the expense of your health and long-term stamina.',
    microHabit: 'Single-Source Commitment Ledger: Review open commitments every Monday; inform stakeholders at least 48 hours before any deadline risk.',
    habitsByStage: {
      student: 'Deliver all school group commitments 24 hours ahead of deadline to build a reputation for ironclad reliability.',
      undergraduate: 'Never agree to an extracurricular milestone without calendar-blocking the actual work sessions first.',
      graduate: 'Establish strict client SLA boundaries; communicate progress proactively with weekly bullet updates.',
      entrepreneur: 'Build operational checklists and transparent delivery dashboards so deadlines are never dependent on heroics.'
    }
  },
  D: {
    code: 'D',
    name: 'Quality, Innovation & Creativity',
    shortName: 'Quality & Innovation',
    tagline: 'Refuses mediocrity; continuously optimizes for craft, speed, and elegance',
    description: 'The craftsmanship mindset that seeks continuous improvement, elegant design, and smarter ways to deliver outsized customer delight.',
    strongBehavior: 'Audits workflows for friction, reimagines stale product categories, and demands high standards.',
    lowBehavior: 'Satisfied with the bare minimum; relies on outdated processes and dismisses innovation as unnecessary fuss.',
    shadowSide: 'Paralyzing Perfectionism — polishing minor details for months while competitors launch and capture the market.',
    microHabit: 'The 10% Optimization Question: Ask at the conclusion of every project: "What one thing could make this 10% faster, cleaner, or better?"',
    habitsByStage: {
      student: 'Redesign one school presentation or report to look and feel like an executive publication.',
      undergraduate: 'Deconstruct a favorite product or app each month; write an teardown of 3 things they do brilliantly.',
      graduate: 'Benchmark your deliverables against the top 1% in your industry; automate 1 repetitive weekly task.',
      entrepreneur: 'Conduct quarterly product audits focused on customer delight metrics and frictionless onboarding.'
    }
  },
  E: {
    code: 'E',
    name: 'Risk Taking',
    shortName: 'Calculated Risk Taking',
    tagline: 'Willing to act amidst uncertainty while methodically managing the downside',
    description: 'The courage to make bets with incomplete information, balancing asymmetric upside with risk mitigation.',
    strongBehavior: 'Embraces calculated experiments; comfortable with being misunderstood in the short term.',
    lowBehavior: 'Craves absolute certainty before moving; freezes during decision-making and avoids unfamiliar territory.',
    shadowSide: 'Gambler’s Impulsivity — risking company survival on uncalculated hunches without downside safety nets.',
    microHabit: 'Two-Way Door Framing: Classify every decision as reversible (walk through quickly) or irreversible (deliberate carefully).',
    habitsByStage: {
      student: 'Sign up for a competition or speech topic completely outside your comfort zone.',
      undergraduate: 'Launch a small paid experiment (e.g., selling a curated guide or offering a weekend service) with a $20 cap.',
      graduate: 'Negotiate performance-based compensation or take on an ambiguous high-upside initiative at work.',
      entrepreneur: 'Isolate experimental budgets from core runway; run fast 2-week MVPs to kill bad assumptions cheaply.'
    }
  },
  F: {
    code: 'F',
    name: 'Goal Setting & Systematic Planning',
    shortName: 'Planning & Information',
    tagline: 'Translates lofty ambitions into concrete milestones and validated data',
    description: 'The architectural capability to dissect complex multi-year visions into weekly sprint objectives backed by empirical facts.',
    strongBehavior: 'Gathers deep domain intelligence, establishes measurable KPIs, and pivots plans based on real metrics.',
    lowBehavior: 'Flits between vague wishes without tactical milestones; jumps blindly into execution without researching context.',
    shadowSide: 'Analysis Paralysis — spending weeks building elaborate Gantt charts and models instead of talking to customers.',
    microHabit: 'Rule of 3 Sources: Before deciding on any major initiative, consult at least 3 credible benchmarks or expert practitioners.',
    habitsByStage: {
      student: 'Set 1 measurable 90-day academic or skill goal; reverse-engineer it into specific Sunday checkpoints.',
      undergraduate: 'Use OKRs (Objectives & Key Results) for your side-hustle or thesis with weekly metric reviews.',
      graduate: 'Build a financial runway projection model before making any career or venture leap.',
      entrepreneur: 'Adopt a quarterly planning cadence with explicit leading indicators rather than lagging revenue guesses.'
    }
  },
  G: {
    code: 'G',
    name: 'Persuasion & Networking',
    shortName: 'Persuasion & Networking',
    tagline: 'Builds authentic coalitions, influences decision-makers, and enlists talent',
    description: 'The interpersonal gravitational pull that aligns diverse stakeholders, wins customer trust, and rallies supporters around a vision.',
    strongBehavior: 'Articulates win-win propositions; cultivates deep relationships long before needing any favors.',
    lowBehavior: 'Hesitates to pitch or reach out to mentors; assumes great products sell themselves in total silence.',
    shadowSide: 'Manipulative Transactionalism — treating people as tactical instruments rather than long-term partners.',
    microHabit: 'Give-First Outreach: Reach out to 1 new person in your field each week with a genuine compliment or useful resource with zero asks.',
    habitsByStage: {
      student: 'Practice a concise 30-second explanation of an idea to teachers or parents until it sounds clear and compelling.',
      undergraduate: 'Connect with 2 alumni who founded companies or lead teams; ask about their biggest early career surprises.',
      graduate: 'Attend 1 industry conference or meetup per month; follow up within 24 hours with custom notes to 3 contacts.',
      entrepreneur: 'Form an informal founder mastermind or advisory circle; build a warm pipeline of potential talent and angel backers.'
    }
  },
  H: {
    code: 'H',
    name: 'Self-Confidence',
    shortName: 'Self-Confidence',
    tagline: 'Trusts internal conviction, stands firm under scrutiny, and learns from failures',
    description: 'The internal anchor of self-efficacy that allows an entrepreneur to maintain composure amidst skepticism and adversity.',
    strongBehavior: 'Speaks with conviction; accepts constructive criticism without taking it as an existential threat.',
    lowBehavior: 'Second-guesses every choice; easily swayed by contrarian comments; feels like an impostor.',
    shadowSide: 'Arrogant Infallibility — dismissing valid market signals or expert advice because of inflated ego.',
    microHabit: 'The "Evidence of Competence" Journal: Write down 3 small wins or mastered hurdles at the close of every Friday.',
    habitsByStage: {
      student: 'Volunteer to speak first or represent your group during class presentations.',
      undergraduate: 'Publish a public article, teardown, or project log; let your voice and perspective be seen.',
      graduate: 'Speak up in senior meetings when you have researched domain insight, even if you are the newest person in the room.',
      entrepreneur: 'Separate your personal identity from your company’s daily ups and downs; practice transparent, calm leadership.'
    }
  }
};

export function getCompetencyBand(score: number): CompetencyBand {
  if (score >= 21) return 'Exceptional';
  if (score >= 16) return 'Strong';
  if (score >= 11) return 'Developing';
  return 'Emerging';
}

export function getBandColor(band: CompetencyBand): string {
  switch (band) {
    case 'Exceptional':
      return 'text-emerald-700 dark:text-emerald-400';
    case 'Strong':
      return 'text-blue-700 dark:text-blue-400';
    case 'Developing':
      return 'text-amber-700 dark:text-amber-400';
    case 'Emerging':
      return 'text-rose-700 dark:text-rose-400';
  }
}
