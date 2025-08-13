import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Receives menuItem, onBack
export default function DetailPage({ menuItem, onBack }) {
  return (
    <Paper sx={{ p: 3, mt: 2, minHeight: 180, borderRadius: 3 }}>
      <Button startIcon={<ArrowBackIcon />} variant="text" onClick={onBack}>
        Back
      </Button>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Box sx={{ fontSize: 60, mb: 1, color: "#1976d2" }}>
          {menuItem.icon}
        </Box>
        <Typography variant="h6" fontWeight="bold">
          {menuItem.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {menuItem.content}
        </Typography>
      </Box>
    </Paper>
  );
}
