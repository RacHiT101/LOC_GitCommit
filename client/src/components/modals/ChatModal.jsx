import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Fade,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAuth } from "../../providers/AuthProvider.jsx";

/**
 * This chat modal provides the chat box for users to chat in the group or chat with individual
 * friend.
 * chatHistory contains the array of chats, where each chat contains the name, profileImageUrl, and content.
 * targetUser contains the user's name and uid.
 * userList contains an array of users, where each user contains the name, uid, and whether the user is online or not.
 */

const ChatModal = ({
  chatHistory,
  targetUser,
  userList,
  onSend,
  onChangeTargetUser,
}) => {
  const [message, setMessage] = useState("");
  const { getCustomUser } = useAuth();
  const [showUserList, setShowUserList] = useState(false);
  const displayChatHistory = useMemo(() => {
    return chatHistory.filter(({ senderId, receiverId, receiverEmail }) => {
      if (targetUser.username === "All Users") {
        return receiverEmail === "All Users";
      } else {
        return (
          receiverEmail !== "All Users" &&
          ((senderId === getCustomUser()?._id &&
            receiverId === (targetUser?.uid || targetUser?._id)) ||
            (senderId === (targetUser?.uid || targetUser?._id) &&
              receiverId === getCustomUser()?._id))
        );
      }
    });
  }, [chatHistory, targetUser, targetUser.username]);

  const chatRef = useRef(null);

  // Scroll to bottom of chat history when chat history changes
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
  }, [displayChatHistory]);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
        height: "100%",
      }}
    >
      {/* HEADER */}
      <Box sx={{ backgroundColor: "#C6C6C6", paddingX: 2, paddingY: 0.5 }}>
        <Box
          onClick={() => setShowUserList((prev) => !prev)}
          onBlur={() => setShowUserList(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            cursor: userList && "pointer",
          }}
        >
          <Typography variant={"h4"} sx={{ color: "#3D3A3A" }}>
            {targetUser?.name || targetUser?.username}
          </Typography>
          {userList && !showUserList && <KeyboardArrowDownIcon />}
          {userList && showUserList && <KeyboardArrowUpIcon />}
          {userList && (
            <Fade in={showUserList} unmountOnExit>
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  backgroundColor: "#400b71",
                  borderRadius: "5px",
                  width: "50%",
                  zIndex: 100,
                }}
              >
                <Box
                  sx={{ borderBottom: "1px solid #58337A", m: 1, mb: 0, pb: 1 }}
                >
                  <Button
                    onClick={() =>
                      onChangeTargetUser({ username: "All Users" })
                    }
                    sx={{
                      backgroundColor: "#6b35a0",
                      paddingY: 0.2,
                      paddingX: 0.7,
                      width: "100%",
                    }}
                  >
                    Group Chat
                  </Button>
                </Box>
                <Box>
                  <List
                    dense
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "200px",
                      "&::-webkit-scrollbar": {
                        width: "10px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0,0,0,0)",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,.5)",
                      },
                    }}
                  >
                    {userList?.map((user) => (
                      <ListItem
                        onClick={() => onChangeTargetUser(user)}
                        key={`${Math.random()}`}
                        sx={{
                          paddingX: 1,
                          paddingY: 0.3,
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,.1)",
                          },
                        }}
                      >
                        <ListItemText
                          sx={{
                            width: "auto",
                            color: "white",
                            fontWeight: user.hasUnread ? "bold" : "light",
                            "& span": {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        >
                          {user?.username}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>

      {/* CHAT HISTORY */}
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,.5)",
          flex: 1,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(0,0,0,0)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,.4)",
          },
        }}
        ref={chatRef}
      >
        {displayChatHistory.map(({ senderId, profileImageUrl, content }) => (
          <Box
            key={`${+new Date()}${Math.random()}`}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection:
                getCustomUser()._id !== senderId ? "row" : "row-reverse",
              paddingY: 1,
              "& .mui-image-wrapper": { m: 0 },
            }}
          >
            <Box sx={{ borderRadius: "10000px", ml: 1 }}>
              <Avatar
                src={`/src/assets/profiles/${profileImageUrl}`}
                alt={""}
                width={"100%"}
              />
            </Box>
            <Box
              sx={{
                ml: 1,
                flex: 1,
                display: "flex",
                flexDirection:
                  getCustomUser()._id !== senderId ? "row" : "row-reverse",
                pr: getCustomUser()._id !== senderId ? 4 : 0,
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    getCustomUser()._id !== senderId ? "#7012d3" : "#CEC1DB",
                  color: getCustomUser()._id !== senderId ? "white" : "black",
                  p: 1,
                  borderRadius: "5px",
                }}
              >
                <Typography
                  noWrap={false}
                  sx={{ whiteSpace: "normal", wordBreak: "break-all" }}
                >
                  {content}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* MESSAGE SEND FORM */}
      <Box sx={{ backgroundColor: "#CEC1DB" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim().length === 0) return;
            onSend(message);
            setMessage("");
          }}
        >
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={"Enter your message..."}
              sx={{ "& fieldset": { border: "none" }, boxSizing: "border-box" }}
            />
            <Button type={"submit"} variant={"text"} sx={{ color: "#350968" }}>
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChatModal;
