import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';

const ResetPasswordPage: React.FC = () => {
    // This would typically take a token from the URL
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
                 <div className="text-center">
                    <Icons.Logo className="mx-auto h-12 w-auto text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Đặt lại mật khẩu
                    </h2>
                </div>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
                        <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword"  className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                        Đặt lại mật khẩu
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
