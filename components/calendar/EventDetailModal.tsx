import React from 'react';
import { Project } from '../../types';
import { Icons } from '../Icons';

interface EventDetailModalProps {
    event: Project;
    isOpen: boolean;
    onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <Icons.Close className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4 text-gray-600">
                    <p><strong className="font-medium text-gray-900">Khách hàng:</strong> {event.client}</p>
                    <p><strong className="font-medium text-gray-900">Thời gian:</strong> {new Date(event.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong className="font-medium text-gray-900">Tổng giá:</strong> {event.price.toLocaleString('vi-VN')} đ</p>
                     <div>
                        <strong className="font-medium text-gray-900">Nhóm thực hiện:</strong>
                        <ul className="list-disc list-inside mt-1">
                            {event.team.map(member => (
                                <li key={member.id}>{member.firstName} {member.lastName}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Đóng</button>
                     <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90">Xem dự án</button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;