import { Box, Typography, Button, Avatar } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord.js";
import React from "react";
import { useAuth } from "../../providers/AuthProvider.jsx";

const RoomUserCard = ({ username, profile, experience, onChat, hasUnread }) => {
  const { getCustomUser } = useAuth();
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{
        p: 2,
        borderRadius: "10px",
        background: "rgba(255, 255, 255, .8)",
        cursor: "pointer",
        boxShadow: "inset 0px 0px 15px 3px rgba(0,0,0,0.6)",
      }}
    >
      <Avatar src={profile} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          height: "95%",
          width: "70%",
          overflow: "hidden",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{
            height: "50%",
            width: "100%",
            overflow: "visible",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {username}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          sx={{
            height: "30%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              height: "65%",
              overflow: "hidden",
              color: "#8E8E8E",
            }}
          >
            xp: {experience?.toLocaleString()}
          </Typography>
          <Button
            onClick={onChat}
            size={"small"}
            disableElevation
            sx={{
              visibility:
                getCustomUser().username !== username ? "visible" : "hidden",
              height: "60%",
              width: "20%",
              borderRadius: "30px",
              mr: "0.9rem",
              background: "#9783B0",
              position: "relative",
            }}
          >
            CHAT
            {hasUnread && (
              <Box sx={{ position: "absolute", top: -7, right: -7 }}>
                <FiberManualRecordIcon
                  sx={{ color: "red", fontSize: "20px" }}
                />
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomUserCard;
