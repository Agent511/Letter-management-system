import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

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
}

export function DataTable<T extends { id?: number }>({
  data, columns, onPreview, onEdit, onDelete, onPrint,
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className={`px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide ${c.className || ''}`}>
                {c.header}
              </th>
            ))}
            <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-3 py-10 text-center text-slate-400">
                No records found.
              </td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={row.id ?? idx} className="border-b border-slate-100 hover:bg-slate-50">
              {columns.map((c, i) => (
                <td key={i} className={`px-3 py-3 text-slate-700 ${c.className || ''}`}>
                  {c.accessor(row)}
                </td>
              ))}
              <td className="px-3 py-3 text-right whitespace-nowrap">
                <div className="inline-flex gap-1">
                  {onPreview && <Button variant="ghost" onClick={() => onPreview(row)}>👁</Button>}
                  {onEdit && <Button variant="ghost" onClick={() => onEdit(row)}>✏️</Button>}
                  {onPrint && <Button variant="ghost" onClick={() => onPrint(row)}>🖨</Button>}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => onDelete(row)}
                    >
                      🗑
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}