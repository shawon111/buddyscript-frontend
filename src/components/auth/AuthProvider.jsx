"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BaseUrl } from "@/utils/BaseUrl";

const PUBLIC_PATHS = ["/login", "/register"];

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isPublicPath = PUBLIC_PATHS.includes(pathname);

      try {
        const res = await fetch(`${BaseUrl}/auth/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          if (isPublicPath) router.replace("/");
        } else {
          // Not logged in and redirect to login
          if (!isPublicPath) router.replace("/login");
        }

      } catch {
        if (!isPublicPath) router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname]);

  if (isChecking) return null; 

  return children;
};

export default AuthProvider;