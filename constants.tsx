import React from 'react';
import type { Category } from './types';
import { 
    MessageSquareIcon, 
    BrainCircuitIcon, 
    SmileIcon, 
    TestTubeIcon, 
    FlameIcon,
    LightbulbIcon,
    GlobeIcon,
    BriefcaseIcon,
    BookOpenIcon,
    UsersIcon
} from './components/Icons';

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
  },
  { 
    id: 'filosoficas', 
    name: 'Filosóficas', 
    description: 'Cuestiona la existencia y la mente humana.', 
    icon: <LightbulbIcon className="w-8 h-8" />,
    color: 'from-yellow-400 to-amber-300'
  },
  { 
    id: 'viajes', 
    name: 'Viajes', 
    description: 'Comparte aventuras y destinos soñados.', 
    icon: <GlobeIcon className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-600'
  },
  { 
    id: 'carrera', 
    name: 'Carrera Profesional', 
    description: 'Sobre ambiciones, trabajo y éxito profesional.', 
    icon: <BriefcaseIcon className="w-8 h-8" />,
    color: 'from-slate-500 to-gray-600'
  },
  { 
    id: 'recuerdos', 
    name: 'Recuerdos de Infancia', 
    description: 'Viaja al pasado y comparte momentos de la niñez.', 
    icon: <BookOpenIcon className="w-8 h-8" />,
    color: 'from-pink-400 to-fuchsia-500'
  },
  { 
    id: 'relaciones', 
    name: 'Relaciones', 
    description: 'Explora la dinámica del amor, amistad y familia.', 
    icon: <UsersIcon className="w-8 h-8" />,
    color: 'from-red-400 to-pink-500'
  }
];