import React from 'react';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<Props> = ({ label, id, error, options, className = '', ...props }) => {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={selectId} className="text-xs font-semibold text-slate-600">{label}</label>}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none px-3 py-2 pr-10 border rounded-md text-sm bg-white text-slate-800 cursor-pointer transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            ${error ? 'border-red-400' : 'border-slate-300 hover:border-slate-400'} ${className}`}
          {...props}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};