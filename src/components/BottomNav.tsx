'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Library, Shield, Info } from 'lucide-react';

export const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Library', icon: Library, href: '/library' },
    { label: 'Safety', icon: Shield, href: '/safety' },
    { label: 'About', icon: Info, href: '/about' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-100 pb-safe shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-primary' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
