import React, { useCallback } from "react";
import { Box, styled, Tooltip } from "@mui/material";
import google from "../../assets/google-logo.svg";
import { useAuth } from "../../providers/AuthProvider.jsx";

/**
 * This is used for users to login using third party, i.e., Google Account.
 */

const ThirdPartyLogin = ({ onError }) => {
  const { googleSignIn } = useAuth();

  const signInErrorBoundary = useCallback(
    async (signIn) => {
      try {
        await signIn();
      } catch (e) {
        onError();
      }
    },
    [onError]
  );

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Tooltip title={"Login with Google"}>
        <StyledBox onClick={() => signInErrorBoundary(googleSignIn)}>
          <img src={google} alt={""} />
        </StyledBox>
      </Tooltip>
    </Box>
  );
};

const StyledBox = styled(Box)({
  marginRight: "15px",
  cursor: "pointer",
});

export default ThirdPartyLogin;
