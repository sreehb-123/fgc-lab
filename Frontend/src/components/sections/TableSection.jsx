import React from "react";

export default function TableSection({ data }) {
  if (!data) return null;

  const { title, columns = [], rows = [] } = data;

  const statusStyles = {
    Completed: "bg-green-100 text-green-800",
    Delayed: "bg-red-100 text-red-800",
    Ongoing: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Pending: "bg-blue-100 text-blue-800",
    Default: "bg-gray-100 text-gray-800",
  };

  return (
    <section className="py-16 px-6 md:px-12">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[#4B0082] text-white">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider ${
                    idx === 0 ? "rounded-tl-xl" : ""
                  } ${idx === columns.length - 1 ? "rounded-tr-xl" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.length > 0 ? (
              rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                  {row.map((cell, cellIdx) => {
                    if (cellIdx === columns.length - 1) {
                      const statusClass =
                        statusStyles[cell] || statusStyles.Default;
                      return (
                        <td key={cellIdx} className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
                          >
                            {cell}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIdx}
                        className={`px-6 py-4 text-sm ${
                          cellIdx === 0
                            ? "font-medium text-gray-900 whitespace-nowrap"
                            : "text-gray-700"
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-gray-500 py-6">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
