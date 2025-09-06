import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Please enter your password';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Mock authentication - check credentials
    const mockCredentials = {
      email: 'user@eat.com',
      password: 'wellness123'
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Demo credentials: user@eat.com / wellness123
          </p>
        </div>
      )}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-colors"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;