'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from './questions';
import type { JourneyStage, StartingStatus } from './types';

export type { Language };

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'si', label: 'සිංහල' },
];

// ponytail: UI chrome only. Archetype, competency, blind-spot and roadmap content stays English in src/lib.
const en = {
  nav: {
    tagline: 'Entrepreneur Profile',
    archetypes: 'Archetypes',
    saved: 'Saved',
    takeTest: 'Take the test',
    retake: 'Retake',
    lightMode: 'Switch to light mode',
    darkMode: 'Switch to dark mode',
  },
  stageLabels: {
    student: 'Student',
    undergraduate: 'Undergraduate',
    graduate: 'Graduate',
    entrepreneur: 'Entrepreneur',
  } as Record<JourneyStage, string>,
  home: {
    title: 'Which kind of entrepreneur are you?',
    intro:
      'Forty-five statements about how you actually behave, about eight minutes. You get one of sixteen archetypes, a score on the eight competencies from the Personal Entrepreneurial Competencies framework, the blind spots that come with your mix, and a plan for the next thirty days.',
    whereAreYou: 'Where are you right now?',
    stageDesc: {
      student: 'School or pre-university.',
      undergraduate: 'At university or college.',
      graduate: 'Early career, weighing a job against a venture.',
      entrepreneur: 'Running or growing something now.',
    } as Record<JourneyStage, string>,
    started: 'Have you started anything?',
    statuses: {
      not_started: 'Nothing yet',
      idea: 'An idea',
      building: 'Building or launched',
      revenue: 'Earning revenue',
    } as Record<StartingStatus, string>,
    start: 'Start the assessment',
    privacy: 'Your answers stay in this browser. Nothing is uploaded.',
    families: 'The four families',
    seeAll: 'See all sixteen archetypes',
  },
  wizard: {
    ratings: [
      { value: 5, label: 'Always', sub: 'This is my default' },
      { value: 4, label: 'Mostly', sub: 'True most of the time' },
      { value: 3, label: 'Sometimes', sub: 'Depends on the situation' },
      { value: 2, label: 'Rarely', sub: 'Only now and then' },
      { value: 1, label: 'Never', sub: 'Not me at all' },
    ],
    of: (cur: number, total: number) => `${cur} of ${total}`,
    keyHint: 'Press 1 to 5 to choose, Enter or → for next',
    overview: 'All statements',
    overviewNote: 'Pick any statement to go back to it.',
    back: 'Back',
    seeProfile: 'See my profile',
    previous: 'Previous',
    next: 'Next',
    leave: 'Leave',
  },
  report: {
    shine: 'Where you shine',
    slip: 'Where you slip',
    share: 'Share',
    print: 'Print',
    copy: 'Copy',
    copied: 'Copied',
    dimensions: 'The four dimensions',
    dimensionsSub: 'Each one is a lean between two ways of working. The percentages show how far you lean.',
    closeToEven: '(close to even)',
    octagon: 'Your competency octagon',
    octagonSub: 'Eight competencies, each scored from 5 to 25. The wider the shape, the more rounded the profile.',
    chartYou: 'You',
    chartTypical: 'Typical score (15)',
    chartToggle: 'Show the typical score of 15 for comparison',
    detail: 'Each competency in detail',
    filterAll: 'All eight',
    filterStrengths: 'Strengths',
    filterGrowth: 'Growth areas',
    of25: (n: number) => `${n} of 25`,
    topStrength: 'One of your three strongest.',
    topGrowth: 'One of your three biggest growth areas.',
    watchOut: 'Watch out for',
    tryThis: 'Try this',
    blindSpots: 'Blind spots',
    blindSpotsSub:
      'When one competency runs high and the one that usually keeps it in check runs low, a predictable kind of trouble follows. These are yours.',
    risk: 'The risk',
    helps: 'What helps',
    thirtyDays: 'The next thirty days',
    thirtyDaysSub: (name: string) =>
      `One competency at a time. Yours is ${name}. The aim is to move that score up by three to five points.`,
    habits: 'Three habits',
    challenge: 'One challenge to finish',
    roadmap: 'From zero to launch',
    roadmapSub: (n: number) => `The usual order of things. Based on where you said you are, you are at phase ${n}.`,
    youAreHere: '(you are here)',
    phaseLooks: 'What this phase looks like',
    doneWhen: 'You are done when',
    leansOn: (codes: string) => `Leans on ${codes}.`,
    cofounder: 'Who to build with',
    cofounderSub: 'A good partner is strong exactly where you are not. Look for someone who enjoys the work you put off.',
    pairWell: 'Archetypes that pair well',
    readAbout: 'Read about them',
    trust: 'How much to trust this',
    trustLine: (level: string, raw: number, deduction: number) =>
      `Reliability: ${level}. Your self-flattery check scored ${raw}, so ${deduction} points were taken off each competency.`,
    disclaimer:
      'This is a self-reflection tool, not a psychological test, and it does not predict whether a business will succeed.',
    tell: 'Tell someone',
    tellSub: 'A short line you can post or send, in case a friend or a co-founder should take this too.',
    statusText: (name: string, code: string, strength: string, url: string) =>
      `I took the NEDA entrepreneur assessment and came out as ${name} (${code}). My strongest competency is ${strength}. Find yours: ${url}`,
    summaryDimensions: 'Dimensions',
    summaryStrengths: 'Strongest competencies',
    summaryGrowth: 'Main growth area',
    summaryChallenge: '30-day challenge',
  },
  explorer: {
    back: 'Back',
    title: 'The sixteen archetypes',
    intro:
      'Four dimensions, two poles each, sixteen combinations. Each one has its own strengths, its own ways of getting into trouble, and a kind of co-founder it works well with.',
    findYours: 'Find yours',
    all: 'All',
    shine: 'Where they shine',
    slip: 'Where they slip',
    worksWith: 'Works well with',
  },
  saved: {
    title: 'Saved reports',
    sub: 'Retake the test later and compare.',
    empty: 'No reports yet. Finish the assessment and it will show up here.',
    openNow: '(open now)',
    delete: 'Delete',
    confirm: 'Delete this report? This cannot be undone.',
  },
  footer: {
    text: 'NEDA Entrepreneur Profile, built on the Personal Entrepreneurial Competencies framework.',
    link: 'The sixteen archetypes',
  },
};

