import React from "react";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function CardsSection({ data }) {
  if (!data) return null;

  const { sectionTitle, subSection } = data;
  if (!Array.isArray(subSection) || subSection.length === 0) return null;

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-12 mt-12 max-w-6xl mx-auto">
      {/* Section heading with underline */}
      {sectionTitle && (
        <div className="text-left mb-10">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{ color: COLORS.primary }}
          >
            {sectionTitle}
          </h2>
          <div
            className="w-25 h-1 mt-3 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          />
        </div>
      )}

      <div className="space-y-12">
        {subSection.map((sub, i) => (
          <div key={sub.id || i}>
            {/* Subsection heading */}
            {sub.subSectionTitle && (
              <div className="mb-6">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-semibold"
                  style={{ color: COLORS.secondary }}
                >
                  {sub.subSectionTitle}
                </h3>
                <div className="h-px w-full mt-3 bg-gray-700" />
              </div>
            )}

            {/* Cards grid: 1 per row on mobile, 2 per row on md+ (wide horizontal cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              {Array.isArray(sub.cards) &&
                sub.cards.map((card, j) => (
                  <div
                    key={card.id || j}
                    className="
                      p-4 sm:p-7
                      rounded-2xl
                      shadow-lg
                      border-l-4
                      hover:shadow-xl
                      transition-all
                      bg-gray-100
                    "
                    style={{ borderColor: COLORS.accent }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                          {card.title}
                        </h4>

                        {card.subTitle && (
                          <p
                            className="text-sm sm:text-base md:text-lg font-medium mt-2"
                            style={{ color: COLORS.accent }}
                          >
                            {card.subTitle}
                          </p>
                        )}
                      </div>

                      {card.no && (
                        // <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                         <span className="text-xs font-mono text-gray-500 break-words max-w-full">
                          {card.no}
                        </span>
                      )}
                    </div>

                    {card.info && (
                      <p
                        className="text-xs sm:text-sm md:text-base leading-relaxed mt-3 leading-relaxed"
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