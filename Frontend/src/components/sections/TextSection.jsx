import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function TextSection({ data }) {
  const {
    title,
    content,
    link,
    date,
    date_range,
    link_text,
    link_description,
  } = data || {};

  const displayTitle = title || "";
  const displayDateRange = date_range || "";
  const displayDate = date || "";
  const hasContent = content && content.length > 0;
  const displayLink = link || "#";
  const displayLinkText = link_text || link;
  const linkDescription = link_description || "";

  return (
    <section
      className="
        py-14 px-6 md:px-10
        bg-gradient-to-b from-gray-50 to-gray-100
        rounded-3xl shadow-xl border border-gray-200
        max-w-5xl mx-auto mt-12
      "
    >
      {displayTitle && (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            {displayTitle}
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-2 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          ></div>
        </div>
      )}

      {(displayDateRange || displayDate) && (
        <div className="flex justify-between items-center mb-6 text-sm italic">
          <span style={{ color: COLORS.grayText }}>{displayDateRange}</span>
          <span style={{ color: COLORS.grayText }}>{displayDate}</span>
        </div>
      )}

      <div className="space-y-6 text-gray-700">
        {hasContent ? (
          <BlocksRenderer content={content} />
        ) : (
          <p style={{ color: COLORS.grayText }}>No content available.</p>
        )}

        {displayLink && (
          <p>
            {linkDescription && <strong>{linkDescription} </strong>}
            <a
              href={displayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium"
              style={{ color: COLORS.accent }}
            >
              {displayLinkText}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
