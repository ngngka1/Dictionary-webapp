import TranslatorPage from "./pages/TranslatorPage.tsx";
import NavBar from "./components/NavBar.tsx";
import Contacts from "./components/Contacts.tsx";
import NoPage from "./pages/NoPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div
        className="background-blur-layer"
        style={{ width: "100%", height: "100%", position: "fixed" }}
      />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/dictionary" element={<TranslatorPage mode={0} />} />
          <Route path="/thesaurus" element={<TranslatorPage mode={1} />} />
          <Route path="/translator" element={<TranslatorPage mode={2} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Contacts />
    </>
  );
}

export default App;
