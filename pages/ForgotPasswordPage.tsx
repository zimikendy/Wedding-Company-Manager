import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/Icons';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock API call
        console.log('Sending password reset link to:', email);
        setIsSent(true);
    };

    return (
         <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
                <div className="text-center">
                    <Icons.Logo className="mx-auto h-12 w-auto text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Quên mật khẩu?
                    </h2>
                </div>
                {isSent ? (
                    <div className="text-center space-y-4">
                        <Icons.CheckCircle className="mx-auto h-12 w-12 text-success" />
                        <h3 className="text-lg font-medium text-gray-900">Đã gửi email!</h3>
                        <p className="text-sm text-gray-600">Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn trong email.</p>
                        <Link to="/login" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                            Quay lại đăng nhập
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="text-center text-sm text-gray-600">Nhập email của bạn để nhận link đặt lại mật khẩu</p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                                Gửi link đặt lại
                            </button>
                        </form>
                        <p className="text-center text-sm">
                             <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                                Quay lại đăng nhập
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
