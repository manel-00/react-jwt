import { useContext, useEffect } from "react";
import { axiosPrivate } from "~/api/axios";
import { AuthContext } from "~/context/AuthProvider";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const { accessToken } = useContext(AuthContext);
  const refresh = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (accessToken)
          config.headers["authorization"] = `Bearer ${accessToken}`;
        return config;
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; 
          const newAccessToken = await refresh();
          prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); 
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};
