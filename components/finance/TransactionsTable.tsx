import React from 'react';
import { Transaction } from '../../types';
import { Icons } from '../Icons';

interface TransactionsTableProps {
    transactions: Transaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
    return (
        <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-gray-500 mt-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Loại</th>
                        <th scope="col" className="px-6 py-3">Mô tả</th>
                        <th scope="col" className="px-6 py-3">Danh mục</th>
                        <th scope="col" className="px-6 py-3">Khách hàng</th>
                        <th scope="col" className="px-6 py-3">Ngày</th>
                        <th scope="col" className="px-6 py-3 text-right">Số tiền</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    t.type === 'Thu nhập' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {t.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{t.description}</td>
                            <td className="px-6 py-4">{t.category}</td>
                            <td className="px-6 py-4">{t.client || '-'}</td>
                            <td className="px-6 py-4">{new Date(t.date).toLocaleDateString('vi-VN')}</td>
                            <td className={`px-6 py-4 text-right font-semibold ${t.type === 'Thu nhập' ? 'text-green-600' : 'text-red-600'}`}>
                                {t.type === 'Thu nhập' ? '+' : '-'} {t.amount.toLocaleString('vi-VN')} đ
                            </td>
                            <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end space-x-1">
                                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"><Icons.Edit className="w-4 h-4" /></button>
                                    <button className="p-2 text-gray-500 hover:text-error hover:bg-gray-100 rounded-full"><Icons.Trash className="w-4 h-4" /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    );
};

export default TransactionsTable;