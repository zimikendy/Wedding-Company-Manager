
import React from 'react';
import { Icons, IconName } from '../Icons';

interface StatCardProps {
    title: string;
    value: string;
    iconName: IconName;
    change?: string;
    changeType?: 'increase' | 'decrease';
    description: string;
    iconBgColor: string;
    iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, iconName, change, changeType, description, iconBgColor, iconColor }) => {
    const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
    const Icon = Icons[iconName];

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBgColor}`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                {change && (
                    <div className={`flex items-center text-xs font-semibold ${changeColor}`}>
                        <Icons.ArrowUp className="h-3 w-3 mr-1" />
                        <span>{change}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-gray-600 text-sm">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{description}</p>
            </div>
        </div>
    );
};

export default StatCard;