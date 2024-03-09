import React from "react";
import { Box, IconButton } from "@mui/material";
import Switcher from "../entry/Switcher.jsx";
import LoginForm from "../entry/LoginForm.jsx";
import SignupForm from "../entry/SignupForm.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * The auth modal contains the back button, switch between Login / Sign up, and
 * login / sign up form.
 */

const AuthModal = ({ onLogin, onSignup, form, onFormChange }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&>.MuiBox-root": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Box
        sx={{
          position: { xs: "relative", md: "absolute" },
          justifyContent: "flex-start !important",
        }}
      >
        <IconButton onClick={() => history.back()}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box>
        <Box sx={{ width: { xs: "80%", md: "50%" }, mb: { xs: 2, md: 0 } }}>
          <Switcher
            currentOption={form}
            options={["Log in", "Sign up"]}
            onStatusChange={(status) => onFormChange(status)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: { xs: "90%", md: "70%" } }}>
          {form.toLowerCase() === "log in" ? (
            <LoginForm onSubmit={(values) => onLogin(values)} />
          ) : (
            <SignupForm onSubmit={(values) => onSignup(values)} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthModal;
