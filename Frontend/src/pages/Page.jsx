import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionRenderer from "../components/SectionRenderrer";
import Footer from "../components/Footer";
import { usePageContext } from "../context/PageContext"; 
import { slugify, deSlugify } from "../utils/formatter"; 

// import api from "../api"
// import DraggableSection from "../components/DraggableSection";
// import { useAuth } from "../context/AuthContext";


const API_BASE = import.meta.env.VITE_API_BASE_URL;;
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
        
      
       if ( DEBUG) console.log("Page.jsx DEBUG 1: Full API response", data);

        const pageData = data?.data?.[0];
        
       if( DEBUG) console.log("Page.jsx DEBUG 2: Extracted page data", pageData);

    
        const fetchedSections = pageData?.sections || []; 
        
      if ( DEBUG)  console.log("Page.jsx DEBUG 3: Extracted sections", fetchedSections); 

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow p-6 space-y-10 pt-20"> 
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
      <Footer footer={"Footer"} /> 
    </div>
   
  );
};

export default Page;











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api";
// import SectionRenderer from "../components/SectionRenderrer";
// import DraggableSection from "../components/DraggableSection";
// import Footer from "../components/Footer";
// import { usePageContext } from "../context/PageContext";
// import { useAuth } from "../context/AuthContext";
// import { slugify, deSlugify } from "../utils/formatter";

// const DEBUG = true;

// // Updated the populate query to match your original complex one
// const POPULATE_QUERY = [
//   "populate[sections][on][sections.card-section][populate][subSection][populate]=*",
//   "populate[sections][on][sections.faculty-cards][populate]=*",
//   "populate[sections][on][sections.text][populate]=*",
//   "populate[sections][on][sections.carousel][populate][carouselSlide][populate]=*",
//   "populate[sections][on][sections.table][populate]=*",
//   "populate[sections][on][sections.gallery][populate][images][populate]=*"
// ].join("&");

// const Page = ({ slug: propSlug }) => {
//   const { slug: routeSlug } = useParams();
//   const slug = routeSlug || propSlug || "home";

//   const [pageData, setPageData] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // State for dynamic height
//   const [contentHeight, setContentHeight] = useState(1000); // Default height

//   const { setPageSections } = usePageContext();
//   const { user } = useAuth();
//   const isLoggedIn = !!user;
//   const [isEditMode, setEditMode] = useState(false);

//   // Fetch Page Data
//   useEffect(() => {
//     const fetchPage = async () => {
//       try {
//         setLoading(true);
//         setPageSections([]);
//         const { data } = await api.get(
//           `/pages?filters[slug][$eq]=${slug}&${POPULATE_QUERY}`
//         );
        
//         if (DEBUG) console.log("Page.jsx DEBUG 1: Full API response", data);
//         const pageData = data?.data?.[0];

//         if (pageData) {
//           setPageData(pageData);
//           const fetchedSections = pageData.sections || [];
//           if (DEBUG) console.log("Page.jsx DEBUG 3: Extracted sections", fetchedSections);
//           setSections(fetchedSections);
//           setPageSections(fetchedSections);
//         }
//       } catch (err) {
//         console.error("Error fetching page:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPage();
//     return () => setPageSections([]);
//   }, [slug, setPageSections]); // Removed POPULATE_QUERY from deps, it's a constant

//   // Effect to calculate height
//   useEffect(() => {
//     if (sections.length > 0) {
//       let maxHeight = 0;
      
//       sections.forEach(section => {
//         // Find the "bottom" of each section
//         // Use a default height (e.g., 200) if one isn't set
//         const sectionBottom = (section.y || 0) + (section.height || 200); 
        
//         if (sectionBottom > maxHeight) {
//           maxHeight = sectionBottom;
//         }
//       });

//       // Set the container height to be the max height + some padding
//       setContentHeight(maxHeight + 100);
//     } else if (!loading) {
//       // If no sections, set a minimal height
//       setContentHeight(500);
//     }
//     // This effect runs when sections are loaded AND
//     // every time the 'sections' state is updated (i.e., after drag/resize)
//   }, [sections, loading]);

//   // Function to update section positions in the local state
//   const handleSectionUpdate = (sectionId, updates) => {
//     setSections(currentSections =>
//       currentSections.map(s =>
//         s.id === sectionId ? { ...s, ...updates } : s
//       )
//     );
//   };

//   // Function to save all changes to Strapi
//   const handleSaveChanges = async () => {
//     if (!pageData) return alert("Error: No page data found.");
    
//     setLoading(true);
//     try {
//       await api.put(`/pages/${pageData.id}`, {
//         data: {
//           sections: sections, // Send the whole updated array
//         },
//       });
//       alert("Changes saved!");
//       setEditMode(false);
//     } catch (err) {
//       console.error("Failed to save:", err);
//       alert("Error saving changes.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && sections.length === 0) {
//     return <p className="text-center py-10 pt-32">Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
      
//       {/* --- EDIT MODE CONTROLS --- */}
//       {isLoggedIn && (
//          <div
//           style={{
//             position: "fixed",
//             top: 80, // Assuming 80px navbar height
//             right: 20,
//             zIndex: 1000,
//             background: "white",
//             padding: 10,
//             border: "1px solid #000",
//             borderRadius: "5px",
//             display: "flex",
//             gap: "10px",
//           }}
//         >
//           {isEditMode ? (
//             <>
//               <button
//                 onClick={handleSaveChanges}
//                 style={{ background: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px" }}
//               >
//                 Save Layout
//               </button>
//               <button onClick={() => setEditMode(false)} style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "4px" }}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               style={{ background: "#007aff", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px" }}
//             >
//               Edit Layout
//             </button>
//           )}
//         </div>
//       )}
      
//       {/* --- DYNAMIC HEIGHT CANVAS --- */}
//       <main
//         style={{
//           position: "relative",
//           width: "100%",
//           height: `${contentHeight}px`, // Uses dynamic height
//         }}
//         className="flex-grow p-6 pt-20" // pt-20 matches your original
//       >
//         {sections.map((section, index) => {
//           const title = section.sectionTitle || section.title || deSlugify(section.__component);
//           const scrollId = slugify(title);

//           if (isEditMode) {
//             // --- EDIT MODE ---
//             return (
//               <DraggableSection
//                 key={section.id || index}
//                 section={section}
//                 onUpdate={handleSectionUpdate}
//               />
//             );
//           } else {
//             // --- VIEW MODE ---
//             return (
//               <div
//                 key={section.id || index}
//                 style={{
//                   position: 'absolute',
//                   left: `${section.x || 0}px`,
//                   top: `${section.y || 0}px`,
//                   width: `${section.width || 400}px`,
//                   height: `${section.height || "auto"}px`,
//                   overflow: "hidden",
//                 }}
//               >
//                 <SectionRenderer section={section} scrollId={scrollId} />
//               </div>
//             );
//           }
//         })}
//       </main>
//       <Footer footer={"Footer"} /> 
//     </div>
//   );
// };

// export default Page;