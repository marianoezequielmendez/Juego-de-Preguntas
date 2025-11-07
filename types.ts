
// Fix: Import ReactElement to resolve 'Cannot find namespace 'JSX'' error.
import type { ReactElement } from 'react';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
  color: string;
}

export type QuestionCache = {
  [key: string]: string[];
};
