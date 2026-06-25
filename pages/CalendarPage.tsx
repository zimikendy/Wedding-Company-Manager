import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import EventDetailModal from '../components/calendar/EventDetailModal';

const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Project | null>(null);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(<div key={`empty-start-${i}`} className="border-r border-b p-2 h-28"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === new Date().toDateString();
        const projectsOnDay = mockProjects.filter(p => new Date(p.date).toDateString() === date.toDateString());

        calendarDays.push(
            <div key={day} className="border-r border-b p-2 h-28 overflow-y-auto">
                <div className={`text-sm ${isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center font-bold' : ''}`}>{day}</div>
                <div className="mt-1 space-y-1">
                    {projectsOnDay.map(p => (
                        <button key={p.id} onClick={() => setSelectedEvent(p)} className="text-left w-full bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs truncate hover:bg-blue-200">
                           {p.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
    const remainingCells = 42 - calendarDays.length;
     for (let i = 0; i < remainingCells; i++) {
        calendarDays.push(<div key={`empty-end-${i}`} className="border-r border-b p-2 h-28"></div>);
    }

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    
    const goToToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center space-x-2">
                    <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100"><Icons.ChevronLeft className="w-5 h-5" /></button>
                     <h2 className="text-xl font-semibold w-40 text-center">{currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100"><Icons.ChevronRight className="w-5 h-5" /></button>
                    <button onClick={goToToday} className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">Hôm nay</button>
                </div>
                 <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium border rounded-md bg-primary text-white">Tháng</button>
                    <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">Tuần</button>
                    <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">Ngày</button>
                    <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50">Danh sách</button>
                     {/* Fix: Moved title attribute to the parent button element to resolve prop type error. */}
                     <button className="p-2 rounded-full hover:bg-gray-100" title="Sync Google Calendar"><Icons.Sync className="w-5 h-5 text-gray-600" /></button>
                </div>
            </div>
            <div className="grid grid-cols-7 border-t border-l">
                {daysOfWeek.map(day => <div key={day} className="text-center font-medium p-2 border-r border-b text-sm text-gray-600">{day}</div>)}
                {calendarDays}
            </div>
            {selectedEvent && (
                <EventDetailModal 
                    event={selectedEvent}
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default CalendarPage;