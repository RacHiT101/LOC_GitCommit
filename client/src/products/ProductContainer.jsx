import { Box } from "@mui/material";
import BackgroundProductCard from "./BackgroundProductCard.jsx";
import ProfileProductCard from "./ProfileProductCard.jsx";
import MusicProductCard from "./MusicProductCard.jsx";
import React from "react";
import { useFetch } from "../../hooks/useFetch.js";
import ProgressLoading from "../common/ProgressLoading.jsx";

/**
 * A product container which contains the background product card, the music product card, and
 * the profile product card.
 */

const ProductContainer = ({ value }) => {
  const url =
    value === 0
      ? `products?type=background`
      : value === 1
      ? `products?type=profile-image`
      : `products?type=music`;

  const { isLoading, data } = useFetch(url);

  const [isPlay, setIsPlay] = React.useState([]);

  React.useEffect(() => {
    if (!data) return;
    if (value === 2) {
      setIsPlay(new Array(data.length).fill(false));
    }
  }, [data]);

  const handlePlay = (index, play) => {
    // set all to false
    let temp = new Array(data.length).fill(false);
    temp[index] = play;
    setIsPlay(temp);
  };

  return (
    <div>
      {value === 0 ? (
        // background product card
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          {isLoading ? (
            <ProgressLoading />
          ) : (
            data.map((it, index) => (
              <BackgroundProductCard
                key={index}
                value={it?.price}
                productName={it?.name}
                image={`/src/assets/backgrounds/${it?.url}`}
                productId={it?._id}
              />
            ))
          )}
        </Box>
      ) : value === 1 ? (
        // profile product card
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          {isLoading ? (
            <ProgressLoading />
          ) : (
            data.map((it, index) => (
              <ProfileProductCard
                key={index}
                value={it?.price}
                productName={it?.name}
                image={`/src/assets/profiles/${it?.url}`}
                productId={it?._id}
              />
            ))
          )}
        </Box>
      ) : value === 2 ? (
        // music product card
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          {isLoading ? (
            <ProgressLoading />
          ) : (
            data.map((it, index) => (
              <MusicProductCard
                key={index}
                value={it?.price}
                productName={it?.name}
                artist={it?.artist}
                productId={it?._id}
                musicUrl={it?.url}
                setPlay={(play) => handlePlay(index, play)}
                isPlay={isPlay[index]}
              />
            ))
          )}
        </Box>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default ProductContainer;
