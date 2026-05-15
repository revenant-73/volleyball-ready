'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { exercises, Track, Exercise } from '@/data/exercises';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { ChevronLeft, Search, Filter, Play, Info } from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();
  const [filterTrack, setFilterTrack] = useState<Track | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter(ex => {
    const matchesTrack = filterTrack === 'all' || ex.track === filterTrack;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ex.family.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  const families = Array.from(new Set(exercises.map(ex => ex.family)));

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <button onClick={() => router.back()} className="p-1 -ml-1 text-zinc-900">
              <ChevronLeft />
            </button>
            <h1 className="flex-1 text-center text-xl font-black uppercase tracking-tight">Exercise Library</h1>
            <div className="w-8" />
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search exercises or families..."
              className="w-full bg-zinc-100 border-none rounded-2xl py-3 pl-12 pr-4 font-medium focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Track Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'build', 'organize', 'express'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTrack(t as Track | 'all')}
              className={`px-6 py-2 rounded-full font-bold text-sm capitalize whitespace-nowrap border-2 transition-all ${
                filterTrack === t 
                  ? 'bg-zinc-900 border-zinc-900 text-white' 
                  : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Exercise List grouped by Family */}
        <div className="space-y-8">
          {families.map(family => {
            const familyExercises = filteredExercises.filter(ex => ex.family === family);
            if (familyExercises.length === 0) return null;

            return (
              <div key={family} className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 px-1">
                  {family}
                </h2>
                <div className="grid gap-3">
                  {familyExercises.map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex)}
                      className="w-full text-left bg-white p-4 rounded-2xl border-2 border-white shadow-sm flex items-center justify-between hover:border-orange-500 transition-all active:scale-[0.98]"
                    >
                      <div>
                        <h3 className="font-bold text-zinc-900">{ex.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            ex.track === 'build' ? 'bg-blue-100 text-blue-700' :
                            ex.track === 'organize' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {ex.track}
                          </span>
                        </div>
                      </div>
                      <Play className="w-5 h-5 text-zinc-300 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedExercise} 
        onClose={() => setSelectedExercise(null)}
        title={selectedExercise?.name || ''}
      >
        {selectedExercise && (
          <div className="space-y-6">
            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200">
              <Play className="w-12 h-12 text-zinc-300" />
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 p-3 bg-zinc-50 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Track</h4>
                  <p className="text-sm font-bold text-zinc-900 capitalize">{selectedExercise.track}</p>
                </div>
                <div className="flex-1 p-3 bg-zinc-50 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Family</h4>
                  <p className="text-sm font-bold text-zinc-900">{selectedExercise.family}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Description</h4>
                <p className="text-zinc-900 font-medium leading-tight">
                  {selectedExercise.description || 'Watch the video demo for details on form and intent.'}
                </p>
              </div>

              {selectedExercise.coachingCue && (
                <div className="flex items-start bg-orange-50 p-3 rounded-xl">
                  <Info className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-bold text-orange-800 italic">
                    "{selectedExercise.coachingCue}"
                  </p>
                </div>
              )}
            </div>

            <Button variant="secondary" fullWidth onClick={() => setSelectedExercise(null)}>
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
