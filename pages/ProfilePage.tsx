import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../components/Icons';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isEditMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || ''
    });

    if (!user) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    const handleEditToggle = () => {
        if (isEditMode) {
            // Handle save logic here
            console.log("Saving profile:", formData);
        }
        setEditMode(!isEditMode);
    };
    
    const handleCancel = () => {
        setFormData({ firstName: user.firstName, lastName: user.lastName });
        setEditMode(false);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin cá nhân</h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <img src={user.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full" />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                            <Icons.Edit className="w-4 h-4 text-gray-600"/>
                        </button>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-gray-800 p-2 bg-gray-100 rounded-md">{user.email}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Họ</label>
                                    {isEditMode ? (
                                        <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                                    ) : (
                                        <p className="mt-1 text-gray-800">{formData.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Tên</label>
                                    {isEditMode ? (
                                        <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                                    ) : (
                                        <p className="mt-1 text-gray-800">{formData.lastName}</p>
                                    )}
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-500">Vai trò</label>
                                <p className="mt-1 text-gray-800">{user.role}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            {isEditMode ? (
                                <>
                                 <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md">Hủy</button>
                                  <button onClick={handleEditToggle} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">Lưu</button>
                                </>
                            ) : (
                                <button onClick={handleEditToggle} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md">Sửa hồ sơ</button>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Thống kê hoạt động</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-primary">25</p>
                        <p className="text-sm text-gray-500">Dự án đã tạo</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-primary">50</p>
                        <p className="text-sm text-gray-500">Khách hàng đã thêm</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-primary">10</p>
                        <p className="text-sm text-gray-500">Nhân viên đã quản lý</p>
                    </div>
                     <div>
                        <p className="text-lg font-bold text-primary">15/01/2025</p>
                        <p className="text-sm text-gray-500">Đăng nhập cuối</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;