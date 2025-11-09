
import React, { useState, useCallback, useMemo } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { QuestionDisplay } from './components/QuestionDisplay';
import { CATEGORIES } from './constants';
import { PRELOADED_QUESTIONS } from './questions';
import type { QuestionCache, Category } from './types';

function App() {
  const [questionCache] = useState<QuestionCache>(PRELOADED_QUESTIONS);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const [askedCount, setAskedCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  const totalQuestionsInCategory = useMemo(() => {
    if (!currentCategory || !questionCache[currentCategory.id]) return 0;
    return questionCache[currentCategory.id].length;
  }, [currentCategory, questionCache]);

  const selectCategory = useCallback((category: Category) => {
    setCurrentCategory(category);
    const originalQuestions = questionCache[category.id] || [];
    const newShuffled = [...originalQuestions].sort(() => Math.random() - 0.5);
    setCurrentQuestion(newShuffled.pop() ?? "No hay preguntas para esta categoría.");
    setShuffledQuestions(newShuffled);
    setAskedCount(1);
  }, [questionCache]);

  const showNextQuestion = useCallback(() => {
    if (shuffledQuestions.length > 0) {
      const newShuffled = [...shuffledQuestions];
      const nextQuestion = newShuffled.pop() ?? null;
      setCurrentQuestion(nextQuestion);
      setShuffledQuestions(newShuffled);
      setAskedCount(prev => prev + 1);
    } else {
      setCurrentQuestion("¡Has respondido todas las preguntas de esta categoría! Puedes reiniciar o elegir otra.");
    }
  }, [shuffledQuestions]);

  const resetCategory = useCallback(() => {
    if (currentCategory && questionCache[currentCategory.id]) {
      const originalQuestions = questionCache[currentCategory.id];
      const newShuffled = [...originalQuestions].sort(() => Math.random() - 0.5);
      setCurrentQuestion(newShuffled.pop() ?? null);
      setShuffledQuestions(newShuffled);
      setAskedCount(1);
    }
  }, [currentCategory, questionCache]);

  const goBackToCategories = () => {
    setCurrentCategory(null);
    setCurrentQuestion(null);
    setShuffledQuestions([]);
    setAskedCount(0);
  };

  const renderContent = () => {
    if (currentCategory && currentQuestion) {
      return (
        <QuestionDisplay
          question={currentQuestion}
          category={currentCategory}
          onNext={showNextQuestion}
          onBack={goBackToCategories}
          onReset={resetCategory}
          isCompleted={shuffledQuestions.length === 0}
          progress={{ current: askedCount, total: totalQuestionsInCategory }}
        />
      );
    }
    return <CategorySelector categories={CATEGORIES} onSelect={selectCategory} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-200 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <main className="w-full max-w-2xl mx-auto transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;