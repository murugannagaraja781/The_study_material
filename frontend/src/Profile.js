import React from "react";
import { Typography, Paper } from "@mui/material";

export default function Profile() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        Name: Student<br />
        Email: student@example.com
      </Typography>
    </Paper>
  );
}