// components/SectionRenderer.jsx
import React from "react";

import TextSection from "./sections/TextSection";
import TableSection from "./sections/TableSection";
import FacultyCards from "./sections/FacultyCardsSection";
import CarouselSection from "./sections/CarouselSection";
import CardsSection from "./sections/CardsSection";
import GallerySection from "./sections/GallerySection";

const SectionRenderer = ({ section }) => {
  switch (section.__component) {
    case "sections.text":
      return <TextSection data={section} />;

    case "sections.table":
      return <TableSection data={section} />;

    case "sections.faculty-cards":
      return <FacultyCards data={section} />;

    case "sections.carousel":
      return <CarouselSection data={section} />;

    case "sections.card-section":
      return <CardsSection data={section} />;

    case "sections.gallery":
      return <GallerySection section={section} />;

    default:
      return null;
  }
};

export default SectionRenderer;
