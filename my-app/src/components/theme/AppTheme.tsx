import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme({
  children,
  disableCustomTheme,
  themeComponents,
}: AppThemeProps) {
  const theme = React.useMemo(() => {
    if (disableCustomTheme) return createTheme({});

    return createTheme({
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: "#ff0021",
            },
            background: {
              default: "#F9F9FE",
              paper: "#FFFFFF",
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: "#ff4d63",
            },
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
          },
        },
      },
      components: {
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
