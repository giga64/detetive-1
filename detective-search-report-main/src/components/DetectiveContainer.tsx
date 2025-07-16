import { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface DetectiveContainerProps {
  children: ReactNode;
}

export function DetectiveContainer({ children }: DetectiveContainerProps) {
  return (
    <div className="min-h-screen bg-background font-detective flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md bg-card border border-detective-border rounded-lg shadow-lg shadow-detective-shadow/20 p-3 sm:p-6 animate-slide-up relative overflow-hidden">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}