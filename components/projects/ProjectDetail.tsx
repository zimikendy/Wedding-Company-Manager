import React, { useState } from 'react';
import { Project } from '../../types';
import { Icons, IconName } from '../Icons';
import StatusBadge from '../ui/StatusBadge';

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

type Tab = 'info' | 'payments' | 'timeline' | 'team' | 'files';

const TabButton: React.FC<{ icon: IconName, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => {
    const Icon = Icons[icon];
    return (
        <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${active ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState<Tab>('info');

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div className="space-y-4 text-sm">
                        <p><strong className="w-32 inline-block font-semibold">Khách hàng:</strong> {project.client}</p>
                        <p><strong className="w-32 inline-block font-semibold">Ngày bắt đầu:</strong> {project.startDate ? new Date(project.startDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                        <p><strong className="w-32 inline-block font-semibold">Ngày kết thúc:</strong> {project.endDate ? new Date(project.endDate).toLocaleDateString('vi-VN') : 'N/A'}</p>
                        <p><strong className="w-32 inline-block font-semibold">Địa điểm:</strong> {project.location || 'N/A'}</p>
                        <div>
                            <strong className="w-32 block font-semibold">Mô tả:</strong>
                            <p className="mt-1 text-gray-600">{project.description || 'Không có mô tả.'}</p>
                        </div>
                    </div>
                );
            case 'payments':
                const paidAmount = project.payments?.filter(p => p.status === 'Đã thanh toán').reduce((acc, p) => acc + p.amount, 0) || 0;
                const progress = (paidAmount / project.price) * 100;
                return (
                     <div className="space-y-4">
                        <div>
                            <p className="flex justify-between text-sm font-medium">
                                <span>Đã thanh toán: {paidAmount.toLocaleString('vi-VN')} đ</span>
                                <span>Còn lại: {(project.price - paidAmount).toLocaleString('vi-VN')} đ</span>
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <ul className="space-y-3">
                        {project.payments?.map(p => (
                            <li key={p.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{p.description} - <span className="text-gray-500">{new Date(p.date).toLocaleDateString('vi-VN')}</span></p>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === 'Đã thanh toán' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span>
                                </div>
                                <p className="font-bold text-lg text-primary">{p.amount.toLocaleString('vi-VN')} đ</p>
                            </li>
                        ))}
                        </ul>
                    </div>
                );
            case 'team':
                return (
                     <ul className="space-y-3">
                        {project.team.map(member => (
                             <li key={member.id} className="p-3 bg-gray-50 rounded-md flex items-center gap-4">
                                <img src={member.avatarUrl} alt={member.firstName} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold">{member.firstName} {member.lastName}</p>
                                    <p className="text-sm text-gray-500">{member.role}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                );
             default: return <div className="text-gray-500">Nội dung đang được cập nhật.</div>
        }
    };
    
    return (
        <>
            <div className="p-6 border-b flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
                    <div className="mt-2"><StatusBadge status={project.status} /></div>
                </div>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Icons.Close /></button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
                 <div className="flex space-x-2 border-b mb-4 pb-2">
                    <TabButton icon="Profile" label="Thông tin" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
                    <TabButton icon="Payments" label="Thanh toán" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
                    <TabButton icon="Timeline" label="Timeline" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} />
                    <TabButton icon="Staff" label="Nhóm" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
                    <TabButton icon="Files" label="Files" active={activeTab === 'files'} onClick={() => setActiveTab('files')} />
                </div>
                {renderContent()}
            </div>
             <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md">Đóng</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">Sửa dự án</button>
            </div>
        </>
    );
};

export default ProjectDetail;
