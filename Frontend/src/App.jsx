// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import { PageProvider } from "./context/PageContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <PageProvider> 

        <Navbar/>
      <Routes>
        <Route path="/:slug" element={<Page />} />
        <Route path="/" element={<Page slug="home" />} />
      </Routes>


      </PageProvider>
    </Router>
  );
}