export type Strings = typeof en;

const ta: Strings = {
  nav: {
    tagline: 'தொழில்முனைவோர் சுயவிவரம்',
    archetypes: 'ஆளுமை வகைகள்',
    saved: 'சேமித்தவை',
    takeTest: 'சோதனையை எடுங்கள்',
    retake: 'மீண்டும் எடுங்கள்',
    lightMode: 'ஒளி பயன்முறைக்கு மாறு',
    darkMode: 'இருண்ட பயன்முறைக்கு மாறு',
  },
  stageLabels: {
    student: 'மாணவர்',
    undergraduate: 'இளங்கலை மாணவர்',
    graduate: 'பட்டதாரி',
    entrepreneur: 'தொழில்முனைவோர்',
  },
  home: {
    title: 'நீங்கள் எந்த வகையான தொழில்முனைவோர்?',
    intro:
      'நீங்கள் உண்மையில் எப்படி நடந்துகொள்கிறீர்கள் என்பது பற்றிய 45 கூற்றுகள், சுமார் எட்டு நிமிடங்கள். பதினாறு ஆளுமை வகைகளில் ஒன்று, தனிப்பட்ட தொழில்முனைவோர் திறன்கள் (PEC) கட்டமைப்பின் எட்டு திறன்களுக்கான மதிப்பெண், உங்கள் கலவையுடன் வரும் குருட்டுப் புள்ளிகள், மற்றும் அடுத்த முப்பது நாட்களுக்கான ஒரு திட்டம் ஆகியவற்றை நீங்கள் பெறுவீர்கள்.',
    whereAreYou: 'நீங்கள் இப்போது எங்கே இருக்கிறீர்கள்?',
    stageDesc: {
      student: 'பள்ளி அல்லது பல்கலைக்கழகத்திற்கு முன்.',
      undergraduate: 'பல்கலைக்கழகம் அல்லது கல்லூரியில்.',
      graduate: 'தொழில் ஆரம்பம்; வேலை அல்லது சொந்த தொழில் என்ற முடிவில்.',
      entrepreneur: 'இப்போது ஒரு தொழிலை நடத்துகிறீர்கள் அல்லது வளர்க்கிறீர்கள்.',
    },
    started: 'ஏதாவது தொடங்கியிருக்கிறீர்களா?',
    statuses: {
      not_started: 'இன்னும் இல்லை',
      idea: 'ஒரு யோசனை',
      building: 'உருவாக்குகிறேன் அல்லது தொடங்கிவிட்டேன்',
      revenue: 'வருமானம் ஈட்டுகிறேன்',
    },
    start: 'மதிப்பீட்டைத் தொடங்கு',
    privacy: 'உங்கள் பதில்கள் இந்த உலாவியிலேயே இருக்கும். எதுவும் பதிவேற்றப்படாது.',
    families: 'நான்கு குடும்பங்கள்',
    seeAll: 'பதினாறு ஆளுமை வகைகளையும் பார்க்க',
  },
  wizard: {
    ratings: [
      { value: 5, label: 'எப்போதும்', sub: 'இதுவே என் இயல்பு' },
      { value: 4, label: 'பெரும்பாலும்', sub: 'பெரும்பாலான நேரங்களில் உண்மை' },
      { value: 3, label: 'சில நேரங்களில்', sub: 'சூழலைப் பொறுத்தது' },
      { value: 2, label: 'அரிதாக', sub: 'எப்போதாவது மட்டும்' },
      { value: 1, label: 'ஒருபோதும் இல்லை', sub: 'இது நான் இல்லை' },
    ],
    of: (cur, total) => `${cur} / ${total}`,
    keyHint: 'தேர்வு செய்ய 1 முதல் 5 வரை, அடுத்ததற்கு Enter அல்லது →',
    overview: 'அனைத்து கூற்றுகளும்',
    overviewNote: 'எந்த கூற்றுக்கும் திரும்பிச் செல்ல அதைத் தேர்ந்தெடுக்கவும்.',
    back: 'திரும்பு',
    seeProfile: 'என் சுயவிவரத்தைப் பார்',
    previous: 'முந்தைய',
    next: 'அடுத்து',
    leave: 'வெளியேறு',
  },
  report: {
    shine: 'நீங்கள் சிறந்து விளங்கும் இடம்',
    slip: 'நீங்கள் தடுமாறும் இடம்',
    share: 'பகிர்',
    print: 'அச்சிடு',
    copy: 'நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது',
    dimensions: 'நான்கு பரிமாணங்கள்',
    dimensionsSub: 'ஒவ்வொன்றும் இரண்டு வேலை முறைகளுக்கு இடையிலான சாய்வு. சதவீதங்கள் நீங்கள் எவ்வளவு சாய்கிறீர்கள் என்பதைக் காட்டுகின்றன.',
    closeToEven: '(கிட்டத்தட்ட சமம்)',
    octagon: 'உங்கள் திறன் எண்கோணம்',
    octagonSub: 'எட்டு திறன்கள், ஒவ்வொன்றும் 5 முதல் 25 வரை மதிப்பிடப்படுகிறது. வடிவம் எவ்வளவு அகலமாக இருக்கிறதோ, அவ்வளவு சமநிலையான சுயவிவரம்.',
    chartYou: 'நீங்கள்',
    chartTypical: 'வழக்கமான மதிப்பெண் (15)',
    chartToggle: 'ஒப்பிட வழக்கமான மதிப்பெண் 15 ஐக் காட்டு',
    detail: 'ஒவ்வொரு திறனும் விரிவாக',
    filterAll: 'எட்டும்',
    filterStrengths: 'பலங்கள்',
    filterGrowth: 'வளர்ச்சிப் பகுதிகள்',
    of25: (n) => `${n} / 25`,
    topStrength: 'உங்கள் மூன்று பெரிய பலங்களில் ஒன்று.',
    topGrowth: 'உங்கள் மூன்று பெரிய வளர்ச்சிப் பகுதிகளில் ஒன்று.',
    watchOut: 'கவனிக்க வேண்டியது',
    tryThis: 'இதை முயற்சிக்கவும்',
    blindSpots: 'குருட்டுப் புள்ளிகள்',
    blindSpotsSub:
      'ஒரு திறன் அதிகமாகவும், அதைக் கட்டுப்படுத்தும் திறன் குறைவாகவும் இருக்கும்போது, எதிர்பார்க்கக்கூடிய ஒரு சிக்கல் வருகிறது. இவை உங்களுடையவை.',
    risk: 'ஆபத்து',
    helps: 'உதவுவது',
    thirtyDays: 'அடுத்த முப்பது நாட்கள்',
    thirtyDaysSub: (name) =>
      `ஒரு நேரத்தில் ஒரு திறன். உங்களுடையது ${name}. அந்த மதிப்பெண்ணை மூன்று முதல் ஐந்து புள்ளிகள் உயர்த்துவதே இலக்கு.`,
    habits: 'மூன்று பழக்கங்கள்',
    challenge: 'முடிக்க வேண்டிய ஒரு சவால்',
    roadmap: 'பூஜ்யத்திலிருந்து தொடக்கம் வரை',
    roadmapSub: (n) => `வழக்கமான வரிசை. நீங்கள் சொன்னதன்படி, நீங்கள் கட்டம் ${n} இல் இருக்கிறீர்கள்.`,
    youAreHere: '(நீங்கள் இங்கே இருக்கிறீர்கள்)',
    phaseLooks: 'இந்த கட்டம் எப்படி இருக்கும்',
    doneWhen: 'இது முடிந்ததாகக் கருதப்படுவது',
    leansOn: (codes) => `${codes} திறன்களைச் சார்ந்தது.`,
    cofounder: 'யாருடன் உருவாக்குவது',
    cofounderSub: 'நல்ல பங்குதாரர் நீங்கள் பலவீனமாக இருக்கும் இடத்தில் வலுவாக இருப்பார். நீங்கள் தள்ளிப்போடும் வேலையை ரசிக்கும் ஒருவரைத் தேடுங்கள்.',
    pairWell: 'நன்றாகப் பொருந்தும் ஆளுமை வகைகள்',
    readAbout: 'அவற்றைப் பற்றி படிக்க',
    trust: 'இதை எவ்வளவு நம்பலாம்',
    trustLine: (level, raw, deduction) =>
      `நம்பகத்தன்மை: ${level}. உங்கள் சுய-புகழ்ச்சி சோதனை ${raw} மதிப்பெண் பெற்றது, எனவே ஒவ்வொரு திறனிலிருந்தும் ${deduction} புள்ளிகள் கழிக்கப்பட்டன.`,
    disclaimer:
      'இது ஒரு சுய-பிரதிபலிப்பு கருவி, உளவியல் சோதனை அல்ல; ஒரு தொழில் வெற்றி பெறுமா என்பதை இது கணிக்காது.',
    tell: 'யாரிடமாவது சொல்லுங்கள்',
    tellSub: 'ஒரு நண்பர் அல்லது இணை நிறுவனர் இதை எடுக்க வேண்டுமானால், நீங்கள் பதிவிடவோ அனுப்பவோ கூடிய ஒரு சிறிய வரி.',
    statusText: (name, code, strength, url) =>
      `நான் NEDA தொழில்முனைவோர் மதிப்பீட்டை எடுத்தேன், நான் ${name} (${code}). என் மிகப்பெரிய பலம் ${strength}. உங்களுடையதைக் கண்டறியுங்கள்: ${url}`,
    summaryDimensions: 'பரிமாணங்கள்',
    summaryStrengths: 'மிகப்பெரிய பலங்கள்',
    summaryGrowth: 'முக்கிய வளர்ச்சிப் பகுதி',
    summaryChallenge: '30 நாள் சவால்',
  },
  explorer: {
    back: 'திரும்பு',
    title: 'பதினாறு ஆளுமை வகைகள்',
    intro:
      'நான்கு பரிமாணங்கள், ஒவ்வொன்றிலும் இரண்டு துருவங்கள், பதினாறு சேர்க்கைகள். ஒவ்வொன்றுக்கும் அதன் சொந்த பலங்கள், சிக்கலில் சிக்கும் வழிகள், மற்றும் நன்றாக இணைந்து செயல்படும் ஒரு வகை இணை நிறுவனர் உள்ளனர்.',
    findYours: 'உங்களுடையதைக் கண்டறியுங்கள்',
    all: 'அனைத்தும்',
    shine: 'அவர்கள் சிறந்து விளங்கும் இடம்',
    slip: 'அவர்கள் தடுமாறும் இடம்',
    worksWith: 'நன்றாக இணைந்து செயல்படுபவர்',
  },
  saved: {
    title: 'சேமித்த அறிக்கைகள்',
    sub: 'பின்னர் மீண்டும் சோதனையை எடுத்து ஒப்பிடுங்கள்.',
    empty: 'இன்னும் அறிக்கைகள் இல்லை. மதிப்பீட்டை முடியுங்கள், அது இங்கே தோன்றும்.',
    openNow: '(இப்போது திறந்துள்ளது)',
    delete: 'நீக்கு',
    confirm: 'இந்த அறிக்கையை நீக்கவா? இதை மீட்டெடுக்க முடியாது.',
  },
  footer: {
    text: 'NEDA தொழில்முனைவோர் சுயவிவரம், தனிப்பட்ட தொழில்முனைவோர் திறன்கள் கட்டமைப்பின் அடிப்படையில் உருவாக்கப்பட்டது.',
    link: 'பதினாறு ஆளுமை வகைகள்',
  },
};

