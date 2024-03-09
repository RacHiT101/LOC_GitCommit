import Page from "../containers/Page.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { TextField, Box, Button } from "@mui/material";

const TokenPage = () => {
  const { getAccessToken } = useAuth()

  return (
    <Page horizontalCenter verticalCenter title={"Token"}>
      <Box sx={{ paddingX: 20, width: "100%" }}>
        <TextField value={getAccessToken()} multiline sx={{ "& textarea": { color: "white" } }} />
      </Box>
      <Button onClick={async () => await navigator.clipboard.writeText(getAccessToken())}>
        Copy
      </Button>
    </Page>
  )
}

export default TokenPage
