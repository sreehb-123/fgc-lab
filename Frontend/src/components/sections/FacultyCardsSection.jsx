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

  return (
    <section
      className="
        py-16 px-6 lg:px-10 
        bg-white 
        rounded-3xl
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        border border-gray-200
      "
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
          {sectionTitle}
        </h2> 

        {/* Accent underline */}
        <div
          className="mx-auto mt-2 w-20 h-1 rounded-full"
          style={{ background: COLORS.accent }}
        ></div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {faculty.map((f, i) => (
          <div
            key={i}
            className="
              p-6 bg-white rounded-2xl border border-gray-200 
              shadow-sm hover:shadow-xl 
              transition-all duration-200 
              flex flex-col items-center text-center
            "
            style={{ borderColor: COLORS.secondary + "33" }}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={f.imageUrl}
                alt={f.name}
                className="
                  w-28 h-28 rounded-full object-cover
                  shadow-md ring-4
                "
                style={{ ringColor: COLORS.primary }}
              />

              {/* Small accent bar */}
              {/* <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 block w-10 h-1.5 rounded-full"
                style={{ background: COLORS.accent }}
              ></span> */}
            </div>

            {/* Name */}
            <h3
              className="text-lg font-semibold mt-4"
              style={{ color: COLORS.primary }}
            >
              {f.name}
            </h3>

            {/* Role */}
            <p
              className="text-sm font-medium"
              style={{ color: COLORS.accent }}
            >
              {f.role}
            </p>

            {/* Description */}
            {f.description && (
              <p
                className="text-sm mt-3 leading-relaxed px-3"
                style={{ color: COLORS.grayText }}
              >
                {f.description}
              </p>
            )}

            {/* Email */}
            {f.email && (
              <a
                href={`mailto:${f.email}`}
                className="mt-4 text-sm font-medium hover:underline transition-all"
                style={{ color: COLORS.accent }}
              >
                {f.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
