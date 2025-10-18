import React from "react";

const STRAPI_BASE_URL = "http://localhost:1337";

export default function CarouselSection({ data }) {
    const { carouselSlide } = data;
  if (!carouselSlide || carouselSlide.length === 0) return null;

  return (
    <section className="w-full overflow-hidden bg-gray-50 py-8">
      <div className="flex gap-4 overflow-x-auto px-6">
        {carouselSlide.map((slide, i) => (
            console.log(slide.image.url),
          <div
            key={i}
            className="min-w-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-white"
          >
            <img
                src={slide.image?.url?.startsWith("http")
      ? slide.image.url
      : `${STRAPI_BASE_URL}${slide.image?.url}`
                }
              alt={slide.caption}
              className="w-full h-48 object-cover"
            />
            <p className="p-4 text-gray-700 text-sm">{slide.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