const si: Strings = {
  nav: {
    tagline: 'ව්‍යවසායක පැතිකඩ',
    archetypes: 'පෞරුෂ වර්ග',
    saved: 'සුරැකි',
    takeTest: 'පරීක්ෂණය කරන්න',
    retake: 'නැවත කරන්න',
    lightMode: 'ආලෝක මාදිලියට මාරු වන්න',
    darkMode: 'අඳුරු මාදිලියට මාරු වන්න',
  },
  stageLabels: {
    student: 'ශිෂ්‍යයා',
    undergraduate: 'උපාධි අපේක්ෂක',
    graduate: 'උපාධිධාරී',
    entrepreneur: 'ව්‍යවසායක',
  },
  home: {
    title: 'ඔබ කුමන ආකාරයේ ව්‍යවසායකයෙක්ද?',
    intro:
      'ඔබ සැබවින්ම හැසිරෙන ආකාරය ගැන ප්‍රකාශ 45 ක්, විනාඩි අටක් පමණ. පෞරුෂ වර්ග දහසයෙන් එකක්, පුද්ගලික ව්‍යවසායක නිපුණතා (PEC) රාමුවේ නිපුණතා අටට ලකුණු, ඔබේ මිශ්‍රණයට අදාළ අන්ධ ලක්ෂ්‍ය, සහ ඉදිරි දින තිහ සඳහා සැලැස්මක් ඔබට ලැබේ.',
    whereAreYou: 'ඔබ දැන් සිටින්නේ කොතැනද?',
    stageDesc: {
      student: 'පාසල හෝ විශ්වවිද්‍යාලයට පෙර.',
      undergraduate: 'විශ්වවිද්‍යාලයේ හෝ විද්‍යාලයේ.',
      graduate: 'වෘත්තියේ මුල් අවධිය; රැකියාවක් හෝ ව්‍යාපාරයක් අතර තීරණයක.',
      entrepreneur: 'දැනටමත් යමක් පවත්වාගෙන යයි හෝ වර්ධනය කරයි.',
    },
    started: 'ඔබ යමක් ආරම්භ කර තිබේද?',
    statuses: {
      not_started: 'තවම නැත',
      idea: 'අදහසක් ඇත',
      building: 'ගොඩනඟමින් හෝ ආරම්භ කර ඇත',
      revenue: 'ආදායම් උපයමින්',
    },
    start: 'තක්සේරුව අරඹන්න',
    privacy: 'ඔබේ පිළිතුරු මෙම බ්‍රව්සරයේම රැඳේ. කිසිවක් උඩුගත නොවේ.',
    families: 'පවුල් හතර',
    seeAll: 'පෞරුෂ වර්ග දහසයම බලන්න',
  },
  wizard: {
    ratings: [
      { value: 5, label: 'සෑම විටම', sub: 'මෙය මගේ ස්වභාවයයි' },
      { value: 4, label: 'බොහෝ විට', sub: 'බොහෝ අවස්ථාවල සත්‍යයි' },
      { value: 3, label: 'සමහර විට', sub: 'තත්ත්වය අනුව' },
      { value: 2, label: 'කලාතුරකින්', sub: 'ඉඳහිට පමණි' },
      { value: 1, label: 'කිසිවිටෙක නැත', sub: 'මම එහෙම නොවේ' },
    ],
    of: (cur, total) => `${cur} / ${total}`,
    keyHint: 'තේරීමට 1 සිට 5 දක්වා, ඊළඟට Enter හෝ →',
    overview: 'සියලු ප්‍රකාශ',
    overviewNote: 'ඕනෑම ප්‍රකාශයකට ආපසු යාමට එය තෝරන්න.',
    back: 'ආපසු',
    seeProfile: 'මගේ පැතිකඩ බලන්න',
    previous: 'පෙර',
    next: 'ඊළඟ',
    leave: 'පිටවන්න',
  },
  report: {
    shine: 'ඔබ දිලිසෙන තැන',
    slip: 'ඔබ ලිස්සන තැන',
    share: 'බෙදාගන්න',
    print: 'මුද්‍රණය',
    copy: 'පිටපත් කරන්න',
    copied: 'පිටපත් විය',
    dimensions: 'මාන හතර',
    dimensionsSub: 'එක් එක් මානය වැඩ කරන ක්‍රම දෙකක් අතර නැඹුරුවකි. ප්‍රතිශත මගින් ඔබ කොතරම් නැඹුරුද යන්න පෙන්වයි.',
    closeToEven: '(සමාන පාහේ)',
    octagon: 'ඔබේ නිපුණතා අෂ්ටාස්‍රය',
    octagonSub: 'නිපුණතා අටක්, එක් එක් 5 සිට 25 දක්වා ලකුණු. හැඩය පුළුල් වන තරමට පැතිකඩ සමබරය.',
    chartYou: 'ඔබ',
    chartTypical: 'සාමාන්‍ය ලකුණු (15)',
    chartToggle: 'සංසන්දනයට සාමාන්‍ය ලකුණු 15 පෙන්වන්න',
    detail: 'එක් එක් නිපුණතාව විස්තරාත්මකව',
    filterAll: 'අටම',
    filterStrengths: 'ශක්තීන්',
    filterGrowth: 'වර්ධන ක්ෂේත්‍ර',
    of25: (n) => `${n} / 25`,
    topStrength: 'ඔබේ ප්‍රබලතම තුනෙන් එකකි.',
    topGrowth: 'ඔබේ විශාලතම වර්ධන ක්ෂේත්‍ර තුනෙන් එකකි.',
    watchOut: 'අවධානයට',
    tryThis: 'මෙය උත්සාහ කරන්න',
    blindSpots: 'අන්ධ ලක්ෂ්‍ය',
    blindSpotsSub:
      'එක් නිපුණතාවක් ඉහළ වී එය පාලනය කරන නිපුණතාව පහළ වූ විට, අපේක්ෂා කළ හැකි ගැටලුවක් ඇතිවේ. මේවා ඔබේ ඒවාය.',
    risk: 'අවදානම',
    helps: 'උපකාරී වන්නේ',
    thirtyDays: 'ඉදිරි දින තිහ',
    thirtyDaysSub: (name) => `වරකට එක් නිපුණතාවක්. ඔබේ එක ${name}. එම ලකුණු තුනකින් පහකින් ඉහළ නැංවීම ඉලක්කයයි.`,
    habits: 'පුරුදු තුනක්',
    challenge: 'අවසන් කළ යුතු එක් අභියෝගයක්',
    roadmap: 'ශුන්‍යයේ සිට දියත් කිරීම දක්වා',
    roadmapSub: (n) => `සාමාන්‍ය අනුපිළිවෙල. ඔබ පැවසූ පරිදි, ඔබ සිටින්නේ ${n} වන අදියරේය.`,
    youAreHere: '(ඔබ මෙතැනය)',
    phaseLooks: 'මෙම අදියර පෙනෙන ආකාරය',
    doneWhen: 'අවසන් යැයි සලකන්නේ',
    leansOn: (codes) => `${codes} නිපුණතා මත රඳා පවතී.`,
    cofounder: 'කා සමඟ ගොඩනඟන්නද',
    cofounderSub: 'හොඳ සහකරුවෙක් ඔබ දුර්වල තැන ශක්තිමත්ය. ඔබ කල් දමන වැඩ රස විඳින කෙනෙකු සොයන්න.',
    pairWell: 'හොඳින් ගැළපෙන පෞරුෂ වර්ග',
    readAbout: 'ඒවා ගැන කියවන්න',
    trust: 'මෙය කොතරම් විශ්වාස කළ යුතුද',
    trustLine: (level, raw, deduction) =>
      `විශ්වසනීයත්වය: ${level}. ඔබේ ස්වයං-ප්‍රශංසා පරීක්ෂාවට ලකුණු ${raw} ක් ලැබුණි, එබැවින් එක් එක් නිපුණතාවෙන් ලකුණු ${deduction} ක් අඩු කරන ලදී.`,
    disclaimer:
      'මෙය ස්වයං-පරාවර්තන මෙවලමකි, මනෝවිද්‍යාත්මක පරීක්ෂණයක් නොවේ; ව්‍යාපාරයක් සාර්ථක වේද යන්න මෙය පුරෝකථනය නොකරයි.',
    tell: 'කෙනෙකුට කියන්න',
    tellSub: 'මිතුරෙකු හෝ සම-නිර්මාතෘවරයෙකු මෙය කළ යුතු නම්, ඔබට පළ කිරීමට හෝ යැවීමට හැකි කෙටි පේළියක්.',
    statusText: (name, code, strength, url) =>
      `මම NEDA ව්‍යවසායක තක්සේරුව කළා, මම ${name} (${code}). මගේ ප්‍රබලතම නිපුණතාව ${strength}. ඔබේ එක සොයන්න: ${url}`,
    summaryDimensions: 'මාන',
    summaryStrengths: 'ප්‍රබලතම නිපුණතා',
    summaryGrowth: 'ප්‍රධාන වර්ධන ක්ෂේත්‍රය',
    summaryChallenge: 'දින 30 අභියෝගය',
  },
  explorer: {
    back: 'ආපසු',
    title: 'පෞරුෂ වර්ග දහසය',
    intro:
      'මාන හතරක්, එක් එක් මානයට ධ්‍රැව දෙකක්, සංයෝජන දහසයක්. එක් එක් වර්ගයට තමන්ගේම ශක්තීන්, කරදරයට පත්වන ක්‍රම, සහ හොඳින් වැඩ කරන සම-නිර්මාතෘ වර්ගයක් ඇත.',
    findYours: 'ඔබේ එක සොයන්න',
    all: 'සියල්ල',
    shine: 'ඔවුන් දිලිසෙන තැන',
    slip: 'ඔවුන් ලිස්සන තැන',
    worksWith: 'හොඳින් වැඩ කරන්නේ',
  },
  saved: {
    title: 'සුරැකි වාර්තා',
    sub: 'පසුව නැවත පරීක්ෂණය කර සංසන්දනය කරන්න.',
    empty: 'තවම වාර්තා නැත. තක්සේරුව අවසන් කළ විට එය මෙහි පෙන්වයි.',
    openNow: '(දැන් විවෘතයි)',
    delete: 'මකන්න',
    confirm: 'මෙම වාර්තාව මකන්නද? මෙය අහෝසි කළ නොහැක.',
  },
  footer: {
    text: 'NEDA ව්‍යවසායක පැතිකඩ, පුද්ගලික ව්‍යවසායක නිපුණතා රාමුව මත ගොඩනඟා ඇත.',
    link: 'පෞරුෂ වර්ග දහසය',
  },
};

const STRINGS: Record<Language, Strings> = { en, ta, si };

interface LangContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Strings;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('neda_lang');
      if (stored === 'en' || stored === 'ta' || stored === 'si') setLangState(stored);
    } catch {
      // storage blocked; stay on English
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('neda_lang', l);
    } catch {
      // storage blocked; the choice lasts for this page only
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
