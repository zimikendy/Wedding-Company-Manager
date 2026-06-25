import React from 'react';
import { Project } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import { Icons } from '../Icons';

interface ProjectListProps {
    projects: Project[];
    onView: (project: Project) => void;
    onEdit: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onView, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Dự án</th>
                        <th scope="col" className="px-6 py-3">Khách hàng</th>
                        <th scope="col" className="px-6 py-3">Trạng thái</th>
                        <th scope="col" className="px-6 py-3">Ngày</th>
                        <th scope="col" className="px-6 py-3">Giá</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <img src={project.thumbnailUrl} alt={project.name} className="h-10 w-10 rounded-md object-cover" />
                                    <span>{project.name}</span>
                                </div>
                            </th>
                            <td className="px-6 py-4">{project.client}</td>
                            <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                            <td className="px-6 py-4">{new Date(project.date).toLocaleDateString('vi-VN')}</td>
                            <td className="px-6 py-4 font-semibold text-primary">{project.price.toLocaleString('vi-VN')} đ</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                    <button onClick={() => onView(project)} className="font-medium text-gray-600 hover:text-primary p-2">Xem</button>
                                    <button onClick={() => onEdit(project)} className="font-medium text-gray-600 hover:text-primary p-2">Sửa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectList;