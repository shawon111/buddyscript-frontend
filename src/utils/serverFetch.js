import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import refreshAccessToken from "./refreshAccessToken";

export const serverFetch = async (url, options = {}, retry = true) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(url, {
      ...options,
      headers: {
        Cookie: cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; '),
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      return data;
    }

    if ((data?.shouldRefresh || res.status === 401) && retry) {
      try {
        await refreshAccessToken();
        return serverFetch(url, options, false);
      } catch (refreshError) {
        redirect("/login"); 
      }
    }

    return data;

  } catch (error) {
    if (isRedirectError(error)) throw error;
    
    return {
      success: false,
      data: null,
      message: error.message || "Server error",
      status: 500,
    };
  }
};