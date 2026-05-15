'use client';

import React, { useState, useEffect } from 'react';
import { programPhases } from '@/data/progression';
import { Calendar } from 'lucide-react';

export const PhaseSelector: React.FC = () => {
  const [currentPhaseId, setCurrentPhaseId] = useState<string>('phase-1');

  useEffect(() => {
    const saved = localStorage.getItem('currentProgramPhase');
    if (saved) setCurrentPhaseId(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setCurrentPhaseId(newId);
    localStorage.setItem('currentProgramPhase', newId);
  };

  const currentPhase = programPhases.find(p => p.id === currentPhaseId);

  return (
    <div className="w-full bg-zinc-100 p-4 rounded-2xl border border-zinc-200">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-zinc-400" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Program Phase
        </span>
      </div>
      
      <select 
        value={currentPhaseId}
        onChange={handleChange}
        className="w-full bg-white border-2 border-zinc-200 rounded-xl px-4 py-3 font-bold text-zinc-900 focus:border-orange-500 focus:ring-0 outline-none mb-2"
      >
        {programPhases.map(phase => (
          <option key={phase.id} value={phase.id}>
            Weeks {phase.weeks}: {phase.name}
          </option>
        ))}
      </select>
      
      {currentPhase && (
        <p className="text-[10px] text-zinc-500 font-medium leading-tight px-1">
          Goal: {currentPhase.goal}
        </p>
      )}
    </div>
  );
};
