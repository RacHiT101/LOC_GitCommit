import React, { useState } from "react";
import { InputLabel, TextField, Box, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ThirdPartyLogin from "./ThirdPartyLogin.jsx";

/**
 * This is used for users to login into the app.
 */

const LoginForm = ({ onSubmit }) => {
  const [error, setError] = useState("");
  const [loggingIn, setLogging] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <InputLabel>Email/Username</InputLabel>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"text"}
        />
      </Box>
      <Box sx={{ mb: { xs: 3, md: 5 } }}>
        <InputLabel>Password</InputLabel>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
        />
      </Box>
      <Box>
        <FormHelperText>{error}</FormHelperText>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row-reverse",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-end",
            md: "center",
          },
        }}
      >
        <LoadingButton
          onClick={async () => {
            setLogging(true);
            try {
              await onSubmit({ email, password });
            } catch (e) {
              setError("Invalid credential");
            } finally {
              setLogging(false);
            }
          }}
          loading={loggingIn}
          variant={"contained"}
          sx={{
            width: { xs: "100%", md: "auto" },
            mb: 2,
          }}
        >
          Submit
        </LoadingButton>
        <ThirdPartyLogin
          onError={() =>
            setError("Your email exists with different credential.")
          }
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
