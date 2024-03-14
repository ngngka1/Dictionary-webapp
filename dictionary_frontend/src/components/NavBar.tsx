import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-background">
        <div className="container">
          <a className="navbar-brand" href="/">
            Online Learner Dictionary
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active " href="/dictionary">
                  Dictionary
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/thesaurus">
                  Thesaurus
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/translator">
                  Translator
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/word-quiz">
                  Word Quiz
                </a>
              </li>
            </ul>
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("login/")}
            >
              {user ? <>Welcome, {user}</> : "Log in"}
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => logoutUser()}
              disabled={user === ""}
              style={{display: user ? "inline-block" : "none"}}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
