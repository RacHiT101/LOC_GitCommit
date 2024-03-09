import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ProgressLoading = () => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <CircularProgress color={"secondary"} />
    </Box>
  );
};

export default ProgressLoading;
