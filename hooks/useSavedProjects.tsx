import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { Project } from '../types';

interface SavedProjectsContextType {
  savedProjects: Project[];
  saveProject: (project: Project) => void;
  unsaveProject: (projectTitle: string) => void;
}

const SavedProjectsContext = createContext<SavedProjectsContextType | undefined>(undefined);

export const SavedProjectsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [savedProjects, setSavedProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('scholar-saved-projects');
      if (storedProjects) {
        setSavedProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error("Failed to parse saved projects from localStorage", error);
      setSavedProjects([]);
    }
  }, []);

  const saveProject = (project: Project) => {
    const updatedProjects = [...savedProjects, project];
    setSavedProjects(updatedProjects);
    localStorage.setItem('scholar-saved-projects', JSON.stringify(updatedProjects));
  };

  const unsaveProject = (projectTitle: string) => {
    const updatedProjects = savedProjects.filter(p => p.title !== projectTitle);
    setSavedProjects(updatedProjects);
    localStorage.setItem('scholar-saved-projects', JSON.stringify(updatedProjects));
  };

  return (
    <SavedProjectsContext.Provider value={{ savedProjects, saveProject, unsaveProject }}>
      {children}
    </SavedProjectsContext.Provider>
  );
};

export const useSavedProjects = () => {
  const context = useContext(SavedProjectsContext);
  if (context === undefined) {
    throw new Error('useSavedProjects must be used within a SavedProjectsProvider');
  }
  return context;
};
