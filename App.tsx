
import React, { useState, useCallback, useMemo } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { QuestionDisplay } from './components/QuestionDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateQuestionsForCategory } from './services/geminiService';
import { CATEGORIES } from './constants';
import type { QuestionCache, Category } from './types';

function App() {
  const [questionCache, setQuestionCache] = useState<QuestionCache>({});
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const [askedCount, setAskedCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const totalQuestionsInCategory = useMemo(() => {
    if (!currentCategory || !questionCache[currentCategory.id]) return 0;
    return questionCache[currentCategory.id].length;
  }, [currentCategory, questionCache]);

  const selectCategory = useCallback(async (category: Category) => {
    setError(null);
    setCurrentCategory(category);

    if (questionCache[category.id]) {
      const originalQuestions = questionCache[category.id];
      const newShuffled = [...originalQuestions].sort(() => Math.random() - 0.5);
      setCurrentQuestion(newShuffled.pop() ?? null);
      setShuffledQuestions(newShuffled);
      setAskedCount(1);
    } else {
      setIsLoading(true);
      try {
        const questions = await generateQuestionsForCategory(category.name);
        if (questions && questions.length > 0) {
            setQuestionCache(prev => ({ ...prev, [category.id]: questions }));
            const newShuffled = [...questions].sort(() => Math.random() - 0.5);
            setCurrentQuestion(newShuffled.pop() ?? null);
            setShuffledQuestions(newShuffled);
            setAskedCount(1);
        } else {
            throw new Error("No se pudieron generar preguntas. Intenta de nuevo.");
        }
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "Ocurrió un error desconocido.";
        setError(errorMessage);
        setCurrentCategory(null);
      } finally {
        setIsLoading(false);
      }
    }
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
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner categoryName={currentCategory?.name || ''} />;
    }
    if (error) {
        return <ErrorDisplay message={error} onRetry={goBackToCategories} />;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <main className="w-full max-w-2xl mx-auto transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
