import React, { useState, useEffect } from 'react';
import { Package, ServiceItem } from '../../types';
import { Icons } from '../Icons';

interface PackageFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (pkg: Package) => void;
    pkg: Package | null;
}

const PackageFormModal: React.FC<PackageFormModalProps> = ({ isOpen, onClose, onSave, pkg }) => {
    const [formData, setFormData] = useState<Omit<Package, 'id' | 'totalPrice'>>({
        name: '', category: 'Cưới', description: '', services: [], isActive: true
    });

    useEffect(() => {
        if (pkg) {
            setFormData(pkg);
        } else {
             setFormData({ name: '', category: 'Cưới', description: '', services: [{name: '', quantity: 1, price: 0}], isActive: true });
        }
    }, [pkg, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
             setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleServiceChange = (index: number, field: keyof ServiceItem, value: string | number) => {
        const newServices = [...formData.services];
        (newServices[index] as any)[field] = value;
        setFormData({...formData, services: newServices});
    }

    const addService = () => {
        setFormData({...formData, services: [...formData.services, {name: '', quantity: 1, price: 0}]});
    }
    
    const removeService = (index: number) => {
        const newServices = formData.services.filter((_, i) => i !== index);
        setFormData({...formData, services: newServices});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const totalPrice = formData.services.reduce((acc, s) => acc + s.price * s.quantity, 0);
        onSave({ ...formData, id: pkg?.id || '', totalPrice });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{pkg ? 'Sửa gói dịch vụ' : 'Thêm gói dịch vụ'}</h3>
                    <button onClick={onClose}><Icons.Close className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Tên gói</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Loại</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option>Cưới</option>
                                    <option>Event</option>
                                    <option>Portrait</option>
                                    <option>Sản phẩm</option>
                                    <option>Khác</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                        </div>
                         <div>
                            <h4 className="text-md font-semibold text-gray-800 mb-2">Dịch vụ</h4>
                            <div className="space-y-2">
                            {formData.services.map((service, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                                    <input type="text" placeholder="Tên dịch vụ" value={service.name} onChange={e => handleServiceChange(index, 'name', e.target.value)} className="w-1/2 border-gray-300 rounded-md shadow-sm" required/>
                                    <input type="number" placeholder="SL" value={service.quantity} onChange={e => handleServiceChange(index, 'quantity', parseInt(e.target.value) || 1)} className="w-1/6 border-gray-300 rounded-md shadow-sm" min="1" required/>
                                    <input type="number" placeholder="Giá" value={service.price} onChange={e => handleServiceChange(index, 'price', parseInt(e.target.value) || 0)} className="w-1/3 border-gray-300 rounded-md shadow-sm" min="0" required/>
                                    <button type="button" onClick={() => removeService(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Icons.Trash className="w-4 h-4"/></button>
                                </div>
                            ))}
                            </div>
                            <button type="button" onClick={addService} className="mt-2 text-sm font-medium text-primary hover:underline flex items-center gap-1"><Icons.Add className="w-4 h-4"/> Thêm dịch vụ</button>
                        </div>
                         <div className="flex items-center">
                            <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-primary border-gray-300 rounded" />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Kích hoạt</label>
                         </div>
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

export default PackageFormModal;