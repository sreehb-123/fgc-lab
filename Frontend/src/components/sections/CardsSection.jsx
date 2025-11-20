import React from "react";

export default function CardsSection({ data }) {
    const { sectionTitle, subSection } = data;
  if (!subSection || Object.keys(subSection).length === 0) return null;

  const accentColor = "#4B0082";

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold mb-10" style={{color: accentColor}}>
        {sectionTitle}
      </h2>
      <div className="space-y-12 px-8">
        {subSection.map((sub, i) => (
          <div key={sub.id || i}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-gray-300">
              {sub.subSectionTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sub.cards.map((card, j) => (
                <div
                  key={card.id || j}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 hover:shadow-lg transition-all"
                  style={{ borderColor: accentColor }}
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
                    <p className="text-sm font-medium text-[#00CED1] mt-1">
                      {card.subTitle}
                    </p>
                  )}
                  {card.info && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
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
