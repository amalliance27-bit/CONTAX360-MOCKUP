// Planetary Status Utility - Mercury in Retrograde / Direct Calculator

export interface MercuryInfo {
  isRetrograde: boolean;
  statusText: string;
  badgeText: string;
  currentDateStr: string;
}

export function getMercuryRetrogradeStatus(date = new Date()): MercuryInfo {
  // Exact Mercury Retrograde windows (Start, End) with UTC timestamps
  const retroPeriods = [
    { start: new Date('2024-11-25T00:00:00Z'), end: new Date('2024-12-15T23:59:59Z'), sign: 'Sagittarius' },
    { start: new Date('2025-03-15T00:00:00Z'), end: new Date('2025-04-07T23:59:59Z'), sign: 'Aries/Pisces' },
    { start: new Date('2025-07-18T00:00:00Z'), end: new Date('2025-08-11T23:59:59Z'), sign: 'Leo' },
    { start: new Date('2025-11-09T00:00:00Z'), end: new Date('2025-11-29T23:59:59Z'), sign: 'Sagittarius' },
    { start: new Date('2026-02-25T00:00:00Z'), end: new Date('2026-03-20T23:59:59Z'), sign: 'Pisces' },
    { start: new Date('2026-06-29T00:00:00Z'), end: new Date('2026-07-23T23:59:59Z'), sign: 'Cancer' },
    { start: new Date('2026-10-24T00:00:00Z'), end: new Date('2026-11-13T23:59:59Z'), sign: 'Scorpio' },
    { start: new Date('2027-02-08T00:00:00Z'), end: new Date('2027-03-03T23:59:59Z'), sign: 'Aquarius' },
    { start: new Date('2027-06-10T00:00:00Z'), end: new Date('2027-07-04T23:59:59Z'), sign: 'Gemini' },
    { start: new Date('2027-10-07T00:00:00Z'), end: new Date('2027-10-28T23:59:59Z'), sign: 'Libra' },
  ];

  const nowTime = date.getTime();

  // 1. Check if currently inside a retrograde window
  for (const period of retroPeriods) {
    if (nowTime >= period.start.getTime() && nowTime <= period.end.getTime()) {
      const endFormatted = period.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return {
        isRetrograde: true,
        statusText: `Mercury in Retrograde - Until ${endFormatted}`,
        badgeText: `Retrograde until ${endFormatted}`,
        currentDateStr: date.toISOString().split('T')[0]
      };
    }
  }

  // 2. If direct, find the next upcoming retrograde start date
  for (const period of retroPeriods) {
    if (nowTime < period.start.getTime()) {
      const startFormatted = period.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return {
        isRetrograde: false,
        statusText: `Mercury is Direct - Until ${startFormatted}`,
        badgeText: `Direct until ${startFormatted}`,
        currentDateStr: date.toISOString().split('T')[0]
      };
    }
  }

  return {
    isRetrograde: false,
    statusText: 'Mercury is Direct',
    badgeText: 'Direct',
    currentDateStr: date.toISOString().split('T')[0]
  };
}
