import React from "react";

export default function FacultyCardsSection({ data }) {
    const { sectionTitle, faculty } = data;
  if (!faculty || faculty.length === 0) return null;

  return (
    <section className="py-12 bg-gray-30">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-8 ">
        {faculty.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shadow-xl bg-white p-4 text-center border border-gray-300  flex flex-col items-center h-full"
          >
            <img
              src={f.imageUrl}
              alt={f.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-3 border-[#00CED1]"
            />
            <h3 className="text-lg font-semibold">{f.name}</h3>
            <p className="text-sm text-[#00CED1]">{f.role}</p>
            <p className="text-sm text-gray-600 mt-2">{f.description}</p>
            <a
              href={`mailto:${f.email}`}
              className="text-primary hover:underline
              hover: text-gray-900 hover:scale-103 transition-transform duration-100 text-sm mt-3 inline-block hover:font-semibold"
            >
              {f.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
