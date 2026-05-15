'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { CoachingFocus } from '@/data/coachingFocus';

interface CoachingFocusCardProps {
  focus: CoachingFocus;
}

export const CoachingFocusCard: React.FC<CoachingFocusCardProps> = ({ focus }) => {
  return (
    <div className="bg-primary/5 border-2 border-primary/10 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
          Today's Coaching Focus
        </span>
      </div>
      <p className="text-2xl font-black text-zinc-900 leading-tight">
        "{focus.text}"
      </p>
    </div>
  );
};
