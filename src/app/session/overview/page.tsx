'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { ChevronLeft, Clock, Zap, Shield, Activity, RefreshCw } from 'lucide-react';
import { defaultSession } from '@/data/sessionTemplates';
import { Track } from '@/data/exercises';
import { getJumpEstimate } from '@/logic/sessionBuilder';

function OverviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const track = (searchParams.get('track') as Track) || 'organize';
  const jumpEstimate = getJumpEstimate(track);

  const trackDescriptions = {
    build: "Strength, control, range, lower impact. Own the positions.",
    organize: "Coordination, rhythm, balance, and adaptable movement.",
    express: "Fast, crisp, explosive actions with low volume and high intent.",
  };

  const sectionIcons = [
    <Activity key="1" className="w-5 h-5" />,
    <Shield key="2" className="w-5 h-5" />,
    <RefreshCw key="3" className="w-5 h-5" />,
    <Zap key="4" className="w-5 h-5" />,
    <Clock key="5" className="w-5 h-5" />,
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <header className="bg-white border-b border-zinc-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center">
          <button onClick={() => router.back()} className="p-1 -ml-1 text-zinc-900">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-xl font-black uppercase tracking-tight">Session Overview</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 flex-1 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white">
              Selected Track
            </div>
            <h2 className="text-4xl font-black uppercase text-zinc-900 tracking-tighter">
              {track}
            </h2>
          </div>
          <div className="text-right">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 text-orange-600">
              Est. Jumps
            </div>
            <p className="text-2xl font-black text-orange-600 tracking-tighter">{jumpEstimate}</p>
          </div>
        </div>

        <p className="text-zinc-500 font-medium leading-tight">
          {trackDescriptions[track as keyof typeof trackDescriptions]}
        </p>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Workout Structure</h3>
          <div className="space-y-3">
            {defaultSession.sections.map((section, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border-2 border-white shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400">
                  {sectionIcons[idx]}
                </div>
                <div>
                  <h4 className="font-black text-zinc-900 leading-none mb-1">{section.name}</h4>
                  <p className="text-xs font-bold text-zinc-400">{section.timeBlock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 pb-10">
          <Button 
            variant="primary" 
            fullWidth 
            className="py-6 text-xl"
            onClick={() => router.push(`/session?track=${track}`)}
          >
            Begin Session
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function SessionOverviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <OverviewContent />
    </Suspense>
  );
}
