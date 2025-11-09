import React, { useState, useEffect, useRef } from 'react'; 
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; 
import { getNavLinks } from '../api/strapi';
import { usePageContext } from '../context/PageContext';
import api from '../api/strapi';
import { slugify, deSlugify } from '../utils/formatter'; 

const MAX_DIRECT_LINKS = 3;

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
      if (links) setPageLinks(links);
      
      if (links) setPageLinks(links.sort((a, b) => a.id - b.id));

      try {
        const res = await api.get("/pages?filters[slug][$eq]=home&fields[0]=title");
        const homePage = res.data?.data?.[0];
        const homePageTitle = homePage?.attributes?.title || homePage?.title;
        // if (homePageTitle) setLabTitle(homePageTitle);
      } catch (err) {
        console.error("Error fetching home page title:", err);
      }
    };
    fetchNavData();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(event.target)) {
        setIsPageDropdownOpen(false);
      }
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target)) {
        setIsSectionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pageDropdownRef, sectionDropdownRef]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e, scrollId) => {
    e.preventDefault(); 
    if (isMenuOpen) setIsMenuOpen(false); 
    if (isSectionDropdownOpen) setIsSectionDropdownOpen(false);
    const element = document.getElementById(scrollId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderPageLinks = (isMobile = false) =>
    pageLinks
      .filter(link => !!link)
      .map((link) => {
        const slug = link.attributes?.slug || link.slug;
        const title = link.attributes?.title || link.title;
        if (!slug || !title) return null;

        return (
          <li key={link.id}>
            <NavLink
              to={`/${slug}`}
              onClick={isMobile ? toggleMenu : () => setIsPageDropdownOpen(false)}
              className={({ isActive }) =>
                `transition duration-150 flex items-center whitespace-nowrap text-lg
                 ${isMobile ? 'w-full text-left text-base' : 'text-base transition-transform duration-150 ease-in-out'}
                 ${isActive 
                   ? 'text-cyan-500 font-semibold scale-105' 
                   : 'text-gray-700 hover:text-cyan-400 hover:scale-105'}
                 ${isMobile ? ' text-base px-3 py-2 rounded-md hover:bg-gray-100' : 'px-3 py-2'}`
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
            className={`text-gray-700 hover:text-cyan-400 hover:scale-105 px-3 py-2 rounded-md font-medium transition-transform duration-150 ease-in-out flex items-center whitespace-nowrap
             ${isMobile ? 'w-full text-left text-base hover:bg-gray-100' : 'text-base'}`}
          >
            {title}
          </a>
        </li>
      );
    });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo(0, 0)}>
              <span className="text-3xl font-black text-brand-primary">
                {labTitle} 
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:space-x-4">
            <ul className="flex items-center space-x-4">
              {pageLinks.length > 0 && pageLinks.length <= MAX_DIRECT_LINKS && (
                <>{renderPageLinks()}</>
              )}
              {pageLinks.length > MAX_DIRECT_LINKS && (
                <li className="relative" ref={pageDropdownRef}>
                  <button
                    onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                    className="text-gray-700 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition duration-150 flex items-center hover:scale-105"
                  >
                    Pages <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPageDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 z-20 bg-white shadow-lg rounded-md overflow-hidden ring-1 ring-black ring-opacity-5 ${isPageDropdownOpen ? 'block' : 'hidden'}`}>
                    <ul>{renderPageLinks()}</ul>
                  </div>
                </li>
              )}

              {pageSections.length > 0 && pageLinks.length > 0 && (
                <li className="border-l border-gray-300 h-6"></li>
              )}

              {pageSections.length > 0 && pageSections.length <= MAX_DIRECT_LINKS && (
                <>{renderSectionLinks()}</>
              )}

              {pageSections.length > MAX_DIRECT_LINKS && (
                 <li className="relative" ref={sectionDropdownRef}>
                  <button
                    onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
                    className="text-gray-700 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium transition duration-150 flex items-center hover:scale-105"
                  >
                    Sections <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isSectionDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`absolute top-full left-0 mt-2 z-20 bg-white shadow-lg rounded-md overflow-hidden ring-1 ring-black ring-opacity-5 ${isSectionDropdownOpen ? 'block' : 'hidden'}`}>
                    <ul>{renderSectionLinks()}</ul>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-primary hover:text-cyan-400 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-lg pb-2`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {renderPageLinks(true)}
          {pageSections.length > 0 && pageLinks.length > 0 && (
            <li><hr className="border-gray-200 my-2" /></li>
          )}
          {renderSectionLinks(true)}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
