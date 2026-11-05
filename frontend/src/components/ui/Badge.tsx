import React from 'react';

const colorMap: Record<string, string> = {
  received: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  under_review: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  distributed: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
  archived: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
  draft: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
  pending_approval: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  rejected: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
  low: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200',
  normal: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  high: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
  urgent: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
};

export const Badge: React.FC<{ label: string }> = ({ label }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide capitalize ${
      colorMap[label] || 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200'
    }`}
  >
    {label.replace(/_/g, ' ')}
  </span>
);