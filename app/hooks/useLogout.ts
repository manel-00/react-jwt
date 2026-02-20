import { AuthContext } from "~/context/AuthProvider";
import axios from "../api/axios";
import { useContext } from "react";

const useLogout = () => {
  const { setAccessToken, setAuthenticated, setUser } = useContext(AuthContext);
  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    } finally {
      setAccessToken(null);
      setAuthenticated(false);
      setUser(null);
    }
  };

  return logout;
};

export default useLogout;
