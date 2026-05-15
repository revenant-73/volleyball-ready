import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { StartButton } from '@/components/StartButton';
import { PhaseSelector } from '@/components/PhaseSelector';
import { Library, Shield, Info, HelpCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-zinc-900 bg-zinc-900">
            <Image 
              src="/icon.png" 
              alt="Volleyball Ready Icon" 
              fill
              className="object-contain p-1"
              priority
            />
          </div>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-zinc-900 mb-2 leading-[0.9]">
          VOLLEYBALL<br/><span className="text-primary">READY</span>
        </h1>
        <p className="text-zinc-600 font-medium text-sm mt-4">
          Volleyball strength and movement for athletes who jump, land, sprint, and adapt.
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="space-y-4">
          <StartButton />
          <PhaseSelector />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Link href="/onboarding">
            <Button variant="secondary" fullWidth>
              <HelpCircle className="mr-2 w-5 h-5 text-primary" />
              How it Works
            </Button>
          </Link>

          <Link href="/library">
            <Button variant="outline" fullWidth>
              <Library className="mr-2 w-5 h-5 text-zinc-500" />
              Exercise Library
            </Button>
          </Link>
          
          <Link href="/safety">
            <Button variant="outline" fullWidth>
              <Shield className="mr-2 w-5 h-5 text-primary" />
              Safety Rules
            </Button>
          </Link>

          <Link href="/about">
            <Button variant="outline" fullWidth>
              <Info className="mr-2 w-5 h-5 text-zinc-500" />
              About the Program
            </Button>
          </Link>
        </div>
      </div>

      <footer className="mt-16 text-center text-zinc-400 text-xs">
        Built for Century High School & TVVC
      </footer>
    </main>
  );
}
