
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Icons } from '../Icons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    toggleSidebar: () => void;
    pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="hidden sm:flex items-center justify-center bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                    <Icons.Add className="h-4 w-4 mr-2" />
                    Tạo dự án
                </button>

                {user && (
                    <div className="relative group">
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <img src={user.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full" />
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                        </div>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-30">
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                <Icons.Logout className="h-4 w-4 mr-2" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}

                <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-full hover:bg-gray-100">
                    <Icons.Menu className="h-6 w-6 text-gray-600" />
                </button>
            </div>
        </header>
    );
};

export default Header;