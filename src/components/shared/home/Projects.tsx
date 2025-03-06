'use client'
import { useGetAllProjectsQuery } from '@/redux/features/projects/projectApi';
import { TProject } from '@/types/project.types';
import React from 'react'
import { ProjectCard } from '../projects/ProjectCard';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const { data } = useGetAllProjectsQuery(undefined);
  const projects = data?.data;
  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Featured Projects</h1>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects?.map((project : TProject) => (
              <ProjectCard key={project._id} project={project} />
            ))}
      </div>
      <div className='flex justify-center mt-4'>
        <Button> View Projects</Button>
      </div>
        </div>
  );
}

export default Projects
