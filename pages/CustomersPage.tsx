import React, { useState, useMemo } from 'react';
import { Icons } from '../components/Icons';
import { mockCustomers } from '../data/mockData';
import { Customer, CustomerSource } from '../types';
import CustomerCard from '../components/customers/CustomerCard';
import Pagination from '../components/ui/Pagination';
import CustomerFormModal from '../components/customers/CustomerFormModal';
import OcrUploadModal from '../components/customers/OcrUploadModal';

const SOURCE_FILTERS: (CustomerSource | 'Tất cả')[] = [
    'Tất cả',
    CustomerSource.FACEBOOK,
    CustomerSource.GOOGLE,
    CustomerSource.REFERRAL,
    CustomerSource.WEBSITE,
    CustomerSource.OTHER,
];

const ITEMS_PER_PAGE = 8;

const CustomersPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [activeSource, setActiveSource] = useState<CustomerSource | 'Tất cả'>('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormModalOpen, setFormModalOpen] = useState(false);
    const [isOcrModalOpen, setOcrModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            const sourceMatch = activeSource === 'Tất cả' || customer.source === activeSource;
            const searchMatch = `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                customer.phone.includes(searchTerm);
            return sourceMatch && searchMatch;
        });
    }, [activeSource, searchTerm, customers]);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredCustomers, currentPage]);

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);

    const handleSaveCustomer = (customer: Customer) => {
        if (editingCustomer) {
            setCustomers(customers.map(c => c.id === customer.id ? customer : c));
        } else {
            setCustomers([...customers, { ...customer, id: (customers.length + 1).toString() }]);
        }
        setFormModalOpen(false);
        setEditingCustomer(null);
    };
    
    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email, SĐT..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                     <button onClick={() => setOcrModalOpen(true)} className="flex items-center justify-center bg-white border border-primary text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/5 transition-colors">
                        <Icons.UploadCloud className="h-4 w-4 mr-2" />
                        Tạo từ ảnh
                    </button>
                    <button onClick={() => { setEditingCustomer(null); setFormModalOpen(true); }} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Icons.Add className="h-4 w-4 mr-2" />
                        Thêm khách hàng
                    </button>
                </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
                {SOURCE_FILTERS.map(source => (
                    <button
                        key={source}
                        onClick={() => { setActiveSource(source); setCurrentPage(1); }}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${activeSource === source ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        {source}
                    </button>
                ))}
            </div>

            {paginatedCustomers.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {paginatedCustomers.map(customer => <CustomerCard key={customer.id} customer={customer} onEdit={handleEdit} />)}
                    </div>
                    
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="text-center py-16">
                    <Icons.Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy khách hàng</h3>
                    <p className="mt-1 text-sm text-gray-500">Thử thay đổi bộ lọc hoặc thêm khách hàng mới.</p>
                </div>
            )}

            {isFormModalOpen && (
                <CustomerFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => { setFormModalOpen(false); setEditingCustomer(null); }}
                    onSave={handleSaveCustomer}
                    customer={editingCustomer}
                />
            )}
             {isOcrModalOpen && (
                <OcrUploadModal
                    isOpen={isOcrModalOpen}
                    onClose={() => setOcrModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CustomersPage;