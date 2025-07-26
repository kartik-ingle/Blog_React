import React, { Children } from 'react'
import classNames from "classnames"

export default function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600 hover:bg-blue-700',
    textColor = 'text-white',
    className = '',
    fullWidth = false,
    disabled = false,
    ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-200 
        ${bgColor} ${textColor} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


