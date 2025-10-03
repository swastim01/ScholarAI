import React, { useState } from 'react';
import { useHistory, HistoryItem } from '../hooks/useHistory';
import AnalysisDisplay from '../components/AnalysisDisplay';
import { TimeIcon } from '../components/icons/TimeIcon';

const HistoryScreen: React.FC = () => {
  const { history } = useHistory();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  }

  if (!history.length) {
    return (
      <div className="text-center flex flex-col items-center justify-center h-full">
        <TimeIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">No History Yet</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Your past analyses will appear here once you run a query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div className="md:col-span-1 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Analysis History</h2>
        <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg flex-1 overflow-y-auto">
          <ul className="divide-y divide-slate-200 dark:divide-slate-700">
            {history.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors ${selectedItem?.id === item.id ? 'bg-sky-100 dark:bg-sky-900/30' : ''}`}
                >
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{item.query}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDate(item.timestamp)}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-2 h-full">
        {selectedItem ? (
           <AnalysisDisplay result={selectedItem.result} isLoading={false} error={null} />
        ) : (
          <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center">
             <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Select an item from your history</h2>
             <p className="text-slate-500 dark:text-slate-400 mt-2">The details of your past analysis will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
