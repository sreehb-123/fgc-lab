import React, { useState, useRef, useEffect } from "react";
import { slugify } from "../utils/formatter";

const FloatingPillNav = ({ sections }) => {
  const [open, setOpen] = useState(false);

  const autoClose = useRef(null);

  const handleItemClick = (scrollId) => {
    const el = document.getElementById(scrollId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Auto-close shortly after click
    setTimeout(() => setOpen(false), 300);
  };

  // Mobile tap closes on scroll
  useEffect(() => {
    const close = () => setOpen(false);
    if (open) window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  return (
    <div
      className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3"
      onMouseLeave={() => setOpen(false)}
    >
      {/* MENU BOX (shown when open) */}
      {open && (
        <div
          className="
            bg-white shadow-2xl rounded-2xl p-3
            w-56 max-h-[60vh] overflow-y-auto
            border border-gray-200
            transition-all duration-200
            animate-fadeIn
          "
        >
          {sections.map((section, index) => {
            const title =
              section.sectionTitle ||
              section.title ||
              section.__component.replace("sections.", "").replace(/-/g, " ");

            const scrollId = slugify(title);

            return (
              <button
                key={index}
                onClick={() => handleItemClick(scrollId)}
                className="
                  block shadow-lg hover:shadow-xl
                 bg-gray-100 
                  w-full text-left
                  mb-2 last:mb-0
                  px-4 py-3
                  rounded-xl
                   hover:text-[#00A3A1] cursor-pointer
                  text-sm font-medium
                  whitespace-normal break-words
                  hover:scale-[1.03]
                  transition
                "
              >
                {title}
              </button>
            );
          })}
        </div>
      )}

      {/* FLOATING PILL BUTTON */}
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)} // mobile tap
        className="
          w-14 h-14 rounded-full bg-[#00A3A1]
          shadow-xl text-white text-2xl font-bold
          flex items-center justify-center
          hover:scale-110 transition
        "
      >
        ≡
      </button>
    </div>
  );
};

export default FloatingPillNav;
