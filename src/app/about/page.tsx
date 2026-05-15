'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star } from 'lucide-react';
import { Button } from '@/components/Button';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center">
          <button onClick={() => router.back()} className="p-1 -ml-1 text-zinc-900">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-xl font-black uppercase tracking-tight">About</h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-10 pb-20">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            The Program
          </div>
          <h2 className="text-4xl font-black text-zinc-900 leading-[0.9] tracking-tighter">
            BUILD THE FRAME. <br/>
            ORGANIZE THE SYSTEM. <br/>
            EXPRESS POWER.
          </h2>
          <p className="text-lg font-medium text-zinc-600 leading-tight">
            Jump Ready helps volleyball athletes become more durable, explosive, coordinated, and adaptable for the actual demands of the game.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-white">
            <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">The Goal</h3>
            <p className="text-zinc-600 font-medium">
              The goal is not perfect technique or grinding through soreness. The goal is to build a body that can absorb, hold, and express force quickly and repeat it over a long match.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-white">
            <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-2">No Login Required</h3>
            <p className="text-zinc-600 font-medium">
              This app is designed for autonomy. Scan the QR code, check your readiness, and get to work. No accounts, no tracking, just training.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Button variant="primary" fullWidth onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>

        <footer className="text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
            Century High School & TVVC
          </p>
          <p className="text-[10px] text-zinc-300">
            Jump Ready v1.0.0
          </p>
        </footer>
      </main>
    </div>
  );
}
