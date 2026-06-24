import React, { HTMLAttributes, ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

// === BUTTON ===
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-[#059669] text-white hover:bg-[#047857] shadow-sm',
      secondary: 'bg-emerald-50 text-[#059669] hover:bg-emerald-100 border border-emerald-200',
      outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900',
      ghost: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base rounded-xl',
      icon: 'h-10 w-10 p-0',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// === BADGE ===
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber';
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  title?: string;
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors';
  
  const variants = {
    primary: 'bg-emerald-50 text-[#059669] border-emerald-200',
    secondary: 'bg-slate-100 text-slate-800 border-transparent',
    outline: 'text-slate-500 border-slate-200 bg-transparent',
    amber: 'bg-amber-50 text-[#F59E0B] border-amber-200',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

// === CARD ===
export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 flex flex-col space-y-1.5 ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-bold text-[#1E293B] leading-none tracking-tight ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-slate-500 ${className}`} {...props}>{children}</p>;
}

export function CardContent({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 flex items-center border-t border-slate-50 mt-4 ${className}`} {...props}>{children}</div>;
}

// === AVATAR ===
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
}

export function Avatar({ className = '', src, alt = '', fallback = '?', size = 'md', ...props }: AvatarProps) {
  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg',
  };

  return (
    <div className={`relative flex shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-50 ${sizeStyles[size]} ${className}`} {...props}>
      {src ? (
        <img src={src} alt={alt} referrerPolicy="no-referrer" className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-semibold text-slate-500 uppercase bg-slate-100">
          {fallback.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

// === DIALOG ===
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Dialog Panel */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#1E293B]">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
