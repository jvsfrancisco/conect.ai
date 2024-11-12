"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect } from "react";

export function ColorModeSwitcher() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const nowTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(nowTheme);
    }
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className="dark:hidden"
      >
        <Moon />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className="hidden dark:flex"
      >
        <Sun />
      </Button>
    </>
  );
}
