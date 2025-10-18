import React from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function TextSection({ data }) {
    const { title, content } = data;
  return (
    <section className="py-10 px-8 max-w-4xl mx-auto text-center">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      {content && (
        <div className="text-gray-700 text-lg leading-relaxed">
          <BlocksRenderer content={content} />
        </div>
      )}
    </section>
  );
}
