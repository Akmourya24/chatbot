 import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';

 const LoadingButton = ({ isLoading, onClick, children, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {typeof children === 'string' ? `${children}...` : children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};
const InputField = ({ 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error, 
  showPassword, 
  onTogglePassword 
}) => {
  const isPasswordField = type === "password";
  
  return (
    <div>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <input
          type={isPasswordField && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPasswordField ? 'pr-12' : 'pr-4'} py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {isPasswordField && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}; 

 export const AuthForm = ({ 
  isLogin, 
  formData, 
  errors, 
  showPassword, 
  showConfirmPassword, 
  onInputChange, 
  onTogglePassword, 
  onToggleConfirmPassword, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <div className="space-y-4">
      {!isLogin && (
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Full Name"
          icon={User}
          error={errors.name}
        />
      )}

      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        placeholder="Email Address"
        icon={Mail}
        error={errors.email}
      />

      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        placeholder="Password"
        icon={Lock}
        error={errors.password}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />

      {!isLogin && (
        <InputField
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          placeholder="Confirm Password"
          icon={Lock}
          error={errors.confirmPassword}
          showPassword={showConfirmPassword}
          onTogglePassword={onToggleConfirmPassword}
        />
      )}

      {isLogin && (
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Forgot Password?
          </button>
        </div>
      )}

      <LoadingButton
        isLoading={isLoading}
        onClick={onSubmit}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
      >
        {isLoading ? (isLogin ? 'Signing In' : 'Creating Account') : (isLogin ? 'Sign In' : 'Create Account')}
      </LoadingButton>
    </div>
  );
};