'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { Play } from 'lucide-react';

export const StartButton: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      router.push('/readiness');
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <Button variant="primary" fullWidth className="text-xl py-6" onClick={handleStart}>
      <Play className="mr-2 fill-current" />
      Start Today's Session
    </Button>
  );
};
