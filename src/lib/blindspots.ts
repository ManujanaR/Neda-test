import { BlindSpotRule, CompetencyCode } from './types';

export function detectBlindSpots(scores: Record<CompetencyCode, number>): BlindSpotRule[] {
  const { A, B, C, D, E, F, G, H } = scores;
  const detected: BlindSpotRule[] = [];

  // 1. High Risk + Low Planning
  if (E >= 16 && F <= 15) {
    detected.push({
      id: 'leap_without_chute',
      title: 'The Leap Without a Chute',
      synergy: 'High Risk Taking (E) + Low Systematic Planning (F)',
      description: 'You are eager to jump into bold experiments, but you may skip essential research, financial modeling, or contingency plans.',
      riskWarning: 'Can lead to rapid cash burn, unexpected regulatory landmines, or committing to unviable business models before testing assumptions.',
      tacticalFix: 'Enforce a mandatory 48-hour "Pre-Mortem" before allocating funds or signing agreements: list the top 3 ways this bet could fail and define mitigation steps.'
    });
  }

  // 2. High Persuasion + Low Commitment
  if (G >= 16 && C <= 15) {
    detected.push({
      id: 'over_promise_trap',
      title: 'The Over-Promise Trap',
      synergy: 'High Persuasion (G) + Lower Delivery Commitment (C)',
      description: 'Your charisma and sales eloquence can easily sell clients and partners on ambitious visions, but delivery bottlenecks can damage hard-won trust.',
      riskWarning: 'Customer churn after exciting onboarding, damaged reputation, and team exhaustion trying to fulfill unplanned promises.',
      tacticalFix: 'Implement an "Under-Promise Buffer": Always quote 30% more time and 20% fewer features than you intuitively believe you can deliver in client discussions.'
    });
  }

  // 3. High Persistence + Low Quality/Innovation
  if (B >= 16 && D <= 14) {
    detected.push({
      id: 'the_blind_slog',
      title: 'The Blind Slog',
      synergy: 'High Persistence (B) + Lower Innovation/Quality (D)',
      description: 'You possess unmatched endurance to keep pushing through walls, but you may be stubbornly pushing a mediocre offering rather than innovating on the core value proposition.',
      riskWarning: 'Wasting months or years working heroic 80-hour weeks on a product that customers simply do not find compelling or differentiated.',
      tacticalFix: 'Establish strict metric "Kill Gates": If 20 customer interviews don’t yield at least 3 people begging to pay or test, stop grinding and redesign the core offering.'
    });
  }

  // 4. High Quality + Low Risk Taking
  if (D >= 17 && E <= 14) {
    detected.push({
      id: 'perfectionist_paralysis',
      title: 'The Perfectionist Paralysis',
      synergy: 'High Quality/Craft (D) + Lower Risk Taking (E)',
      description: 'You hold exceptional standards of excellence, but fear of releasing an imperfect product delays your market contact.',
      riskWarning: 'Competitors launch crude MVPs, gather real customer feedback, iterate, and capture the market while you are still polishing internal designs.',
      tacticalFix: 'Practice the "Embarrassing Launch" doctrine: If you are not somewhat embarrassed by the first version of your product, you launched too late.'
    });
  }

  // 5. High Opportunity Seeking + Low Persistence
  if (A >= 17 && B <= 14) {
    detected.push({
      id: 'shiny_object_syndrome',
      title: 'Shiny Object Syndrome',
      synergy: 'High Opportunity Seeking (A) + Lower Persistence (B)',
      description: 'You spot brilliant ideas everywhere, but when the honeymoon phase ends and the unglamorous execution begins, your interest drifts to the next exciting novelty.',
      riskWarning: 'A graveyard of half-built prototypes, frustrated collaborators, and zero finished revenue-generating businesses.',
      tacticalFix: 'The "One In, One Out" rule: Forbid yourself from starting any new venture or project until you have either run the current one for 90 consecutive days or formally shut it down.'
    });
  }

  // 6. High Self-Confidence + Low Information/Advice
  if (H >= 17 && F <= 15) {
    detected.push({
      id: 'echo_chamber',
      title: 'The Echo Chamber',
      synergy: 'High Self-Confidence (H) + Lower Information Seeking (F)',
      description: 'Your self-belief is admirable, but you may inadvertently ignore critical market feedback or expert advice, assuming your intuition is infallible.',
      riskWarning: 'Building products tailored to your personal taste rather than genuine customer purchasing behavior.',
      tacticalFix: 'Appoint a "Red Team" advisor or trusted mentor whose explicit mandate is to poke holes in your assumptions before major rollouts.'
    });
  }

  // 7. Low Networking + High Self-Reliance
  if (G <= 14 && H >= 16) {
    detected.push({
      id: 'lone_wolf_bottleneck',
      title: 'The Lone Wolf Bottleneck',
      synergy: 'Lower Persuasion & Networking (G) + High Independence (H)',
      description: 'You take immense pride in doing everything yourself. As a consequence, your personal working hours become the absolute ceiling of the company.',
      riskWarning: 'Severe founder burnout, inability to attract complementary co-founders, and missed partnership opportunities.',
      tacticalFix: 'Delegate or partner on one critical function this month (e.g., design, sales, or finance) and intentionally measure the time leverage gained.'
    });
  }

  // Fallback if no extreme combination triggered
  if (detected.length === 0) {
    detected.push({
      id: 'balanced_vigilance',
      title: 'Execution Drift',
      synergy: 'Balanced Profile Distribution',
      description: 'Your competencies are moderately well-balanced across the board, which provides versatility but can sometimes blur your signature competitive edge.',
      riskWarning: 'Trying to be good at everything rather than dominating a specific market angle.',
      tacticalFix: 'Pick your top 2 highest competencies and build your entire initial go-to-market strategy around those specific levers.'
    });
  }

  return detected;
}
