import { BaseUrl } from "./BaseUrl";
import { serverFetch } from "./serverFetch";

export async function getUser() {
  let loadingUser = true;
  const user = await serverFetch(`${BaseUrl}/auth/me`, {
    method: "GET",
  });
  loadingUser = false;
  const result = {
    user,
    loadingUser
  }
  return result;
}