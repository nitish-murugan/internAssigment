import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // Simulate authentication
    const user = {
      id: '1',
      name: data.name || 'John Doe',
      email: data.email,
      phone: data.phone || '555-0123',
      addresses: [],
      loyaltyPoints: 0
    };

    login(user);
    toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <Card className="auth-card">
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Sign in to your account' : 'Sign up to get started'}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {!isLogin && (
              <Input
                label="Full Name"
                name="name"
                icon={<User size={20} />}
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              icon={<Mail size={20} />}
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address'
                }
              })}
            />

            {!isLogin && (
              <Input
                label="Phone"
                type="tel"
                name="phone"
                icon={<Phone size={20} />}
                placeholder="Enter your phone number"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone is required' })}
              />
            )}

            <Input
              label="Password"
              type="password"
              name="password"
              icon={<Lock size={20} />}
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button type="submit" fullWidth size="large">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path fill="#4285F4" d="M19.6 10.2c0-.7-.1-1.4-.2-2H10v3.8h5.4c-.2 1.2-1 2.2-2.1 2.9v2.5h3.4c2-1.8 3.1-4.5 3.1-7.2z"/>
                <path fill="#34A853" d="M10 20c2.8 0 5.1-.9 6.8-2.5l-3.4-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H.9v2.6C2.6 17.9 6.1 20 10 20z"/>
                <path fill="#FBBC04" d="M4.4 11.9c-.4-1.2-.4-2.5 0-3.7V5.6H.9C-.3 7.9-.3 10.6.9 12.9l3.5-1z"/>
                <path fill="#EA4335" d="M10 4c1.4 0 2.7.5 3.7 1.4l2.8-2.8C14.1.9 12.1 0 10 0 6.1 0 2.6 2.1.9 5.6l3.5 2.6C5.2 5.8 7.4 4 10 4z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="auth-switch">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button onClick={() => {
                  setIsLogin(false);
                  reset();
                }}>
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={() => {
                  setIsLogin(true);
                  reset();
                }}>
                  Sign in
                </button>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
