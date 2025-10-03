
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 rounded-r-lg shadow-md h-full flex flex-col justify-center">
       <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V5z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-red-800 dark:text-red-200">An Error Occurred</p>
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
