import { useContext } from "react";
import axios from "~/api/axios";
import { AuthContext } from "~/context/AuthProvider";

export const useRefreshToken = () => {
  const { setAccessToken,setUser } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const res = await axios.post(
        "/auth/refreshtoken",
        {},
        { withCredentials: true },
      );

      const { accessToken, user } = res.data;
      setAccessToken(accessToken);
      setUser(user);  
      return  { accessToken, user };
    } catch (err) {
      console.error("Refresh failed", err);
      throw err;
    }
  };

  return refresh;
};
