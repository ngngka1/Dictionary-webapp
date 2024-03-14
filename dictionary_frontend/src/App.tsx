import SearchPage from "./pages/SearchPage.tsx";
import NavBar from "./components/NavBar.tsx";
import Contacts from "./components/Contacts.tsx";
import NoPage from "./pages/NoPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServerUrlProvider } from "./context/ServerUrlContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";

function App() {
  return (
    <>
      <div
        className="background-blur-layer"
        style={{ width: "100%", height: "100%", position: "fixed" }}
      />
      <BrowserRouter>
        <ServerUrlProvider>
          <AuthProvider>
            <NavBar />
            <Routes>
              <Route index element={<PrivateRoute guestAccessible={true}><HomePage /></PrivateRoute>} />
              <Route path="/dictionary" element={<PrivateRoute guestAccessible={true}><SearchPage mode={0} /></PrivateRoute>} />
              <Route path="/thesaurus" element={<PrivateRoute guestAccessible={true}><SearchPage mode={1} /></PrivateRoute>} />
              <Route path="/translator" element={<PrivateRoute guestAccessible={true}><SearchPage mode={2} /></PrivateRoute>} />
              <Route
                path="/word-quiz"
                element={<PrivateRoute guestAccessible={false}>Word Quiz Page</PrivateRoute>}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Contacts />
          </AuthProvider>
        </ServerUrlProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
