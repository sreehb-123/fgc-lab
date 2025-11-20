import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionRenderer from "../components/SectionRenderrer";
import Footer from "../components/Footer";
import { usePageContext } from "../context/PageContext"; 
import { slugify, deSlugify } from "../utils/formatter"; 
import SidebarSections from "../components/Sidebar";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const DEBUG = true;

const populateQuery = [
  "populate[sections][on][sections.card-section][populate][subSection][populate]=*",
  "populate[sections][on][sections.faculty-cards][populate]=*",
  "populate[sections][on][sections.text][populate]=*",
  "populate[sections][on][sections.carousel][populate][carouselSlide][populate]=*",
  "populate[sections][on][sections.table][populate]=*",
  "populate[sections][on][sections.gallery][populate][images][populate]=*"
].join("&");

const Page = ({ slug: propSlug }) => {
  const { slug: routeSlug } = useParams();
  const slug = routeSlug || propSlug || "home";

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { setPageSections } = usePageContext();
  

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true); 
        setPageSections([]);
        
        const { data } = await axios.get(
          `${API_BASE}/pages?filters[slug][$eq]=${slug}&${populateQuery}`
        );
        
        if (DEBUG) console.log("Page.jsx DEBUG: Full API response", data);

        const pageData = data?.data?.[0];
        const fetchedSections = pageData?.sections || []; 
        
        setSections(fetchedSections);
        setPageSections(fetchedSections); 
        
      } catch (err) {
        console.error("Error fetching page:", err);
        setSections([]);
        setPageSections([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchPage();
    
    return () => {
      setPageSections([]); 
    };
  }, [slug, setPageSections]); 

  if (loading) {
    return <p className="text-center py-10 pt-32">Loading...</p>; 
  }
  
  if (!sections || sections.length === 0) {
    return <p className="text-center py-10 pt-32">Page not found (or no sections found).</p>; 
  }

  return (
    <div className="flex flex-col lg:flex-row w-full mt-20">
      <div className="hidden lg:block">
        <SidebarSections sections={sections}/>
      </div>
      <main className="flex-grow x-4 sm:px-6 md:px-10 lg:px-16 mt-20 space-y-10">
        {sections.map((section, index) => {
          const title = section.sectionTitle || section.title || deSlugify(section.__component);
          const scrollId = slugify(title);

          return (
            <SectionRenderer 
              key={`${section.__component}-${section.id || index}`} 
              section={section} 
              scrollId={scrollId} 
            />
          );
        })}
      </main>

      <Footer footer={"© NextGen Lab. All rights reserved."} /> 
    </div>
  );
};

export default Page;
