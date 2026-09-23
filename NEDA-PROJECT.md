# Neda — Personal Entrepreneurship Profile

> A 16Personalities-style assessment that tells each person **what kind of entrepreneur they are**, where they are strong, where they are weak, and **exactly what to do next** — whether they are a student who has never started anything or a founder already running a business.

**Status:** Draft v0.1 (concept + roadmap) · **Repo:** `ManujanaR/Neda-test` · **Working name:** Neda (rename freely)

---

## 1. The idea in one paragraph

Today, the app asks 45 self-rating questions, scores 8 entrepreneurial competencies, and shows a radar chart with eight raw numbers. That is a *measurement*. Neda should become an *experience*: the user finishes the test and receives a personal report with a named **archetype** (like a 16Personalities type), a plain-language description of their **strengths and blind spots**, a **tailored improvement plan**, and a **step-by-step journey** that starts at their current stage: **Student, Undergraduate, Graduate, or Entrepreneur**. If they have not started yet, the report shows them how to begin from zero.

## 2. Goals and non-goals

**Goals**
- Give every user a result that feels personal, specific and actionable, not a generic score sheet.
- Reuse the proven structure of 16Personalities: short test → memorable type → deep, readable report.
- Adapt advice to the user's journey stage.
- Turn weaknesses into concrete, small, doable practices.
- Support retaking the test to see progress over time.

**Non-goals (for now)**
- Predicting business success. This is a self-reflection tool, not a verdict.
- Replacing mentors, courses, or incubators. Neda points to them.
- Clinical or psychological diagnosis.

## 3. Who it is for

| Stage | Typical user | What they need from the result |
|---|---|---|
| **Student** | School-level, exploring | Self-awareness, low-stakes experiments, habit building |
| **Undergraduate** | University, has time and peers | Campus-based ways to practise: projects, competitions, co-founder search |
| **Graduate** | Job hunting or early career | The job-vs-venture decision, side-venture path, building a safety buffer |
| **Entrepreneur** | Already running something | Find the competency that limits growth; delegation, team, scaling |

## 4. What exists today (repo review)

- **Instrument:** 45 statements rated 1–5 (`src/lib/questions.ts`). 8 competencies × 5 items = 40 scored items, plus 5 items (Q9, 18, 27, 36, 45) that feed a **correction factor** (social-desirability check).
- **Scoring:** `src/lib/scoring.ts`. Each competency = 4–5 items added/subtracted + 6, minus the correction deduction → range **5–25**.
- **UI:** `src/components/Wizard.tsx` (Next.js + Tailwind + Framer Motion + Chart.js radar). One question per screen, auto-advance, radar + 8 numbers at the end. `index.html` is an older single-file version of the same test.
- **Source instrument:** `neda application.pdf` is the paper original: rating scale, correction table (<20 → 0, 20–21 → 3, 22–23 → 5, 24–25 → 7), the "corrected total marks" sheet and the **Personal Entrepreneurial Competency Octagon**. The guidance there says a person's octagon should be expanded outward toward the highest score in every competency.
- **Not there yet:** no interpretation text, no archetypes, no stage input, no improvement plan, no saving, no sharing, no tests. `README.md` is still the create-next-app boilerplate.

