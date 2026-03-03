import { cookies } from "next/headers";

function extractCookieValue(setCookieHeader: string | null, cookieName: string) {
    if (!setCookieHeader) return null;
    const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = setCookieHeader.match(new RegExp(`${escapedName}=([^;]+)`));
    return match?.[1] ?? null;
}

export async function serverFetch(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });

    // لو access token انتهى نجرب الـ refresh
    if (res.status === 401) {
        const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/refresh`,
            {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            }
        );

        if (!refreshRes.ok) {
            throw new Error("Unauthorized");
        }

        const newAccessToken = extractCookieValue(
            refreshRes.headers.get("set-cookie"),
            "access_token"
        );

        if (!newAccessToken) {
            throw new Error("Unauthorized");
        }

        return fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${newAccessToken}`,
            },
        });
    }

    return res;
}
