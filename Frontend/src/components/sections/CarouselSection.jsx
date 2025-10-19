import React, { useState, useEffect } from "react";

const STRAPI_BASE_URL = "http://localhost:1337";

export default function CarouselSection({ data }) {
  const { carouselSlide } = data;
  const { title } = data;
  if (!carouselSlide || carouselSlide.length === 0) return null;
  if(!title || title.trim() ==="")return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const length = carouselSlide.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  const prevIndex = (currentIndex - 1 + length) % length;
  const nextIndex = (currentIndex + 1) % length;

  return (

    <> 
     <h2 className="text-center text-2xl font-bold text-gray-900 mb-8 pt-1">
        { title}
      </h2>
    <section className="relative w-full h-75 overflow-hidden bg-gray-200 py-8 flex items-center justify-center px-3">
      
      

      {carouselSlide.map((slide, i) => {
        let style = {
          width: "300px",
          position: "absolute",
          transition: "all 0.5s ease",
        };

        if (i === currentIndex) {
          style = { ...style, left: "50%", zIndex: 20, transform: "translate(-50%, 0) scale(1)" };
        } else if (i === prevIndex) {
          style = { ...style, left: "20%", zIndex: 10, transform: "translate(-50%, 0) scale(0.8)" };
        } else if (i === nextIndex) {
          style = { ...style, left: "80%", zIndex: 10, transform: "translate(-50%, 0) scale(0.8)" };
        } else {
          style = { ...style, left: "50%", zIndex: 0, opacity: 0, transform: "translate(-50%, 0) scale(0)" };
        }

        return (
          <div
            key={i}
            style={style}
            className="rounded-xl overflow-hidden shadow-xl bg-gray-50 border border-gray-400"  
          >
            <img
              src={
                slide.image?.url?.startsWith("http")
                  ? slide.image.url
                  : `${STRAPI_BASE_URL}${slide.image?.url}`
              }
              alt={slide.caption}
              className="w-full h-50 object-cover"
            />
            <p className="p-4 text-gray-700 text-sm">{slide.caption}</p>
          </div>
        );
      })}
    </section>
  
  </>
  );
}