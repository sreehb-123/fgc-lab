import React from "react";
import { Carousel } from "react-responsive-carousel";
import Masonry from "react-masonry-css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

export default function GallerySection({ section }) {
  if (!section || !section.images || section.images.length === 0) return null;

  const { sectionTitle, layoutType = "carousel", images, description } = section;
  const STRAPI_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "");

  const breakpointColumns = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <section
      className="py-14 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200"
    >
      {/* Heading */}
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

      {/* Description */}
      {description && (
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          {description}
        </p>
      )}

      {/* Layout Variants */}
      {layoutType === "carousel" && (
        <div className="max-w-5xl mx-auto">
          <Carousel
            showArrows
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            {images.map((img) => (
              <div key={img.id} className="relative">
                <img
                  src={
                    img.image?.url?.startsWith("http")
                      ? img.image.url
                      : `${STRAPI_BASE_URL}${img.image?.url}`
                  }
                  alt={img.alternativeText || "Gallery image"}
                  className="rounded-2xl object-cover shadow-md"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {layoutType === "grid" && (
        <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={
                  img.image?.url?.startsWith("http")
                    ? img.image.url
                    : `${STRAPI_BASE_URL}${img.image?.url}`
                }
                alt={img.alternativeText || "Gallery image"}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {layoutType === "masonry" && (
        <div className="px-4 md:px-8 max-w-6xl mx-auto">
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 space-y-4"
          >
            {images.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <img
                  src={
                    img.image?.url?.startsWith("http")
                      ? img.image.url
                      : `${STRAPI_BASE_URL}${img.image?.url}`
                  }
                  alt={img.alternativeText || "Gallery image"}
                  className="w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </Masonry>
        </div>
      )}
    </section>
  );
}
