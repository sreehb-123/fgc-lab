// pages/Page.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionRenderer from "../components/SectionRenderrer"; // fixed typo in filename
import Footer from "../components/Footer";
const API_BASE = "http://localhost:1337/api";

const populateQuery = [
  "populate[sections][on][sections.cards][populate]=*",
  "populate[sections][on][sections.faculty-cards][populate]=*",
  "populate[sections][on][sections.text][populate]=*",
  "populate[sections][on][sections.carousel][populate][carouselSlide][populate]=*",
  "populate[sections][on][sections.table][populate]=*",
].join("&");

const Page = ({ slug: propSlug }) => {
  const { slug: routeSlug } = useParams();
  const slug = routeSlug || propSlug || "home"; // fallback if route or prop missing

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState("© 2025 Future Generations Computing Lab, Dept. of CSE, IIT Dharwad.")

  useEffect(() => {
    const fetchPage = async () => {
      try {
        
        const { data } = await axios.get(
          `${API_BASE}/pages?filters[slug][$eq]=${slug}&${populateQuery}`
        );

        // const footerData = await axios.get(
        //   `${API_BASE}/footer?populate=*`
        // );
        // setFooter(footerData?.data?.data || footer);
        
        // console.log("API response data:", data);

        const pageData = data?.data?.[0];
        // console.log("Fetched page data:", pageData);
        setSections(pageData?.sections || []);
        // console.log("Page sections set:", pageData?.sections || []);
      } catch (err) {
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (sections.length === 0) return <p className="text-center py-10">Page not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
  <main className="flex-grow p-6 space-y-10">
    {sections.map((section, index) => (
      <SectionRenderer key={`${section.__component}-${section.id || index}`} section={section} />
    ))}
  </main>
  {/* Temporary Footer text */}
  <Footer footer={"Footer"} />
</div>
   
  );
};

export default Page;
