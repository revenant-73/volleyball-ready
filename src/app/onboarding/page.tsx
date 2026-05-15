'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { ShieldCheck, Zap, Activity, Info } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const handleUnderstand = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/readiness');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <main className="max-w-md mx-auto p-6 flex-1 flex flex-col justify-center space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-2">
            <ShieldCheck className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter leading-none">
            CHOOSE THE RIGHT CHALLENGE
          </h1>
          <p className="text-lg font-medium text-zinc-600 leading-tight">
            Jump Ready gives you three ways to train. Your job is to choose the option that fits your body today, not your ego.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-white space-y-1">
            <h2 className="text-blue-600 font-black uppercase text-sm tracking-widest">Build</h2>
            <p className="text-zinc-600 font-medium text-sm leading-snug">
              Choose Build when you are sore, stiff, newer, lower-energy, or need more control.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-white space-y-1">
            <h2 className="text-green-600 font-black uppercase text-sm tracking-widest">Organize</h2>
            <p className="text-zinc-600 font-medium text-sm leading-snug">
              Choose Organize when you feel okay but need rhythm, balance, coordination, and cleaner movement.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-white space-y-1">
            <h2 className="text-orange-600 font-black uppercase text-sm tracking-widest">Express</h2>
            <p className="text-zinc-600 font-medium text-sm leading-snug">
              Choose Express when you are fresh, pain-free, landing well, and ready for fast, powerful actions.
            </p>
          </div>
        </div>

        <div className="pt-4 pb-6">
          <Button variant="primary" fullWidth onClick={handleUnderstand} className="py-6 text-xl">
            I understand — start readiness check
          </Button>
        </div>

        <div className="bg-zinc-100 p-4 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-zinc-500 font-medium">
            You can access this info anytime from the "About" page or landing screen.
          </p>
        </div>
      </main>
    </div>
  );
}
