import React, { useState, useEffect } from 'react';
import { User, UserRole, StaffStatus } from '../../types';
import { Icons } from '../Icons';

interface StaffFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (staffMember: User) => void;
    staffMember: User | null;
}

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, staffMember }) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        if (staffMember) {
            setFormData(staffMember);
        } else {
            setFormData({
                firstName: '', lastName: '', email: '', role: UserRole.USER, status: StaffStatus.ACTIVE, rate: 0, rateType: 'giờ'
            });
        }
    }, [staffMember, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'rate' ? parseFloat(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as User);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{staffMember ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Icons.Close className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="flex space-x-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Họ</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                                <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                                    {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                                    {Object.values(StaffStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Mức lương</label>
                                <input type="number" name="rate" value={formData.rate || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Loại</label>
                                <select name="rateType" value={formData.rateType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                                    <option value="shoot">/ shoot</option>
                                    <option value="giờ">/ giờ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Hủy</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StaffFormModal;
