import { Box, Button } from "@mui/material";
import FriendList from "./FriendList.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import { useState } from "react";
import SearchUserModal from "../modals/SearchUserModal.jsx";
import { useNavigate } from "react-router-dom";

/**
 * The friend container contains the search button for user to search for specific users,
 * and the friend list which contains all the friends of the users.
 */

const FriendContainer = () => {
  const { getCustomUser } = useAuth();
  const { data, isLoading } = useFetch(`friends?id=${getCustomUser()._id}`);
  const navigate = useNavigate();

  const [showUserModal, setShowUserModal] = useState(false);

  const friendList = !isLoading
    ? data.map(({ username, _id, profile }) => ({
        name: username,
        image: `/src/assets/profiles/${profile}`,
        id: _id,
      }))
    : [];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      paddingTop={6}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        overflow: "hidden",
        backgroundColor: "#290451",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          onClick={() => setShowUserModal(true)}
          sx={{
            height: "100%",
            width: "80%",
            color: "#FFFFFF",
            backgroundColor: "#7012D3",
            textTransform: "none",
            textAlign: "center",
            fontWeight: "large",
            fontSize: "0.8em",
          }}
        >
          Search users
        </Button>
      </Box>
      <Box
        paddingTop={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <FriendList
          friends={friendList}
          onClick={(id) => navigate(`/friends/${id}`)}
        />
      </Box>
      <Box>
        <SearchUserModal
          open={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      </Box>
    </Box>
  );
};

export default FriendContainer;