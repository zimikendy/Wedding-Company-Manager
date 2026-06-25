import React, { useState, useMemo } from 'react';
import { Icons } from '../components/Icons';
import { mockProjects, mockUsers, mockCustomers } from '../data/mockData';
import { Project, ProjectStatus } from '../types';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectList from '../components/projects/ProjectList';
import Pagination from '../components/ui/Pagination';
import ProjectModal from '../components/projects/ProjectModal';

const STATUS_FILTERS: (ProjectStatus | 'Tất cả')[] = [
    'Tất cả',
    ProjectStatus.CONTACT,
    ProjectStatus.PROPOSAL,
    ProjectStatus.SIGNED,
    ProjectStatus.DEPOSITED,
    ProjectStatus.IN_PROCESS,
    ProjectStatus.FINAL_PAYMENT,
    ProjectStatus.COMPLETE,
];

const ITEMS_PER_PAGE = 6;

type ModalState = {
    isOpen: boolean;
    mode: 'view' | 'create' | 'edit';
    project: Project | null;
}

const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeStatus, setActiveStatus] = useState<ProjectStatus | 'Tất cả'>('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalState, setModalState] = useState<ModalState>({ isOpen: false, mode: 'view', project: null });
    
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const statusMatch = activeStatus === 'Tất cả' || project.status === activeStatus;
            const searchMatch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                project.client.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        });
    }, [activeStatus, searchTerm, projects]);

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

    const handleOpenModal = (mode: 'view' | 'create' | 'edit', project: Project | null) => {
        setModalState({ isOpen: true, mode, project });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, mode: 'view', project: null });
    };
    
    const handleSaveProject = (projectToSave: Project) => {
        if (modalState.mode === 'edit' && modalState.project) {
            setProjects(projects.map(p => p.id === projectToSave.id ? projectToSave : p));
        } else {
             setProjects([...projects, { ...projectToSave, id: (projects.length + 1).toString() }]);
        }
        handleCloseModal();
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:max-w-xs">
                    <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên dự án, khách hàng..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>
                            <Icons.Grid className="h-5 w-5" />
                        </button>
                         <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}>
                            <Icons.List className="h-5 w-5" />
                        </button>
                    </div>
                     <button onClick={() => handleOpenModal('create', null)} className="flex items-center justify-center bg-primary text-white w-9 h-9 rounded-lg hover:bg-primary/90">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>

            <div className="border-b border-gray-200 -mx-6 px-6">
                <div className="flex space-x-2 overflow-x-auto pb-3">
                    {STATUS_FILTERS.map(status => (
                        <button
                            key={status}
                            onClick={() => {
                                setActiveStatus(status);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-colors ${activeStatus === status ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {paginatedProjects.length > 0 ? (
                <>
                    {viewMode === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedProjects.map(project => <ProjectCard key={project.id} project={project} onView={() => handleOpenModal('view', project)} onEdit={() => handleOpenModal('edit', project)} />)}
                    </div> : <ProjectList projects={paginatedProjects} onView={(p) => handleOpenModal('view', p)} onEdit={(p) => handleOpenModal('edit', p)} />}
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center py-16">
                    <Icons.Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy dự án</h3>
                    <p className="mt-1 text-sm text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                </div>
            )}
            
            <ProjectModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                mode={modalState.mode}
                project={modalState.project}
                onSave={handleSaveProject}
                customers={mockCustomers}
                staff={mockUsers}
            />
        </div>
    );
};

export default ProjectsPage;