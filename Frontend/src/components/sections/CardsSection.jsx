import React from "react";

export default function CardsSection({ data }) {
    const { sectionTitle, cards } = data;
  if (!cards || cards.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
        {sectionTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <h4 className="text-sm text-gray-500 mb-3">{card.subtitle}</h4>
            <p className="text-gray-700">{card.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
