/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 rounded-full border px-3 py-1.5 bg-muted"
    >
      <Sun size={16} />

      <div className="relative h-5 w-10 rounded-full bg-gray-300 dark:bg-gray-700">
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${isDark ? "left-5" : "left-0.5"
            }`}
        />
      </div>

      <Moon size={16} />
    </button>
  );
}