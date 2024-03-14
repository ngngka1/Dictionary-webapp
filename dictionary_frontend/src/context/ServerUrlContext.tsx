const backendServerUrl = "http://127.0.0.1:8000/";

import { createContext, ReactNode } from "react";

interface ServerUrlContextProps {
    children: ReactNode;
}

const ServerUrlContext = createContext<string>("null"); 

export default ServerUrlContext;

export const ServerUrlProvider = ({ children }: ServerUrlContextProps) => {
    return (
      <ServerUrlContext.Provider value={backendServerUrl}>{children}</ServerUrlContext.Provider>
    );
  };
