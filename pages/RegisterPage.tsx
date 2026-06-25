import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icons } from '../components/Icons';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }
        // Add more validation here based on wireframe
        console.log('Registering user:', formData);
        // Mock success and redirect
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
                <div className="text-center">
                    <Icons.Logo className="mx-auto h-12 w-auto text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Tạo tài khoản mới
                    </h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && <p className="text-sm text-red-600 text-center">⚠️ {error}</p>}
                     <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">Họ</label>
                            <input id="firstName" name="firstName" type="text" required minLength={2} value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div className="flex-1">
                             <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Tên</label>
                            <input id="lastName" name="lastName" type="text" required minLength={2} value={formData.lastName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input id="password" name="password" type="password" required minLength={8} value={formData.password} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword"  className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Đăng ký
                    </button>
                </form>
                 <p className="text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
