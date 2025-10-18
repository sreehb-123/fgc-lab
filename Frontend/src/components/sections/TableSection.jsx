import React from "react";

export default function TableSection({ data }) {
  const { title, rows, columns } = data;
  if (!rows || !columns) return null;

  return (
    <section className="py-12 px-8 overflow-x-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h2>
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-gray-300 px-4 py-2 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
