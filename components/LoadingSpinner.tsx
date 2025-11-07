
import React from 'react';

interface LoadingSpinnerProps {
    categoryName: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ categoryName }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Generando preguntas...</h2>
      <p className="text-slate-400">
        La IA está creando preguntas <span className="font-semibold text-cyan-400">{categoryName}</span> para ti. ¡Un momento!
      </p>
    </div>
  );
};
