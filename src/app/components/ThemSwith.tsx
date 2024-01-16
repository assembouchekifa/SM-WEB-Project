"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function ThemSwith() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  function hundelClick(): void {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={hundelClick}
        className="flex items-center focus:outline-none dark:focus:bg-zinc-900 focus:bg-zinc-200 px-3 py-1 border-black dark:border-white border-2 rounded-lg  "
      >
        {theme == "dark" ? <MdDarkMode /> : <MdLightMode />}{" "}
      </button>
    </>
  );
}
export default ThemSwith;
