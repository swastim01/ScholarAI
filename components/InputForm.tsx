import React, { useState, useRef } from 'react';
import { extractTextFromPdf } from '../utils/pdfExtractor';

interface InputFormProps {
  onAnalyze: (query: string) => void;
  isLoading: boolean;
  isEli5: boolean;
  setIsEli5: (value: boolean) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading, isEli5, setIsEli5 }) => {
  const [query, setQuery] = useState('');
  const [isReadingPdf, setIsReadingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(query);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsReadingPdf(true);
    try {
      const text = await extractTextFromPdf(file);
      setQuery(text);
    } catch (error) {
      alert(error instanceof Error ? error.message : "An unknown error occurred while reading the PDF.");
      console.error(error);
    } finally {
      setIsReadingPdf(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">New Research Analysis</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Enter a research topic, paste an abstract, or upload a PDF to get started.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="research-input" className="sr-only">Research Input</label>
          <textarea
            id="research-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'The impact of quantum computing on cryptography' or paste abstract text..."
            className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            rows={6}
            disabled={isLoading || isReadingPdf}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isReadingPdf}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
              >
                {isReadingPdf ? 'Reading...' : 'Upload PDF'}
              </button>
              <button
                type="submit"
                disabled={isLoading || isReadingPdf || !query.trim()}
                className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 disabled:bg-sky-400 dark:disabled:bg-sky-800 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
           </div>
           <div className="flex items-center">
              <label htmlFor="eli5-toggle" className="flex items-center cursor-pointer">
                  <span className="mr-3 text-sm font-medium text-slate-700 dark:text-slate-300">Explain Like I'm 5</span>
                  <div className="relative">
                      <input 
                          type="checkbox" 
                          id="eli5-toggle" 
                          className="sr-only peer" 
                          checked={isEli5} 
                          onChange={() => setIsEli5(!isEli5)}
                          disabled={isLoading || isReadingPdf}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-600"></div>
                  </div>
              </label>
           </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
