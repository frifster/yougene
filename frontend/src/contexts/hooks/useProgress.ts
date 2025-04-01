import { useContext } from 'react';
import { ProgressContext } from '../ProgressContext';
import { ProgressContextType } from '../types/progress';

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 