import Page from "../containers/Page.jsx";
import  { useState, useMemo } from "react";
import { Box } from "@mui/material";
import AssetXPIcon from "../assets/asset-xp-icon.svg";
import AssetMoneyIcon from "../assets/asset-money-icon.svg";
// import FriendContainer from "../components/friend/FriendContainer.jsx";
// import AssetLabel from "../components/profile/assets/AssetLabel.jsx";
import PrivateRoomsContainer from "../components/room/PrivateRoomsContainer.jsx";
import PrivateRoomCreationForm from "../components/room/PrivateRoomCreationForm.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useAuth } from "../providers/AuthProvider.jsx";

const PrivateRoomPage = () => {
  const [addingRoom, setAddingRoom] = useState(false);
  const { getCustomUser } = useAuth();
  const { data: privateRoomsFetch, reFetch: fetchPrivateRooms } = useFetch(
    `privateRooms?owner=${getCustomUser()._id}`
  );

  const privateRooms = useMemo(
    () => privateRoomsFetch || [],
    [privateRoomsFetch]
  );

  return (
    <Page title={"Private Room"} sx={{ width: "100%" }}>
      <Box className="flex flex-1 flex-row flex-auto justify-start h-full w-full">
        {/* <Box
          sx={{
            minWidth: 180,
            maxWidth: 250,
          }}
          className="w-1/2 h-full"
        >
          <FriendContainer />
        </Box> */}

        <Box className="flex flex-col mt-10 ml-20 mr-20 w-full space-y-10">
          <Box
            className="w-96 h-8 flex flex-row justify-end space-x-6 ml-auto"
            sx={{ minWidth: 300 }}
          >
            {/* <AssetLabel
              image={AssetXPIcon}
              value={getCustomUser()?.experience}
            />
            <AssetLabel image={AssetMoneyIcon} value={getCustomUser()?.coins} /> */}
            10000
          </Box>

          <Box sx={{ height: "100%" }}>
            {!addingRoom && privateRooms.length !== 0 ? (
              <PrivateRoomsContainer
                privateRooms={privateRooms}
                onAddNewRoom={
                  privateRooms?.length < 4
                    ? () => setAddingRoom(true)
                    : undefined
                }
              />
            ) : (
              <PrivateRoomCreationForm
                onCreateRoom={async () => {
                  await fetchPrivateRooms();
                  setAddingRoom(false);
                }}
                onCancel={
                  privateRooms?.length === 0
                    ? undefined
                    : () => setAddingRoom(false)
                }
              />
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PrivateRoomPage;
