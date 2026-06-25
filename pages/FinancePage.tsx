import React, { useState, useMemo } from 'react';
import { Icons } from '../components/Icons';
import StatCard from '../components/ui/StatCard';
import { mockTransactions } from '../data/mockData';
import { Transaction } from '../types';
import Pagination from '../components/ui/Pagination';
import TransactionsTable from '../components/finance/TransactionsTable';
import TransactionFormModal from '../components/finance/TransactionFormModal';

const TRANSACTION_FILTERS = ['Tất cả', 'Thu nhập', 'Chi phí'];
const ITEMS_PER_PAGE = 10;

const FinancePage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    const summary = useMemo(() => {
        return transactions.reduce((acc, t) => {
            if (t.type === 'Thu nhập') acc.income += t.amount;
            else acc.expense += t.amount;
            return acc;
        }, { income: 0, expense: 0, profit: 0 });
    }, [transactions]);
    summary.profit = summary.income - summary.expense;
    
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const filterMatch = activeFilter === 'Tất cả' || t.type === activeFilter;
            const searchMatch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (t.client && t.client.toLowerCase().includes(searchTerm.toLowerCase()));
            return filterMatch && searchMatch;
        });
    }, [activeFilter, searchTerm, transactions]);

     const paginatedTransactions = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredTransactions, currentPage]);

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    
    const handleSaveTransaction = (transaction: Transaction) => {
        setTransactions([...transactions, {...transaction, id: (transactions.length+1).toString()}]);
        setModalOpen(false);
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* Fix: Replaced incorrect `icon` and `colorClass` props with `iconName`, `iconBgColor`, and `iconColor` to match `StatCardProps`. */}
                 <StatCard title="Thực thu" value={`${summary.income.toLocaleString('vi-VN')} đ`} iconName="ArrowUp" description="Tổng thu nhập" iconBgColor="bg-green-500" iconColor="text-white" />
                 {/* Fix: Replaced incorrect `icon` and `colorClass` props with `iconName`, `iconBgColor`, and `iconColor` to match `StatCardProps`. */}
                 <StatCard title="Chi phí" value={`${summary.expense.toLocaleString('vi-VN')} đ`} iconName="ArrowDown" description="Tổng chi phí" iconBgColor="bg-red-500" iconColor="text-white" />
                 {/* Fix: Replaced incorrect `icon` and `colorClass` props with `iconName`, `iconBgColor`, and `iconColor` to match `StatCardProps`. */}
                 <StatCard title="Lợi nhuận" value={`${summary.profit.toLocaleString('vi-VN')} đ`} iconName="DollarSign" description="Thu nhập - Chi phí" iconBgColor="bg-blue-500" iconColor="text-white" />
                 {/* Fix: Replaced incorrect `icon` and `colorClass` props with `iconName`, `iconBgColor`, and `iconColor` to match `StatCardProps`. */}
                 <StatCard title="Giao dịch" value={transactions.length.toString()} iconName="FileText" description="Tổng số giao dịch" iconBgColor="bg-gray-500" iconColor="text-white" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                     <div className="relative w-full md:w-1/3">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm theo mô tả, khách hàng..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                     <button onClick={() => setModalOpen(true)} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors w-full md:w-auto">
                        <Icons.Add className="h-4 w-4 mr-2" />
                        Thêm giao dịch
                    </button>
                </div>

                 <div className="border-b border-gray-200">
                    <div className="flex space-x-4">
                        {TRANSACTION_FILTERS.map(filter => (
                            <button
                                key={filter}
                                onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${activeFilter === filter ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <TransactionsTable transactions={paginatedTransactions} />

                 <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            
            {isModalOpen && (
                <TransactionFormModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveTransaction}
                />
            )}
        </div>
    );
};

export default FinancePage;