import refreshAccessToken from "./refreshAccessToken";

const fetchWithAuth = async (url, options = {}, retry = true) => {
    try {
        const res = await fetch(url, {
            ...options,
            credentials: "include",
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

        // Access token expired so refresh
        if (data?.shouldRefresh && retry) {
            try {
                await refreshAccessToken();

                // Retry once
                return fetchWithAuth(url, options, false);
            } catch (err) {
                //Refresh failed 
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
                throw new Error("Session expired");
            }
        }

        throw new Error(data?.message || "Request failed");
    } catch (error) {
        throw error;
    }
};

export default fetchWithAuth;