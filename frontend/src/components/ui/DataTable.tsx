import React from 'react';

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

const iconBtn =
  'w-8 h-8 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors';

export function DataTable<T extends { id?: number }>({
  data,
  columns,
  onPreview,
  onEdit,
  onDelete,
  onPrint,
  emptyMessage = 'No records found.',
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider ${c.className || ''}`}
                >
                  {c.header}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-14 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            )}
            {data.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors"
              >
                {columns.map((c, i) => (
                  <td key={i} className={`px-4 py-3 text-slate-700 ${c.className || ''}`}>
                    {c.accessor(row)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="inline-flex gap-0.5">
                    {onPreview && (
                      <button className={iconBtn} title="Preview" onClick={() => onPreview(row)}>👁</button>
                    )}
                    {onEdit && (
                      <button className={iconBtn} title="Edit" onClick={() => onEdit(row)}>✏️</button>
                    )}
                    {onPrint && (
                      <button className={iconBtn} title="Print" onClick={() => onPrint(row)}>🖨</button>
                    )}
                    {onDelete && (
                      <button
                        className="w-8 h-8 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                        onClick={() => onDelete(row)}
                      >
                        🗑
                      </button>
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