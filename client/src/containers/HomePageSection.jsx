import React from "react";
import { Box } from "@mui/material";

const HomePageSection = ({ children, verticalCenter, horizontalCenter }) => {
  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        overflowX: "hidden",
        background: `linear-gradient(to right, rgba(50, 0, 60, 0.7), rgba(0, 0, 20, 0.7))`,
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to right, #3f086a, #2e0659, #3f086a)",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: {
            xs: "block",
            md: "none",
          },
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: verticalCenter ? "center" : "flex-start",
          alignItems: horizontalCenter ? "center" : "flex-start",
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HomePageSection;
