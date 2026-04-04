import { BaseUrl } from "./BaseUrl";

let isRefreshing = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  try {
    // If already refreshing → return same promise
    if (isRefreshing && refreshPromise) {
      return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = fetch(`${BaseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to refresh access token");
        }
        return res.json();
      })
      .then((data) => {
        return data.accessToken;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });

    return refreshPromise;

  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export default refreshAccessToken;