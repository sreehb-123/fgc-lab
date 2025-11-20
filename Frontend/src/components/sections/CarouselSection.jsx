import React, { useState, useEffect } from "react";

const STRAPI_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function CarouselSection({ data }) {
  const { carouselSlide, title } = data;
  if (!carouselSlide?.length || !title?.trim()) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = carouselSlide.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 3500);
    return () => clearInterval(interval);
  }, [length]);

  const prevIndex = (currentIndex - 1 + length) % length;
  const nextIndex = (currentIndex + 1) % length;

  return (
    <section
      className="
        relative w-full overflow-hidden py-12 px-4
        bg-gradient-to-b from-gray-50 to-gray-100
        rounded-3xl shadow-xl border border-gray-200
      "
    >
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.primary }}>
          {title}
        </h2>
        <div
          className="w-20 h-1 mx-auto mt-2 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        ></div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentIndex(prevIndex)}
        className="
          absolute left-4 top-1/2 -translate-y-1/2 
          bg-white shadow-lg border border-gray-200 
          w-10 h-10 rounded-full flex items-center justify-center
          hover:bg-[#00A3A1] hover:text-white transition-all
        "
      >
        ‹
      </button>

      <button
        onClick={() => setCurrentIndex(nextIndex)}
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          bg-white shadow-lg border border-gray-200 
          w-10 h-10 rounded-full flex items-center justify-center
          hover:bg-[#00A3A1] hover:text-white transition-all
        "
      >
        ›
      </button>

      {/* Slides */}
      <div className="relative h-80 flex items-center justify-center">
        {carouselSlide.map((slide, i) => {
          let style = {
            width: "340px",
            position: "absolute",
            transition: "all 0.6s ease",
          };

          if (i === currentIndex) {
            style = { ...style, left: "50%", transform: "translate(-50%,0) scale(1)", zIndex: 30 };
          } else if (i === prevIndex) {
            style = { ...style, left: "22%", transform: "translate(-50%,0) scale(0.88)", opacity: 0.9, zIndex: 20 };
          } else if (i === nextIndex) {
            style = { ...style, left: "78%", transform: "translate(-50%,0) scale(0.88)", opacity: 0.9, zIndex: 20 };
          } else {
            style = { ...style, left: "50%", opacity: 0, transform: "translate(-50%,0) scale(0.5)" };
          }

          return (
            <div
              key={i}
              style={style}
              className="
                bg-white rounded-2xl overflow-hidden
                border border-gray-200
                shadow-lg hover:shadow-xl
                hover:scale-[1.02] transition-all duration-300
              "
            >
              <img
                src={
                  slide.image?.url?.startsWith("http")
                    ? slide.image.url
                    : `${STRAPI_BASE_URL}${slide.image?.url}`
                }
                alt={slide.caption}
                className="w-full h-52 object-cover"
              />
              <p className="p-4 text-sm" style={{ color: COLORS.grayText }}>
                {slide.caption}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-6 gap-3">
        {carouselSlide.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`
              w-3.5 h-3.5 rounded-full transition-all
              ${i === currentIndex
                ? "bg-[#00A3A1] scale-110 shadow-md"
                : "bg-gray-300 hover:bg-[#00A3A1]/60"}
            `}
          ></button>
        ))}
      </div>
    </section>
  );
}
