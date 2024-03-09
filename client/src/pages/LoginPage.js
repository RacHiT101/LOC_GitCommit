import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import Page from "../containers/Page.jsx";
import animation from "../assets/login-animation.json";
import LottiePlayer from "../components/entry/LottiePlayer.jsx";
import AuthModal from "../components/modals/AuthModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const { state } = useLocation();

  const [form, setForm] = useState(
    state && state.signup ? "Sign up" : "Log in"
  );

  const { signup, login } = useAuth();

  const loginHandler = useCallback(
    (values) => login(values?.email, values?.password),
    [login]
  );
  const signupHandler = useCallback(
    (values) => signup(values?.email, values?.password, values?.username),
    [signup]
  );

  return (
    <Page excludeNavigation title={"Get Started"}>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          "&>.MuiBox-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          },
        }}
      >
        <Box sx={{ display: { xs: "none !important", md: "flex !important" } }}>
          <Box sx={{ width: "100%" }}>
            <LottiePlayer animationData={animation} />
          </Box>
        </Box>
        <Box>
          <Box sx={{ width: "70%", height: "70%" }}>
            <AuthModal
              form={form}
              onFormChange={(newForm) => setForm(newForm)}
              onLogin={loginHandler}
              onSignup={signupHandler}
            />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default LoginPage;
