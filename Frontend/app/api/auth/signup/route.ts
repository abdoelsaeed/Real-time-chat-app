import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const backendRes = await fetch(
        `${process.env.BACKEND_URL}/auth/signup`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
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

    const refreshToken = data.refreshToken;
    if (refreshToken) {
        response.cookies.set("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/api/auth/refresh",
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    return response;
}
