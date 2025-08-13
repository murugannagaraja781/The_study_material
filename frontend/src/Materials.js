import React from "react";
import { Typography, Box, Paper } from "@mui/material";

const materials = [
  { title: "React Basics", desc: "Introduction to React, components, and props." },
  { title: "JavaScript ES6", desc: "Learn about let, const, arrow functions, and more." },
  { title: "CSS Flexbox", desc: "Responsive layouts with flexbox." },
  { title: "Data Structures", desc: "Learn about arrays, objects, stacks, and queues." },
];

export default function Materials() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Materials
      </Typography>
      {materials.map((mat, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">{mat.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {mat.desc}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}