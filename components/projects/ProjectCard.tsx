import React from 'react';
import { Project } from '../../types';
import { Icons } from '../Icons';
import StatusBadge from '../ui/StatusBadge';

interface ProjectCardProps {
    project: Project;
    onView: () => void;
    onEdit: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView, onEdit }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
                <img src={project.thumbnailUrl} alt={project.name} className="h-52 w-full object-cover" />
                <div className="absolute top-3 right-3">
                    <StatusBadge status={project.status} />
                </div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 truncate">{project.name}</h3>
                <div className="mt-3 flex-grow space-y-2 text-sm text-gray-700">
                    <p className="flex items-center gap-2"><Icons.Profile className="h-4 w-4 text-gray-400" /> {project.client}</p>
                    <p className="flex items-center gap-2"><Icons.Calendar className="h-4 w-4 text-gray-400" /> {new Date(project.date).toLocaleDateString('vi-VN')}</p>
                    <p className="flex items-center gap-2 text-blue-600 font-bold"><Icons.DollarSign className="h-4 w-4 text-gray-400" /> {project.price.toLocaleString('vi-VN')} đ</p>
                </div>
                 
                <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Nhóm:</p>
                    <div className="flex items-center">
                        {project.team.length > 0 ? (
                            <div className="flex -space-x-2">
                                {project.team.slice(0, 3).map(member => (
                                    <img key={member.id} src={member.avatarUrl} alt={member.firstName} className="h-7 w-7 rounded-full border-2 border-white" title={`${member.firstName} ${member.lastName}`} />
                                ))}
                                {project.team.length > 3 && <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gray-200 text-xs font-semibold text-gray-600 border-2 border-white">+{project.team.length - 3}</span>}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400">Chưa có</p>
                        )}
                    </div>
                </div>

                 <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end space-x-4">
                    <button onClick={onView} className="text-sm font-semibold text-gray-600 hover:text-primary">Xem</button>
                    <button onClick={onEdit} className="text-sm font-semibold text-gray-600 hover:text-primary">Sửa</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;