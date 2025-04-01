import { useEffect, useState } from 'react';
import { useProgress } from '../../contexts/hooks/useProgress';

export const GlobalProgressBar = () => {
  const { isLoading } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setDisplayProgress((prev: number) => Math.min(prev + 10, 90));
    } else {
      setDisplayProgress(100);
      const timer = setTimeout(() => setDisplayProgress(0), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && displayProgress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="h-1 bg-primary transition-all duration-300 ease-out"
        style={{ width: `${displayProgress}%` }}
      />
    </div>
  );
};
