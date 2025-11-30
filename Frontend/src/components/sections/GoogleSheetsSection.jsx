import React, { useEffect, useState } from "react";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

// Extract Sheet ID from valid Google Sheets link
function extractSheetId(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    if (u.pathname.includes("/spreadsheets/")) {
      return u.pathname.split("/d/")[1].split("/")[0];
    }

    return null;
  } catch {
    return null;
  }
}

export default function GoogleSheetsSection({ data }) {
  const [sheetData, setSheetData] = useState({ title: "", sheetValues: [] });

  const sectionTitle = data?.sectionTitle || "";
  const spreadsheetsUrl = data?.spreadsheetsUrl || "";

  const sheetId = extractSheetId(spreadsheetsUrl);
  const sheetFetchUrl = sheetId
    ? `https://opensheet.vercel.app/${sheetId}/Sheet1`
    : null;

  useEffect(() => {
    const loadSheet = async () => {
      if (!sheetFetchUrl) return;

      try {
        const res = await fetch(sheetFetchUrl);
        const rows = await res.json();

        if (Array.isArray(rows) && rows.length > 0) {
          setSheetData({
            title: sectionTitle,
            sheetValues: rows,
          });
        }
      } catch (err) {
        console.error("Failed to fetch sheet", err);
      }
    };

    loadSheet();
  }, [sheetFetchUrl, sectionTitle]);

  const { title, sheetValues } = sheetData;

  const columns = sheetValues.length > 0 ? Object.keys(sheetValues[0]) : [];
  const rows = sheetValues.map((row) => Object.values(row));

  const statusStyles = {
    Completed: "bg-green-100 text-green-800",
    Complete: "bg-green-100 text-green-800",
    Delayed: "bg-red-100 text-red-800",
    Ongoing: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Pending: "bg-blue-100 text-blue-800",
    Default: "bg-gray-100 text-gray-800",
  };

  return (
    <section className="py-14 px-6 md:px-10 max-w-7xl mt-12 mx-auto">
      {title && (
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{ color: COLORS.primary }}
          >
            {title}
          </h2>

          <div
            className="w-20 h-1 mx-auto mt-2 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          ></div>
        </div>
      )}

      <div className="overflow-x-auto rounded-3xl">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead className="bg-[#1A237E] text-white">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide border-b border-gray-300"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`${rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-200 transition-colors`}
                >
                  {row.map((cell, cellIdx) => {
                    const isStatusColumn = cellIdx === columns.length - 1;

                    if (isStatusColumn) {
                      const statusClass = statusStyles[cell] || statusStyles.Default;

                      return (
                        <td key={cellIdx} className="px-6 py-4 border-b">
                          <span className={`px-3 py-1 rounded-full ${statusClass}`}>
                            {cell}
                          </span>
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIdx}
                        className="px-6 py-4 border-b text-sm"
                        style={{ color: COLORS.grayText }}
                      >
                        {cellIdx === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
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
