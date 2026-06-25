import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../components/Icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@crmstudio.com');
  const [password, setPassword] = useState('password');
  const [status, setStatus] = useState<'default' | 'loading' | 'error' | 'success'>('default');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    // Mock API call
    setTimeout(() => {
      const loggedInUser = login(email, password);
      if (loggedInUser) {
        setStatus('success');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setStatus('error');
        setError('Email hoặc mật khẩu không đúng');
      }
    }, 1000);
  };

  const renderButtonContent = () => {
    switch(status) {
      case 'loading':
        return <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang đăng nhập...</>;
      case 'success':
        return <>✅ Đăng nhập thành công!</>;
      default:
        return 'Đăng nhập';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="text-center">
            <Icons.Logo className="mx-auto h-12 w-auto text-primary" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                CRM Studio
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Đăng nhập vào tài khoản của bạn
            </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password"  className="text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ghi nhớ đăng nhập</label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary/80">Quên mật khẩu?</Link>
            </div>
          </div>
          
          {status === 'error' && <p className="text-sm text-red-600 text-center">⚠️ {error}</p>}
          {status === 'success' && <p className="text-sm text-green-600 text-center">Đang chuyển đến Dashboard...</p>}

          <div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {renderButtonContent()}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                Đăng ký
            </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
