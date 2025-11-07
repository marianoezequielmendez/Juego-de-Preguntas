
import React from 'react';
import type { Category } from './types';
import { MessageSquareIcon, BrainCircuitIcon, SmileIcon, TestTubeIcon, FlameIcon } from './components/Icons';

export const CATEGORIES: Category[] = [
  { 
    id: 'generales', 
    name: 'Generales', 
    description: 'Para romper el hielo y conocerse mejor.', 
    icon: <MessageSquareIcon className="w-8 h-8" />,
    color: 'from-sky-500 to-cyan-400'
  },
  { 
    id: 'profundas', 
    name: 'Profundas', 
    description: 'Para reflexiones y conversaciones serias.', 
    icon: <BrainCircuitIcon className="w-8 h-8" />,
    color: 'from-indigo-500 to-purple-500'
  },
  { 
    id: 'divertidas', 
    name: 'Divertidas', 
    description: 'Para reír y pasar un buen rato juntos.', 
    icon: <SmileIcon className="w-8 h-8" />,
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'hipoteticas', 
    name: 'Hipotéticas', 
    description: 'Explora posibilidades y escenarios imaginarios.', 
    icon: <TestTubeIcon className="w-8 h-8" />,
    color: 'from-emerald-500 to-green-500'
  },
  { 
    id: 'picantes', 
    name: 'Picantes', 
    description: 'Preguntas atrevidas para subir la temperatura.', 
    icon: <FlameIcon className="w-8 h-8" />,
    color: 'from-rose-500 to-red-500'
  }
];
