import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NewAnalysis from './NewAnalysis';
import HistoryScreen from './HistoryScreen';
import SavedProjectsScreen from './SavedProjectsScreen';

type ActiveScreen = 'new' | 'history' | 'saved';

interface DashboardProps {
  user: { name: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('new');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'history':
        return <HistoryScreen />;
      case 'saved':
        return <SavedProjectsScreen />;
      case 'new':
      default:
        return <NewAnalysis />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        user={user} 
        onLogout={onLogout} 
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
         {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
