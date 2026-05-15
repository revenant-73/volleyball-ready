'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, AlertTriangle, Thermometer, ShieldCheck, Zap } from 'lucide-react';

export default function SafetyPage() {
  const router = useRouter();

  const rules = [
    {
      title: 'Pain Rule',
      icon: <AlertTriangle className="text-red-500" />,
      items: [
        { label: '0–2/10 pain', text: 'Okay, monitor and proceed.' },
        { label: '3–4/10 pain', text: 'Regress or change the exercise.' },
        { label: '5+/10 pain', text: 'Stop that movement immediately.' },
      ],
      bg: 'bg-red-50',
      border: 'border-red-100',
    },
    {
      title: 'Landing Rule',
      icon: <ShieldCheck className="text-blue-500" />,
      items: [
        { label: 'Loud/Unstable', text: 'If landings are loud or collapsing:' },
        { label: 'Action', text: 'Reduce jump height, reduce reps, or switch to Build/Organize.' },
      ],
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      title: 'Soreness Rule',
      icon: <Thermometer className="text-orange-500" />,
      items: [
        { label: 'If Sore', text: 'No max jumping. More isometrics, more range/control, more crawling/mobility.' },
      ],
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
    {
      title: 'Effort Rule',
      icon: <Zap className="text-yellow-500" />,
      items: [
        { label: 'Build', text: '6–8/10 effort' },
        { label: 'Organize', text: '6–7/10 effort' },
        { label: 'Express', text: '9–10/10 intent, low volume' },
      ],
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
    },
    {
      title: 'Jump Volume Caps',
      icon: <Zap className="text-orange-600" />,
      items: [
        { label: 'Build', text: '0–10 total jumps (Emphasis: landing control)' },
        { label: 'Organize', text: '10–25 total jumps (Emphasis: coordination)' },
        { label: 'Express', text: '25–45 max jumps (Emphasis: high intent)' },
        { label: 'The Rule', text: 'If jump height, landing quality, or intent drops, stop the jump set.' },
      ],
      bg: 'bg-orange-50',
      border: 'border-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center">
          <button onClick={() => router.back()} className="p-1 -ml-1 text-zinc-900">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-xl font-black uppercase tracking-tight">Safety Rules</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-8 pb-20">
        <div className="text-center bg-zinc-900 text-white p-6 rounded-2xl shadow-xl mb-10">
          <p className="text-lg font-bold leading-tight italic">
            "Your job is not to survive the workout. Your job is to choose the right challenge."
          </p>
        </div>

        <div className="p-5 bg-zinc-100 rounded-2xl border-2 border-zinc-200 mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Coach Override</h2>
          <p className="text-sm font-bold text-zinc-700 leading-snug">
            A coach may ask you to switch to Build or Organize if your landings, pain level, fatigue, or movement quality suggest Express is not the right choice today.
          </p>
        </div>

        <div className="space-y-6">
          {rules.map((rule, idx) => (
            <div key={idx} className={`${rule.bg} ${rule.border} border-2 rounded-2xl p-6`}>
              <div className="flex items-center gap-3 mb-4">
                {rule.icon}
                <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900">
                  {rule.title}
                </h2>
              </div>
              <div className="space-y-3">
                {rule.items.map((item, iIdx) => (
                  <div key={iIdx}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 opacity-70 mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-bold text-zinc-800 leading-tight">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
