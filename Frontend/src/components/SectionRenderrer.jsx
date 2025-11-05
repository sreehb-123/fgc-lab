import React from "react";
import { deSlugify } from "../utils/formatter"; 
import TextSection from "./sections/TextSection";
import TableSection from "./sections/TableSection";
import FacultyCards from "./sections/FacultyCardsSection";
import CarouselSection from "./sections/CarouselSection";
import CardsSection from "./sections/CardsSection";
import GallerySection from "./sections/GallerySection";

const SectionRenderer = ({ section, scrollId }) => { 
  return (
    <section id={scrollId} className="scroll-mt-20">
      
      {(() => {
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
            // return null;
            console.warn(`Component not found: ${section.__component}`);
            return (
              <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold">
                  {deSlugify(section.__component.replace("sections.", ""))}
                </h2>
                <p>Component renderer not found.</p>
              </div>
            );
        }
      })()}
    </section>
  );
};

export default SectionRenderer;