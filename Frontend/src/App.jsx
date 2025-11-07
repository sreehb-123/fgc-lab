// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import ResizeTest from "./ResizeTest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:slug" element={<Page />} />
        <Route path="/" element={<Page slug="home" />} />
        <Route path="/resize-test" element={<ResizeTest />} />
      </Routes>
    </Router>
  );
}