import { Box, IconButton, Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useAuth } from "../../providers/AuthProvider.jsx";

const FriendCard = ({ id, profileImage, name, onClick, onAddFriend }) => {
  const { getCustomUser } = useAuth();

  return (
    <Box
      onClick={onClick}
      display={"flex"}
      alignItems={"center"}
      sx={{
        p: 1,
        width: "100%",
        border: 0,
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: onClick ? "rgba(255,255,255,.3)" : "transparent",
        },
      }}
    >
      <Box
        sx={{
          mr: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={profileImage}
          alt={"profile-image"}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "medium",
            fontSize: "20px",
            color: "white",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
        {onAddFriend && (
          <IconButton
            onClick={onAddFriend}
            sx={{
              visibility: getCustomUser().friends.includes(id)
                ? "hidden"
                : "visible",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,.1)",
              },
            }}
          >
            <PersonAddAlt1Icon sx={{ color: "white" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FriendCard;