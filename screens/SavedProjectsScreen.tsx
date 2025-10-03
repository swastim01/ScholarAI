import React from 'react';
import { useSavedProjects } from '../hooks/useSavedProjects';
import { ProjectCard } from '../components/TopicView';
import { BookmarkIcon } from '../components/icons/BookmarkIcon';

const SavedProjectsScreen: React.FC = () => {
  const { savedProjects } = useSavedProjects();

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Saved Projects</h2>
      {savedProjects.length > 0 ? (
        <div className="space-y-6">
          {savedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} isSavedProjectView={true} />
          ))}
        </div>
      ) : (
        <div className="text-center flex flex-col items-center justify-center h-full">
            <BookmarkIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">No Saved Projects</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
                You can save project suggestions by clicking the bookmark icon.
            </p>
        </div>
      )}
    </div>
  );
};

export default SavedProjectsScreen;
