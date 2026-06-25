import React, { useState, useEffect } from 'react';
import { Project, Customer, User, ProjectStatus } from '../../types';
import { Icons } from '../Icons';

interface ProjectFormWizardProps {
    project: Project | null;
    onClose: () => void;
    onSave: (project: Project) => void;
    customers: Customer[];
    staff: User[];
}

const steps = ["Thông tin", "Giá cả", "Timeline", "Nhân sự"];

const ProjectFormWizard: React.FC<ProjectFormWizardProps> = ({ project, onClose, onSave, customers, staff }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<Project>>({});

    useEffect(() => {
        if (project) {
            setFormData(project);
        } else {
            setFormData({
                name: '',
                client: customers.length > 0 ? `${customers[0].firstName} ${customers[0].lastName}` : '',
                status: ProjectStatus.CONTACT,
                price: 0,
                team: [],
                date: new Date().toISOString().split('T')[0],
            });
        }
    }, [project, customers]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    }
    
    const handleNext = () => {
        if(currentStep < steps.length) setCurrentStep(currentStep + 1);
    }
    
    const handlePrev = () => {
        if(currentStep > 1) setCurrentStep(currentStep - 1);
    }
    
    const handleSubmit = () => {
        onSave(formData as Project);
    }

    const renderStepContent = () => {
        switch(currentStep) {
            case 1: // Thông tin
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Tên dự án</label>
                            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md" required/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Khách hàng</label>
                            <select name="client" value={formData.client} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md">
                                {customers.map(c => <option key={c.id} value={`${c.firstName} ${c.lastName}`}>{c.firstName} {c.lastName}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mô tả</label>
                            <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={4} className="mt-1 w-full border-gray-300 rounded-md"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Ngày bắt đầu</label>
                                <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md"/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Trạng thái</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md">
                                    {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 2: // Giá cả
                 return (
                     <div>
                        <label className="block text-sm font-medium">Tổng giá trị dự án (đ)</label>
                        <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md"/>
                    </div>
                );
            default:
                return <div className="text-center text-gray-500 py-10">Tính năng này đang được phát triển.</div>
        }
    }

    return (
        <>
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{project ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"><Icons.Close /></button>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {index + 1}
                                </div>
                                <p className={`mt-2 text-xs font-semibold ${index + 1 <= currentStep ? 'text-primary' : 'text-gray-500'}`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${index + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="px-6 pb-6 flex-1 overflow-y-auto">
                {renderStepContent()}
            </div>
            
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                <button onClick={handlePrev} disabled={currentStep === 1} className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md disabled:opacity-50">Quay lại</button>
                <div>
                {currentStep < steps.length ? (
                    <button onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">Tiếp theo</button>
                ) : (
                    <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-success rounded-md">Hoàn thành</button>
                )}
                </div>
            </div>
        </>
    );
};

export default ProjectFormWizard;
