import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import AnalysisDisplay from '../components/AnalysisDisplay';
import { analyzeTopic } from '../services/geminiService';
import { useHistory } from '../hooks/useHistory';
import type { AnalysisResult } from '../types';

const NewAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isEli5, setIsEli5] = useState(false);
  const { addToHistory } = useHistory();

  const handleAnalysis = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await analyzeTopic(query, isEli5);
      setResult(analysisResult);
      addToHistory({ query, result: analysisResult });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-shrink-0">
        <InputForm 
          onAnalyze={handleAnalysis} 
          isLoading={isLoading} 
          isEli5={isEli5}
          setIsEli5={setIsEli5}
        />
      </div>
      <div className="flex-grow min-h-0">
        <AnalysisDisplay result={result} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default NewAnalysis;