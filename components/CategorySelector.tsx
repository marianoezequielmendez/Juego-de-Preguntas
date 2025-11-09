
import React from 'react';
import type { Category } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 mb-2">
        Generador de Conversaciones
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-md">
        Elige una categoría para empezar a generar preguntas y encender la conversación.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className={`group relative p-6 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 text-left overflow-hidden`}
          >
            <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-bl ${category.color} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500`}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-slate-100`}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800">{category.name}</h2>
              </div>
              <p className="mt-2 text-slate-500">{category.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};