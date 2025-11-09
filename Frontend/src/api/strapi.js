import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const getPageBySlug = async (slug) => {
  const res = await api.get(
    `/pages?filters[slug][$eq]=home&populate[sections][on][sections.cards][populate]=*&populate[sections][on][sections.faculty-cards][populate]=*&populate[sections][on][sections.text][populate]=*&populate[sections][on][sections.carousel][populate][carouselSlide][populate]=*&populate[sections][on][sections.table][populate]=*`
  );
  return res.data.data?.[0];
};


export const getNavLinks = async() => {

   try {
    const res = await api.get("/pages?sort[0]=id:asc&fields[0]=title&fields[1]=slug");

    console.log("Nav links response data: ",res.data.data);

    if (res.data && res.data.data) {
        console.log("Nav links returning: res.data.data");
        return res.data.data; 
    }
    
   
    // if (res.data && Array.isArray(res.data)) {
    //     console.log("Nav links returning: res.data");
    //     return res.data; // This will be [{ id: 8, title: ... }]
    // }

   
    return [];
   } catch (error) {
    console.error("Error fetching nav links:",error);
    return [];

    
   }

};



export default api;