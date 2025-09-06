import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, indeterminate = false, checked, ...props }, ref) => {
    const checkboxId = React.useId();
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => checkboxRef.current!);
    
    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    
    return (
      <div className="flex items-start space-x-3">
        <div className="relative flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            ref={checkboxRef}
            checked={checked}
            className={cn(
              "h-4 w-4 rounded border-2 border-input bg-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sr-only",
              error && "border-destructive",
              className
            )}
            {...props}
          />
          <div 
            className={cn(
              "h-4 w-4 rounded border-2 border-input bg-background flex items-center justify-center transition-all duration-200",
              checked && "bg-primary border-primary",
              indeterminate && "bg-primary border-primary",
              error && "border-destructive",
              "cursor-pointer"
            )}
            onClick={() => checkboxRef.current?.click()}
          >
            {(checked || indeterminate) && (
              <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
            )}
          </div>
        </div>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label 
                htmlFor={checkboxId}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;