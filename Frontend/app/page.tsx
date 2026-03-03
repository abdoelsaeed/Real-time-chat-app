import { serverFetch } from "@/lib/server/fetchWithAuth";

export default async function Home() {
  const res = await serverFetch(`${process.env.BACKEND_URL}/auth/me`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    // مش مسجل دخول (أو refresh فشل)
    return <div className="min-h-screen flex items-center justify-center">Guest</div>;
  }

  const user = await res.json();
console.log(user);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {user?.name}
    </div>
  );
}