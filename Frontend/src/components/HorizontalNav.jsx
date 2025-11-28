import React, { useEffect, useRef, useState } from "react";
import { slugify } from "../utils/formatter";

const HorizontalNav = ({ sections }) => {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef(null);
  const isClicking = useRef(false);
  const clickResetTimeout = useRef(null);  // NEW FIX

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastScrollY.current) < 10) return;
      lastScrollY.current = currentY;

      // only show if it's not during click navigation
      if (!isClicking.current) {
        setVisible(true);
      }

      // auto-hide after inactivity
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (clickResetTimeout.current) clearTimeout(clickResetTimeout.current);
    };
  }, []);

  const handleClick = (e, scrollId) => {
    e.preventDefault();

    const el = document.getElementById(scrollId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    // enter click-lock mode
    isClicking.current = true;

    // hide instantly
    setVisible(false);

    // ensure click lock clears AFTER smooth scroll
    if (clickResetTimeout.current) clearTimeout(clickResetTimeout.current);
    clickResetTimeout.current = setTimeout(() => {
      isClicking.current = false;
    }, 600); // smooth scroll finishes by then
  };

  return (
    <div
      className={`
        fixed left-0 right-0 top-20 z-40
        bg-gray-200 shadow-sm
        transform transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="w-full overflow-x-auto no-scrollbar">
        <nav className="flex items-center justify-center gap-6 px-6 py-3 whitespace-nowrap">
          {sections.map((section, index) => {
            const title =
              section.sectionTitle ||
              section.title ||
              section.__component.replace("sections.", "").replace(/-/g, " ");
            const scrollId = slugify(title);

            return (
              <button
                key={index}
                onClick={(e) => handleClick(e, scrollId)}
                className="
                 font-medium text-base
                 block shadow-lg hover:shadow-xl rounded-xl px-4 py-3
                 bg-white/70 hover:bg-white/90
                 transition-all duration-200 ease-out
                 hover:scale-[1.03] cursor-pointer
                 whitespace-nowrap
                "
              >
                {title}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default HorizontalNav;
