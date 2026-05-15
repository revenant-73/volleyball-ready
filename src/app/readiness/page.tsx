'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Track } from '@/data/exercises';

interface ReadinessAnswers {
  soreness: 'none' | 'mild' | 'moderate' | 'high';
  pain: 'no' | 'yes';
  energy: 'low' | 'okay' | 'high';
  sessionsThisWeek: '0' | '1' | '2+';
  trainedYesterday: 'no' | 'yes';
}

const questions = [
  {
    id: 'soreness',
    text: 'How sore are you today?',
    options: ['none', 'mild', 'moderate', 'high'],
  },
  {
    id: 'pain',
    text: 'Any pain today?',
    options: ['no', 'yes'],
  },
  {
    id: 'energy',
    text: 'Energy level?',
    options: ['low', 'okay', 'high'],
  },
  {
    id: 'sessionsThisWeek',
    text: 'How many Jump Ready sessions have you done this week?',
    options: ['0', '1', '2+'],
  },
  {
    id: 'trainedYesterday',
    text: 'Did you train, play, or compete hard yesterday?',
    options: ['no', 'yes'],
  },
];

export default function ReadinessPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswers>({
    soreness: 'none',
    pain: 'no',
    energy: 'okay',
    sessionsThisWeek: '0',
    trainedYesterday: 'no',
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    const currentQuestionId = questions[step].id;
    setAnswers({ ...answers, [currentQuestionId]: option });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateSuggestedTrack = (): { track: Track; reason: string } => {
    if (answers.pain === 'yes' || answers.soreness === 'high') {
      return { 
        track: 'build', 
        reason: 'Pain or high soreness detected. Focus on strength, control, and recovery today.' 
      };
    }
    
    if (answers.energy === 'low' || answers.sessionsThisWeek === '2+' || answers.trainedYesterday === 'yes') {
      return { 
        track: 'organize', 
        reason: 'You might be carrying some fatigue. Today is better for rhythm, balance, and clean movement.' 
      };
    }

    if (answers.soreness === 'none' || answers.soreness === 'mild') {
      if (answers.energy === 'high' && answers.pain === 'no') {
        return { 
          track: 'express', 
          reason: 'You are fresh and ready for power! Focus on high intent and explosive movement.' 
        };
      }
    }

    return { 
      track: 'organize', 
      reason: 'A solid middle ground. Focus on coordination and movement quality.' 
    };
  };

  if (showResult) {
    const { track, reason } = calculateSuggestedTrack();
    const trackColors: Record<string, string> = {
      build: 'border-blue-500 text-blue-700 bg-blue-50',
      organize: 'border-green-500 text-green-700 bg-green-50',
      express: 'border-orange-500 text-orange-700 bg-orange-50',
    };

    return (
      <main className="flex-1 p-6 max-w-md mx-auto flex flex-col items-center justify-center">
        <div className={`w-full p-8 rounded-2xl border-2 mb-8 ${trackColors[track]}`}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Suggested Track</h2>
          <h3 className="text-4xl font-black uppercase mb-4">{track}</h3>
          <p className="text-lg font-medium leading-tight">{reason}</p>
        </div>

        <div className="w-full space-y-3">
          <Button 
            variant="primary" 
            fullWidth 
            onClick={() => router.push(`/session/overview?track=${track}`)}
            className="py-6 text-xl"
          >
            Use Suggested Track
          </Button>
          
          <div className="pt-4">
            <p className="text-center text-zinc-400 text-sm font-bold mb-3 uppercase">Or override:</p>
            <div className="grid grid-cols-3 gap-2">
              {(['build', 'organize', 'express'] as Track[]).map((t) => (
                <button
                  key={t}
                  onClick={() => router.push(`/session/overview?track=${t}`)}
                  className={`py-3 rounded-lg font-bold border-2 capitalize ${
                    t === track ? 'border-zinc-800 bg-zinc-800 text-white' : 'border-zinc-200 text-zinc-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-zinc-100 rounded-xl border border-zinc-200">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Coach Override</h4>
          <p className="text-xs text-zinc-600 font-medium leading-tight">
            A coach may ask you to switch to Build or Organize if your landings, pain, or movement quality suggest Express is not the right choice today.
          </p>
        </div>
      </main>
    );
  }

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <main className="flex-1 p-6 max-w-md mx-auto flex flex-col">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => step > 0 && setStep(step - 1)}
            className={`p-2 -ml-2 text-zinc-400 ${step === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft />
          </button>
          <span className="text-sm font-bold text-zinc-400">Step {step + 1} of {questions.length}</span>
          <div className="w-6" />
        </div>
        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-black leading-tight mb-8">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-6 text-left text-xl font-bold border-2 border-zinc-100 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all active:scale-95 capitalize"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-start p-4 bg-zinc-50 rounded-xl">
        <AlertCircle className="text-zinc-400 mr-3 flex-shrink-0" />
        <p className="text-sm text-zinc-500">
          Be honest! Your track is suggested to keep you healthy and jumping high all season.
        </p>
      </div>
    </main>
  );
}
