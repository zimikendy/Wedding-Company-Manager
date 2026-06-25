import React from 'react';
import { Customer, CustomerSource } from '../../types';
import { Icons } from '../Icons';

interface CustomerCardProps {
    customer: Customer;
    onEdit: (customer: Customer) => void;
}

const getSourceBadgeColor = (source: CustomerSource): string => {
    switch (source) {
        case CustomerSource.FACEBOOK: return 'bg-blue-100 text-blue-800';
        case CustomerSource.GOOGLE: return 'bg-green-100 text-green-800';
        case CustomerSource.REFERRAL: return 'bg-purple-100 text-purple-800';
        case CustomerSource.WEBSITE: return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm text-center p-6 flex flex-col items-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <img src={customer.avatarUrl} alt={`${customer.firstName} ${customer.lastName}`} className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-bold text-gray-800">{customer.firstName} {customer.lastName}</h3>
            <span className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${getSourceBadgeColor(customer.source)}`}>{customer.source}</span>
            <div className="mt-4 text-sm text-gray-500 space-y-1 flex-grow">
                <p className="flex items-center justify-center"><Icons.Profile className="w-4 h-4 mr-2" /> {customer.email}</p>
                <p className="flex items-center justify-center"><Icons.Phone className="w-4 h-4 mr-2" /> {customer.phone}</p>
                 <p className="flex items-center justify-center pt-2"><Icons.Projects className="w-4 h-4 mr-2" /> {customer.projectCount} dự án</p>
            </div>
             <div className="mt-6 border-t border-gray-200 w-full pt-4 flex justify-center space-x-2">
                <button onClick={() => onEdit(customer)} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"><Icons.Edit className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:text-error hover:bg-gray-100 rounded-full"><Icons.Trash className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

export default CustomerCard;