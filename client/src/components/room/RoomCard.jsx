import { Box, Typography } from "@mui/material";
import personAmountIcon from "../../assets/room-personAmount-icon.svg";
import roomLock from "../../assets/room-lock.svg";
import { useState } from "react";

/**
 * The room card is used to display the private room or the public room.
 */

const RoomCard = ({
  title,
  showPeopleAmount = true,
  showLockIcon = false,
  image,
  amount,
  showVagueBackground = true,
  onClick,
}) => {
  const [vagueHeight, setVagueHeight] = useState("50%");
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      onClick={onClick}
      onMouseEnter={() => {
        setVagueHeight("100%");
      }}
      onMouseLeave={() => {
        setVagueHeight("50%");
      }}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "13px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      {showVagueBackground && (
        <Box
          height={`${vagueHeight}`}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          position={"relative"}
          sx={{
            background: "rgba(255, 255, 255, .3)",
            backdropFilter: "blur(5px)",
            borderRadius: vagueHeight === "100%" ? "13px" : "0",
          }}
        >
          <Box alignSelf={"center"}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "calc(130%)",
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </Box>

          {showPeopleAmount && (
            <Box
              display={"flex"}
              sx={{
                position: "absolute",
                bottom: "2px",
                right: "10px",
              }}
            >
              <Box>
                <img
                  src={personAmountIcon}
                  height={"60%"}
                  alt={"person-amount"}
                />
              </Box>
              <Box
                sx={{
                  color: "#fff",
                  fontWeight: 550,
                  fontSize: "calc(100%)",
                  ml: 0.3,
                }}
              >
                <Typography>{amount}</Typography>
              </Box>
            </Box>
          )}

          {showLockIcon && (
            <Box
              display={"flex"}
              sx={{
                position: "absolute",
                bottom: "2px",
                right: "8px",
              }}
            >
              <Box>
                <img src={roomLock} height={"60%"} alt={"lock"} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoomCard;
