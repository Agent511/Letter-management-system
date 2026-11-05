import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input: React.FC<Props> = ({ label, id, error, icon, className = '', ...props }) => {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-600">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full px-3 py-2 ${icon ? 'pl-9' : ''} border rounded-md text-sm bg-white
            text-slate-800 placeholder:text-slate-400
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
            ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 hover:border-slate-400'}
            disabled:bg-slate-50 disabled:text-slate-500
            ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};