import React from 'react';
import { LucideIcon } from 'lucide-react';
import classNames from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  icon: Icon,
  children,
}) => {
  const baseStyles = 'flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  const sizeStyles = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;