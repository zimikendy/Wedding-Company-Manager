import React from 'react';
import { User, UserRole, StaffStatus } from '../../types';
import { Icons } from '../Icons';

interface UsersTableProps {
    users: User[];
    onEdit: (user: User) => void;
}

const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
        case UserRole.ADMIN: return 'bg-red-100 text-red-800';
        case UserRole.MANAGER: return 'bg-blue-100 text-blue-800';
        case UserRole.USER: return 'bg-green-100 text-green-800';
        case UserRole.VIEWER: return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit }) => {
    return (
        <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Họ & Tên</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Vai trò</th>
                        <th scope="col" className="px-6 py-3">Trạng thái</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatarUrl} alt={user.firstName} className="w-8 h-8 rounded-full" />
                                    <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>{user.role}</span>
                            </td>
                             <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === StaffStatus.ACTIVE ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>{user.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => onEdit(user)} className="font-medium text-primary hover:underline">Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    );
};

export default UsersTable;