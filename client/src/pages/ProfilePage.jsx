import Page from "../containers/Page.jsx";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AssetPanel from "../components/profile/assets/AssetPanel.jsx";
import moneyIcon from "../assets/asset-money-icon.svg";
import xpIcon from "../assets/asset-xp-icon.svg";
import AssetLabel from "../components/profile/assets/AssetLabel.jsx";
import ModifiableTextField from "../components/common/ModifiableTextField.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useFetch } from "../hooks/useFetch.js";
import ProgressLoading from "../components/common/ProgressLoading.jsx";
import { useMutation } from "../hooks/useMutation.js";
import { HTTP_METHOD } from "../hooks/http-methods.js";
import FriendRequestItem from "../components/friend/FriendRequestItem.jsx";
import SelectProfileModal from "../components/modals/SelectProfileModal.jsx";

/**
 * The public room page contains the user's profile image, coins, experience, username, and the
 * friend request that has not been accepted or rejected. It also shows the background, music,
 * and profile images that the user has.
 */

const ProfilePage = () => {
  const { getCustomUser } = useAuth();
  const [username, setUserName] = useState(getCustomUser().username);

  const [openProfileImage, setOpenProfileImage] = useState(false);

  const handleClose = () => {
    setOpenProfileImage(false);
  };

  const { data: backgroundImages, isLoading: backgroundLoading } = useFetch(
    `users/assets?userId=${getCustomUser()?._id}&type=background`
  );

  const { data: profileImages, isLoading: profileImageLoading } = useFetch(
    `users/assets?userId=${getCustomUser()?._id}&type=profile-image`
  );

  const { data: musics, isLoading: musicLoading } = useFetch(
    `users/assets?userId=${getCustomUser()?._id}&type=music`
  );

  const { data: friendRequests, isLoading: friendLoading } = useFetch(
    `friends/requests?id=${getCustomUser()?._id}`
  );

  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    if (!friendLoading) {
      setFriendRequestList(friendRequests);
    }
  }, [friendRequests, friendRequestList]);

  const { run } = useMutation(`users/updateName`, HTTP_METHOD.PUT);

  const { run: updateRequest } = useMutation(
    `friends/requests`,
    HTTP_METHOD.PUT
  );

  const { run: updateProfileImage } = useMutation(
    `users/updateProfileImage`,
    HTTP_METHOD.PUT
  );

  return (
    <Page title={"Profile"}>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        height={"100vh"}
        width={"100%"}
      >
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          px={8}
          py={4}
          height={"100%"}
          alignItems={"center"}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={`/src/assets/profiles/${getCustomUser().profile}`}
              onClick={() => {
                setOpenProfileImage(true);
              }}
              sx={{
                width: 200,
                height: 200,
                "&:hover::before": {
                  content: `"Edit"`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  color: "#fff",
                },
              }}
            ></Avatar>
          </Box>
          <Stack
            mt={4}
            direction={"row"}
            width={{ xs: "90%", sx: "78%", md: "70%" }}
            spacing={2}
            height={{ xs: "18%", sx: "10%", md: "5%" }}
          >
            <AssetLabel image={moneyIcon} value={getCustomUser()?.coins} />
            <AssetLabel image={xpIcon} value={getCustomUser()?.experience} />
          </Stack>
          <Box
            mt={4}
            width={{ xs: "90%", sm: "78%", md: "100%" }}
            height={{ xs: "40%", sm: "20%", md: "10%" }}
          >
            <ModifiableTextField
              label={"username"}
              value={username}
              onSubmitChange={async (value) => {
                setUserName(value);
                await run({
                  body: {
                    userId: getCustomUser()?._id,
                    name: value,
                  },
                });
              }}
            />
          </Box>

          <Box
            mt={3}
            p={1}
            width={{ xs: "90%", sm: "78%", md: "100%" }}
            minHeight={"35vh"}
            display={"flex"}
            flexDirection={"column"}
            sx={{
              backgroundColor: "#401f6a",
            }}
          >
            <Typography variant={"h6"} color={"#fff"}>
              Friend Request
            </Typography>
            <Box
              width={"100%"}
              height={"90%"}
              p={1}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              sx={{
                overflowY: "auto",
              }}
            >
              {friendLoading ? (
                <ProgressLoading />
              ) : friendRequestList.length === 0 ? (
                <Typography variant={"h5"} color={"#fff"}>
                  No friend request
                </Typography>
              ) : (
                friendRequestList?.map((it, index) => (
                  <FriendRequestItem
                    key={index}
                    name={it?.username}
                    onAcceptClick={async () => {
                      setFriendRequestList((pre) => pre.splice(index, 1));
                      await updateRequest({
                        query: {
                          id: getCustomUser()?._id,
                          fid: it?._id,
                          action: "approved",
                        },
                      });
                    }}
                    onRejectClick={async () => {
                      setFriendRequestList((pre) => pre.splice(index, 1));
                      await updateRequest({
                        query: {
                          id: getCustomUser()?._id,
                          fid: it?._id,
                          action: "rejected",
                        },
                      });
                    }}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
        <Box
          p={4}
          height={"100%"}
          flex={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {profileImageLoading || musicLoading || backgroundLoading ? (
            <ProgressLoading />
          ) : (
            <AssetPanel
              backgrounds={backgroundImages}
              musics={musics}
              profilePhotos={profileImages}
            />
          )}
        </Box>
      </Box>
      <Box>
        <SelectProfileModal
          open={openProfileImage}
          handleClose={handleClose}
          profileImage={profileImages}
          onClick={async (imageIdx) => {
            const img = profileImages[imageIdx];
            const url = img.url;
            getCustomUser().profile = url;
            await updateProfileImage({
              body: {
                userId: getCustomUser()._id,
                url: url,
              },
            });
          }}
        />
      </Box>
    </Page>
  );
};

export default ProfilePage;
