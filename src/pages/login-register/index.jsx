import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import WelcomePanel from './components/WelcomePanel';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Auth Panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <AuthHeader />
          
          <div className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8 border border-border">
            <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            
            <SocialLogin isLogin={activeTab === 'login'} />
            
            {/* Switch between login/register */}
            <div className="text-center mt-6 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="ml-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {activeTab === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-text-secondary">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-text-secondary mt-2">
              © {new Date()?.getFullYear()} E.A.T Emotional Support. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Welcome Panel - Desktop Only */}
      <WelcomePanel />
    </div>
  );
};

export default LoginRegister;