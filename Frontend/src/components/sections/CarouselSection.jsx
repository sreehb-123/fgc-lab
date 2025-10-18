// import React from "react";

// const STRAPI_BASE_URL = "http://localhost:1337";

// export default function CarouselSection({ data }) {
//     const { carouselSlide } = data;
//   if (!carouselSlide || carouselSlide.length === 0) return null;

//   return (

  
//     <section className="w-full overflow-hidden bg-gray-200 py-8 shadow-2xl rounded-2xl">
//       <div className="flex gap-4 overflow-x-auto px-6 shadow-sm">
//         {carouselSlide.map((slide, i) => (
//             console.log(slide.image.url),
//           <div
//             key={i}
//             className="min-w-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-gray-50 border border-gray-400 hover:scale-101 transition-transform duration-50"
//           >
//             <img
//                 src={slide.image?.url?.startsWith("http")
//       ? slide.image.url
//       : `${STRAPI_BASE_URL}${slide.image?.url}`
//                 }
//               alt={slide.caption}
//               className="w-full h-48 object-cover"
//             />
//             <p className="p-4 text-gray-700 text-sm">{slide.caption}</p>
//           </div>
//         ))}
//       </div>
//     </section>

//   );
// }


import React, { useRef, useEffect, useState } from "react";

const STRAPI_BASE_URL = "http://localhost:1337";

export default function CarouselSection({ data }) {
  const { carouselSlide } = data;
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  if (!carouselSlide || carouselSlide.length === 0) return null;

  const slideWidth = 300 + 16; // min-w + gap
  const speed = 3000;

  useEffect(() => {
    const container = containerRef.current;
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % carouselSlide.length;
      setIndex(nextIndex);
      container.scrollTo({
        left: nextIndex * slideWidth,
        behavior: "smooth",
      });
    }, speed);

    return () => clearInterval(interval);
  }, [index, carouselSlide.length]);

  const handlePrev = () => {
    const container = containerRef.current;
    const prevIndex = (index - 1 + carouselSlide.length) % carouselSlide.length;
    setIndex(prevIndex);
    container.scrollTo({ left: prevIndex * slideWidth, behavior: "smooth" });
  };

  const handleNext = () => {
    const container = containerRef.current;
    const nextIndex = (index + 1) % carouselSlide.length;
    setIndex(nextIndex);
    container.scrollTo({ left: nextIndex * slideWidth, behavior: "smooth" });
  };

  return (
    <section className="w-full overflow-hidden py-8 relative">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth px-6"
      >
        {carouselSlide.map((slide, i) => (
          <div
            key={i}
            className="min-w-[300px] flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-gray-50 border border-gray-400"
          >
            <img
              src={slide.image?.url?.startsWith("http") ? slide.image.url : `${STRAPI_BASE_URL}${slide.image?.url}`}
              alt={slide.caption}
              className="w-full h-48 object-cover"
            />
            <p className="p-4 text-gray-700 text-sm">{slide.caption}</p>
          </div>
        ))}
      </div>

      {/* Optional manual controls */}
      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">{"<"}</button>
      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow">{">"}</button>
    </section>
  );
}



// import React, { useState, useEffect, useRef } from "react";

// const STRAPI_BASE_URL = "http://localhost:1337";

// export default function CarouselSection({ data }) {
//   const { carouselSlide } = data;
//   if (!carouselSlide || carouselSlide.length === 0) return null;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const slideCount = carouselSlide.length;
//   const intervalRef = useRef(null);

//   // Swipe tracking
//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   const goPrev = () => setCurrentIndex(prev => (prev - 1 + slideCount) % slideCount);
//   const goNext = () => setCurrentIndex(prev => (prev + 1) % slideCount);

//   // Auto-rotate
//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex(prev => (prev + 1) % slideCount);
//     }, 3000);
//     return () => clearInterval(intervalRef.current);
//   }, [slideCount]);

//   // Swipe handlers
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const distance = touchStartX.current - touchEndX.current;
//     if (Math.abs(distance) > 50) { // threshold
//       if (distance > 0) goNext();
//       else goPrev();
//     }
//     touchStartX.current = 0;
//     touchEndX.current = 0;
//   };

//   return (
//     <section
//       className="w-full overflow-hidden bg-gray-200 py-8 shadow-2xl rounded-2xl relative"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div
//         className="flex transition-transform duration-500"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {carouselSlide.map((slide, i) => (
//           <div
//             key={i}
//             className="min-w-full flex-shrink-0 rounded-xl overflow-hidden shadow-xl bg-gray-50 border border-gray-400"
//           >
//             <img
//               src={slide.image?.url?.startsWith("http") ? slide.image.url : `${STRAPI_BASE_URL}${slide.image?.url}`}
//               alt={slide.caption}
//               className="w-full h-48 object-cover"
//             />
//             <p className="p-4 text-gray-700 text-sm">{slide.caption}</p>
//           </div>
//         ))}
//       </div>

//       {/* Navigation buttons */}
//       <button
//         onClick={goPrev}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
//       >
//         ‹
//       </button>
//       <button
//         onClick={goNext}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2"
//       >
//         ›
//       </button>
//     </section>
//   );
// }
