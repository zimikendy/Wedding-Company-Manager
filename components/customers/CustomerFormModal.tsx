import React, { useState, useEffect } from 'react';
import { Customer, CustomerSource } from '../../types';
import { Icons } from '../Icons';

interface CustomerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (customer: Customer) => void;
    customer: Customer | null;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ isOpen, onClose, onSave, customer }) => {
    const [formData, setFormData] = useState<Omit<Customer, 'id' | 'projectCount' | 'avatarUrl'>>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        source: CustomerSource.OTHER,
    });

    useEffect(() => {
        if (customer) {
            setFormData({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                source: customer.source,
            });
        } else {
            setFormData({
                firstName: '', lastName: '', email: '', phone: '', source: CustomerSource.OTHER,
            });
        }
    }, [customer, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const customerToSave: Customer = {
            ...customer,
            id: customer?.id || '',
            ...formData,
            projectCount: customer?.projectCount || 0,
            avatarUrl: customer?.avatarUrl || `https://i.pravatar.cc/150?u=${formData.email}`,
        };
        onSave(customerToSave);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{customer ? 'Sửa thông tin khách hàng' : 'Thêm khách hàng mới'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <Icons.Close className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div className="flex space-x-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Họ</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nguồn</label>
                            <select name="source" value={formData.source} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                {Object.values(CustomerSource).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Hủy</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerFormModal;
