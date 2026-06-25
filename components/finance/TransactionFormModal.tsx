import React, { useState } from 'react';
import { Transaction } from '../../types';
import { Icons } from '../Icons';

interface TransactionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
}

const incomeCategories = ['Tiền cọc', 'Thanh toán cuối', 'Bán sản phẩm', 'Khác'];
const expenseCategories = ['Thiết bị', 'Marketing', 'Nhân sự', 'Chi phí cố định', 'Văn phòng phẩm', 'Khác'];

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({ isOpen, onClose, onSave }) => {
    const [type, setType] = useState<'Thu nhập' | 'Chi phí'>('Thu nhập');
    const [category, setCategory] = useState(incomeCategories[0]);
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [client, setClient] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ type, category, amount, description, date, client: type === 'Thu nhập' ? client : null });
    };
    
    const handleTypeChange = (newType: 'Thu nhập' | 'Chi phí') => {
        setType(newType);
        setCategory(newType === 'Thu nhập' ? incomeCategories[0] : expenseCategories[0]);
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Thêm giao dịch mới</h3>
                    <button onClick={onClose}><Icons.Close className="w-6 h-6 text-gray-400 hover:text-gray-600" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại giao dịch</label>
                            <div className="flex rounded-md shadow-sm">
                                <button type="button" onClick={() => handleTypeChange('Thu nhập')} className={`px-4 py-2 rounded-l-md border text-sm font-medium flex-1 ${type === 'Thu nhập' ? 'bg-primary text-white border-primary z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Thu nhập</button>
                                <button type="button" onClick={() => handleTypeChange('Chi phí')} className={`-ml-px px-4 py-2 rounded-r-md border text-sm font-medium flex-1 ${type === 'Chi phí' ? 'bg-primary text-white border-primary z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Chi phí</button>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Số tiền</label>
                                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Ngày</label>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                {(type === 'Thu nhập' ? incomeCategories : expenseCategories).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        {type === 'Thu nhập' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Khách hàng (Tùy chọn)</label>
                                <input type="text" value={client} onChange={e => setClient(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                        )}
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

export default TransactionFormModal;
