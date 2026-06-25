import React from 'react';
import { User, UserRole, StaffStatus } from '../../types';
import { Icons } from '../Icons';

interface StaffCardProps {
    staffMember: User;
    onEdit: (staffMember: User) => void;
}

const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
        case UserRole.ADMIN: return 'bg-red-100 text-red-800';
        case UserRole.MANAGER: return 'bg-blue-100 text-blue-800';
        case UserRole.USER: return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const StaffCard: React.FC<StaffCardProps> = ({ staffMember, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col group transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center space-x-4">
                <img src={staffMember.avatarUrl} alt={`${staffMember.firstName} ${staffMember.lastName}`} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{staffMember.firstName} {staffMember.lastName}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getRoleBadgeColor(staffMember.role)}`}>{staffMember.role}</span>
                </div>
                 <span className={`px-2 py-1 text-xs font-medium rounded-full ${staffMember.status === StaffStatus.ACTIVE ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {staffMember.status}
                </span>
            </div>
            <div className="mt-4 text-sm text-gray-500 space-y-2 flex-grow">
                <p className="flex items-center"><Icons.Profile className="w-4 h-4 mr-2" /> {staffMember.email}</p>
                 {staffMember.rate && (
                     <p className="flex items-center font-semibold text-primary"><Icons.DollarSign className="w-4 h-4 mr-2 text-gray-400" /> {staffMember.rate.toLocaleString('vi-VN')} đ / {staffMember.rateType}</p>
                 )}
            </div>
             <div className="mt-6 border-t border-gray-200 w-full pt-4 flex justify-end space-x-2">
                <button onClick={() => onEdit(staffMember)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md text-sm font-medium flex items-center"><Icons.Edit className="w-4 h-4 mr-1" /> Sửa</button>
            </div>
        </div>
    );
};

export default StaffCard;