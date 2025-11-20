import React from "react";
import { slugify, deSlugify } from "../utils/formatter";

export default function SidebarSections({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <aside
      className="
        hidden lg:block w-64 p-6
        sticky top-24
        h-[calc(100vh-6rem)]
        overflow-y-auto
        bg-gray-100 backdrop-blur-xl
        border-r border-black/10 shadow-sm
      "
    >
      {/* <h3 className="text-xl font-semibold mb-6 text-gray-800 tracking-wide">
        Sections
      </h3> */}

      <ul className="space-y-3">
        {sections.map((section, index) => {
          const title =
            section.sectionTitle ||
            section.title ||
            deSlugify(section.__component);
          const scrollId = slugify(title);

          return (
            <li key={index}>
              <a
                href={`#${scrollId}`}
                className="
                  block px-4 py-3 rounded-xl
                  text-base font-medium
                  text-gray-800
                  bg-white/70
                  shadow-lg 
                  hover:bg-white/90 hover:shadow-xl
                  hover:text-[#00A3A1]
                  transform transition-all duration-200 ease-out
                  hover:scale-[1.03]
                  scroll-smooth
                "
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
