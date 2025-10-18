import React from "react";

export default function FacultyCardsSection({ data }) {
    const { sectionTitle, faculty } = data;
  if (!faculty || faculty.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
        {faculty.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-md bg-gray-50 p-4 text-center"
          >
            <img
              src={f.imageUrl}
              alt={f.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{f.name}</h3>
            <p className="text-sm text-gray-500">{f.role}</p>
            <p className="text-sm text-gray-600 mt-2">{f.description}</p>
            <a
              href={`mailto:${f.email}`}
              className="text-primary hover:underline text-sm mt-3 inline-block"
            >
              {f.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
