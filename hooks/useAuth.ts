import { useState, useEffect } from 'react';

interface User {
  name: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('scholar-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string) => {
    const newUser = { name };
    localStorage.setItem('scholar-user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('scholar-user');
    // Also clear history and saved projects on logout
    localStorage.removeItem('scholar-history');
    localStorage.removeItem('scholar-saved-projects');
    setUser(null);
    // Force a reload to clear all state from providers
    window.location.reload();
  };

  return { user, login, logout };
};

export default useAuth;
