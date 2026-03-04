import { getCurrentUser } from "@/lib/services/auth.service";

export default async function Home() {


  const user = await getCurrentUser()
  return (
    <div className="min-h-screen flex items-center justify-center">
      {user?.name}
    </div>
  );
}