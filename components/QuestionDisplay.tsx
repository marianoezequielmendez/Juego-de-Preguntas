
import React from 'react';
import type { Category } from '../types';

interface QuestionDisplayProps {
  question: string;
  category: Category;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
  isCompleted: boolean;
  progress: { current: number; total: number };
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, category, onNext, onBack, onReset, isCompleted, progress }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 w-full">
      <div className="w-full flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Categorías
        </button>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-white border border-slate-200`}>
           <div className={`w-6 h-6 flex items-center justify-center`}>{category.icon}</div>
           <span>{category.name}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl w-full min-h-[250px] sm:min-h-[300px] flex items-center justify-center p-6 text-center shadow-xl">
        <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800">
          {question}
        </p>
      </div>

      {progress.total > 0 && (
         <div className="w-full mt-6 text-center">
            <p className="text-slate-500">{progress.current} / {progress.total}</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                <div 
                    className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`} 
                    style={{width: `${(progress.current / progress.total) * 100}%`}}>
                </div>
            </div>
        </div>
      )}


      <div className="mt-8 w-full">
        {isCompleted ? (
          <button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M3 21a9 9 0 0 1 .1-3.5M20.9 17.5A9 9 0 0 1 12 21a9 9 0 0 1-9-9"/></svg>
            Reiniciar Categoría
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-4 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
          >
            Siguiente Pregunta
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        )}
      </div>
    </div>
  );
};