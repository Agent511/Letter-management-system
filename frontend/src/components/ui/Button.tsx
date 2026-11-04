import React from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-slate-600 hover:bg-slate-100',
};

export const Button: React.FC<Props> = ({ variant = 'primary', className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-md text-sm font-medium transition ${styles[variant]} ${className}`}
    {...props}
  />
);