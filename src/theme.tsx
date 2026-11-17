import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const storageKey = "contas-theme";
function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}
function preferredTheme(): Theme {
  return (
    savedTheme() ??
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#10101d" : "#f5f5fc");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(preferredTheme);
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setTheme(preferredTheme());
    const syncSystem = () => {
      if (!savedTheme()) sync();
    };
    media.addEventListener("change", syncSystem);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", syncSystem);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      title={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(storageKey, next);
        } catch {
          /* The theme still works when storage is unavailable. */
        }
        setTheme(next);
      }}
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      <span>{theme === "dark" ? "Tema claro" : "Tema escuro"}</span>
    </button>
  );
}
