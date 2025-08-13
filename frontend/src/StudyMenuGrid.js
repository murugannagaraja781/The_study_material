import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import FunctionsIcon from "@mui/icons-material/Functions";
import GitHubIcon from "@mui/icons-material/GitHub";
import DnsIcon from "@mui/icons-material/Dns";
import BugReportIcon from "@mui/icons-material/BugReport";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

// Assign unique icons to each menu item
const icons = [
  <SchoolIcon />, // React Basics
  <CodeIcon />, // JavaScript ES6
  <StorageIcon />, // CSS Flexbox
  <PlaylistAddCheckIcon />, // Data Structures
  <FunctionsIcon />, // Algorithms
  <GitHubIcon />, // Git & GitHub
  <DnsIcon />, // Node.js
  <BugReportIcon />, // Testing
  <QuestionAnswerIcon />, // Interview Prep
];

export default function StudyMenuGrid({
  menuDetails,
  activeMenu,
  setActiveMenu,
}) {
  return (
    <Grid container spacing={2} sx={{ flex: "1 0 auto" }}>
      {menuDetails.map((menu, idx) => {
        const isActive = activeMenu === idx;
        return (
          <Grid item xs={4} key={menu.title}>
            <Paper
              elevation={isActive ? 8 : 2}
              onClick={() => setActiveMenu(idx)}
              sx={{
                p: 1,
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 3,
                transition: "0.2s",
                border: isActive
                  ? "2.5px solid #ff9800"
                  : "1.5px solid #e0e0e0",
                bgcolor: isActive ? "#fff3e0" : "#fff",
                "&:hover": {
                  border: "2.5px solid #1976d2",
                  bgcolor: "#e3f2fd",
                  "& .MuiSvgIcon-root": { color: "#1976d2" },
                },
                ...(isActive && {
                  "& .MuiSvgIcon-root": { color: "#ff9800" },
                }),
                minHeight: 85,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  fontSize: 38,
                  mb: 0.5,
                  color: isActive ? "#ff9800" : "#757575",
                  transition: "color 0.2s",
                }}
              >
                {React.cloneElement(icons[idx], { fontSize: "large" })}
              </Box>
              <Typography
                variant="body2"
                fontWeight={isActive ? "bold" : "medium"}
                sx={{ color: isActive ? "#ff9800" : "#424242" }}
              >
                {menu.title.split(" ")[0]}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
