import { useEffect, useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';

export const GlobalProgressBar = () => {
  const { isLoading } = useProgress();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 2;
        });
      }, 200);
    } else {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}; 