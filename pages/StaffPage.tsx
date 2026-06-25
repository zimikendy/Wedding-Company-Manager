import React, { useState, useMemo } from 'react';
import { Icons } from '../components/Icons';
import { mockUsers } from '../data/mockData';
// Fix: Import `UserRole` to resolve reference error.
import { User, StaffStatus, UserRole } from '../types';
import StaffCard from '../components/staff/StaffCard';
import Pagination from '../components/ui/Pagination';
import StaffFormModal from '../components/staff/StaffFormModal';

const ITEMS_PER_PAGE = 9;

const StaffPage: React.FC = () => {
    const [staff, setStaff] = useState<User[]>(mockUsers.filter(u => u.role !== UserRole.VIEWER)); // Simple filter for staff
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<User | null>(null);

    const filteredStaff = useMemo(() => {
        return staff.filter(member =>
            `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, staff]);

    const paginatedStaff = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredStaff.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredStaff, currentPage]);

    const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);

    const handleSave = (member: User) => {
        if (editingStaff) {
            setStaff(staff.map(s => s.id === member.id ? member : s));
        } else {
            setStaff([...staff, { ...member, id: (staff.length + 1).toString() }]);
        }
        setModalOpen(false);
        setEditingStaff(null);
    };

    const handleEdit = (member: User) => {
        setEditingStaff(member);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button onClick={() => { setEditingStaff(null); setModalOpen(true); }} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Icons.Add className="h-4 w-4 mr-2" />
                    Thêm nhân viên
                </button>
            </div>

            {paginatedStaff.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedStaff.map(member => <StaffCard key={member.id} staffMember={member} onEdit={handleEdit} />)}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center py-16">
                    <Icons.Staff className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy nhân viên</h3>
                    <p className="mt-1 text-sm text-gray-500">Thử lại với từ khóa khác hoặc thêm nhân viên mới.</p>
                </div>
            )}
            
            {isModalOpen && (
                <StaffFormModal 
                    isOpen={isModalOpen}
                    onClose={() => { setModalOpen(false); setEditingStaff(null); }}
                    onSave={handleSave}
                    staffMember={editingStaff}
                />
            )}
        </div>
    );
};

export default StaffPage;