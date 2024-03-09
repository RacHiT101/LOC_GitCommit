import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";

/**
 * The asset label is used to show the coins and the experience of the user.
 */

const AssetLabel = ({ image, value }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, .5)",
        overflow: "hidden",
      }}
    >
      <Image
        width={"25%"}
        fit={"scale-down"}
        height={"75%"}
        src={image}
        bgColor={""}
        duration={0}
      />
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1em",
          color: "white",
          mr: "0.5rem",
          overflow: "hidden",
        }}
      >
        {value?.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default AssetLabel;
