import { Box } from "@mui/material";
import FriendCard from "./FriendCard.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

/**
 * The friend list contains a list of all the friends that the user has. Each friend is shown
 * as a friend card, which contains the friend's profile image and name.
 */

const FriendList = ({ friends, onClick, onAddFriend }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
      }}
    >
      <List>
        {friends.map(({ image, name, id }, index) => (
          <ListItem key={index} sx={{ p: 1 }}>
            <FriendCard
              id={id}
              profileImage={image}
              name={name}
              onClick={onClick && (() => onClick(id))}
              onAddFriend={onAddFriend && (() => onAddFriend(id))}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FriendList;
