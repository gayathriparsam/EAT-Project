import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center breathing-animation">
          <Icon name="Heart" size={28} color="white" />
        </div>
      </div>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Welcome to E.A.T
      </h1>
      <p className="text-text-secondary text-lg">
        Your emotional wellness companion
      </p>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} />
          <span>HIPAA Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Lock" size={16} />
          <span>SSL Secured</span>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;