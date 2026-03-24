import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("icbu_theme");
    return (stored === "light" || stored === "dark") ? stored : "dark";
  });

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  useEffect(() => {
    localStorage.setItem("icbu_theme", theme);
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("light", theme === "light");
    // Update FOUC background
    root.style.background = theme === "dark" ? "#0a0f1a" : "#f8fafc";
    document.body.style.background = theme === "dark" ? "#0a0f1a" : "#f8fafc";
    root.style.colorScheme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
