import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionRenderer from "../components/SectionRenderrer";
import Footer from "../components/Footer";
import { usePageContext } from "../context/PageContext";
import { slugify, deSlugify } from "../utils/formatter";
// import SidebarSections from "../components/Sidebar"; // not needed now
import HorizontalNav from "../components/HorizontalNav";
//import FloatingPillNav from "../components/FloatingPill";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const CACHE_EXPIRY = 5 * 60 * 1000; // 10 minutes

const populateQuery = [
  "populate[sections][on][sections.card-section][populate][subSection][populate]=*",
  "populate[sections][on][sections.faculty-cards][populate]=*",
  "populate[sections][on][sections.text][populate]=*",
  "populate[sections][on][sections.carousel][populate][carouselSlide][populate]=*",
  "populate[sections][on][sections.table][populate]=*",
  "populate[sections][on][sections.gallery][populate][images][populate]=*",
  "populate[sections][on][sections.spreadsheets][populate]=*"
].join("&");

const getCachedPage = (slug) => {
  try {
    const cached = localStorage.getItem(`page_${slug}`);
    if (!cached) return null;

    const parsed = JSON.parse(cached);

    // Check expiry
    if (Date.now() - parsed.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(`page_${slug}`);
      return null;
    }

    return parsed.sections;
  } catch {
    return null;
  }
};

// Helper to write cache
const setCachedPage = (slug, sections) => {
  try {
    localStorage.setItem(
      `page_${slug}`,
      JSON.stringify({
        sections,
        timestamp: Date.now(),
      })
    );
  } catch {}
};

const Page = ({ slug: propSlug }) => {
  const { slug: routeSlug } = useParams();
  const slug = routeSlug || propSlug || "home";

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setPageSections } = usePageContext();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setPageSections([]);

      // 1️⃣ Try localStorage cache first
      const cachedSections = getCachedPage(slug);
      if (cachedSections) {
        console.log(`[CACHE] Loaded page "${slug}" from LocalStorage`);
        setSections(cachedSections);
        setPageSections(cachedSections);
        setLoading(false);
        return;
      }

      // 2️⃣ Fallback → fetch from API
      try {
        console.log(`[API] Fetching page "${slug}"`);
        const { data } = await axios.get(
          `${API_BASE}/pages?filters[slug][$eq]=${slug}&${populateQuery}`
        );

        const pageData = data?.data?.[0];
        const fetchedSections = pageData?.sections || [];

        // Store in state
        setSections(fetchedSections);
        setPageSections(fetchedSections);

        // Store in LocalStorage
        setCachedPage(slug, fetchedSections);
      } catch (err) {
        console.error("Error fetching page:", err);
        setSections([]);
        setPageSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPage();

    return () => setPageSections([]);
  }, [slug]);

  if (loading) return <p className="text-center py-32">Loading...</p>;
  if (!sections.length) return <p className="text-center py-32">Page not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Apple-style floating nav: hidden at first, shows on scroll */}
      {sections.length > 2 && <HorizontalNav sections={sections} />}

      {/* CONTENT AREA (pushed under fixed navbar) */}
      <div className="flex-grow w-full mt-10">
        <main className="px-4 sm:px-6 md:px-10 lg:px-16 space-y-10 py-10">
          {sections.map((section, index) => {
            const title =
              section.sectionTitle ||
              section.title ||
              deSlugify(section.__component);
            const scrollId = slugify(title);

            return (
              <SectionRenderer
                key={`${section.__component}-${index}`}
                section={section}
                scrollId={scrollId}
              />
            );
          })}
        </main>
      </div>

      <Footer footer="© NextGen Lab. All rights reserved." />
    </div>
  );
};

export default Page;
