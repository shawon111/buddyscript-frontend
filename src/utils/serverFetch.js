import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export const serverFetch = async (url, options = {}) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const res = await fetch(`${url}`, {
      ...options,
      headers: {
        Cookie: cookieHeader,
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if(data?.shouldLogin){
      redirect("/login")
    }

    return data;

  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, data: null, message: error.message || "Server error" };
  }
};