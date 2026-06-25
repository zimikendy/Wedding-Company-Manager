import React from 'react';
import { Project, Customer, User } from '../../types';
import ProjectDetail from './ProjectDetail';
import ProjectFormWizard from './ProjectFormWizard';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'view' | 'create' | 'edit';
    project: Project | null;
    onSave: (project: Project) => void;
    customers: Customer[];
    staff: User[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, mode, project, onSave, customers, staff }) => {
    if (!isOpen) return null;

    const title = {
        view: 'Chi tiết dự án',
        edit: 'Chỉnh sửa dự án',
        create: 'Tạo dự án mới'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {mode === 'view' && project ? (
                    <ProjectDetail project={project} onClose={onClose} />
                ) : (
                    <ProjectFormWizard 
                        project={project}
                        onClose={onClose}
                        onSave={onSave}
                        customers={customers}
                        staff={staff}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectModal;