
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const getPageTitle = (pathname: string): string => {
    switch (pathname) {
        case '/': return 'Dashboard';
        case '/projects': return 'Dự án';
        case '/customers': return 'Khách hàng';
        case '/staff': return 'Nhân viên';
        case '/finance': return 'Tài chính';
        case '/calendar': return 'Lịch';
        case '/packages': return 'Gói dịch vụ';
        case '/settings': return 'Cài đặt';
        default: return 'CRM Studio';
    }
};

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const pageTitle = getPageTitle(location.pathname);
    
    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleSidebarCollapse = () => setSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Sidebar 
              isSidebarOpen={isSidebarOpen} 
              isCollapsed={isSidebarCollapsed} 
              toggleCollapse={toggleSidebarCollapse}
            />
             {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 z-10 lg:hidden"></div>}
        </div>
    );
};

export default MainLayout;