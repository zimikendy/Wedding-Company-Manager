
import React from 'react';
import { Icons } from '../components/Icons';

interface PlaceholderPageProps {
    title: string;
    icon: keyof typeof Icons;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, icon }) => {
    const IconComponent = Icons[icon];
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 h-[60vh]">
            <IconComponent className="w-24 h-24 mb-4 text-gray-300" />
            <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
            <p className="mt-2">Trang này đang được xây dựng.</p>
        </div>
    );
};

export default PlaceholderPage;
