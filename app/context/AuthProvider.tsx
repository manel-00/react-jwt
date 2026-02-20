import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "~/api/axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null, //i need to provide a default value or ts throws an error
  setAccessToken: () => {}, //same here
  authenticated: false,
  setAuthenticated: () => {},
  loading: true,
  setLoading: () => {},
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await axios.post(
          "/auth/refreshtoken",
          {},
          { withCredentials: true },
        );
        const { accessToken: newToken, user: newUser } = res.data;
        setAccessToken(newToken);
        setUser(newUser);

        if (newToken) setAuthenticated(true);
        else setAuthenticated(false);
      } catch (err) {
        setUser(null);
        setAccessToken(null);
        setAuthenticated(false); 
      } finally {
        setLoading(false); //  checking auth is done
      }
    };

    initializeAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//problem w using the hook
//AuthProvider mounts → calls useRefreshToken → useRefreshToken reads AuthContext → gets default setters → sets user/token (no-op)
