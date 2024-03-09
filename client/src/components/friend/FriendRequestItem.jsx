import { Button, Stack, Typography, Box } from "@mui/material";

/**
 * The friend request item contains the user's name (the user who tried to add friend), and the
 * accept button to accept the friend request, and the reject button to reject the friend
 * request. If the user who received the friend request presses the accept button, the user who
 * sent the friend request will become the friend of the user who received the friend request.
 * If the reject button is pressed, the friend request will be rejected, and the two users will
 * not become friends.
 */

const FriendRequestItem = ({ name, onAcceptClick, onRejectClick }) => {
  return (
    <Box
      width={"100%"}
      mb={2}
      p={1}
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{ backgroundColor: "#522987", borderRadius: 1 }}
    >
      <Box flex={3}>
        <Typography
          variant={"h5"}
          color={"#fff"}
          sx={{
            wordBreak: "break-all",
          }}
        >
          {name}
        </Typography>
      </Box>
      <Stack sflex={1} direction={"row"} spacing={2}>
        <Button
          variant={"contained"}
          size={"small"}
          color={"success"}
          onClick={onAcceptClick}
        >
          Accept
        </Button>
        <Button
          variant={"contained"}
          size={"small"}
          color={"error"}
          onClick={onRejectClick}
        >
          Reject
        </Button>
      </Stack>
    </Box>
  );
};

export default FriendRequestItem;