The instrument follows the well-known **Personal Entrepreneurial Competencies (PEC)** approach (McClelland / McBer / MSI, widely used in programs such as UNCTAD's Empretec). Confirm attribution and licensing before public launch (see Open Questions).

## 5. The eight competencies

| Code | Competency | In one line |
|---|---|---|
| A | Seeking Opportunities | Notices needs and acts before being asked |
| B | Persistence | Keeps going and tries new routes when blocked |
| C | Commitment to Work on Contracts and Targets | Keeps promises, delivers on time, puts the customer first |
| D | Quality, Innovation and Creativity | Refuses "good enough"; always looks for a better way |
| E | Risk Taking | Acts under uncertainty; takes on challenges others avoid |
| F | Goal Setting and Systematic Planning | Gathers information, sets clear goals, plans before acting |
| G | Persuasion and Networking | Influences people and gets the right people involved |
| H | Self-Confidence | Believes in own ability; holds a position under pressure |

Each is scored **5–25** after correction.

## 6. Bringing the 16Personalities structure to Neda

### 6.1 What 16Personalities does (the pattern to copy)

1. A short test of statements rated on an agree/disagree scale.
2. Scores on a few **dimensions**, each shown as a percentage toward one pole.
3. A **4-letter code** and a **named type** (e.g. "Architect").
4. A long, friendly **report**: strengths, weaknesses, relationships, career, growth tips.
5. Types grouped into **families** and shareable as a card.

### 6.2 Proposed Neda mapping

Neda keeps the 8 scored competencies (the *what you have*), and adds **4 style dimensions** that give the type its shape (the *how you operate*). Each dimension compares two related competencies, so there are two poles, just like 16Personalities.

| Dimension | Compares | Pole 1 | Pole 2 |
|---|---|---|---|
| **Momentum** | A vs B | **S**park: strongest at spotting opportunities | **A**nchor: strongest at persisting |
| **Execution** | C vs D | **D**eliverer: strongest at reliability and commitment | **C**rafter: strongest at quality and innovation |
| **Risk stance** | E vs F | **B**old: leans on risk-taking over planning | **P**lanner: leans on planning over risk-taking |
| **Influence** | G vs H | **N**etworker: strongest at persuading and connecting | **I**ndependent: strongest at self-belief and self-reliance |

**Type code** = 4 letters, e.g. `S-D-B-N`. 2⁴ = **16 archetypes**.

**Preference strength** (like the % bars): `pct = round(50 + (scoreA − scoreB) × 2.5)`. Range −20…+20 → 0–100%. A gap of ±1 is shown as "balanced", with a documented tie-break for the letter.

**Level** (separate from type, like the A/T suffix on 16Personalities): each competency is banded (provisional, calibrate with real data):

| Score | Band |
|---|---|
| 5–10 | Emerging |
| 11–15 | Developing |
| 16–20 | Strong |
| 21–25 | Exceptional |

So two people can both be `S-D-B-N` but one is *Exceptional* on most competencies and one is *Emerging*, and their reports differ.

### 6.3 Draft archetype names (placeholders to refine)

| Code | Name | Essence |
|---|---|---|
| S-D-B-N | The Catalyst | Sees the gap, rallies people, ships fast |
| S-D-B-I | The Trailblazer | Spots and seizes chances alone, and delivers |
| S-D-P-N | The Orchestrator | Finds opportunities, plans them, and brings the right people |
| S-D-P-I | The Operator | Quietly spots and executes well-planned bets |
| S-C-B-N | The Visionary | Bold new ideas and the charisma to sell them |
| S-C-B-I | The Maverick | Original, risk-loving, self-directed inventor |
| S-C-P-N | The Designer | Creative, planned, collaborative product thinker |
| S-C-P-I | The Inventor | Careful, original, deeply self-reliant creator |
| A-D-B-N | The Disruptor | Relentless, reliable, and ready to challenge the market |
| A-D-B-I | The Powerhouse | Endurance and delivery, hard to knock down |
| A-D-P-N | The Builder | Steady, organised, brings people along |
| A-D-P-I | The Steward | Dependable, methodical, self-sufficient |
| A-C-B-N | The Challenger | Persistent, quality-driven, bold, well connected |
| A-C-B-I | The Pioneer | Stubborn about excellence and willing to go first |
| A-C-P-N | The Community Builder | Patient, high-standards, relationship-led |
| A-C-P-I | The Master Craftsperson | Deep quality, careful planning, strong independence |

Optional: group into 4 **families** by the Momentum × Execution pairs (Spark/Deliverer, Spark/Crafter, Anchor/Deliverer, Anchor/Crafter) for shareable colour themes.

## 7. User journey (product flow)

1. **Landing:** what it is, ~8 minutes, private.
2. **Stage question:** *Where are you on your journey?* **Student / Undergraduate / Graduate / Entrepreneur.**
3. **Context questions (short, optional):** *Have you started something yet?* (Not yet / I have an idea / Building or launched / Earning revenue) · hours per week available · areas of interest.
4. **The 45 statements**, one per screen (keep the current Wizard experience).
5. **Results page:** archetype, octagon, per-competency cards, strengths, growth areas, blind spots, action plan, journey roadmap.
6. **Save / share / export:** PDF report, shareable archetype card, email me my plan.
7. **Retake later:** compare octagons over time.

## 8. The personal result report

Each report is assembled from content blocks selected by **competency × band × journey stage** (see §10).

1. **Header:** archetype name + code + journey stage ("The Catalyst · Undergraduate").
2. **Octagon:** the user's shape, with the "full octagon" (all 25s) as the target outline.
3. **Archetype portrait:** a short, warm description of how this type starts things.
4. **Competency cards (all 8):** score and band, what it means for *this* user, evidence from their answers (e.g. "you rated 'I complete my work on time' low"), and one next step.
5. **Top 3 strengths** and **top 3 growth areas** (highest / lowest corrected scores).
6. **Blind spots:** combinations that create risk, for example:
   - High Risk Taking + low Goal Setting → commits fast without a plan.
   - High Persuasion + low Commitment → promises more than is delivered.
   - High Self-Confidence + low Seeking-Advice signals → ignores feedback.
   - High Persistence + low Quality/Innovation → keeps pushing a weak idea.
7. **Improvement plan:** for each growth area, 3 habits + a 30-day challenge (see §11).
8. **Journey roadmap** for their stage (see §9), with steps reordered to lean on their strengths and protect their weak spots.
9. **Team fit:** which competencies to look for in a co-founder or first hire.
10. **Reliability note:** if the correction factor is high, show a gentle "you may have rated yourself very favourably; consider asking someone who knows you to rate you too."
11. **Disclaimer:** self-assessment for reflection, not a prediction.

## 9. Personalising by journey stage

The same score produces different advice. Examples for a **low Seeking Opportunities** result:

| Stage | Advice style |
|---|---|
| Student | "Start a 2-week 'notice problems' journal; fix one small problem for a classmate." |
| Undergraduate | "Join a society or competition; interview 5 students about a daily frustration." |
| Graduate | "Map problems in your industry or city; run one paid micro-service on weekends." |
| Entrepreneur | "Schedule a monthly customer-problem review; test one adjacent offer this quarter." |

### 9.1 "Starting from zero" roadmap (for anyone who has not started)

| Phase | Goal | Typical actions | Done when |
|---|---|---|---|
| **0. Know yourself** | Understand your profile | Read report, pick 1–2 competencies to grow | You have a 30-day plan |
| **1. Find a problem** | A real problem worth solving | Talk to 10 people, list frustrations, choose one | One clear problem statement |
| **2. Validate** | Proof people care | Interviews, simple landing page, pre-orders or sign-ups | Someone commits or pays |
| **3. Build the smallest thing** | A first version | Prototype, service, or manual version | Real users try it |
| **4. First customers** | Revenue or usage | Sell personally, collect feedback, iterate | First paying customers |
| **5. Set up properly** | Make it a real business | Registration, basic finance, roles, tools | Legal and money basics in place |
| **6. Grow** | Repeatable growth | Team, funding options, systems, partnerships | Growth without the founder doing everything |

Entry point depends on stage and status: a Student or Undergraduate with no idea starts at Phase 0–1; a Graduate with an idea starts at Phase 2; an Entrepreneur is placed at Phase 4–6 based on their answer to the "have you started" question.

Each phase step is tagged with the competencies it uses, so weak competencies get extra guidance exactly where they will be needed.

## 10. Content and personalisation engine

**Approach: rule-based first, AI-assisted later.**

- **v1, deterministic:** a content library keyed by `competency × band × stage`, assembled by code. Predictable, testable, no hallucination risk, and cheap.
- **v2, optional AI layer:** pass the structured result (scores, type, stage, answers) to an LLM to rewrite the narrative in a more natural voice, with the library as the factual base and strict guardrails.

**Suggested content block shape:**

```ts
type ContentBlock = {
  id: string;
  competency: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  band: "emerging" | "developing" | "strong" | "exceptional";
  stage: "student" | "undergraduate" | "graduate" | "entrepreneur" | "any";
  kind: "meaning" | "strength" | "blindspot" | "habit" | "challenge" | "resource";
  body: string;            // markdown
  tags?: string[];         // e.g. ["needs-team", "low-budget"]
};
```

**Suggested result shape:**

```ts
type Result = {
  stage: Stage;
  started: "no" | "idea" | "building" | "revenue";
  corrected: Record<"A"|"B"|"C"|"D"|"E"|"F"|"G"|"H", number>; // 5–25
  correctionFactor: number;
  archetype: { code: string; name: string; prefs: Record<string, number> }; // pct toward pole 1
  strengths: string[];   // competency codes
  growth: string[];      // competency codes
  blindSpots: string[];  // rule ids
  plan: ContentBlock[];
};
```

## 11. Seed content: the eight competencies

A starting point for the content library. Refine with entrepreneurship educators.

**A. Seeking Opportunities**
- *Strong looks like:* notices gaps, acts without being asked, enjoys the new.
- *Low looks like:* waits for instructions, prefers the familiar.
- *Shadow side:* chasing every shiny idea.
- *Practise:* daily "problems I noticed" note; fix one small problem per week; talk to someone outside your field weekly.

**B. Persistence**
- *Strong:* keeps going when blocked, tries several routes.
- *Low:* moves on quickly after setbacks.
- *Shadow:* refusing to stop when the idea is wrong.
- *Practise:* on any obstacle, write down 3 alternative approaches before quitting; set a "review or stop" date for every project.

**C. Commitment to Work on Contracts and Targets**
- *Strong:* delivers on time, keeps promises, goes the extra mile for the customer.
- *Low:* misses deadlines, family/other priorities routinely override commitments without communication.
- *Shadow:* burnout, over-promising.
- *Practise:* only promise what you have checked; use a weekly commitments list; tell people early when a date will slip.

**D. Quality, Innovation and Creativity**
- *Strong:* dislikes wasted time, seeks better and faster ways, high standards.
- *Low:* accepts "good enough", repeats the same methods.
- *Shadow:* perfectionism that delays launch.
- *Practise:* after each task ask "what would make this 10% better or faster?"; study one competitor's product weekly.

**E. Risk Taking**
- *Strong:* comfortable with uncertainty, takes on challenges.
- *Low:* needs certainty and control before acting.
- *Shadow:* reckless bets.
- *Practise:* run small, cheap, reversible experiments; define the worst case and how you would recover before each bet.

**F. Goal Setting and Systematic Planning**
- *Strong:* sets clear goals, gathers information, plans steps.
- *Low:* acts on impulse or stays vague.
- *Shadow:* analysis paralysis.
- *Practise:* write one measurable 90-day goal; break it into weekly milestones; consult 3 sources before big decisions.

**G. Persuasion and Networking**
- *Strong:* gets support, influences others, uses key contacts.
- *Low:* avoids asking for help, does not think about influence.
- *Shadow:* manipulation, shallow networks.
- *Practise:* ask one new person for advice each week; practise a 30-second pitch; follow up within 48 hours after meeting someone.

**H. Self-Confidence**
- *Strong:* trusts own ability, stays with decisions under pressure.
- *Low:* changes course when challenged, doubts success.
- *Shadow:* ignoring valid criticism.
- *Practise:* keep a "wins" log; take on one slightly uncomfortable task weekly; seek feedback before deciding whether to hold or change position.

## 12. Technical direction

Current stack: **Next.js (App Router) · React · TypeScript · Tailwind · Framer Motion · Chart.js**. Keep it.

Suggested structure:

```
src/
  app/
    page.tsx                  # landing
    test/page.tsx             # stage + questions
    result/[id]/page.tsx      # personalised report
  lib/
    questions.ts              # items + which competency / reverse-keyed
    scoring.ts                # pure functions, unit-tested
    archetypes.ts             # type resolution + names
    blindspots.ts             # rule engine
    stages.ts                 # journey roadmaps per stage
    content/                  # content blocks (JSON/TS/MDX)
  components/
    Wizard.tsx  Octagon.tsx  CompetencyCard.tsx  RoadmapTimeline.tsx  ShareCard.tsx
```

Phases of technical work:
1. **Now:** extract scoring keys into data, add unit tests, single source of truth for questions (retire `index.html` or generate it).
2. **Next:** stage input, archetype resolution, results page, content library v1.
3. **Then:** PDF export, share card, local save (localStorage) → accounts + database for retakes.
4. **Later:** AI-narrated report, mentor/resource directory, cohort dashboards for universities and incubators.

## 13. Repo issues to fix early

- **Verify the scoring key against the original PEC key/PDF.** A few items look inconsistent with their wording and should be checked one by one: Q7 and Q8 are subtracted although they read as positive statements; Q16 ("I do not spend much time thinking about how to influence others") and Q17 ("I change my mind if others disagree strongly") are added; Q14 ("I don't try something new without making sure I will succeed") is added in Risk Taking. They may be intentional, or a keying error. The correction-factor formula (`-Q9 -Q18 -Q27 +Q36 +Q45 +18`) should be confirmed the same way.
- **Category F content:** items 6, 15, 24, 33, 42 read mostly as information-seeking. Confirm the label "Goal setting and systematic planning".
- **Correction factor is computed but never shown** in the UI. Surface it (gently) or use it for the reliability note.
- **Radar shows only letters A–H**; use full competency names.
- **Hard-coded `45`** in Wizard; derive from `questions.length`.
- **Auto-advance** after 300 ms can skip or double-register on fast taps; also unanswered items silently count as 0.
- **Duplicated logic** between `index.html` and the Next.js app.
- **README/package name** are boilerplate (`next-app`).
- **Privacy:** `neda application.pdf` contains a real person's handwritten answers and name. Consider replacing it with an anonymised sample before the repo goes public.

## 14. Roadmap

| Version | Scope |
|---|---|
| **v0.1 (now)** | 45-item test, radar chart, raw scores |
| **v0.2** | Verified scoring, tests, competency names, stage question, band labels |
| **v0.3** | Archetypes (16), results page with strengths/weaknesses, blind-spot rules |
| **v0.4** | Content library v1 for all 8 competencies × 4 stages, zero-to-start roadmap |
| **v0.5** | PDF export, share card, saved results, retake comparison |
| **v1.0** | Public launch, pilot with a university / entrepreneurship club, feedback loop |
| **Later** | AI-narrated reports, resources directory, mentor matching, local-language versions |

## 15. Success measures

- Completion rate of the 45 questions.
- % of users who read the improvement plan and save or download it.
- Retake rate after 30–60 days and change in competency scores.
- Self-reported usefulness ("did this feel like *you*?") after the report.
- Number of users who take a first real step (e.g. complete Phase 1).

## 16. Open questions for the team

1. **Name and brand:** what does "Neda" stand for, and is it staying?
2. **Licensing and attribution:** confirm rights to use the PEC statements and octagon, and how to cite them.
3. **Target market:** which country/region first? This decides local resources, language(s), currency and examples.
4. **Age range for "Student":** school-level or general? Content and tone differ (and minors need extra care around data).
5. **Accounts and data:** anonymous first, or sign-in from the start? What do we store and for how long?
6. **Archetype names and bands:** who validates them, and with what pilot data?
7. **Who writes the content:** educators, founders, or drafted with AI and reviewed?
8. **Business model:** free for individuals, paid for institutions, or sponsored by incubators?

---

*This document is a living draft. Change anything, and start by settling §13 (scoring verification) and §16 (open questions).*
