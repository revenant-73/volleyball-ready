import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-4 rounded-xl font-bold transition-all active:scale-95 text-center flex items-center justify-center';
  
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-900',
    outline: 'border-2 border-zinc-200 text-zinc-900 hover:bg-zinc-50',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
