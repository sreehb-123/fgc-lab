import React from "react";
import { Carousel } from "react-responsive-carousel";
import Masonry from "react-masonry-css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function GallerySection({ section }) {
  if (!section || !section.images || section.images.length === 0) return null;

  const accentColor = "#4B0082";
  const { sectionTitle, layoutType = "carousel", images, description } = section;

  const STRAPI_BASE_URL = "http://localhost:1337";

  // Masonry breakpoints
  const breakpointColumns = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <section className="py-12 bg-gray-50">
      {/* Title */}
      {sectionTitle && (
        <h2
          className="text-center text-3xl font-bold mb-10"
          style={{ color: accentColor }}
        >
          {sectionTitle}
        </h2>
      )}

      {/* Description (optional) */}
      {description && (
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          {description}
        </p>
      )}

      {/* === Layout Variants === */}
      {layoutType === "carousel" && (
        <div className="max-w-5xl mx-auto">
          <Carousel
            showArrows
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            {images.map((img) => (
              <div key={img.id}>
                <img
                  src={
                img.image?.url?.startsWith("http")
                  ? img.image.url
                  : `${STRAPI_BASE_URL}${img.image?.url}`
              }
                  alt={img.alternativeText || "Gallery image"}
                  className="rounded-2xl shadow-md object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {layoutType === "grid" && (
        <div className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all"
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
        <div className="px-8">
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding space-y-4"
          >
            {images.map((img) => (
              <img
                key={img.id}
                src={
                img.image?.url?.startsWith("http")
                  ? img.image.url
                  : `${STRAPI_BASE_URL}${img.image?.url}`
              }
                alt={img.alternativeText || "Gallery image"}
                className="rounded-2xl shadow-md hover:shadow-lg transition-all"
              />
            ))}
          </Masonry>
        </div>
      )}
    </section>
  );
}
