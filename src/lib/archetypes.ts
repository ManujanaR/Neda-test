import { ArchetypeFamily, ArchetypeFamilyId, ArchetypeProfile, DimensionScore, CompetencyCode } from './types';

export const ARCHETYPE_FAMILIES: Record<ArchetypeFamilyId, ArchetypeFamily> = {
  visionary_catalysts: {
    id: 'visionary_catalysts',
    name: 'Visionary Catalysts',
    codePrefix: 'S-C',
    themeColor: '#059669', // Emerald
    accentBg: 'bg-emerald-50',
    borderClass: 'border-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    description: 'Inventive explorers driven by fresh opportunities, disruptive creativity, and unconventional paradigms.',
    iconName: 'Sparkles'
  },
  strategic_drivers: {
    id: 'strategic_drivers',
    name: 'Strategic Drivers',
    codePrefix: 'S-D',
    themeColor: '#2563eb', // Royal Blue
    accentBg: 'bg-blue-50',
    borderClass: 'border-blue-500',
    badgeBg: 'bg-blue-100 text-blue-800',
    description: 'Dynamic problem-solvers who spot unmet market gaps and execute ironclad commitments with clinical speed.',
    iconName: 'Compass'
  },
  relentless_builders: {
    id: 'relentless_builders',
    name: 'Relentless Builders',
    codePrefix: 'A-D',
    themeColor: '#d97706', // Amber / Gold
    accentBg: 'bg-amber-50',
    borderClass: 'border-amber-500',
    badgeBg: 'bg-amber-100 text-amber-800',
    description: 'Enduring pillars who turn raw adversity into reliable institutions through sheer persistence and reliable delivery.',
    iconName: 'Shield'
  },
  master_craftsmen: {
    id: 'master_craftsmen',
    name: 'Master Craftsmen',
    codePrefix: 'A-C',
    themeColor: '#7c3aed', // Violet
    accentBg: 'bg-purple-50',
    borderClass: 'border-purple-500',
    badgeBg: 'bg-purple-100 text-purple-800',
    description: 'Deep-domain artisans who stay the course to build peerless, exceptionally refined products and communities.',
    iconName: 'Hammer'
  }
};

