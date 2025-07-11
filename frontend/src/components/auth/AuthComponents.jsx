import { useState } from 'react';
import { Github, Facebook, AlertCircle } from 'lucide-react';
import { AuthForm } from "./AuthFrom";

// Social Login Button Component
const SocialButton = ({ provider, onClick, icon: Icon, className = "", children }) => (
  <button
    onClick={() => onClick(provider)}
    className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-md font-medium ${className}`}
  >
    {Icon && <Icon className="w-5 h-5" />}
    {children}
  </button>
);

// Google Login Button Component
const GoogleButton = ({ onClick }) => (
  <button
    onClick={() => onClick('Google')}
    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-md"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
    <span className="font-medium text-gray-700 group-hover:text-gray-900">Continue with Google</span>
  </button>
);

// Social Login Section Component
const SocialLoginSection = ({ onSocialLogin }) => (
  <div className="space-y-3 mb-2">
    <GoogleButton onClick={onSocialLogin} />
    <div className="flex gap-3">
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

// Auth Header Component
const AuthHeader = ({ isLogin }) => (
  <div className="text-center mb-2">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
      {isLogin ? 'Welcome Back' : 'Create Account'}
    </h1>
    <p className="text-gray-600">
      {isLogin ? 'Sign in to your account' : 'Join us today'}
    </p>
  </div>
);

// Divider Component
const Divider = ({ text = "or" }) => (
  <div className="relative flex items-center justify-center mb-1">
    <div className="border-t border-gray-300 w-full"></div>
    <span className="bg-white px-4 text-sm text-gray-500">{text}</span>
  </div>
);

// Success Message Component
const SuccessMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// Error Message Component
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
      <AlertCircle className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const AuthSwitch = ({ isLogin, onSwitch }) => (
  <div className="text-center mt-2">
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

// Modal/Overlay Auth Component (NO BACKEND)
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
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});
    setTimeout(() => {
      if (isLogin) {
        setSuccessMessage('Login successful! (Demo only, no backend)');
      } else {
        setSuccessMessage('Account created! (Demo only, no backend)');
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' });
          setSuccessMessage('');
        }, 2000);
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login would be handled here (demo only)`);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-1">
        <div className="relative z-10  pl-4 pr-4">
          <AuthHeader isLogin={isLogin} />
          <SuccessMessage message={successMessage} />
          <ErrorMessage message={errors.general} />
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