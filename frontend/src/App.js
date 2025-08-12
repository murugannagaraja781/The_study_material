import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Typography,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const whatsappNumber = "9003303103"; // Your WhatsApp number, no spaces

function ColorModeToggle({ mode, toggleColorMode }) {
  return (
    <IconButton
      onClick={toggleColorMode}
      sx={{ position: "absolute", top: 16, right: 16 }}
      aria-label="toggle dark/light mode"
      color="inherit"
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

function AppContent({ mode, toggleColorMode }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        bgcolor: mode === "dark" ? "background.default" : "#f5faff",
      }}
    >
      <ColorModeToggle mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        sx={{
          width: "100%",
          p: isMobile ? 2 : 4,
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <SchoolIcon
          sx={{
            fontSize: isMobile ? 48 : 70,
            color: "primary.main",
            mb: 2,
          }}
        />
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Study Material for 12th Standard
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          We’re launching soon!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Quality study materials, notes, and guides for 12th grade students —
          all in one place. Stay tuned!
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ fontWeight: 600, px: 4, py: 1.5 }}
          href={`https://wa.me/91${whatsappNumber}?text=Hi!%20Notify%20me%20when%20the%20website%20launches.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Notify Me on WhatsApp
        </Button>
      </Box>
    </Container>
  );
}

export default function App() {
  const [mode, setMode] = React.useState("light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
        },
        typography: {
          fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
        },
      }),
    [mode]
  );

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
}
