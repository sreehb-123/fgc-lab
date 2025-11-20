import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


export default function TextSection({ data }) {
  const {
    title,
    content,
    link,
    date,
    date_range,
    link_text,
    link_description
  } = data || {};

  const displayTitle = title  || "";
  const displayDateRange = date_range  || "";
  const displayDate = date  || "";
  const hasContent = content && content.length > 0;
  const displayLink = link  || "#";
  const linkDescription = link_description || "" ;
  const linkText = link_text || "" ;

  return (
    <section className="py-8">
      <div className="mt-10 max-w-5xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-[#00CED1]">
          <div className="flex justify-between items-start">
            <p className="text-xl font-semibold text-gray-900">
              {displayTitle}
            </p>
            <span className="text-sm text-gray-500 italic whitespace-nowrap ml-4">
              {displayDateRange}
            </span>
          </div>

          <p className="text-sm text-gray-500 italic mt-1 mb-4">
            {displayDate}
          </p>

          <div className="space-y-6 text-gray-600">
            {hasContent ? (
              <BlocksRenderer content={content} />
            ) : (
              <p>No content available.</p>
            )}

            <p>
              <strong>{linkDescription}</strong>
              <a
                href={displayLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  link
                    ? "text-[#00CED1] hover:text-[#4B0082]"
                    : "text-gray-400 cursor-not-allowed"
                } font-medium ml-1 inline-flex items-center`}
              >
                {linkText ? linkText : link}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}