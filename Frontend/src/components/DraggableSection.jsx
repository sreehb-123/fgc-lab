import React from "react";
import { Rnd } from "react-rnd";
import SectionRenderer from "./SectionRenderrer";

const DraggableSection = ({ section, onUpdate }) => {
  const defaultPosition = {
    x: section.x || 0,
    y: section.y || 0,
    width: section.width || 400,
    height: section.height || "auto", // Auto height for sections like text
  };

  return (
    <Rnd
      default={defaultPosition}
      bounds="parent" // Restrict to the <main> container
      onDragStop={(e, d) => {
        onUpdate(section.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const width = parseInt(ref.style.width);
        const height = parseInt(ref.style.height);
        onUpdate(section.id, { width, height, ...position });
      }}
      style={{
        border: "2px dashed #007aff",
        boxSizing: "border-box",
        overflow: "hidden", // Prevents content from spilling
      }}
      // Disable dragging from inside the content
      // Users must drag the border
      disableDragging={false} 
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
    >
      {/* This div ensures the SectionRenderer fills the Rnd container.
        We add 'pointerEvents: "none"' to prevent clicks inside
        the section (e.g., on links) while in Edit Mode.
      */}
      <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
        <SectionRenderer section={section} scrollId={`section-${section.id}`} />
      </div>
    </Rnd>
  );
};

export default DraggableSection;