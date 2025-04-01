import { ReactNode, useState } from 'react';
import { ProgressContext } from './contexts/progress';

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ isLoading, setIsLoading, progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
