import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );

  const muiTheme = createTheme({
    palette: {
      mode: theme as "light" | "dark",
      ...(theme === "dark"
        ? {
            primary: {
              main: "#90caf9",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e", //navbar
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
          }
        : {
            primary: {
              main: "#1976d2",  //navbar
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000",
              secondary: "#666666",
            },
          }),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.2s ease-in-out',
          },
        },
      },
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
