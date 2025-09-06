import React from 'react';

const AuthTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <button
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
          activeTab === 'login' ?'bg-background text-foreground shadow-gentle' :'text-text-secondary hover:text-foreground'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => setActiveTab('register')}
        className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
          activeTab === 'register' ?'bg-background text-foreground shadow-gentle' :'text-text-secondary hover:text-foreground'
        }`}
      >
        Create Account
      </button>
    </div>
  );
};

export default AuthTabs;