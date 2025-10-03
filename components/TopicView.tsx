import React, { useState } from 'react';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { useSavedProjects } from '../hooks/useSavedProjects';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isSavedProjectView?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSavedProjectView = false }) => {
    const { savedProjects, saveProject, unsaveProject } = useSavedProjects();
    const isSaved = savedProjects.some(p => p.title === project.title);
    const [checkedSteps, setCheckedSteps] = useState<boolean[]>(() => project.steps.map(() => false));

    const handleToggleSave = () => {
        isSaved ? unsaveProject(project.title) : saveProject(project);
    };

    const handleCheckStep = (index: number) => {
        const newCheckedSteps = [...checkedSteps];
        newCheckedSteps[index] = !newCheckedSteps[index];
        setCheckedSteps(newCheckedSteps);
    };

    const difficultyColors = {
        Easy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Hard: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };

    return (
        <div className="bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h5 className="font-bold text-md text-sky-800 dark:text-sky-300">{project.title}</h5>
                    <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${difficultyColors[project.difficulty]}`}>{project.difficulty}</span>
                </div>
                {!isSavedProjectView && (
                    <button onClick={handleToggleSave} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors" aria-label={isSaved ? "Unsave project" : "Save project"}>
                       <BookmarkIcon className={`w-5 h-5 transition-colors ${isSaved ? 'fill-sky-500 text-sky-500' : 'fill-none'}`} />
                    </button>
                )}
            </div>
            
            <div className="space-y-4 text-sm">
                <div>
                    <h6 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Plan</h6>
                    <ul className="space-y-1">
                        {project.steps.map((step, index) => (
                           <li key={index}>
                                <button
                                    onClick={() => handleCheckStep(index)}
                                    aria-pressed={checkedSteps[index]}
                                    className="w-full text-left flex items-center gap-2 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-sky-500"
                                >
                                    <span className="text-lg" aria-hidden="true">{checkedSteps[index] ? '✅' : '⬜️'}</span>
                                    <span className={`flex-1 text-slate-600 dark:text-slate-400 ${checkedSteps[index] ? 'line-through text-slate-500 dark:text-slate-500' : ''}`}>
                                        {step}
                                    </span>
                                </button>
                           </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h6 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Datasets</h6>
                    <div className="space-y-2">
                        {project.datasets.map((d, i) => (
                            <div key={i} className="p-2 rounded-md bg-white dark:bg-slate-800">
                                <a href={d.link} target="_blank" rel="noopener noreferrer" className="font-medium text-sky-600 dark:text-sky-400 hover:underline">{d.name}</a>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{d.usage_tips}</p>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h6 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Tools & Frameworks</h6>
                    <div className="flex flex-wrap gap-2">
                        {project.tools_frameworks.map((tool, i) => (
                            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const TopicView: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <LightBulbIcon className="w-6 h-6 text-sky-500" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Suggested Projects</h3>
        </div>
        <div className="space-y-4">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    </div>
  );
};

export default TopicView;