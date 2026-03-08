import { Settings } from "lucide-react";
import Image from "next/image";

export default function SidebarHeader() {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3 ">
      <div className="flex items-center gap-3">
        <div className="rounded-xl ">
          <Image
            src="/logo3.png"
            alt="NEXORA"
            width={50}
            height={50}
            className="h-full w-full object-contain"
            priority
          />
        </div>
        <span className="text-xl font-semibold tracking-wide ml-[-27]">NEXORA</span>
      </div>

      <button
        type="button"
        aria-label="Settings"
        className="rounded-full p-2 transition hover:bg-muted"
      >
        <Settings className="h-5 w-5" />
      </button>
    </header>
  );
}
