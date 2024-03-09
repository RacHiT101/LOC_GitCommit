import React from "react";
import Section from "../../containers/HomePageSection.jsx";
import { Box, styled, Typography } from "@mui/material";
import LottiePlayer from "./LottiePlayer.jsx";

/**
 * This is the intro screen which contains two sections "STUDY ROOM" and "REWARDS", and the
 * animations that are used to attract users.
 */

const IntroScreen = ({ header2, animation, description, textOnRight }) => {
  return (
    <Section verticalCenter horizontalCenter>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          flexDirection: {
            xs: "column",
            lg: textOnRight ? "row" : "row-reverse",
          },
        }}
      >
        <Box sx={{ flex: { xs: "none", md: 1 } }}>
          <LottiePlayer animationData={animation} adjustSize={0.7} />
        </Box>
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <Box sx={{ width: "70%" }}>
            <StyledTypography
              sx={{
                mb: "20px",
                fontWeight: "600",
                fontSize: {
                  xs: "24px",
                  md: "34px",
                },
              }}
            >
              {header2}
            </StyledTypography>
            <StyledTypography
              sx={{
                textAlign: "left",
                fontSize: {
                  xs: "16px",
                  md: "20px",
                },
              }}
            >
              {description}
            </StyledTypography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

const StyledTypography = styled(Typography)({
  color: "#fff",
  textAlign: "center",
  fontFamily: "Inter",
});

export default IntroScreen;
