import { Box, Typography, Divider } from "@mui/material";
import { Image } from "mui-image";
import goldMedal from "../../assets/podium-gold-medal.svg";
import silverMedal from "../../assets/podium-silver-medal.svg";
import bronzeMedal from "../../assets/podium-bronze-medal.svg";

function selectRankingMedal(ranking) {
  if (ranking === 1) {
    return goldMedal;
  } else if (ranking === 2) {
    return silverMedal;
  } else if (ranking === 3) {
    return bronzeMedal;
  } else {
    return undefined;
  }
}

const TopLeaderCard = ({ coins, profileImage, name, ranking, hours }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      bgColor={"252641"}

      sx={{
        height: "100%",
        width: "95%",
        overflow: "visible",
        position: "relative",
      }}
    >
      <img
        src={selectRankingMedal(ranking)}
        alt="Ranking Medals"
        style={{
          position: "absolute",
          top: "-2%",
          right: "15%",
          width: "17%",
          zIndex: 1,
        }}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{
          height: "80%",
          width: "80%",
          borderRadius: "13px",
          overflow: "visible",
          background: `linear-gradient(to right, rgba(50, 0, 60, 0.7), rgba(0, 0, 20, 0.7))`,
          boxShadow: "3px 3px 2px 1px rgba(255,255,255,0.2)",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          p={2}
          sx={{
            height: "50%",
            width: "85%",
            overflow: "visible",
          }}
        >
          <Image
            width={"70px"}
            fit={"cover"}
            height={"70px"}
            src={profileImage}
            bgColor={""}
            flex={1}
            duration={0}
          />
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
              flex: 2,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Divider
          sx={{
            height: "3px",
            backgroundColor: "white",
            width: "80%",
            borderRadius: "4px",
          }}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            height: "15%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              overflow: "hidden",
              color: "white",
            }}
          >
            Coins: {coins} {hours?.toLocaleString()} hours
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopLeaderCard;
