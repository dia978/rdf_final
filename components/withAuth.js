/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decodeToken } from "../lib/jwt";

export default function withAuth(WrappedComponent) {

  return function WithAuth(props) {
    // const router = useRouter();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      // Check if localStorage is available (only runs on the client side)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("user_session");
        if (!token) {
         return router.push("/");
        }
        if (token) {
          const user = decodeToken(token);
          if(!user) return  localStorage.removeItem("user_session");
          setUser(user);
        }
      }
    }, []);

    return <WrappedComponent {...props} user={user}/>
  };
}
