import { Box, Typography, Stack } from "@mui/material";
import { useState } from "react";
import AssetTypeButton from "./AssetTypeButton.jsx";
// import BackgroundSelectorGrid from "../../components/background/BackgroundSelectorGrid.jsx";
import MusicList from "../../components/profile/assets/MusicList.jsx";
import ProfileGrid from "../../components/profile/ProfileGrid.jsx";
import BackgroundSelectorGrid from "../../components/background/BackgroundSelectorGrid.jsx";
// import MusicList from "./MusicList.jsx";
// import ProfileGrid from "../ProfileGrid.jsx";

const AssetPanel = ({ backgrounds, musics, profilePhotos }) => {
  const [value, setValue] = useState(0);

  return (
    <Stack height={"100%"} width={"100%"} direction={"column"} spacing={3}>
      <Box>
        <Typography variant={"h4"} color={"#fff"} fontWeight={500}>
          You have unlocked
        </Typography>
      </Box>
      <Box
        width={"100%"}
        minHeight={{ xs: "140px", md: "100px" }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box flex={1} height={"100%"}>
          <AssetTypeButton
            title={"Background"}
            amount={backgrounds?.length}
            shouldHighLight={value === 0}
            onClick={() => {
              setValue(0);
            }}
          />
        </Box>
        <Box flex={0.1}></Box>
        <Box flex={1} height={"100%"}>
          <AssetTypeButton
            title={"Music"}
            amount={musics.length}
            shouldHighLight={value === 1}
            onClick={() => {
              setValue(1);
            }}
          />
        </Box>
        <Box flex={0.1}></Box>
        <Box flex={1} height={"100%"}>
          <AssetTypeButton
            title={"Profile Image"}
            amount={profilePhotos?.length}
            shouldHighLight={value === 2}
            onClick={() => {
              setValue(2);
            }}
          />
        </Box>
      </Box>
      <Box
        width={"100%"}
        height={"85%"}
        sx={{
          backgroundColor: "#1E143D",
          borderRadius: "0.7vw",
          overflowY: "auto",
        }}
      >
        {/* {value === 0 ? (
          <BackgroundSelectorGrid images={backgrounds} />
        ) : value === 1 ? (
          <MusicList musics={musics} />
        ) : (
          <ProfileGrid images={profilePhotos} />
        )} */}
        <BackgroundSelectorGrid
          images={backgrounds}
          onClick={(imageUri) => {
            setValue(imageUri);
          }}
          // index={}
        />
      </Box>
    </Stack>
  );
};

export default AssetPanel;
