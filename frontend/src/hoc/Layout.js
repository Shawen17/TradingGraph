import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Layout = (props) => {
  const [mode, setMode] = useState("light");

  const handlechange = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar handlechange={handlechange} mode={mode} />
      {props.children}
    </ThemeProvider>
  );
};

export default Layout;
