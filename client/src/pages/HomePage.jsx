import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeScreen from "../components/entry/HomeScreen.jsx";
import IntroScreen from "../components/entry/IntroScreen.jsx";
import text from "../constants/homepage-text.json";
import { Box, Button, Typography } from "@mui/material";

const Homepage = () => {
  const [introScreens, setIntroScreens] = useState([]);

  const navigate = useNavigate();

  const loginHandler = useCallback(() => navigate("/login"), [navigate]);
  const signupHandler = useCallback(
    () => navigate("/login", { state: { signup: true } }),
    [navigate]
  );

  useEffect(() => {
    (async () => {
      const introSections = await Promise.all(
        text?.map(async (t, i) => {
          const animationId = t?.header2.toLowerCase().replaceAll(" ", "-");
          const module = await import(
            `../assets/${animationId}-animation.json`
          );
          const anim = JSON.parse(JSON.stringify(module)).default;
          return (
            <IntroScreen
              key={t?.header1 + t?.header2}
              {...t}
              animation={JSON.parse(JSON.stringify(anim))}
              textOnRight={i % 2 === 0}
            />
          );
        })
      );
      setIntroScreens(introSections);
    })();
  }, []);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        background: "linear-gradient(#3f096a, #2f065a, #1b0652)",
      }}
    >
      <HomeScreen onLogin={loginHandler} onSignup={signupHandler} />
      {introScreens}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingBottom: 20,
        }}
      >
        <Button
          sx={{
            backgroundColor: "#7012d3",
            textTransform: "unset !important",
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 2,
            paddingBottom: 2,
            "&:hover": {
              backgroundColor: "#7012d3",
              transform: "scale(1.05)",
            },
          }}
          onClick={signupHandler}
        >
          <Typography fontWeight={"700"} fontSize={16}>
            Sign Up For Free
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          pb: "20px",
        }}
      />
    </Box>

  );
};

export default Homepage;
