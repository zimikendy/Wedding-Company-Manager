import React from 'react';
import { ProjectStatus } from '../../types';

interface StatusBadgeProps {
    status: ProjectStatus;
}

const getStatusColor = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.CONTACT:
            return 'bg-gray-400 text-white';
        case ProjectStatus.PROPOSAL:
            return 'bg-orange-500 text-white';
        case ProjectStatus.SIGNED:
            return 'bg-blue-500 text-white';
        case ProjectStatus.DEPOSITED:
            return 'bg-green-500 text-white';
        case ProjectStatus.IN_PROCESS:
            return 'bg-purple-500 text-white';
        case ProjectStatus.FINAL_PAYMENT:
            return 'bg-yellow-400 text-yellow-900';
        case ProjectStatus.COMPLETE:
            return 'bg-teal-100 text-teal-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-md shadow ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;