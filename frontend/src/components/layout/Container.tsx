import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode | JSX.Element;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`min-h-screen bg-background text-text mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8 ${className}`}>
      {children}
    </div>
  );
}; 