import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../components/Icons';
import { mockUsers } from '../data/mockData';
import { User, UserRole, StaffStatus } from '../types';
import Pagination from '../components/ui/Pagination';
import UsersTable from '../components/users/UsersTable';
import UserFormModal from '../components/users/UserFormModal';

const ROLE_FILTERS = ['Tất cả', ...Object.values(UserRole)];
const STATUS_FILTERS = ['Tất cả', ...Object.values(StaffStatus)];
const ITEMS_PER_PAGE = 10;

const UsersPage: React.FC = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [activeRole, setActiveRole] = useState('Tất cả');
    const [activeStatus, setActiveStatus] = useState('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    if (user?.role !== UserRole.ADMIN) {
        return (
             <div className="flex flex-col items-center justify-center text-center text-gray-500 h-[60vh]">
                <Icons.AlertCircle className="w-24 h-24 mb-4 text-red-300" />
                <h1 className="text-2xl font-semibold text-gray-700">Truy cập bị từ chối</h1>
                <p className="mt-2">Bạn không có quyền truy cập trang này. Chỉ ADMIN mới có thể quản lý người dùng.</p>
            </div>
        )
    }

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const roleMatch = activeRole === 'Tất cả' || u.role === activeRole;
            const statusMatch = activeStatus === 'Tất cả' || u.status === activeStatus;
            const searchMatch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                u.email.toLowerCase().includes(searchTerm.toLowerCase());
            return roleMatch && statusMatch && searchMatch;
        });
    }, [users, activeRole, activeStatus, searchTerm]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const handleSave = (userToSave: User) => {
        if (editingUser) {
            setUsers(users.map(u => u.id === userToSave.id ? userToSave : u));
        } else {
            setUsers([...users, {...userToSave, id: (users.length + 1).toString()}]);
        }
        setModalOpen(false);
        setEditingUser(null);
    };

    const handleEdit = (userToEdit: User) => {
        setEditingUser(userToEdit);
        setModalOpen(true);
    };

    return (
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                     <div className="relative w-full md:w-1/3">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm theo tên, email..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>
                     <button onClick={() => { setEditingUser(null); setModalOpen(true); }} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 w-full md:w-auto">
                        <Icons.Add className="h-4 w-4 mr-2" />
                        Thêm người dùng
                    </button>
                </div>

                 <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Vai trò:</span>
                        {ROLE_FILTERS.map(role => (
                            <button key={role} onClick={() => { setActiveRole(role); setCurrentPage(1); }} className={`px-3 py-1 rounded-full text-xs font-medium ${activeRole === role ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {role}
                            </button>
                        ))}
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Trạng thái:</span>
                        {STATUS_FILTERS.map(status => (
                            <button key={status} onClick={() => { setActiveStatus(status); setCurrentPage(1); }} className={`px-3 py-1 rounded-full text-xs font-medium ${activeStatus === status ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <UsersTable users={paginatedUsers} onEdit={handleEdit} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            {isModalOpen && (
                <UserFormModal 
                    isOpen={isModalOpen}
                    onClose={() => { setModalOpen(false); setEditingUser(null); }}
                    onSave={handleSave}
                    user={editingUser}
                />
            )}
        </div>
    );
};

export default UsersPage;