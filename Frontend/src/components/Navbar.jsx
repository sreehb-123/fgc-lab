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
    "px-4 py-3 rounded-lg text-base sm:text-lg font-medium transition-all duration-200";

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
                   : `text-black hover:bg-gray-200`
               }`
            }
          >
            {title}
          </NavLink>
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
      <nav className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div
            className="flex items-center gap-4 lg:gap-6 cursor-pointer"
            onClick={() => window.open("https://www.iitdh.ac.in/", "_blank")}
          >
            {/* Desktop Logo */}
            <img
              src="/institute-logo.png" // ← replace with your actual big logo file in public
              alt="IIT Dharwad"
              className="
                hidden sm:block
                h-[45px] md:h-[55px]
                w-auto
                transition-transform duration-200
                hover:scale-[1.03]
              "
            />

            {/* Mobile Icon */}
            <img
              src="/institute_favicon.png" // ← small favicon file from public
              alt="IIT DH"
              className="
                block sm:hidden
                h-[40px]
                w-auto
                transition-transform duration-200
                hover:scale-[1.03]
              "
            />

            {/* Next Gen Lab text */}
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-black"
              style={{ color: COLORS.primary }}
            >
              {labTitle}
            </span>
          </div>


          <ul className="hidden lg:flex items-center space-x-2">
            {renderPageLinks()}
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-black hover:bg-black/5"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
        <ul className="px-4 py-4 space-y-2">
          {renderPageLinks(true)}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
