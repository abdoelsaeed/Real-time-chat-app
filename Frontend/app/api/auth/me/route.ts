import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch(
        `${process.env.BACKEND_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!backendRes.ok) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await backendRes.json();

    return NextResponse.json(user);
}