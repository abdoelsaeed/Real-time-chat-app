import { NextResponse } from "next/server";

function extractCookieValue(setCookieHeader: string | null, cookieName: string) {
    if (!setCookieHeader) return null;
    const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = setCookieHeader.match(new RegExp(`${escapedName}=([^;]+)`));
    return match?.[1] ?? null;
}

export async function POST(req: Request) {
    const body = await req.json();

    const backendRes = await fetch(
        `${process.env.BACKEND_URL}/auth/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include", // مهم جدًا عشان ياخد كوكي الريفريش
            cache: "no-store",
        }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
        return NextResponse.json(data, { status: backendRes.status });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
    });

    const refreshToken = extractCookieValue(
        backendRes.headers.get("set-cookie"),
        "refresh_token"
    );
    if (refreshToken) {
        response.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    return response;
}
