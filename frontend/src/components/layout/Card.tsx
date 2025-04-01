import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({ children, className = '', padding = 'md' }: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 hover:bg-white/20 transition-all duration-300 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}; 