import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";

export default function MenuTile({ icon, label, active, onClick }) {
  return (
    <Paper
      elevation={active ? 8 : 2}
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        aspectRatio: "1/1",
        borderRadius: 2,
        cursor: "pointer",
        border: active ? "2.5px solid #ff9800" : "1.5px solid #e0e0e0",
        bgcolor: active ? "#fff3e0" : "#fff",
        transition: "0.2s",
        // Reduce padding on mobile
        p: { xs: 0.5, sm: 1 },
        "&:hover": {
          border: "2.5px solid #1976d2",
          bgcolor: "#e3f2fd",
          "& .MuiSvgIcon-root": { color: "#1976d2" },
        },
        ...(active && {
          "& .MuiSvgIcon-root": { color: "#ff9800" },
        }),
      }}
    >
      <IconButton
        disableRipple
        sx={{
          mb: 0.5,
          "& .MuiSvgIcon-root": {
            fontSize: { xs: 28, sm: 36 }, // Smaller icon on mobile
            color: active ? "#ff9800" : "#757575",
            transition: "color 0.2s",
          },
        }}
      >
        {icon}
      </IconButton>
      <Typography
        variant="body2"
        fontWeight={active ? "bold" : "medium"}
        sx={{
          color: active ? "#ff9800" : "#424242",
          fontSize: { xs: 12, sm: 14 },
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}
