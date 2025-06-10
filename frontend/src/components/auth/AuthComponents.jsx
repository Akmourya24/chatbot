import React, { useState } from 'react';
import { Github, Facebook } from 'lucide-react';
import { AuthForm } from './AuthFrom';

// Input Field Component


// Social Login Button Component
const SocialButton = ({ provider, onClick, icon: Icon, className = "", children }) => {
  return (
    <button 
      onClick={() => onClick(provider)}
      className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-md font-medium ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

// Google Login Button Component
const GoogleButton = ({ onClick }) => {
  return (
    <button 
      onClick={() => onClick('Google')}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-md"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span className="font-medium text-gray-700 group-hover:text-gray-900">Continue with Google</span>
    </button>
  );
};

// Social Login Section Component
const SocialLoginSection = ({ onSocialLogin }) => {
  return (
    <div className="space-y-3 mb-6">
      <GoogleButton onClick={onSocialLogin} />
      
      <div className="flex gap-3">
        <SocialButton
          provider="Facebook"
          onClick={onSocialLogin}
          icon={Facebook}
          className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
        >
          Facebook
        </SocialButton>
        
        <SocialButton
          provider="GitHub"
          onClick={onSocialLogin}
          icon={Github}
          className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
        >
          GitHub
        </SocialButton>
      </div>
    </div>
  );
};

// Loading Button Component


// Auth Header Component
const AuthHeader = ({ isLogin }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h1>
      <p className="text-gray-600">
        {isLogin ? 'Sign in to your account' : 'Join us today'}
      </p>
    </div>
  );
};

// Auth Form Component


// Background Animation Component
const BackgroundAnimation = () => {
  return (
    <>
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </>
  );
};

// Divider Component
const Divider = ({ text = "or" }) => {
  return (
    <div className="relative flex items-center justify-center mb-6">
      <div className="border-t border-gray-300 w-full"></div>
      <span className="bg-white px-4 text-sm text-gray-500">{text}</span>
    </div>
  );
};

// Auth Switch Component
const AuthSwitch = ({ isLogin, onSwitch }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          onClick={onSwitch}
          className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};

// Main Auth Component
const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    setTimeout(() => {
      console.log(isLogin ? 'Login' : 'Register', formData);
      alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    alert(`${provider} login would be implemented here`);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
        
        <BackgroundAnimation />
        
        <div className="relative z-10">
          <AuthHeader isLogin={isLogin} />
          
          <SocialLoginSection onSocialLogin={handleSocialLogin} />
          
          <Divider />
          
          <AuthForm
            isLogin={isLogin}
            formData={formData}
            errors={errors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onInputChange={handleInputChange}
            onTogglePassword={() => setShowPassword(!showPassword)}
            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <AuthSwitch isLogin={isLogin} onSwitch={switchMode} />
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;