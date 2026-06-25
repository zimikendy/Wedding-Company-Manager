import React, { useState } from 'react';
import StatCard from '../components/ui/StatCard';
import { Icons } from '../components/Icons';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type Tab = 'overview' | 'finance' | 'operations';

const revenueData = [
  { name: 'Jan', DoanhThu: 4000 }, { name: 'Feb', DoanhThu: 3000 },
  { name: 'Mar', DoanhThu: 5000 }, { name: 'Apr', DoanhThu: 4500 },
  { name: 'May', DoanhThu: 6000 }, { name: 'Jun', DoanhThu: 5500 },
  { name: 'Jul', DoanhThu: 5800 }, { name: 'Aug', DoanhThu: 6200 },
];

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    const renderTabs = () => (
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`whitespace-nowrap pb-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Tổng quan
                </button>
                <button
                    onClick={() => setActiveTab('finance')}
                    className={`whitespace-nowrap pb-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'finance' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Tài chính
                </button>
                <button
                    onClick={() => setActiveTab('operations')}
                    className={`whitespace-nowrap pb-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'operations' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Hoạt động
                </button>
            </nav>
        </div>
    );
    
    const renderOverview = () => (
        <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Tổng doanh thu" value="$500,000" iconName="DollarSign" change="+12%" changeType="increase" description="so với tháng trước" iconBgColor="bg-green-100" iconColor="text-green-600" />
                <StatCard title="Tổng dự án" value="45" iconName="Briefcase" description="15 đang hoạt động" iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                <StatCard title="Tổng khách hàng" value="120" iconName="Users" change="+5" changeType="increase" description="tháng này" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
                <StatCard title="Tổng phải thu" value="$30,000" iconName="FileText" description="" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Báo giá đang chờ" value="8" iconName="FileText" description="" iconBgColor="bg-gray-100" iconColor="text-gray-600" />
                <StatCard title="Dự án sắp tới" value="5" iconName="Calendar" description="trong 7 ngày tới" iconBgColor="bg-gray-100" iconColor="text-gray-600" />
                <StatCard title="Tiền cọc đang chờ" value="$10,000" iconName="DollarSign" description="3 hóa đơn" iconBgColor="bg-gray-100" iconColor="text-gray-600" />
                <StatCard title="Tỷ lệ chuyển đổi" value="75%" iconName="Percent" change="+5%" changeType="increase" description="so với tháng trước" iconBgColor="bg-gray-100" iconColor="text-gray-600" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Biểu đồ doanh thu</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <YAxis tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '0.75rem',
                            borderColor: '#e5e7eb',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                          }}
                        />
                        <Line type="monotone" dataKey="DoanhThu" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
    
    // Placeholder content for other tabs
    const renderOtherTabs = () => (
         <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm mt-6">
            <p className="text-gray-500">Nội dung đang được cập nhật.</p>
        </div>
    );

    return (
        <div>
            {renderTabs()}
            {activeTab === 'overview' ? renderOverview() : renderOtherTabs()}
        </div>
    );
};

export default DashboardPage;