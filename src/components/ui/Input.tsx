/**
 * Reusable Input component for forms
 * Includes label, error state, and consistent styling
 */

import React from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-gray-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};