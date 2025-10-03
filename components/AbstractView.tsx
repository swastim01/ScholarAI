import React, { useState } from 'react';
import type { AnalysisResult, Citation } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

const InfoSection: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">{title}</h4>
      <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 text-sm">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const CitationManager: React.FC<{ citation: Citation; bib_entry: string }> = ({ citation, bib_entry }) => {
  const [copied, setCopied] = useState('');

  const citations = { 
    APA: citation.APA, 
    MLA: citation.MLA, 
    IEEE: citation.IEEE, 
    BibTeX: bib_entry 
  };
  
  const handleCopy = (text: string, format: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(format);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  return (
    <div>
      <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">Citations</h4>
      <div className="space-y-4">
        {Object.entries(citations).map(([format, text]) => (
          <div key={format} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <h5 className="font-medium text-sm text-slate-700 dark:text-slate-300">{format}</h5>
              <button
                onClick={() => handleCopy(text, format)}
                disabled={!text}
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {copied === format ? (
                  'Copied!'
                ) : (
                  <>
                    <ClipboardIcon className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-white dark:bg-slate-800/50">
              <pre className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans">
                {text || `No ${format} citation provided.`}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface AbstractViewProps {
  analysis: AnalysisResult & { input_type: 'abstract' };
}

const AbstractView: React.FC<AbstractViewProps> = ({ analysis }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
       <div className="flex items-center gap-3 mb-6">
          <BookOpenIcon className="w-6 h-6 text-sky-500" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Paper Analysis</h3>
        </div>
        <div className="space-y-6">
            <InfoSection title="Key Findings" items={analysis.key_findings} />
            <InfoSection title="Methods Used" items={analysis.methods} />
            <InfoSection title="Limitations / Challenges" items={analysis.limitations} />
            <InfoSection title="Potential Extensions" items={analysis.potential_extensions} />
            <CitationManager citation={analysis.citation} bib_entry={analysis.bib_entry} />
        </div>
    </div>
  );
};

export default AbstractView;