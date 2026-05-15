'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { exercises, Track, Exercise } from '@/data/exercises';
import { defaultSession } from '@/data/sessionTemplates';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { CoachingFocusCard } from '@/components/CoachingFocusCard';
import { getRandomFocus } from '@/data/coachingFocus';
import { 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  Video, 
  Info, 
  AlertTriangle, 
  Maximize, 
  Users, 
  Layers,
  Volume2
} from 'lucide-react';

function SessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const track = (searchParams.get('track') as Track) || 'organize';
  
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [focus] = useState(() => getRandomFocus(track));

  const toggleComplete = (id: string) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const trackColors: Record<string, string> = {
    build: 'bg-blue-600',
    organize: 'bg-green-600',
    express: 'bg-orange-600',
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Sticky Header */}
      <header className={`sticky top-0 z-40 ${trackColors[track]} text-white px-4 py-3 shadow-md`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ChevronLeft />
          </button>
          <div className="text-center">
            <h1 className="text-xs font-bold uppercase tracking-widest opacity-80">Current Track</h1>
            <p className="text-lg font-black uppercase">{track}</p>
          </div>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-8 mt-4">
        <CoachingFocusCard focus={focus} />

        {defaultSession.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            <div className="flex items-end justify-between px-1">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                  {section.name}
                </h2>
                <p className="text-sm font-bold text-zinc-400 mt-1">{section.timeBlock}</p>
              </div>
            </div>

            <div className="space-y-3">
              {section.movementFamilies.map((family) => {
                const familyExercises = exercises.filter(e => 
                  e.family === family && (e.track === track || e.track === 'all')
                );
                
                return familyExercises.map((exercise) => {
                  const isCompleted = completedExercises.includes(exercise.id);

                  return (
                    <div 
                      key={exercise.id}
                      className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all ${
                        isCompleted ? 'border-green-500 opacity-60' : 'border-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {exercise.family}
                          </span>
                          <h3 className="text-xl font-black text-zinc-900 leading-tight">
                            {exercise.name}
                          </h3>
                        </div>
                        <button 
                          onClick={() => toggleComplete(exercise.id)}
                          className={`p-2 rounded-full transition-colors ${
                            isCompleted ? 'text-green-500' : 'text-zinc-200 hover:text-zinc-300'
                          }`}
                        >
                          <CheckCircle2 className="w-8 h-8 fill-current" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {exercise.sets && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-zinc-400">Sets</p>
                            <p className="font-black text-zinc-900">{exercise.sets}</p>
                          </div>
                        )}
                        {(exercise.reps || exercise.time) && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-zinc-400">
                              {exercise.reps ? 'Reps' : 'Time'}
                            </p>
                            <p className="font-black text-zinc-900">{exercise.reps || exercise.time}</p>
                          </div>
                        )}
                      </div>

                      {exercise.rest && (
                        <div className="mb-4">
                          <p className="text-[10px] font-bold uppercase text-zinc-400">Rest</p>
                          <p className="font-black text-zinc-900 text-sm">{exercise.rest}</p>
                        </div>
                      )}

                      {exercise.coachingCue && (
                        <div className="flex items-start bg-zinc-50 p-3 rounded-xl mb-4">
                          <Info className="w-4 h-4 text-zinc-400 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-zinc-600 italic">
                            "{exercise.coachingCue}"
                          </p>
                        </div>
                      )}

                      <Button 
                        variant="outline" 
                        fullWidth 
                        className="py-3 text-sm"
                        onClick={() => setSelectedExercise(exercise)}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Watch Demo
                      </Button>
                    </div>
                  );
                });
              })}
            </div>
          </section>
        ))}

        <div className="pt-8 pb-12">
          <div className="mb-8 p-4 bg-zinc-100 rounded-xl border border-zinc-200">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Coach Override</h4>
            <p className="text-xs text-zinc-600 font-medium leading-tight italic">
              "A coach may ask you to switch to Build or Organize if your landings, pain, or movement quality suggest Express is not the right choice today."
            </p>
          </div>
          
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => router.push('/')}
            className="py-6 text-xl"
          >
            Finish Session
          </Button>
        </div>
      </main>

      {/* Exercise Demo Modal */}
      <Modal 
        isOpen={!!selectedExercise} 
        onClose={() => setSelectedExercise(null)}
        title={selectedExercise?.name || ''}
      >
        {selectedExercise && (
          <div className="space-y-6">
            <div className="aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-zinc-200">
              <div className="text-center p-4">
                <Play className="w-12 h-12 text-zinc-300 mx-auto mb-2" />
                <p className="text-zinc-400 font-bold uppercase text-xs">Video Demo coming soon</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Practical Setup constraints */}
              <div className="grid grid-cols-2 gap-2">
                {selectedExercise.spaceNeeded && (
                  <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
                    <Maximize className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Space: {selectedExercise.spaceNeeded}</span>
                  </div>
                )}
                {selectedExercise.surface && (
                  <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
                    <Layers className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Surf: {selectedExercise.surface}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
                  <Users className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Partner: {selectedExercise.partnerNeeded ? 'Yes' : 'No'}</span>
                </div>
                {selectedExercise.noiseLevel && (
                  <div className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
                    <Volume2 className="w-3 h-3 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">Noise: {selectedExercise.noiseLevel}</span>
                  </div>
                )}
              </div>

              {selectedExercise.equipmentNeeded && selectedExercise.equipmentNeeded.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Equipment</h4>
                  <p className="text-xs font-bold text-blue-700">{selectedExercise.equipmentNeeded.join(', ')}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-black uppercase text-zinc-400 tracking-widest mb-1">Focus</h4>
                <p className="text-zinc-900 font-medium leading-snug">{selectedExercise.description || 'Focus on clean movement and high intent.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedExercise.easierOption && (
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Easier</h4>
                    <p className="text-sm font-bold text-zinc-700">{selectedExercise.easierOption}</p>
                  </div>
                )}
                {selectedExercise.harderOption && (
                  <div className="p-3 bg-zinc-50 rounded-xl">
                    <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Harder</h4>
                    <p className="text-sm font-bold text-zinc-700">{selectedExercise.harderOption}</p>
                  </div>
                )}
              </div>

              {selectedExercise.bestFor && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">Best For</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedExercise.bestFor.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedExercise.avoidIf && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1 text-red-400">Avoid If</h4>
                  <ul className="list-disc list-inside text-[10px] font-bold text-red-700 uppercase">
                    {selectedExercise.avoidIf.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              )}

              {selectedExercise.safetyNote && (
                <div className="flex items-start p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs font-bold text-red-700 uppercase">
                    Safety: {selectedExercise.safetyNote}
                  </p>
                </div>
              )}
            </div>

            <Button variant="secondary" fullWidth onClick={() => setSelectedExercise(null)}>
              Got it
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function SessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SessionContent />
    </Suspense>
  );
}
