import axios from "axios";
import { useEffect, useState } from "react";
import { useAxiosPrivate } from "~/hooks/useAxiosPrivate";
import useLogout from "~/hooks/useLogout";

export const Admin = () => {
  const [response, setResponse] = useState("");
    const useaxiosprivate = useAxiosPrivate();
    const logout = useLogout();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await useaxiosprivate.get(
          "http://localhost:3000/admin/readallusers",
          { withCredentials: true }, 
        );
        setResponse(JSON.stringify(res.data, null, 2));
      } catch (err: any) {
        setResponse(err.response?.status + " " + err.response?.statusText);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <h2>admin page</h2>
      <h3>{response}</h3>
       <button
        onClick={logout}
        style={{ backgroundColor: "red",  }}
      >
        Logout
      </button>
    </>
  );
};
