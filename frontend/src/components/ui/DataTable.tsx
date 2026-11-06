import React from 'react';
import { EyeIcon, EditIcon, TrashIcon, PrintIcon } from './Icon';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  onPreview?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onPrint?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id?: number }>({
  data, columns, onPreview, onEdit, onDelete, onPrint, emptyMessage = 'No records found.',
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((c, i) => (
                <th key={i} className={`px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider ${c.className || ''}`}>
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            )}
            {data.map((row, idx) => (
              <tr key={row.id ?? idx} className="hover:bg-slate-50/80 transition-colors group">
                {columns.map((c, i) => (
                  <td key={i} className={`px-4 py-3 text-slate-700 ${c.className || ''}`}>
                    {c.accessor(row)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="inline-flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    {onPreview && (
                      <button className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Preview" onClick={() => onPreview(row)}><EyeIcon size={16} /></button>
                    )}
                    {onEdit && (
                      <button className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded" title="Edit" onClick={() => onEdit(row)}><EditIcon size={16} /></button>
                    )}
                    {onPrint && (
                      <button className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded" title="Print" onClick={() => onPrint(row)}><PrintIcon size={16} /></button>
                    )}
                    {onDelete && (
                      <button className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded" title="Delete" onClick={() => onDelete(row)}><TrashIcon size={16} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}