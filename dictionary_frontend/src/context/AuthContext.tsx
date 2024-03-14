import { ReactNode, createContext, useContext, useState } from "react";
import ServerUrlContext from "./ServerUrlContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

declare module "jwt-decode" {}

interface AuthContextProps {
  children: ReactNode;
}

interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  username?: string;
}

const AuthContext = createContext<any>(undefined);

export default AuthContext;

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? localStorage.getItem("authTokens")
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? localStorage.getItem("user")
      : ""
  );
  const backendServerUrl = useContext(ServerUrlContext);
  const navigate = useNavigate();

  const returnHome = () => {
    setUser("Guest");
    localStorage.setItem("user", "Guest")
    navigate("/");
  };

  const loginUser = async (LoginInfos: Map<string, string>) => {
    const response = await fetch(backendServerUrl + "user/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: LoginInfos.get("Username"),
        password: LoginInfos.get("Password"),
      }),
    });
    const data = await response.json();
    if (response.status == 200) {
      setAuthTokens(data);
      const { username } = jwtDecode<JwtPayload>(data.access);
      setUser(username || "");
      localStorage.setItem("user", username || "");
      localStorage.setItem("authTokens", JSON.stringify(data));
      returnHome();
    } else {
      alert("Invalid login credentials! Please re-enter username or password");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser("");
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    proceedAsGuest: returnHome,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
