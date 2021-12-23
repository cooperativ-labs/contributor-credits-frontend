import BaseCard from './BaseCard';
import React from 'react';
import { useRouter } from 'next/router';

export interface ProjectCardProps {
  projectName: string;
  shortDescription: string;
  title: string;
  slug?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ ...props }) => {
  const router = useRouter();
  const { projectName, shortDescription, title, slug } = props;
  return (
    <div
      onClick={() => {
        window.sessionStorage.setItem('CHOSEN_PROJECT', slug);
        router.push(`/manager/${slug}`);
      }}
    >
      <BaseCard className="p-6 rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <h1 className="text-lg font-bold">{projectName}</h1>
        <div className="text-xs text-gray-600 mb-4">Role: {title}</div>
        <div className="mb-6">
          <div className="text-sm font-bold text-gray-800">{shortDescription}</div>
        </div>
      </BaseCard>
    </div>
  );
};

export default ProjectCard;
('0x2779');
