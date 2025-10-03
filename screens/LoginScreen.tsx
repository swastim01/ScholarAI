import React, { useState } from 'react';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <BookOpenIcon className="mx-auto h-16 w-auto text-sky-600" />
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome to ScholarAI
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            Your personal research dashboard.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name to begin"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-900 transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
         <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            This is a simulated login. Your name is only stored in your browser.
          </p>
      </div>
    </div>
  );
};

export default LoginScreen;
