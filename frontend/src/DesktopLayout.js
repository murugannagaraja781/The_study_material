import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import Home from "./Home";
import Materials from "./Materials";
import Profile from "./Profile";

const drawerWidth = 220;

export default function DesktopLayout() {
  const [page, setPage] = React.useState(0);

  const mainContent = [<Home />, <Materials />, <Profile />][page];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Study Material (Web)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {["Home", "Materials", "Profile"].map((text, idx) => (
            <ListItem
              button
              key={text}
              selected={page === idx}
              onClick={() => setPage(idx)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          mt: "64px",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        {mainContent}
      </Box>
    </Box>
  );
}