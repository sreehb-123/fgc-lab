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

export default api;