import React from "react";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function FacultyCardsSection({ data }) {
  const { sectionTitle, faculty } = data;
  if (!faculty || faculty.length === 0) return null;

  const mainFaculty = faculty[0]; // Only show the BIG main guy

  return (
    <section
      className="
        py-14 px-4 sm:px-6 lg:px-12
        bg-white
        rounded-3xl
        shadow-[0_6px_30px_rgba(0,0,0,0.08)]
        border border-gray-200
        max-w-6xl mx-auto
      "
    >
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold" style={{ color: COLORS.primary }}>
          {sectionTitle}
        </h2>

        <div
          className="mx-auto mt-3 w-24 h-1 rounded-full"
          style={{ background: COLORS.accent }}
        ></div>
      </div>

      {/* Huge Faculty Card */}
      <div
        className="
          flex flex-col md:flex-row items-center md:items-start
          gap-10 p-10
          bg-white rounded-3xl border border-gray-200
          shadow-lg hover:shadow-2xl transition-all duration-300
        "
        style={{ borderColor: COLORS.secondary + "33" }}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={mainFaculty.imageUrl}
            alt={mainFaculty.name}
            className="w-48 h-48 rounded-2xl object-cover shadow-md ring-1"
            style={{ ringColor: COLORS.primary }}
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left md:mt-2">
          <h3
            className="text-3xl font-bold"
            style={{ color: COLORS.primary }}
          >
            {mainFaculty.name}
          </h3>

          <p
            className="text-lg font-medium mt-2"
            style={{ color: COLORS.accent }}
          >
            {mainFaculty.role}
          </p>

          {mainFaculty.description && (
            <p
              className="text-base mt-4 leading-relaxed max-w-2xl"
              style={{ color: COLORS.grayText }}
            >
              {mainFaculty.description}
            </p>
          )}

          {mainFaculty.email && (
            <a
              href={`mailto:${mainFaculty.email}`}
              className="inline-block mt-6 text-base font-semibold hover:underline"
              style={{ color: COLORS.accent }}
            >
              {mainFaculty.email}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}