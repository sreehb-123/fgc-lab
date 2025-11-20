import React, { useState, useEffect, useRef } from 'react'; 
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; 
import { getNavLinks } from '../api/strapi';
import { usePageContext } from '../context/PageContext';
import api from '../api/strapi';
import { slugify, deSlugify } from '../utils/formatter'; 

const COLORS = {
  primary: "#1A237E",
  secondary: "#3949AB",
  accent: "#00A3A1",
  grayText: "#616161",
};

const MAX_DIRECT_PAGES = 6;
const MAX_DIRECT_SECTIONS = 1;

const Navbar = () => {
  const [pageLinks, setPageLinks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [labTitle, setLabTitle] = useState("Next Gen Lab");
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);

  const { pageSections } = usePageContext();
  const location = useLocation();

  const pageDropdownRef = useRef(null);
  const sectionDropdownRef = useRef(null);

  useEffect(() => {
    const fetchNavData = async () => {
      const links = await getNavLinks();
      if (links) setPageLinks(links.sort((a, b) => a.id - b.id));
    };
    fetchNavData();
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(event.target))
        setIsPageDropdownOpen(false);
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target))
        setIsSectionDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e, scrollId) => {
    e.preventDefault(); 
    setIsMenuOpen(false);
    setIsSectionDropdownOpen(false);
    const element = document.getElementById(scrollId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";

  const renderPageLinks = (isMobile = false) =>
    pageLinks.map((link) => {
      if (!link) return null;
      const slug = link.attributes?.slug || link.slug;
      const title = link.attributes?.title || link.title;

      return (
        <li key={link.id}>
          <NavLink
            to={`/${slug}`}
            onClick={isMobile ? toggleMenu : () => setIsPageDropdownOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isMobile ? "block w-full" : ""}
               ${
                 isActive
                   ? `text-[${COLORS.accent}] font-semibold bg-black/5`
                   : `text-black hover:text-[${COLORS.accent}] hover:bg-black/5`
               }`
            }
          >
            {title}
          </NavLink>
        </li>
      );
    });

  const renderSectionLinks = (isMobile = false) =>
    pageSections.map((section) => {
      const title = section.sectionTitle || section.title || deSlugify(section.__component);
      const scrollId = slugify(title);

      return (
        <li key={section.id || section.__component}>
          <a
            href={`#${scrollId}`}
            onClick={(e) => scrollToSection(e, scrollId)}
            className={`
              ${linkBase} ${isMobile ? "block w-full" : ""}
              text-black hover:text-[${COLORS.accent}] hover:bg-black/5
            `}
          >
            {title}
          </a>
        </li>
      );
    });

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/40 backdrop-blur-xl
        border-b border-black/10
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]
      "
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-black"
            onClick={() => window.scrollTo(0, 0)}
            style={{ color: COLORS.primary }}
          >
            {labTitle}
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center space-x-2">
            {pageLinks.length <= MAX_DIRECT_PAGES ? (
              renderPageLinks()
            ) : (
              <li className="relative" ref={pageDropdownRef}>
                <button
                  onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                  className={`text-black ${linkBase} flex items-center gap-1 hover:text-[${COLORS.accent}] hover:bg-black/5`}
                >
                  Pages <ChevronDown className={`w-4 h-4 transition ${isPageDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 z-30
                    bg-white/70 backdrop-blur-xl
                    border border-black/10 shadow-xl rounded-xl
                    overflow-hidden w-64 ${isPageDropdownOpen ? "block" : "hidden"}`}
                >
                  <ul className="py-2 px-2">{renderPageLinks()}</ul>
                </div>
              </li>
            )}

            {pageSections.length > 0 && pageLinks.length > 0 && (
              <li className="border-l border-black/10 h-5"></li>
            )}

            {pageSections.length <= MAX_DIRECT_SECTIONS ? (
              renderSectionLinks()
            ) : (
              <li className="relative" ref={sectionDropdownRef}>
                <button
                  onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
                  className={`text-black ${linkBase} flex items-center gap-1 hover:text-[${COLORS.accent}] hover:bg-black/5`}
                >
                  Sections <ChevronDown className={`w-4 h-4 transition ${isSectionDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 z-30
                    bg-white/70 backdrop-blur-xl
                    border border-black/10 shadow-xl rounded-xl
                    overflow-hidden w-64 ${isSectionDropdownOpen ? "block" : "hidden"}`}
                >
                  <ul className="py-2 px-2">{renderSectionLinks()}</ul>
                </div>
              </li>
            )}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-black hover:bg-black/5"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`
          lg:hidden transition-all duration-300 overflow-hidden
          ${isMenuOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"}
          bg-white/60 backdrop-blur-xl shadow-xl
        `}
      >
        <ul className="px-4 py-4 space-y-1">
          {renderPageLinks(true)}
          {pageSections.length > 0 && <hr className="border-black/10 my-2" />}
          {renderSectionLinks(true)}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
