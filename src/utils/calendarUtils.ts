import { ROADMAP_PHASES } from '../data/initialData';
import { StudyTopic } from '../types';

export const DEFAULT_CALENDAR_EMAIL = 'saisyam1441@gmail.com';
export const GITHUB_PROFILE_URL = 'https://github.com/saisyam-1729';
export const GITHUB_REPO_URL = 'https://github.com/saisyam-1729/gate-2027-prep-tracker';

function formatICSDate(dateStr: string, hour: number, minute: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${y}${pad(m)}${pad(d)}T${pad(hour)}${pad(minute)}00`;
}

export function generateGoogleCalendarUrl(params: {
  title: string;
  details: string;
  dateStr: string;
  startHour: number;
  startMinute: number;
  durationMinutes: number;
  recurrenceRule?: string;
  calendarEmail?: string;
}): string {
  const email = (params.calendarEmail || DEFAULT_CALENDAR_EMAIL).trim();
  const start = formatICSDate(params.dateStr, params.startHour, params.startMinute);
  const endTotalMinutes = params.startHour * 60 + params.startMinute + params.durationMinutes;
  const endHour = Math.floor(endTotalMinutes / 60) % 24;
  const endMinute = endTotalMinutes % 60;
  const end = formatICSDate(params.dateStr, endHour, endMinute);

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', params.title);
  url.searchParams.set('dates', `${start}/${end}`);
  url.searchParams.set('details', `${params.details}\n\nSynced Account: ${email}`);
  url.searchParams.set('authuser', email);
  url.searchParams.set('src', email);
  url.searchParams.set('add', email);
  if (params.recurrenceRule) {
    url.searchParams.set('recur', params.recurrenceRule);
  }
  return url.toString();
}

export function generateFullPrepICS(
  topics: StudyTopic[],
  weekdayStartHour = 20, // 8:00 PM IST default
  weekendStartHour = 9,  // 9:00 AM IST default
  calendarEmail = DEFAULT_CALENDAR_EMAIL
): string {
  const email = (calendarEmail || DEFAULT_CALENDAR_EMAIL).trim();
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GATE 2027 Prep Tracker//saisyam-1729//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:GATE 2027 RA & DA Prep Schedule (${email})`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  const nowStamp = '20261027T090000Z';
  const organizerLines = [
    `ORGANIZER;CN=Sai Syam:mailto:${email}`,
    `ATTENDEE;CN=Sai Syam;RSVP=TRUE:mailto:${email}`,
  ];
  const alarmLines = [
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:GATE 2027 Top-AIR Study Block Starting in 15 Minutes!',
    'END:VALARM',
  ];

  // 1. Recurring Weekday Study Slot (Mon-Fri, 2 hours RA/DA + 15 min GA) until Feb 5, 2027
  lines.push(
    'BEGIN:VEVENT',
    'UID:gate2027-weekday-block@saisyam1441.gmail.com',
    `DTSTAMP:${nowStamp}`,
    ...organizerLines,
    `DTSTART:${formatICSDate('2026-10-27', weekdayStartHour, 0)}`,
    `DTEND:${formatICSDate('2026-10-27', weekdayStartHour + 2, 0)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;UNTIL=20270205T235959Z',
    'SUMMARY:🎯 GATE 2027 Weekday Study Block (1h New Material/Problems + 45m Quiz + 15m GA)',
    'DESCRIPTION:Hour 1: Core RA topic lecture & 10-15 problems.\\nHour 2: Topic quiz or mistake-notebook review + 15-min General Aptitude set.\\nTracker: https://saisyam-1729.github.io/gate-2027-prep-tracker/',
    ...alarmLines,
    'END:VEVENT'
  );

  // 2. Recurring Saturday All-RA Deep Dive (5.5 hours) until Jan 31, 2027
  lines.push(
    'BEGIN:VEVENT',
    'UID:gate2027-saturday-ra-block@saisyam1441.gmail.com',
    `DTSTAMP:${nowStamp}`,
    ...organizerLines,
    `DTSTART:${formatICSDate('2026-10-31', weekendStartHour, 0)}`,
    `DTEND:${formatICSDate('2026-10-31', weekendStartHour + 5, 30)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=SA;UNTIL=20270131T235959Z',
    'SUMMARY:⚡ GATE 2027 Saturday Deep-Dive: 100% Robotics & Automation (RA)',
    'DESCRIPTION:Block 1 (90m): NPTEL/Modern Robotics lectures + 15 problems.\\nBlock 2 (90m): Problem solving from GATE EE/IN/ME proxy papers.\\nBlock 3 (60m): Next subtopic or Python hands-on simulation.\\nLast 15m: Rate confidence (1-5) & update tracker.',
    ...alarmLines,
    'END:VEVENT'
  );

  // 3. Recurring Sunday Mixed RA + DA Maintenance + Weekly Quiz (5.5 hours)
  lines.push(
    'BEGIN:VEVENT',
    'UID:gate2027-sunday-mixed-block@saisyam1441.gmail.com',
    `DTSTAMP:${nowStamp}`,
    ...organizerLines,
    `DTSTART:${formatICSDate('2026-11-01', weekendStartHour, 0)}`,
    `DTEND:${formatICSDate('2026-11-01', weekendStartHour + 5, 30)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=SU;UNTIL=20270131T235959Z',
    'SUMMARY:🧠 GATE 2027 Sunday Session: RA Core (3h) + DA Gap/Maintenance (1h) + Weekly Mixed Quiz (45m)',
    'DESCRIPTION:1) Finish RA weekend module with problems (180m)\\n2) Dedicated DA session: DBMS / Warehousing / Classical AI / Timed Revision (60m)\\n3) Mixed Quiz via Tracker or Claude/Gemini Handoff (45m)\\n4) Log weekly hours against 15h target (15m).',
    ...alarmLines,
    'END:VEVENT'
  );

  // 3b. Recurring Low-Footprint Certification Micro-Sprint (Wed & Sun 45m, 1.5h/wk) until Jan 17, 2027 (Paused during Phase 4 GATE Mocks)
  lines.push(
    'BEGIN:VEVENT',
    'UID:gate2027-cert-micro-sprint@saisyam1441.gmail.com',
    `DTSTAMP:${nowStamp}`,
    ...organizerLines,
    `DTSTART:${formatICSDate('2026-10-28', 13, 0)}`,
    `DTEND:${formatICSDate('2026-10-28', 13, 45)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=WE,SU;UNTIL=20270117T235959Z',
    'SUMMARY:☁️ Cert Micro-Sprint (45m): Anthropic Claude CCA-F & Google Cloud PMLE',
    'DESCRIPTION:Low-footprint certification slot (~1.5h/wk total):\\n- Phases 1-2: Anthropic Claude Certified Architect Foundations (D1-D5) + GCP PMLE Sec 1-3 (BigQuery ML & Feature Store).\\n- Phase 3: GCP PMLE Sec 4-6 (Serving, Kubeflow/Vertex Pipelines, Explainable AI).\\n- Pauses automatically on Jan 18, 2027 for Phase 4 GATE 2027 Mock Lock-in!',
    ...alarmLines,
    'END:VEVENT'
  );

  // 4. Phase Milestones
  for (const phase of ROADMAP_PHASES) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:gate2027-phase-${phase.id}-milestone@saisyam1441.gmail.com`,
      `DTSTAMP:${nowStamp}`,
      ...organizerLines,
      `DTSTART;VALUE=DATE:${phase.startDate.replace(/-/g, '')}`,
      `SUMMARY:🏁 Start ${phase.name}`,
      `DESCRIPTION:RA Focus: ${phase.raFocus}\\nDA Focus: ${phase.daFocus}\\nTarget Hours: ${phase.targetHours}h`,
      'END:VEVENT'
    );
  }

  // 5. Spaced Repetition Review Due Events for rated topics
  for (const t of topics) {
    if (t.nextReviewDue) {
      lines.push(
        'BEGIN:VEVENT',
        `UID:gate2027-review-${t.id}@saisyam1441.gmail.com`,
        `DTSTAMP:${nowStamp}`,
        ...organizerLines,
        `DTSTART:${formatICSDate(t.nextReviewDue, weekdayStartHour, 0)}`,
        `DTEND:${formatICSDate(t.nextReviewDue, weekdayStartHour, 45)}`,
        `SUMMARY:🔄 Spaced Review Due: [${t.code}] ${t.title} (Conf: ${t.confidence}/5)`,
        `DESCRIPTION:Spaced repetition resurface (5d low / 10d medium / 21d high confidence).\\nPrimary Resource: ${t.primaryResource}\\nTake a 5-question Claude/Gemini quiz to bump confidence!`,
        ...alarmLines,
        'END:VEVENT'
      );
    }
  }

  // 6. Official IIT Madras GATE 2027 Dates
  const officialDates = [
    { date: '20270104', title: '📍 GATE 2027 City Allotment Notification (IIT Madras GOAPS)' },
    { date: '20270206', title: '🔥 GATE 2027 Exam Weekend 1 — Day 1 (Forenoon & Afternoon)' },
    { date: '20270207', title: '🔥 GATE 2027 Exam Weekend 1 — Day 2 (Target Exam Date)' },
    { date: '20270213', title: '🔥 GATE 2027 Exam Weekend 2 — Day 3' },
    { date: '20270214', title: '🔥 GATE 2027 Exam Weekend 2 — Day 4' },
    { date: '20270220', title: '🔥 GATE 2027 Exam Weekend 3 — Day 5' },
    { date: '20270221', title: '🔥 GATE 2027 Exam Weekend 3 — Day 6' },
    { date: '20270319', title: '🏆 GATE 2027 Official Results Announcement (IIT Madras)' },
  ];

  for (const od of officialDates) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:gate2027-official-${od.date}@saisyam1441.gmail.com`,
      `DTSTAMP:${nowStamp}`,
      ...organizerLines,
      `DTSTART;VALUE=DATE:${od.date}`,
      `SUMMARY:${od.title}`,
      'DESCRIPTION:Official GATE 2027 date from https://gate2027.iitm.ac.in/important_dates (Enrollment ID: M249R74)',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
