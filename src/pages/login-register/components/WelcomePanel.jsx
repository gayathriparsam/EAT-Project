import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const WelcomePanel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Mental Health Advocate",
      content: "E.A.T has been a game-changer for my emotional wellness journey. The AI support feels genuinely caring.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Therapist",
      content: "I recommend E.A.T to my clients. The mood tracking and community features provide excellent support.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "User",
      content: "The gratitude journal feature helped me develop a more positive mindset. Truly transformative.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const features = [
    {
      icon: "MessageCircle",
      title: "AI-Powered Support",
      description: "24/7 emotional support through advanced AI conversation"
    },
    {
      icon: "TrendingUp",
      title: "Mood Tracking",
      description: "Visualize your emotional patterns and progress over time"
    },
    {
      icon: "Heart",
      title: "Gratitude Journal",
      description: "Build positivity through daily gratitude practice"
    },
    {
      icon: "Users",
      title: "Community Support",
      description: "Connect with others on similar wellness journeys"
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center bg-gradient-to-br from-primary/5 to-secondary/10 p-12">
      <div className="max-w-md mx-auto">
        {/* Hero Image */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
              alt="Person meditating peacefully"
              className="rounded-2xl shadow-elevated w-80 h-60 object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-elevated">
              <Icon name="Heart" size={24} />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
            Your Journey to Emotional Wellness Starts Here
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Join thousands who have transformed their mental health with our comprehensive emotional support platform.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features?.map((feature) => (
            <div key={feature?.title} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm">{feature?.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50">
          <div className="flex items-center space-x-3 mb-3">
            <Image
              src={testimonials?.[0]?.avatar}
              alt={testimonials?.[0]?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm">{testimonials?.[0]?.name}</p>
              <p className="text-text-secondary text-xs">{testimonials?.[0]?.role}</p>
            </div>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed italic">
            "{testimonials?.[0]?.content}"
          </p>
          <div className="flex items-center space-x-1 mt-3">
            {[...Array(5)]?.map((_, i) => (
              <Icon key={i} name="Star" size={14} color="var(--color-warning)" />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-6 mt-8 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePanel;