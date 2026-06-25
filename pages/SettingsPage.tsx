import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../components/Icons';
import { User, UserRole, StaffStatus } from '../types';
import { mockUsers } from '../data/mockData';
import Pagination from '../components/ui/Pagination';
import UsersTable from '../components/users/UsersTable';
import UserFormModal from '../components/users/UserFormModal';

// Component for Profile Settings
const ProfileSettings: React.FC = () => {
    const { user } = useAuth();
    const [isEditMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || ''
    });

    if (!user) return <div>Đang tải...</div>;

    const handleEditToggle = () => {
        if (isEditMode) {
            console.log("Saving profile:", formData); // Mock save
        }
        setEditMode(!isEditMode);
    };

    const handleCancel = () => {
        setFormData({ firstName: user.firstName, lastName: user.lastName });
        setEditMode(false);
    };

    return (
        <div className="mt-6 space-y-8">
            <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Thông tin cá nhân</h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <img src={user.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full" />
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                            <Icons.Edit className="w-4 h-4 text-gray-600"/>
                        </button>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Email</label>
                            <p className="mt-1 text-gray-800 p-2 bg-gray-100 rounded-md">{user.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Họ</label>
                                {isEditMode ? <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/> : <p className="mt-1 text-gray-800 h-9 flex items-center">{formData.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Tên</label>
                                {isEditMode ? <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/> : <p className="mt-1 text-gray-800 h-9 flex items-center">{formData.lastName}</p>}
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
            <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Đổi mật khẩu</h3>
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                        <input type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                        <input type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                        <input type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">Đổi mật khẩu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component for Users Management (Admin only)
const ROLE_FILTERS = ['Tất cả', ...Object.values(UserRole)];
const STATUS_FILTERS = ['Tất cả', ...Object.values(StaffStatus)];
const ITEMS_PER_PAGE = 10;
const UsersManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [activeRole, setActiveRole] = useState('Tất cả');
    const [activeStatus, setActiveStatus] = useState('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const roleMatch = activeRole === 'Tất cả' || u.role === activeRole;
            const statusMatch = activeStatus === 'Tất cả' || u.status === activeStatus;
            const searchMatch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
            return roleMatch && statusMatch && searchMatch;
        });
    }, [users, activeRole, activeStatus, searchTerm]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const handleSave = (userToSave: User) => {
        if (editingUser) setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
        else setUsers([...users, {...userToSave, id: (users.length + 1).toString()}]);
        setModalOpen(false); setEditingUser(null);
    };

    const handleEdit = (userToEdit: User) => {
        setEditingUser(userToEdit); setModalOpen(true);
    };

    return (
         <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-lg border">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                     <div className="relative w-full md:w-1/3">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input type="text" placeholder="Tìm theo tên, email..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full pl-10 pr-4 py-2 border rounded-md"/>
                    </div>
                     <button onClick={() => { setEditingUser(null); setModalOpen(true); }} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 w-full md:w-auto">
                        <Icons.Add className="h-4 w-4 mr-2" />
                        Thêm người dùng
                    </button>
                </div>

                 <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Vai trò:</span>
                        {ROLE_FILTERS.map(role => (
                            <button key={role} onClick={() => { setActiveRole(role); setCurrentPage(1); }} className={`px-3 py-1 rounded-full text-xs font-medium ${activeRole === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{role}</button>
                        ))}
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Trạng thái:</span>
                        {STATUS_FILTERS.map(status => (
                            <button key={status} onClick={() => { setActiveStatus(status); setCurrentPage(1); }} className={`px-3 py-1 rounded-full text-xs font-medium ${activeStatus === status ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{status}</button>
                        ))}
                    </div>
                </div>

                <UsersTable users={paginatedUsers} onEdit={handleEdit} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            {isModalOpen && (
                <UserFormModal isOpen={isModalOpen} onClose={() => { setModalOpen(false); setEditingUser(null); }} onSave={handleSave} user={editingUser} />
            )}
        </div>
    );
};

// Component for Studio Settings
const StudioSettings: React.FC = () => (
    <div className="mt-6 space-y-6 bg-white p-6 rounded-lg border">
         <h3 className="text-xl font-semibold text-gray-800 mb-6">Thông tin Studio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Tên studio</label>
                <input type="text" defaultValue="CRM Studio" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" defaultValue="info@crmstudio.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
            <input type="text" defaultValue="123 Đường ABC, Quận 1, TP.HCM" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
         <div className="pt-5 flex justify-end">
            <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">Lưu thay đổi</button>
        </div>
    </div>
);

// Main Settings Page Component
type SettingsTab = 'profile' | 'users' | 'studio' | 'integrations';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const tabs = useMemo(() => {
        const availableTabs: { id: SettingsTab; label: string }[] = [
            { id: 'profile', label: 'Hồ sơ' },
        ];
        if (user?.role === UserRole.ADMIN) {
            availableTabs.push({ id: 'users', label: 'Người dùng' });
        }
        availableTabs.push({ id: 'studio', label: 'Studio' });
        return availableTabs;
    }, [user]);

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'users': return <UsersManagement />;
            case 'studio': return <StudioSettings />;
            default: return null;
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
             <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            {renderContent()}
        </div>
    );
};

export default SettingsPage;