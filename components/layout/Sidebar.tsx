import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { Icons, IconName } from '../Icons';

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'Dashboard', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.VIEWER] },
  { path: '/projects', label: 'Dự án', icon: 'Projects', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.VIEWER] },
  { path: '/customers', label: 'Khách hàng', icon: 'Customers', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.VIEWER] },
  { path: '/staff', label: 'Nhân viên', icon: 'Staff', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { path: '/finance', label: 'Tài chính', icon: 'Finance', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { path: '/calendar', label: 'Lịch', icon: 'Calendar', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.VIEWER] },
  { path: '/packages', label: 'Gói dịch vụ', icon: 'Packages', roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { path: '/settings', label: 'Cài đặt', icon: 'Settings', roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER] },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, isCollapsed, toggleCollapse }) => {
  const { user } = useAuth();
  const location = useLocation();

  const userNavItems = user ? navItems.filter(item => item.roles.includes(user.role)) : [];

  return (
    <aside className={`fixed z-20 inset-y-0 right-0 bg-white shadow-sm transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className={`flex items-center h-16 px-6 border-b border-gray-200 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <Icons.Logo className="h-8 w-8 text-primary" />
            {!isCollapsed && <span className="text-xl font-bold text-gray-900">CRM Studio</span>}
          </div>
        </div>
        
        <nav className="flex-1 py-4 space-y-1">
          {userNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = Icons[item.icon];
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-11 text-gray-600 hover:bg-gray-100 transition-colors rounded-lg ${isCollapsed ? 'justify-center mx-2' : 'mx-4 px-4'} ${isActive ? 'bg-primary text-white font-semibold shadow-sm hover:bg-primary/90' : ''}`}
                title={item.label}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200">
          <button onClick={toggleCollapse} className={`hidden lg:flex items-center w-full h-11 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isCollapsed ? 'justify-center mx-2' : 'mx-4 px-4'}`}>
            <Icons.ChevronRight className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            {!isCollapsed && <span className="ml-3 text-sm font-medium">Thu gọn</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;