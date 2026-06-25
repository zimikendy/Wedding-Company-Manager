import React, { useState, useEffect } from 'react';
import { User, UserRole, StaffStatus } from '../../types';
import { Icons } from '../Icons';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    user: User | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState<Partial<User>>({});
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                firstName: '', lastName: '', email: '', role: UserRole.USER, status: StaffStatus.ACTIVE
            });
        }
        setPassword('');
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Password would be handled here in a real app
        onSave(formData as User);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{user ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}</h3>
                    <button onClick={onClose}><Icons.Close className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="flex space-x-4">
                            <div>
                                <label className="block text-sm font-medium">Họ</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Tên</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                         {!user && (
                             <div>
                                <label className="block text-sm font-medium">Mật khẩu</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                         )}
                         <div className="flex space-x-4">
                             <div className="flex-1">
                                <label className="block text-sm font-medium">Vai trò</label>
                                <select name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                             <div className="flex-1">
                                <label className="block text-sm font-medium">Trạng thái</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    {Object.values(StaffStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md">Hủy</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;