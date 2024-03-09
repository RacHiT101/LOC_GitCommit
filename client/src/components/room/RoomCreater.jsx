import { Box, Typography } from "@mui/material";

/**
 * The room creater is used to create a new private room.
 */

const RoomCreater = ({ onClick }) => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={onClick}
      sx={{
        borderRadius: "13px",
        border: "2px #fff dashed",
        "&:hover": {
          cursor: "pointer",
          background: "rgba(255, 255, 255, .3)",
        },
      }}
    >
      <Typography variant={"h2"} color={"#fff"}>
        + New Room
      </Typography>
    </Box>
  );
};

export default RoomCreater;
