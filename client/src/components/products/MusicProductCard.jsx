import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoneyIcon from "../../assets/asset-money-icon.svg";
import MusicNote from "../..//assets/music-note.svg";
import { Box, IconButton } from "@mui/material";
import PurchaseButton from "./PurchaseButton.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useEffect } from "react";
import { useMusic } from "../../providers/MusicProvider.jsx";
import StyledCard from "../common/StyleCard.jsx";

/**
 * A music product card contains the music title, the artist who composed the music, the
 * money it costs to purchase the music, the play button for users to listen to the music for a
 * few seconds, and the purchase button to purchase the music product.
 */

const playButtonStyle = {
  backgroundColor: "#400A71",
  color: "white",
  textTransform: "unset !important",
  height: "35px",
  width: "35px",
  borderRadius: "50000px",
  fontSize: 14,
  fontFamily: "Rubik",
  "&:hover": {
    opacity: "0.9",
    backgroundColor: "#9B84B4",
    transform: "scale(1.05)",
  },
};

let timer = null;

const MusicProductCard = ({
  value,
  productName,
  artist,
  productId,
  musicUrl,
  setPlay,
  isPlay,
}) => {
  const { playMusic, stopMusic } = useMusic();

  const handlePlay = () => {
    if (!isPlay) {
      // get music id from youtube url
      let musicId = musicUrl.split("v=")[1];
      const ampersandPosition = musicId.indexOf("&");
      if (ampersandPosition !== -1) {
        musicId = musicId.substring(0, ampersandPosition);
      }
      stopMusic();

      if (timer) {
        clearTimeout(timer);
      }

      // start a timer to play music for only 15 seconds
      timer = setTimeout(() => {
        stopMusic();
        setPlay(false);
      }, 20000);

      playMusic(musicId, 0);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      stopMusic();
    }
    setPlay(!isPlay);
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      stopMusic();
    };
  }, []);

  return (
    <StyledCard
      className="w-96"
      sx={{
        maxWidth: 350,
        borderRadius: 3,
        background: "rgba(255, 255, 255, .5)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box className="mb-2 mr-1">
        <CardContent className="flex fle-row justify-between -mb-4 -mt-1">
          <div className="flex fle-row space-x-0.1 text-center ">
            <img
              className="w-8 h-8 mb-2"
              src={MusicNote}
              alt="Music note icon"
            />
            <Typography
              gutterBottom
              variant="h5"
              fontWeight="bold"
              component="div"
            >
              {productName}
            </Typography>
          </div>

          <Typography
            gutterBottom
            fontSize={12}
            component="div"
            className={"w-1/3 text-end"}
          >
            {`by ${artist}`}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-row justify-between">
          <Box className="flex flex-row justify-between space-x-1 ml-1">
            <img src={MoneyIcon} alt={"Dollar Icon"} className="w-5 h-5" />
            <Typography gutterBottom variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          <IconButton sx={playButtonStyle} onClick={handlePlay}>
            {!isPlay ? <PlayArrowIcon /> : <StopIcon />}
          </IconButton>
          <PurchaseButton
            type={1}
            title={productName}
            cost={value}
            productId={productId}
          />
        </CardActions>
      </Box>
    </StyledCard>
  );
};

export default MusicProductCard;
