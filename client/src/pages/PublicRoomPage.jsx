import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
// import FriendContainer from "../components/friend/FriendContainer.jsx";
// import AssetLabel from "../components/profile/assets/AssetLabel.jsx";
import AssetXPIcon from "../assets/asset-xp-icon.png";
import AssetMoneyIcon from "../assets/asset-money-icon.png";
import PublicRoomsContainer from "../components/room/PublicRoomsContainer.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import AssetLabel from "../profile/assets/AssetLabel.jsx";
import FriendContainer from "../components/friend/FriendContainer.jsx";

const PublicRoomPage = () => {
  const { getCustomUser, getCurrentUser } = useAuth();

  console.log(getCustomUser());
  // console.log(getCurrentUser());

  return (
    <Page title={"Public Room"} horizontalCenter>
      <Box className="flex flex-1 flex-row flex-auto justify-start h-full w-full">
        <Box
          sx={{
            minWidth: 180,
            maxWidth: 250,
            minHeight: 700,
          }}
          className="w-1/2 h-full"
        >
          <FriendContainer />
        </Box>

        <Box className="flex flex-col mt-10 ml-20 mr-20 w-full space-y-10">
          <Box
            className="w-80 h-12 flex flex-row justify-end space-x-6 ml-auto"
            sx={{ minWidth: 300 }}
          >
            <AssetLabel
              image={AssetXPIcon}
              value={getCustomUser()?.experience}
            />
            <AssetLabel image={AssetMoneyIcon} value={getCustomUser()?.coins} />
            {/* 10000 */}
          </Box>

          <Box className={"h-full"}>
            <PublicRoomsContainer />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PublicRoomPage;
