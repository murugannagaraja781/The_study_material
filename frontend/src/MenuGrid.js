import React from "react";
import { Grid } from "@mui/material";
import MenuTile from "./MenuTile";

// Receives menuItems, activeIdx, onSelect
export default function MenuGrid({ menuItems, activeIdx, onSelect }) {
  return (
    <Grid container spacing={1} sx={{ height: "100%" }}>
      {menuItems.map((item, idx) => (
        <Grid
          item
          key={item.title}
          xs={6} // 2 cols on mobile
          sm={4} // 3 cols on tablet+
          md={4}
          sx={{
            height: {
              xs: "calc((70vh - 8px) / 2)", // less height on mobile
              sm: "calc((70vh - 16px) / 3)", // more height on tablet
            },
            maxHeight: { xs: 110, sm: 150 }, // new: cap height on mobile
            minHeight: { xs: 70, sm: 120 },
          }}
        >
          <MenuTile
            icon={item.icon}
            label={item.title.split(" ")[0]}
            active={activeIdx === idx}
            onClick={() => onSelect(idx)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
