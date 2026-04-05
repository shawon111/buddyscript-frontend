const fetchWithAuth = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (res.ok) return data;

    if (res.status === 401 && data.shouldLogin===true) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Session expired");
    }

    throw new Error(data?.message || "Request failed");

  } catch (error) {
    throw error;
  }
};

export default fetchWithAuth;