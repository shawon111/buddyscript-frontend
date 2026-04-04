import { BaseUrl } from "./BaseUrl";

export const loginFunction = async (data) => {
    const response = await fetch(`${BaseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.json();
}