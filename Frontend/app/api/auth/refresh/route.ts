import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function extractCookieValue(setCookieHeader: string | null, cookieName: string) {
    if (!setCookieHeader) return null;
    const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = setCookieHeader.match(new RegExp(`${escapedName}=([^;]+)`));
    return match?.[1] ?? null;
}

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const backendRes = await fetch(
        `${process.env.BACKEND_URL}/auth/refresh`,
        {
            method: "POST",
            headers: {
                Cookie: `refresh_token=${refreshToken}`,
            },
            cache: "no-store",
        }
    );
    const data = await backendRes.json();
    if (!backendRes.ok) {
        const response = NextResponse.json(data, { status: 401 });
        response.cookies.set("access_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });
        response.cookies.set("refresh_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });
        return response;
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
    });

    const rotatedRefreshToken = extractCookieValue(
        backendRes.headers.get("set-cookie"),
        "refresh_token"
    );
    if (rotatedRefreshToken) {
        response.cookies.set("refresh_token", rotatedRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    return response;
}
