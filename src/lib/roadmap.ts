import { JourneyStage, StartingStatus, RoadmapStep, CompetencyCode } from './types';

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    phaseNumber: 0,
    title: 'Phase 0: Self-Awareness & Positioning',
    goal: 'Understand your entrepreneurial archetype, identify your unfair advantages, and fortify blind spots.',
    typicalActions: [
      'Review your Neda archetype report and bookmark your 2 primary superpowers.',
      'Select 1 growth competency to deliberately practice over the next 30 days.',
      'Assess your current weekly bandwidth (5 hrs, 15 hrs, or full-time) and establish a dedicated maker routine.'
    ],
    doneWhen: 'You have a clear personal thesis on how you work best and an active 30-day growth habit.',
    relevantCompetencies: ['H', 'F']
  },
  {
    phaseNumber: 1,
    title: 'Phase 1: Problem Discovery & Customer Pain',
    goal: 'Unearth a painful, expensive, or frustrating real-world problem that people are already trying to solve.',
    typicalActions: [
      'Maintain a 14-day friction log noting annoyances in your industry, campus, or daily routine.',
      'Conduct 10 exploratory problem interviews without mentioning any product solution.',
      'Synthesize customer quotes into 1 clear problem statement with quantifiable stakes.'
    ],
    doneWhen: 'At least 5 target users independently describe the exact same friction as an urgent priority.',
    relevantCompetencies: ['A', 'G', 'F']
  },
  {
    phaseNumber: 2,
    title: 'Phase 2: Lean Validation & Pre-Commitment',
    goal: 'Gather concrete proof that customers will commit time, attention, or money before you write code.',
    typicalActions: [
      'Create a 1-page offer teaser or pitch deck outlining the proposed transformation.',
      'Pitch the solution directly to interviewees and observe their willingness to pre-order or commit time.',
      'Collect 10 signed letters of intent (LOI), waitlist deposits, or beta agreements.'
    ],
    doneWhen: 'At least 3 customers put skin in the game (cash deposit, signed contract, or proprietary dataset access).',
    relevantCompetencies: ['E', 'G', 'C']
  },
  {
    phaseNumber: 3,
    title: 'Phase 3: The Concierge MVP (Smallest Thing)',
    goal: 'Deliver core customer value manually or through a minimal prototype with maximum speed.',
    typicalActions: [
      'Strip 80% of nice-to-have features; focus 100% on the single core utility.',
      'Deploy a manual "concierge" or no-code pilot where you fulfill the service by hand.',
      'Observe the first 3 users live as they experience your product to identify points of friction.'
    ],
    doneWhen: 'Real users successfully achieve the promised outcome using your prototype.',
    relevantCompetencies: ['D', 'C', 'B']
  },
  {
    phaseNumber: 4,
    title: 'Phase 4: First Paying Customers & Retention',
    goal: 'Convert early beta testers into paying advocates and measure real usage retention.',
    typicalActions: [
      'Ask for the sale: charge full price or establish clear subscription billing from day one.',
      'Set up a high-touch feedback channel (e.g. WhatsApp, Slack, or direct phone support).',
      'Iterate on customer objections until early adopters state they would be "very disappointed" without your tool.'
    ],
    doneWhen: 'You achieve your first 5–10 paying, highly satisfied customers with zero refunds.',
    relevantCompetencies: ['C', 'B', 'G']
  },
  {
    phaseNumber: 5,
    title: 'Phase 5: Operational Foundations & Unit Economics',
    goal: 'Put clean banking, legal hygiene, customer agreements, and positive unit margins in place.',
    typicalActions: [
      'Form the appropriate legal entity, commercial bank account, and founder equity agreements.',
      'Document your standard operating procedures for sales, onboarding, and customer support.',
      'Calculate your customer acquisition cost (CAC) and customer lifetime value (LTV).'
    ],
    doneWhen: 'Every customer transaction is profitable and operations do not depend on ad-hoc improvisations.',
    relevantCompetencies: ['F', 'C', 'E']
  },
  {
    phaseNumber: 6,
    title: 'Phase 6: Scalable Growth & Co-Founder Expansion',
    goal: 'Build repeatable acquisition channels and recruit complementary partners to scale without founder bottleneck.',
    typicalActions: [
      'Recruit a co-founder whose archetype directly offsets your blind spots.',
      'Double down on the single highest-converting customer acquisition channel.',
      'Delegate day-to-day fulfillment so the leadership team can focus on distribution and product strategy.'
    ],
    doneWhen: 'The venture produces compounding monthly revenue and operates smoothly during your absence.',
    relevantCompetencies: ['G', 'H', 'D', 'B']
  }
];

export function determineEntryPhase(stage: JourneyStage, status: StartingStatus): number {
  if (status === 'revenue') return 5;
  if (status === 'building') return 3;
  if (status === 'idea') return 1;

  // status === 'not_started'
  switch (stage) {
    case 'student':
      return 0;
    case 'undergraduate':
      return 1;
    case 'graduate':
      return 1;
    case 'entrepreneur':
      return 3;
  }
}
