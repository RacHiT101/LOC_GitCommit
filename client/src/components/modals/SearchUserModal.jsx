/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Box, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "../../hooks/useMutation.js";
import { HTTP_METHOD } from "../../hooks/http-methods.js";
import { useFetch } from "../../hooks/useFetch.js";
import FriendList from "../friend/FriendList.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useNotification } from "../../providers/NotificationProvider.jsx";

/**
 * This is used to search for specific user. The search is case sensitive.
 */

const SearchUserModal = ({ open, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const { isLoading, data } = useFetch("users");
  const { getCustomUser } = useAuth();
  const sendFriendRequestHandler = useMutation(
    "friends/requests",
    HTTP_METHOD.POST
  );
  const notify = useNotification();

  const allUsers = !isLoading
    ? data.map(({ _id, username, profile }) => ({
        id: _id,
        name: username,
        image: `/src/assets/profiles/${profile}`,
      }))
    : [];

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(180,150,160,0.1)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "76%", sm: "50%", md: "35%" },
          height: { xs: "70%", sm: "70%", md: "75%" },
          backgroundColor: "#1E143D",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={"Search users with username..."}
            sx={{
              backgroundColor: "rgba(255,255,255,.2)",
              borderRadius: "5px",
              "& fieldset": {
                border: "none",
              },
              "& input": {
                color: "white",
              },
            }}
          />
          <Box
            sx={{
              overflowY: "scroll",
              flex: 1,
              mt: 1,
            }}
          >
            <FriendList
              friends={allUsers.filter(
                ({ name }) =>
                  name != getCustomUser().username && name.includes(searchText)
              )}
              onAddFriend={async (fid) => {
                try {
                  await sendFriendRequestHandler.run({
                    query: { id: getCustomUser()._id, fid },
                  });
                  notify("Friend request sent");
                } catch (e) {
                  if (e.response.status === 409) {
                    notify("Friend request sent");
                  } else {
                    notify("Error, please try again");
                  }
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SearchUserModal;