export const ARCHETYPES: Record<string, ArchetypeProfile> = {
  'S-D-B-N': {
    code: 'S-D-B-N',
    cleanCode: 'SDBN',
    name: 'The Catalyst',
    familyId: 'strategic_drivers',
    essence: 'Sees the market gap, rallies high-trust peers, and delivers at breakneck speed.',
    portrait: 'You are an entrepreneurial force of nature. When you spot an unsolved problem, you don’t deliberate for months—you recruit believers, take calculated leaps, and deliver tangible results before others have finished drafting their slide decks. Your superpower is kinetic energy: converting abstract friction into committed teams and live products.',
    superpowers: [
      'Rapid opportunity recognition and market empathy',
      'High persuasive gravity that attracts early backers and talent',
      'Unwavering reliability when commitments are pledged'
    ],
    vulnerabilities: [
      'Risk of spreading effort too thin across exciting new leads',
      'Can promise aggressive timelines that stretch operational capacity'
    ],
    idealCoFounder: 'The Steward (A-D-P-I) or The Inventor (S-C-P-I) who provides systematic financial rigor and backend stability.',
    complementaryArchetypes: ['A-D-P-I', 'S-C-P-I', 'A-C-P-I'],
    growthAdvice: 'Anchor your lightning speed with a disciplined quarterly review to prune side bets that distract from your primary engine.'
  },
  'S-D-B-I': {
    code: 'S-D-B-I',
    cleanCode: 'SDBI',
    name: 'The Trailblazer',
    familyId: 'strategic_drivers',
    essence: 'Spots and seizes chances alone, unencumbered by consensus, and always ships.',
    portrait: 'Independent, daring, and radically accountable. You trust your own instincts above market chatter and have the execution muscle to prove skeptics wrong. Where others wait for approval or committee sign-offs, you build the prototype and let customer traction do the talking.',
    superpowers: [
      'Sovereign self-belief and decisiveness under pressure',
      'High tolerance for ambiguity and pioneer risk',
      'Exceptional personal output and work discipline'
    ],
    vulnerabilities: [
      'Can turn into a solo bottleneck by resisting delegation',
      'May dismiss valuable outside feedback too quickly'
    ],
    idealCoFounder: 'The Orchestrator (S-D-P-N) or The Community Builder (A-C-P-N) to handle stakeholder relations and institutional diplomacy.',
    complementaryArchetypes: ['S-D-P-N', 'A-C-P-N'],
    growthAdvice: 'Practice active stakeholder listening before executing irreversible choices, and build trusted advisory sounding boards.'
  },
  'S-D-P-N': {
    code: 'S-D-P-N',
    cleanCode: 'SDPN',
    name: 'The Orchestrator',
    familyId: 'strategic_drivers',
    essence: 'Finds golden opportunities, maps every milestone, and aligns the right coalition.',
    portrait: 'The strategic architect who turns messy market opportunities into orderly, high-leverage campaigns. You combine commercial radar with structured milestones and diplomatic finesse, making you a master at enterprise partnerships, complex rollouts, and multi-stakeholder venture building.',
    superpowers: [
      'Mastery of both vision and systematic execution roadmap',
      'Outstanding relationship cultivation and coalition building',
      'Risk mitigation through empirical research and milestone tracking'
    ],
    vulnerabilities: [
      'Can fall prey to over-planning when rapid chaotic action is needed',
      'May hesitate on bold leaps without comprehensive data'
    ],
    idealCoFounder: 'The Disruptor (A-D-B-N) or The Maverick (S-C-B-I) who injects radical audacity and rapid experimentation.',
    complementaryArchetypes: ['A-D-B-N', 'S-C-B-I'],
    growthAdvice: 'Set explicit "fast experiment" budgets where 20% of your time is spent testing unproven ideas without full plans.'
  },
  'S-D-P-I': {
    code: 'S-D-P-I',
    cleanCode: 'SDPI',
    name: 'The Operator',
    familyId: 'strategic_drivers',
    essence: 'Quietly spots and executes well-planned bets with surgical precision.',
    portrait: 'Calm, methodical, and profoundly effective. You rarely seek the limelight, preferring to let flawless unit economics, punctuality, and operational perfection speak for your venture. You identify profitable niches and build systems that execute with swiss-watch consistency.',
    superpowers: [
      'Impeccable operational follow-through and deadline fidelity',
      'Data-driven scenario planning and objective risk hedging',
      'Emotional composure and resilience during operational storms'
    ],
    vulnerabilities: [
      'Reluctance to pitch publicly or engage in high-visibility evangelism',
      'May miss spontaneous organic opportunities that lack historical data'
    ],
    idealCoFounder: 'The Visionary (S-C-B-N) or The Catalyst (S-D-B-N) who thrives on public storytelling and customer evangelism.',
    complementaryArchetypes: ['S-C-B-N', 'S-D-B-N'],
    growthAdvice: 'Invest in public-facing storytelling. Your operational excellence deserves the customer and investor spotlight.'
  },
  'S-C-B-N': {
    code: 'S-C-B-N',
    cleanCode: 'SCBN',
    name: 'The Visionary',
    familyId: 'visionary_catalysts',
    essence: 'Bold new paradigms backed by magnetic storytelling and creative flair.',
    portrait: 'You see the future two steps before the market and possess the charismatic magnetism to convince the world it belongs there. You are unwilling to accept conventional solutions, always searching for breakthroughs that redefine entire categories while rallying armies of enthusiastic supporters.',
    superpowers: [
      'Infectious enthusiasm and category-defining vision',
      'Unconstrained lateral thinking and innovative product sense',
      'Audacious courage to attack entrenched incumbents'
    ],
    vulnerabilities: [
      'Can lose interest once the creative breakthrough is proven',
      'Risk of prioritizing aesthetic novelty over mundane operational hygiene'
    ],
    idealCoFounder: 'The Builder (A-D-P-N) or The Steward (A-D-P-I) to ground the grand vision in ironclad operational execution.',
    complementaryArchetypes: ['A-D-P-N', 'A-D-P-I'],
    growthAdvice: 'Pair every ambitious vision with a relentless operational integrator who holds you accountable to shipping deadlines.'
  },
  'S-C-B-I': {
    code: 'S-C-B-I',
    cleanCode: 'SCBI',
    name: 'The Maverick',
    familyId: 'visionary_catalysts',
    essence: 'Original, risk-loving, self-directed inventor challenging orthodoxy.',
    portrait: 'You march to your own rhythm and thrive on the creative frontier. You reject consensus wisdom, preferring to bet on contrarian insights and build radical prototypes with your own hands. You don’t need validation from the crowd—only the freedom to explore the unknown.',
    superpowers: [
      'Exceptional creative autonomy and first-principles thinking',
      'Bravery to pursue contrarian ideas that others deem impossible',
      'Rapid iterative prototyping without external dependencies'
    ],
    vulnerabilities: [
      'Tendency to isolate yourself and under-communicate with allies',
      'Can ignore critical customer feedback if it clashes with personal taste'
    ],
    idealCoFounder: 'The Orchestrator (S-D-P-N) or The Community Builder (A-C-P-N) who builds the bridge between your craft and the market.',
    complementaryArchetypes: ['S-D-P-N', 'A-C-P-N'],
    growthAdvice: 'Expose your creative prototypes to real paying customers early—let the market refine your brilliance rather than hiding it.'
  },
  'S-C-P-N': {
    code: 'S-C-P-N',
    cleanCode: 'SCPN',
    name: 'The Designer',
    familyId: 'visionary_catalysts',
    essence: 'Creative, structured, collaborative product thinker creating beloved tools.',
    portrait: 'You blend deep design sensitivity with methodical structure. You care deeply about human psychology, user experience, and elegant systems, ensuring every touchpoint feels thoughtful. You don’t just innovate for the sake of novelty; you engineer delightful solutions that bring communities along.',
    superpowers: [
      'Empathetic user research and high product taste',
      'Structured planning merged with creative experimentation',
      'Collaborative warmth that makes teams love building your products'
    ],
    vulnerabilities: [
      'Can over-polish features before releasing them to real scrutiny',
      'Reluctance to make abrupt, high-stakes bets without peer alignment'
    ],
    idealCoFounder: 'The Trailblazer (S-D-B-I) or The Disruptor (A-D-B-N) who accelerates go-to-market speed and embraces raw risk.',
    complementaryArchetypes: ['S-D-B-I', 'A-D-B-N'],
    growthAdvice: 'Embrace "embarrassingly early" beta tests. Ship when the core value works, even if the aesthetic finish is still raw.'
  },
  'S-C-P-I': {
    code: 'S-C-P-I',
    cleanCode: 'SCPI',
    name: 'The Inventor',
    familyId: 'visionary_catalysts',
    essence: 'Careful, original, deeply self-reliant creator solving hard technical problems.',
    portrait: 'A true deep-tech artisan. You immerse yourself in deep technical or structural problems that others avoid due to complexity. You gather immense information, formulate airtight hypotheses, and construct elegant proprietary solutions with patient, solitary craftsmanship.',
    superpowers: [
      'Profound intellectual rigor and domain depth',
      'Meticulous quality control and intellectual property creation',
      'Self-directed research and relentless curiosity'
    ],
    vulnerabilities: [
      'Severe risk of commercial isolation—building in a silo',
      'Assuming that a superior product automatically sells itself'
    ],
    idealCoFounder: 'The Catalyst (S-D-B-N) or The Visionary (S-C-B-N) to handle sales, evangelism, and aggressive venture growth.',
    complementaryArchetypes: ['S-D-B-N', 'S-C-B-N'],
    growthAdvice: 'Force a mandatory customer conversation quota: speak with 2 prospective users for every week of solitary engineering.'
  },
  'A-D-B-N': {
    code: 'A-D-B-N',
    cleanCode: 'ADBN',
    name: 'The Disruptor',
    familyId: 'relentless_builders',
    essence: 'Relentless, reliable, and ready to challenge incumbents on customer trust.',
    portrait: 'You are the unyielding challenger. When industry giants get lazy and mistreat customers, you step in with superior grit, reliability, and aggressive market maneuvers. Setbacks only fuel your resolve, and your team knows that when you commit to a fight, you stay until the end.',
    superpowers: [
      'Extraordinary tenacity in prolonged competitive struggles',
      'Customer-centric reliability that steals market share from slow incumbents',
      'Persuasive rallying cry that unites underdogs behind a crusade'
    ],
    vulnerabilities: [
      'Can get trapped in trench warfare rather than seeking easier adjacent niches',
      'Risk of burnout by trying to out-work structural market flaws'
    ],
    idealCoFounder: 'The Designer (S-C-P-N) or The Orchestrator (S-D-P-N) who uncovers smarter strategic angles and protects resources.',
    complementaryArchetypes: ['S-C-P-N', 'S-D-P-N'],
    growthAdvice: 'Ensure you are persisting on a viable business model, not just a heroic struggle. Audit unit economics regularly.'
  },
  'A-D-B-I': {
    code: 'A-D-B-I',
    cleanCode: 'ADBI',
    name: 'The Powerhouse',
    familyId: 'relentless_builders',
    essence: 'Endurance, raw execution power, and unshakeable inner fortitude.',
    portrait: 'Built like an iron locomotive. Where others surrender after the third rejection, you have already lined up ten more attempts. You take full personal responsibility for every failure, refuse to offer excuses, and grind through high-uncertainty environments until momentum is undeniable.',
    superpowers: [
      'Near-indestructible grit and psychological stamina',
      'Total ownership of outcomes and deadline execution',
      'Unafraid of hard manual labor and unglamorous early tasks'
    ],
    vulnerabilities: [
      'Can be dismissive of diplomacy or soft organizational feelings',
      'May refuse to pivot when empirical signals show a dead end'
    ],
    idealCoFounder: 'The Community Builder (A-C-P-N) or The Orchestrator (S-D-P-N) to balance grit with diplomatic team culture.',
    complementaryArchetypes: ['A-C-P-N', 'S-D-P-N'],
    growthAdvice: 'Remember that pivoting is not quitting. Knowing when to redirect your massive energy is the ultimate superpower.'
  },
  'A-D-P-N': {
    code: 'A-D-P-N',
    cleanCode: 'ADPN',
    name: 'The Builder',
    familyId: 'relentless_builders',
    essence: 'Steady, organized, brings people along to build institutions that endure.',
    portrait: 'The backbone of sustainable enterprise. You don’t chase fleeting fads; you build durable foundations, transparent processes, and deeply loyal teams. Clients trust you implicitly because your word is a bond, your plans are thorough, and your persistence never wanes.',
    superpowers: [
      'Institutional architecture and long-term organizational health',
      'Systematic risk mitigation combined with steady execution',
      'High relational trust and employee retention'
    ],
    vulnerabilities: [
      'Can be slow to adopt radical, disruptive technological shifts',
      'Preference for harmony can soften hard competitive decisions'
    ],
    idealCoFounder: 'The Maverick (S-C-B-I) or The Visionary (S-C-B-N) who challenges the company with disruptive innovations.',
    complementaryArchetypes: ['S-C-B-I', 'S-C-B-N'],
    growthAdvice: 'Carve out an explicit "R&D innovation lab" within your roadmap to experiment with high-risk ideas without endangering core delivery.'
  },
  'A-D-P-I': {
    code: 'A-D-P-I',
    cleanCode: 'ADPI',
    name: 'The Steward',
    familyId: 'relentless_builders',
    essence: 'Dependable, methodical, self-sufficient guardian of operational integrity.',
    portrait: 'The ultimate custodian of execution. You hold yourself to the most exacting standards of reliability and planning, operating with quiet autonomy. You don’t need praise or cheerleading; you map the mission, eliminate waste, and deliver flawless results day in and day out.',
    superpowers: [
      'Unsurpassed dependability and operational governance',
      'Meticulous risk control and financial stewardship',
      'Total self-reliance in navigating administrative and logistics hurdles'
    ],
    vulnerabilities: [
      'Reluctance to ask for external support or tap strategic networks',
      'Risk of staying too safe and missing rapid growth inflection points'
    ],
    idealCoFounder: 'The Catalyst (S-D-B-N) or The Disruptor (A-D-B-N) who accelerates ambition and drives market expansion.',
    complementaryArchetypes: ['S-D-B-N', 'A-D-B-N'],
    growthAdvice: 'Do not view networking as political theater; view it as connecting with resource providers who multiply your output.'
  },
  'A-C-B-N': {
    code: 'A-C-B-N',
    cleanCode: 'ACBN',
    name: 'The Challenger',
    familyId: 'master_craftsmen',
    essence: 'Persistent, quality-driven, bold, and capable of rallying loyal champions.',
    portrait: 'You hold an uncompromising standard of excellence and aren’t afraid to ruffle feathers to achieve it. You stand up to substandard industry norms, rally passionate believers around your standard of craft, and relentlessly iterate until your product outshines everything on the market.',
    superpowers: [
      'Elevated aesthetic and qualitative benchmarks',
      'Audacity to challenge mediocre legacy solutions in public',
      'Charismatic advocacy for craft and customer delight'
    ],
    vulnerabilities: [
      'Can be impatient with peers who settle for "good enough"',
      'Risk of over-engineering before securing core product-market fit'
    ],
    idealCoFounder: 'The Operator (S-D-P-I) or The Steward (A-D-P-I) who enforces budgetary reality and streamlined milestone delivery.',
    complementaryArchetypes: ['S-D-P-I', 'A-D-P-I'],
    growthAdvice: 'Establish clear "definition of done" parameters so your commitment to quality doesn’t inadvertently stall your launch schedule.'
  },
  'A-C-B-I': {
    code: 'A-C-B-I',
    cleanCode: 'ACBI',
    name: 'The Pioneer',
    familyId: 'master_craftsmen',
    essence: 'Stubborn about excellence, daring in ambition, and willing to go first alone.',
    portrait: 'A lone wolf of uncompromising standards. You venture into uncharted territory with pure self-conviction, refining your work with intense dedication. You would rather fail on your own terms while seeking true perfection than succeed by copying a cheap generic formula.',
    superpowers: [
      'Zero willingness to compromise on product integrity',
      'Courage to pioneer unproven niches without safety nets',
      'Incredible focus and self-directed iterative mastery'
    ],
    vulnerabilities: [
      'Can be perceived as unapproachable or rigid by potential partners',
      'Extreme difficulty delegating core creative decisions'
    ],
    idealCoFounder: 'The Orchestrator (S-D-P-N) or The Builder (A-D-P-N) to handle operational infrastructure and team scaling.',
    complementaryArchetypes: ['S-D-P-N', 'A-D-P-N'],
    growthAdvice: 'Treat delegation as mentoring: define quality rubrics so team members can meet your standards without your personal intervention.'
  },
  'A-C-P-N': {
    code: 'A-C-P-N',
    cleanCode: 'ACPN',
    name: 'The Community Builder',
    familyId: 'master_craftsmen',
    essence: 'Patient, high-standards, relationship-led architect of loyal ecosystems.',
    portrait: 'You cultivate long-term ecosystems where quality and authentic relationships reinforce one another. You believe that true enterprise value is built through deep customer trust, deliberate craft, and thoughtful stakeholder care. Your communities stay with you for decades.',
    superpowers: [
      'Deep relational trust and vibrant community cultivation',
      'Long-term strategic planning with high craft standards',
      'Empathetic leadership that inspires team dedication'
    ],
    vulnerabilities: [
      'Can be conflict-averse when tough commercial cutbacks are necessary',
      'Pace can be overly deliberate when competitors move aggressively'
    ],
    idealCoFounder: 'The Trailblazer (S-D-B-I) or The Catalyst (S-D-B-N) who injects speed, aggressive sales, and decisive market moves.',
    complementaryArchetypes: ['S-D-B-I', 'S-D-B-N'],
    growthAdvice: 'Practice making swift decisions in low-risk scenarios to increase your organization’s adaptive clock speed.'
  },
  'A-C-P-I': {
    code: 'A-C-P-I',
    cleanCode: 'ACPI',
    name: 'The Master Craftsperson',
    familyId: 'master_craftsmen',
    essence: 'Deep quality, methodical planning, and quiet, stubborn independence.',
    portrait: 'The consummate artisan. You believe in doing things right, down to the hidden joints that nobody will ever see. You research thoroughly, map every contingency, and persist through years of deliberate practice to create offerings that stand the test of time.',
    superpowers: [
      'Unsurpassed craftsmanship and dedication to quality excellence',
      'Thorough risk assessment and methodical milestone pacing',
      'Total immunity to short-term industry hype and distractions'
    ],
    vulnerabilities: [
      'Extreme reluctance to promote yourself or your products publicly',
      'Can remain in development mode far too long before commercializing'
    ],
    idealCoFounder: 'The Catalyst (S-D-B-N) or The Visionary (S-C-B-N) who translates your masterpiece into massive commercial reach.',
    complementaryArchetypes: ['S-D-B-N', 'S-C-B-N'],
    growthAdvice: 'Remember that an unreleased masterpiece helps no one. Set an unshakeable public launch date and stick to it.'
  }
};

