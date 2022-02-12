import React from "react";
import {
  extendTheme,
  Container,
  NativeBaseProvider,
  Wrap,
  Center,
  Box,
} from "native-base";

import { AuthProvider } from "./components/AuthProvider";
import Routes from "./components/Routes";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "white",
};

// extend the theme
export const theme = extendTheme({
  config,
  colors: {
    // Add new color
    primary: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
  },
});

export default function App({}) {
  return (
    <NativeBaseProvider config={config}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
