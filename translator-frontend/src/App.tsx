import TranslatorPage from "./pages/TranslatorPage.tsx";
import NavBar from "./components/NavBar.tsx";
import NoPage from "./pages/NoPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div
        className="background-blur-layer"
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/translator" element={<TranslatorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
