/**
 * Reusable Button component with different variants
 * Supports primary, secondary, and disabled states
 */

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300 disabled:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 disabled:bg-gray-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );
};