import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Icon from "../AppIcon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 16 }) => (
  <Loader2 size={size} className="animate-spin" />
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconName?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    children, 
    loading = false, 
    iconName, 
    iconPosition = 'left', 
    iconSize, 
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Calculate icon size based on button size if not explicitly provided
    const getIconSize = () => {
      if (iconSize) return iconSize;
      switch (size) {
        case 'sm': return 14;
        case 'lg': return 20;
        case 'icon': return 18;
        default: return 16;
      }
    };

    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner size={getIconSize()} />;
      }
      if (iconName) {
        return <Icon name={iconName} size={getIconSize()} />;
      }
      return null;
    };

    const buttonClasses = cn(
      buttonVariants({ variant, size, className }),
      fullWidth && "w-full"
    );

    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        {children}
        {iconPosition === 'right' && renderIcon()}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;