import React from 'react';
import useAuth from './hooks/useAuth';
import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import { HistoryProvider } from './hooks/useHistory';
import { SavedProjectsProvider } from './hooks/useSavedProjects';

const App: React.FC = () => {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <HistoryProvider>
      <SavedProjectsProvider>
        <Dashboard user={user} onLogout={logout} />
      </SavedProjectsProvider>
    </HistoryProvider>
  );
};

export default App;
