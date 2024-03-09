import { Button, Typography } from "@mui/material";
import React from "react";

/**
 * The auth block contains two buttons, Login button and Sign up button.
 */

const AuthBlock = ({ onLogin, onSignup }) => {
  return (
    <>
      <Button
        variant={"text"}
        sx={{
          color: "#fff",
          textTransform: "unset !important",
          "&:hover": {
            transform: "scale(1.05)",
          },
          mr: 1.5,
        }}
        onClick={onLogin}
      >
        <Typography fontWeight={"600"}>Login</Typography>
      </Button>
      <Button
        sx={{
          backgroundColor: "#7012d3",
          textTransform: "unset !important",
          borderRadius: 10,
          "&:hover": {
            backgroundColor: "#7012d3",
            transform: "scale(1.05)",
          },
        }}
        onClick={onSignup}
      >
        <Typography fontWeight={"600"}> Sign up</Typography>
      </Button>
    </>
  );
};

export default AuthBlock;
