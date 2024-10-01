import { createContext, useState, useEffect, ReactNode } from "react";

import axios from "axios";
import qs from "qs";

import { Auth } from "@/types/auth";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<Auth>({ token: "" });
const { Provider } = AuthContext;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const response = await axios.post(
        "https://oauth.battle.net/token",
        qs.stringify({
          grant_type: "client_credentials",
        }),
        {
          auth: {
            username: import.meta.env.VITE_API_CLIENT_ID,
            password: import.meta.env.VITE_API_SECRET,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setToken(response.data.access_token);
    } catch (error) {
      throw new Error(`Error getting access token: ${error}`);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return <Provider value={{ token }}>{children}</Provider>;
};

export default AuthContext;
export { AuthProvider };
