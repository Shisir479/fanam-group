import React from "react";
import { Loader2 } from "lucide-react";

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string; // For text-right, text-center, etc.
}

interface AdminTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: React.ReactNode;
  keyExtractor: (row: T) => string;
}

export function AdminTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  keyExtractor,
}: AdminTableProps<T>) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`p-4 font-medium ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center">
                  <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-8 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors group"
                >
                  {columns.map((col, idx) => (
                    <td key={idx} className={`p-4 ${col.className || ""}`}>
                      {col.render
                        ? col.render(row)
                        : col.accessor
                          ? (row[col.accessor] as React.ReactNode)
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
