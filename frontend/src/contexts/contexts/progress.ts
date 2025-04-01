import { createContext } from 'react';
import { ProgressContextType } from '../types/progress';

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);
