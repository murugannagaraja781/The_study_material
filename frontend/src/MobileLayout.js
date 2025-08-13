import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import useMenuNavigation from "./useMenuNavigation";
import MenuGrid from "./MenuGrid";
import DetailPage from "./DetailPage";

// ICONS
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import FunctionsIcon from "@mui/icons-material/Functions";
import GitHubIcon from "@mui/icons-material/GitHub";
import DnsIcon from "@mui/icons-material/Dns";
import BugReportIcon from "@mui/icons-material/BugReport";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

// Menu data
const menuItems = [
  {
    title: "React Basics",
    icon: <SchoolIcon />,
    content: "Learn about components, JSX, props, and state in React.",
  },
  {
    title: "JavaScript ES6",
    icon: <CodeIcon />,
    content:
      "Explore let, const, arrow functions, template literals, and more.",
  },
  {
    title: "CSS Flexbox",
    icon: <StorageIcon />,
    content: "Master responsive layouts using CSS Flexbox.",
  },
  {
    title: "Data Structures",
    icon: <PlaylistAddCheckIcon />,
    content: "Understand arrays, objects, stacks, queues, and linked lists.",
  },
  {
    title: "Algorithms",
    icon: <FunctionsIcon />,
    content: "Study searching, sorting, and recursion basics.",
  },
  {
    title: "Git & GitHub",
    icon: <GitHubIcon />,
    content: "Version control, commits, branches, and collaboration on GitHub.",
  },
  {
    title: "Node.js",
    icon: <DnsIcon />,
    content: "Backend JavaScript, npm, Express basics.",
  },
  {
    title: "Testing",
    icon: <BugReportIcon />,
    content: "Unit, integration, and E2E testing fundamentals.",
  },
  {
    title: "Interview Prep",
    icon: <QuestionAnswerIcon />,
    content: "Tips, practice problems, and coding challenges.",
  },
];

const TOP_HEIGHT = "30vh";
const GRID_HEIGHT = "70vh";

export default function MobileLayout() {
  const { page, selected, goToDetail, goToGrid } = useMenuNavigation();

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Study Material
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container disableGutter maxWidth={false} sx={{ pt: 0, pl: 0, pr: 0 }}>
        {/* Top 30% Area */}
        <Box
          sx={{
            height: TOP_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#1976d2",
            color: "white",
            borderRadius: "0 0 24px 24px",
            mb: 1,
          }}
        >
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              Welcome to Your Study App
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Select a topic below to start learning!
            </Typography>
          </Box>
        </Box>
        {/* 3x3 Menu Grid or Detail Page in 70% area */}
        <Box
          sx={{
            height: GRID_HEIGHT,
            px: 1,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {page === "grid" && (
            <MenuGrid
              menuItems={menuItems}
              activeIdx={selected}
              onSelect={goToDetail}
            />
          )}
          {page === "detail" && selected !== null && (
            <DetailPage menuItem={menuItems[selected]} onBack={goToGrid} />
          )}
        </Box>
      </Container>
    </Box>
  );
}
