import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";

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
        background: `linear-gradient(to right, rgba(50, 0, 60, 0.7), rgba(0, 0, 20, 0.7))`,
          boxShadow: "3px 3px 2px 1px rgba(255,255,255,0.2)",
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
