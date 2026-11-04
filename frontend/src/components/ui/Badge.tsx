import React from 'react';

const colorMap: Record<string, string> = {
  received: 'bg-blue-100 text-blue-700',
  under_review: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  distributed: 'bg-purple-100 text-purple-700',
  archived: 'bg-slate-200 text-slate-700',
  draft: 'bg-slate-100 text-slate-600',
  pending_approval: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
  low: 'bg-slate-100 text-slate-600',
  normal: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

export const Badge: React.FC<{ label: string }> = ({ label }) => (
  <span
    className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorMap[label] || 'bg-slate-100 text-slate-700'}`}
  >
    {label.replace('_', ' ')}
  </span>
);