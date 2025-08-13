import React from "react";
import { useMediaQuery, CssBaseline } from "@mui/material";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

function App() {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <>
      <CssBaseline />
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
}

export default App;