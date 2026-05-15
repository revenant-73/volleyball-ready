import { Track } from './exercises';

export interface CoachingFocus {
  id: string;
  text: string;
  track?: Track | 'all';
  phase?: string;
  tags?: string[];
}

export const coachingFocuses: CoachingFocus[] = [
  { id: 'focus-1', text: 'Land quiet.', track: 'all' },
  { id: 'focus-2', text: 'Move smoothly before moving fast.', track: 'all' },
  { id: 'focus-3', text: 'Choose the version you can do with quality.', track: 'all' },
  { id: 'focus-4', text: 'Stop chasing tired reps.', track: 'express' },
  { id: 'focus-5', text: 'Find a position you can jump again from.', track: 'all' },
  { id: 'focus-6', text: 'Push the floor away.', track: 'build' },
  { id: 'focus-7', text: 'Be springy, not sloppy.', track: 'express' },
  { id: 'focus-8', text: 'Control first. Speed second.', track: 'all' },
  { id: 'focus-9', text: 'Notice what your body is telling you, then adapt.', track: 'all' },
  { id: 'focus-10', text: 'Train the version of you that showed up today.', track: 'all' },
];

export function getRandomFocus(track: Track): CoachingFocus {
  const filtered = coachingFocuses.filter(f => f.track === 'all' || f.track === track);
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
