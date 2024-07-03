import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";
import { Session } from "@/types";
import { getSession } from "@/lib/utils/auth";

export const useUser = () => {
  const [user, setUser] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();

      if (session.success) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      setIsLoaded(true);
    };

    fetchSession();
  }, []);

  return { user, isLoaded };
};

export const signOut = () => {
  deleteCookie("auth-session-token");
  return;
};
