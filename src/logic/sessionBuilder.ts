import { Track } from '@/data/exercises';

export const JUMP_VOLUME_CAPS = {
  build: '0–10',
  organize: '10–25',
  express: '25–45',
  all: 'N/A'
};

export function getJumpEstimate(track: Track): string {
  return JUMP_VOLUME_CAPS[track];
}
