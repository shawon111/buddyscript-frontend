import { BaseUrl } from "./BaseUrl";

let isRefreshing = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  // If already refreshing → return same promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = fetch(`/api/auth/refresh-token`, { 
    method: "POST",
    credentials: "include",
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to refresh access token");
      return res.json();
    })
    .then((data) => data.accessToken)
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};

export default refreshAccessToken;