import React from 'react';
import { Package } from '../../types';
import { Icons } from '../Icons';

interface PackageCardProps {
    pkg: Package;
    onEdit: (pkg: Package) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm flex flex-col">
            <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{pkg.category.toUpperCase()}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2">{pkg.name}</h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {pkg.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{pkg.description}</p>
            </div>
            <div className="p-6 flex-grow">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Dịch vụ bao gồm:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                    {pkg.services.map((service, index) => (
                        <li key={index} className="flex justify-between">
                            <span>• {service.name} (x{service.quantity})</span>
                            <span>{service.price.toLocaleString('vi-VN')} đ</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-lg flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Tổng giá</p>
                    <p className="text-2xl font-bold text-primary">{pkg.totalPrice.toLocaleString('vi-VN')} đ</p>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(pkg)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"><Icons.Edit className="w-4 h-4" /></button>
                     <button className="p-2 text-gray-500 hover:text-error hover:bg-gray-100 rounded-full"><Icons.Trash className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;