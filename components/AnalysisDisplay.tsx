import React from 'react';
import type { AnalysisResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import AbstractView from './AbstractView';
import TopicView from './TopicView';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface AnalysisDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const isAbstract = (result: AnalysisResult): result is AnalysisResult & { input_type: 'abstract' } => {
    return result.input_type === 'abstract';
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!result) {
    return (
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center">
        <BookOpenIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Ready for Analysis</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Your analysis results will appear here.
        </p>
      </div>
    );
  }
  
  const hasProjects = result.suggested_projects && result.suggested_projects.length > 0;

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
       {isAbstract(result) && <AbstractView analysis={result} />}
       {hasProjects && <TopicView projects={result.suggested_projects} />}
       {result.explain_like_im_5 && (
         <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">Explain Like I'm 5</h3>
            <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">{result.explain_like_im_5}</p>
         </div>
       )}
    </div>
  );
};

export default AnalysisDisplay;