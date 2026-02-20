import { useContext } from "react";
import { AuthContext } from "~/context/AuthProvider";
import useLogout from "~/hooks/useLogout";
import { useRefreshToken } from "~/hooks/useRefreshToken";

export const Feedbacks = () => {
  const { accessToken, authenticated, loading,user } = useContext(AuthContext);
  const refresh = useRefreshToken();
  const logout = useLogout();

  const handleClick = async () => {
    try {
      await refresh();
    } catch (error) {
      console.error("Refresh failed:", error);
    }
  };
  return (
    <>
      <h2>feedbacks page</h2>
      <h4> {"Access Token : "}   {accessToken ? accessToken : "No token"}</h4>
      <button onClick={handleClick}> test useRefresh hook</button>
      <h4>Authenticated: {authenticated ? "true" : "false"}</h4>
      <h4>Loading: {loading ? "true" : "false"}</h4>
       <p>User Data:</p>
      <p >
        {user ? JSON.stringify(user, null, 2) : "No user"}
      </p>
       <button
        onClick={logout}
        style={{ backgroundColor: "red",  }}
      >
        Logout
      </button>
    </>
  );
};
