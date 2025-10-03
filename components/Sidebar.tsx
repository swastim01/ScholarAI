import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { PlusIcon } from './icons/PlusIcon';
import { TimeIcon } from './icons/TimeIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { UserIcon } from './icons/UserIcon';
import { LogoutIcon } from './icons/LogoutIcon';

type ActiveScreen = 'new' | 'history' | 'saved';

interface SidebarProps {
  user: { name: string };
  onLogout: () => void;
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg text-base font-normal transition-all duration-200 ${
        isActive
          ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, activeScreen, setActiveScreen }) => {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800/50 shadow-md flex flex-col justify-between p-4 transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 p-2 mb-6">
          <BookOpenIcon className="h-8 w-8 text-sky-500" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white">
            ScholarAI
          </span>
        </div>
        <ul className="space-y-2">
          <NavItem 
            icon={<PlusIcon className="w-6 h-6" />}
            label="New Analysis"
            isActive={activeScreen === 'new'}
            onClick={() => setActiveScreen('new')}
          />
          <NavItem 
            icon={<TimeIcon className="w-6 h-6" />}
            label="History"
            isActive={activeScreen === 'history'}
            onClick={() => setActiveScreen('history')}
          />
          <NavItem 
            icon={<BookmarkIcon className="w-6 h-6" />}
            label="Saved Projects"
            isActive={activeScreen === 'saved'}
            onClick={() => setActiveScreen('saved')}
          />
        </ul>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center p-2 rounded-lg gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-sky-600 dark:text-sky-300" />
          </div>
          <span className="font-medium text-gray-800 dark:text-gray-100">{user.name}</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center w-full p-3 rounded-lg text-base font-normal text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LogoutIcon className="w-6 h-6" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
