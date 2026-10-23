'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme_mode');
    if (saved === 'light') {
      setIsLight(true);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsLight(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      setIsLight(false);
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      setIsLight(true);
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme_mode', 'light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to LeftClick Dark mode' : 'Switch to LeftClick Light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 cursor-pointer ${
        isLight
          ? 'bg-white text-black border border-black/10 shadow-[0_2px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:scale-105'
          : 'bg-[#111113] text-[#f0f0f2] border border-white/15 shadow-[0_2px_14px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.7)] hover:border-white/30 hover:scale-105'
      }`}
    >
      {isLight ? (
        <Moon className="w-[18px] h-[18px] stroke-[1.75]" />
      ) : (
        <Sun className="w-[18px] h-[18px] stroke-[1.75]" />
      )}
    </button>
  );
}
