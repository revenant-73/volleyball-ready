export interface ProgramPhase {
  id: string;
  name: string;
  weeks: string;
  goal: string;
  behavior: string;
}

export const programPhases: ProgramPhase[] = [
  {
    id: 'phase-1',
    name: 'Learn + Control',
    weeks: '1–2',
    goal: 'Learn the tracks, families, and self-selection. Keep volume lower.',
    behavior: 'Lower volume, more conservative recommendations.',
  },
  {
    id: 'phase-2',
    name: 'Build + Coordinate',
    weeks: '3–5',
    goal: 'Increase strength, range, and adaptable movement.',
    behavior: 'Moderate volume, more partner/reactive constraints.',
  },
  {
    id: 'phase-3',
    name: 'Express + Refine',
    weeks: '6–7',
    goal: 'Increase speed and power while keeping quality high.',
    behavior: 'High intent, full recovery, crisp execution.',
  },
  {
    id: 'phase-4',
    name: 'Test + Celebrate',
    weeks: '8',
    goal: 'Calibrate progress and see what adapted.',
    behavior: 'Testing focus, calibration.',
  },
];

export function getPhaseById(id: string): ProgramPhase | undefined {
  return programPhases.find(p => p.id === id);
}
