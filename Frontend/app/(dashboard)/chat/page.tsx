import { getCurrentUser } from "@/lib/services/auth.service";
import EmptyChat from "./_components/EmptyChat";

export default async function Home() {
  return (
    <EmptyChat />
  );
}