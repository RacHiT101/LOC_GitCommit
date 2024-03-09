import React from "react";
import Section from "../../containers/HomePageSection.jsx";
import headphoneSvg from "../../assets/headphone.svg";
import { Box, styled, Typography, Button } from "@mui/material";
import AuthBlock from "./AuthBlock.jsx";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HomeScreen = ({ onLogin, onSignup }) => {
  return (
    <Section horizontalCenter verticalCenter>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <img src={headphoneSvg} alt={""} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          paddingX: "20px",
        }}
      >
        <Box
          sx={{
            mr: {
              md: "1.5rem",
            },
          }}
        >
          <AuthBlock onLogin={onLogin} onSignup={onSignup} />
        </Box>
      </Box>
      <Box>
        <Box>
          <StyledTypography
            sx={{
              fontWeight: "999",
              fontSize: {
                xs: "34px",
                md: "60px",
                lg: "96px",
              },
              textShadow: "2px 2px #9f7ff3",
            }}
          >
            EXPERIENCE THE
          </StyledTypography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: "999",
              fontFamily: "Inter",
              fontSize: {
                xs: "34px",
                md: "60px",
                lg: "96px",
              },
              color: "transparent",
              WebkitTextStroke: "3px #9f7ff3",
            }}
          >
            Virtual Study room
          </Typography>
        </Box>
        <Box sx={{ mt: 10 }}>
          <StyledTypography sx={{ fontWeight: 800 }}>50M+</StyledTypography>
          <StyledTypography>Students are experiencing it</StyledTypography>
        </Box>
        <Box
          sx={{
            mt: 10,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              window.scrollTo({
                left: 0,
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
            sx={{
              backgroundColor: "#fff",
              textTransform: "unset !important",
              color: "#000",
              borderRadius: 10,
              pl: 5,
              pr: 5,
              pt: 1.5,
              pb: 1.5,
              "&:hover": {
                backgroundColor: "#9B84B4",
                transform: "scale(1.05)",
              },
            }}
            endIcon={<KeyboardArrowRightIcon fontSize={"small"} />}
          >
            <StyledTypography
              sx={{ color: "#000", fontWeight: "600", fontSize: 16 }}
            >
              Know More
            </StyledTypography>
          </Button>
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

export default HomeScreen;
