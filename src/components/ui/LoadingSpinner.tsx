import React from 'react';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

function LoadingSpinner({ 
  size = 'medium', 
  color = 'border-primary-600' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} rounded-full animate-spin border-t-transparent`}
      ></div>
    </div>
  );
}

export default LoadingSpinner;