/**
 * Calculates the 4 dimension scores and resolves the archetype
 */
export function resolveArchetype(scores: Record<CompetencyCode, number>): {
  archetype: ArchetypeProfile;
  dimensions: DimensionScore[];
} {
  const { A, B, C, D, E, F, G, H } = scores;

  // Dimension 1: Momentum (A: Seeking Opportunities vs B: Persistence)
  // Spark (S) vs Anchor (A)
  const diff1 = A - B; // -20 to +20
  const pct1 = Math.max(5, Math.min(95, Math.round(50 + diff1 * 2.5)));
  const pole1 = diff1 >= 0 ? 'S' : 'A';
  const dim1: DimensionScore = {
    id: 'momentum',
    title: 'Momentum',
    pole1Letter: 'S',
    pole1Name: 'Spark',
    pole1Desc: 'Opportunity Seeker — thrives on discovering fresh possibilities and taking early initiative.',
    pole2Letter: 'A',
    pole2Name: 'Anchor',
    pole2Desc: 'Persistent Driver — thrives on endurance, overcoming hurdles, and staying the course.',
    pole1Percentage: pct1,
    pole2Percentage: 100 - pct1,
    dominantPole: pole1 === 'S' ? 'Spark' : 'Anchor',
    dominantLetter: pole1,
    isBalanced: Math.abs(diff1) <= 1,
    insight: pole1 === 'S'
      ? 'You naturally lean towards spotting new gaps, initiating experiments, and pursuing novel territory.'
      : 'You naturally lean towards grinding through obstacles, iterating with patience, and seeing commitments through.'
  };

  // Dimension 2: Execution (C: Commitment vs D: Quality & Creativity)
  // Deliverer (D) vs Crafter (C)
  const diff2 = C - D;
  const pct2 = Math.max(5, Math.min(95, Math.round(50 + diff2 * 2.5)));
  const pole2 = diff2 >= 0 ? 'D' : 'C';
  const dim2: DimensionScore = {
    id: 'execution',
    title: 'Execution',
    pole1Letter: 'D',
    pole1Name: 'Deliverer',
    pole1Desc: 'Commitment & Reliability — honors deadlines, keeps customer promises, and values speed.',
    pole2Letter: 'C',
    pole2Name: 'Crafter',
    pole2Desc: 'Quality & Innovation — strives for continuous improvement, elegant design, and distinction.',
    pole1Percentage: pct2,
    pole2Percentage: 100 - pct2,
    dominantPole: pole2 === 'D' ? 'Deliverer' : 'Crafter',
    dominantLetter: pole2,
    isBalanced: Math.abs(diff2) <= 1,
    insight: pole2 === 'D'
      ? 'Your execution rhythm centers on speed, meeting target dates, and building unwavering client trust.'
      : 'Your execution rhythm centers on elevated craft, creative innovation, and refusing to settle for mediocrity.'
  };

  // Dimension 3: Risk Stance (E: Risk Taking vs F: Goal Setting & Planning)
  // Bold (B) vs Planner (P)
  const diff3 = E - F;
  const pct3 = Math.max(5, Math.min(95, Math.round(50 + diff3 * 2.5)));
  const pole3 = diff3 >= 0 ? 'B' : 'P';
  const dim3: DimensionScore = {
    id: 'risk',
    title: 'Risk Stance',
    pole1Letter: 'B',
    pole1Name: 'Bold',
    pole1Desc: 'Calculated Risk — comfortable moving amidst ambiguity and taking asymmetric bets.',
    pole2Letter: 'P',
    pole2Name: 'Planner',
    pole2Desc: 'Systematic Planner — relies on data gathering, rigorous roadmaps, and contingency planning.',
    pole1Percentage: pct3,
    pole2Percentage: 100 - pct3,
    dominantPole: pole3 === 'B' ? 'Bold' : 'Planner',
    dominantLetter: pole3,
    isBalanced: Math.abs(diff3) <= 1,
    insight: pole3 === 'B'
      ? 'You prefer acting quickly on conviction and adapting on the fly rather than waiting for complete certainty.'
      : 'You prefer de-risking moves with empirical research, structured milestones, and data validation before committing.'
  };

  // Dimension 4: Influence (G: Persuasion & Networking vs H: Self-Confidence)
  // Networker (N) vs Independent (I)
  const diff4 = G - H;
  const pct4 = Math.max(5, Math.min(95, Math.round(50 + diff4 * 2.5)));
  const pole4 = diff4 >= 0 ? 'N' : 'I';
  const dim4: DimensionScore = {
    id: 'influence',
    title: 'Influence & Mindset',
    pole1Letter: 'N',
    pole1Name: 'Networker',
    pole1Desc: 'Persuasion & Coalition — leverages partnerships, outside talent, and consultative influence.',
    pole2Letter: 'I',
    pole2Name: 'Independent',
    pole2Desc: 'Self-Reliance & Conviction — relies on internal locus of control, autonomous belief, and grit.',
    pole1Percentage: pct4,
    pole2Percentage: 100 - pct4,
    dominantPole: pole4 === 'N' ? 'Networker' : 'Independent',
    dominantLetter: pole4,
    isBalanced: Math.abs(diff4) <= 1,
    insight: pole4 === 'N'
      ? 'You achieve leverage through relationships, collaborative teams, and convincing key stakeholders.'
      : 'You achieve leverage through intense personal focus, sovereign self-belief, and autonomous problem-solving.'
  };

  const code = `${pole1}-${pole2}-${pole3}-${pole4}`;
  const archetype = ARCHETYPES[code] || ARCHETYPES['S-D-B-N'];

  return {
    archetype,
    dimensions: [dim1, dim2, dim3, dim4]
  };
}
