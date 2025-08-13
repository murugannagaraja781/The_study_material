import React from "react";
import { Typography, Box, Paper } from "@mui/material";

export default function Home() {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Welcome to Study Material!
      </Typography>
      <Typography variant="body1">
        Access all your study materials in one place. Use the navigation to get started.
      </Typography>
    </Paper>
  );
}