
import React, { useState, useEffect } from 'react';

const messages = [
  "Consulting with digital archives...",
  "Synthesizing key insights...",
  "Formulating project blueprints...",
  "Scanning for relevant datasets...",
  "Finalizing the analysis...",
];

const LoadingSpinner: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center">
      <svg className="animate-spin h-12 w-12 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-4">Analyzing...</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 min-h-[1.25rem]">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
