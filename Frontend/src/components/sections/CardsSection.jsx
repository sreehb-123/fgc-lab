import React from "react";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function CardsSection({ data }) {
  const { sectionTitle, subSection } = data;
  if (!subSection || Object.keys(subSection).length === 0) return null;

  return (
    <section
      className="
        py-14 px-6 md:px-10
        bg-gradient-to-b from-gray-50 to-gray-100
        rounded-3xl border border-gray-200
        shadow-xl mt-12
      "
    >
      {/* Section heading with underline */}
      {sectionTitle && (
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
            {sectionTitle}
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-2 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          ></div>
        </div>
      )}

      <div className="space-y-12">
        {subSection.map((sub, i) => (
          <div key={sub.id || i}>
            {/* Subsection heading */}
            {sub.subSectionTitle && (
              <h3
                className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-gray-300"
                style={{ color: COLORS.secondary }}
              >
                {sub.subSectionTitle}
              </h3>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2 md:px-0">
              {sub.cards.map((card, j) => (
                <div
                  key={card.id || j}
                  className={`
                    bg-white p-5 rounded-xl
                    shadow-lg border-l-4
                    hover:shadow-xl transition-all
                  `}
                  style={{ borderColor: COLORS.accent }}
                >
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {card.title}
                    </h4>
                    {card.no && (
                      <span className="text-xs font-mono text-gray-500">
                        {card.no}
                      </span>
                    )}
                  </div>
                  {card.subTitle && (
                    <p
                      className="text-sm font-medium mt-1"
                      style={{ color: COLORS.accent }}
                    >
                      {card.subTitle}
                    </p>
                  )}
                  {card.info && (
                    <p
                      className="text-xs mt-2 leading-relaxed"
                      style={{ color: COLORS.grayText }}
                    >
                      {card.info}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
