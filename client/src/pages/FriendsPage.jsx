import Page from "../containers/Page.jsx";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatModal from "../components/modals/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import PrivateRoomsContainer from "../components/room/PrivateRoomsContainer.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useParams } from "react-router-dom";
import { useSocket } from "../providers/SocketProvider.jsx";
import { useNotification } from "../providers/NotificationProvider.jsx";

/**
 * The friend page can be entered when the user presses the friend's card. On the top of the page,
 * the user can see the friend's name. Then the friend's private room that is visible to friends
 * will be shown. Users can enter the friend's private room, or chat with the friend.
 */

const FriendsPage = () => {
  const { friendId } = useParams();
  const { getCustomUser } = useAuth();
  const socket = useSocket();
  const notify = useNotification();

  const { data, isLoading } = useFetch(`privateRooms?owner=${friendId}`);
  const privateRoomsTemp = isLoading ? [] : data;
  const privateRooms = privateRoomsTemp.filter(
    (e) => e.isVisibleToFriends === true
  );

  const { data: userData, isLoading: userIsLoading } = useFetch(
    `users?_id=${friendId}`
  );
  const friend = userIsLoading ? {} : userData[0];

  const { data: chatData, isLoading: chatIsLoading } = useFetch(
    `chats?myId=${getCustomUser()._id}&customerId=${friendId}`
  );

  const [chatHistoryList, setChatHistoryList] = useState([]);

  useEffect(() => {
    const chatHistoryTemp = chatIsLoading
      ? []
      : chatData.sort((a, b) => a.timestamp - b.timestamp);

    setChatHistoryList(
      chatHistoryTemp?.map((item) => {
        return {
          senderId: item.sender,
          profileImageUrl:
            item.sender === getCustomUser()?._id
              ? getCustomUser().profile
              : friend.profile,
          content: item.message,
          receiverId: item.receiver,
        };
      })
    );
  }, [chatData, chatIsLoading, setChatHistoryList]);

  useEffect(() => {
    if (!socket) return;
    socket.off("message-notification");
    socket.on("message", (data) => {
      setChatHistoryList((prev) => [
        ...prev,
        {
          senderId: data?.senderId,
          receiverId: data?.receiverId,
          profileImageUrl: data?.profileImageUrl,
          content: data?.message,
        },
      ]);
    });

    return () => {
      socket.on("message-notification", (data) => {
        notify(`${data?.senderName} sent you a message!`);
      });
      socket.off("message");
    };
  }, [socket]);

  const handleSendChat = (message) => {
    socket.emit("send-message", {
      senderId: getCustomUser()?._id,
      senderName: getCustomUser()?.username,
      receiverEmail: friend?.email,
      receiverId: friendId,
      profileImageUrl: getCustomUser()?.profile,
      message: message,
      timestamp: Date.now(),
    });
  };

  return (
    <Page title={"Friends Page"}>
      <Box
        padding={2}
        marginTop={2}
        display={"flex"}
        flexDirection={"row"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                borderRadius: "25px",
                backgroundColor: "#1B0137",
                textAlign: "center",
                fontWeight: "large",
                fontSize: "1em",
                color: "white",
                overflow: "hidden",
                textTransform: "none",
                width: "30%",
                paddingY: "1%",
                minWidth: 180,
              }}
            >
              {friend?.username}'s Rooms
            </Box>
          </Box>
          {privateRooms?.length === 0 && (
            <Box sx={{ mt: 5 }}>
              <Typography
                variant={"h5"}
                sx={{ textAlign: "center", color: "rgba(255,255,255,.5)" }}
              >
                Your friend has not created any visible rooms
              </Typography>
            </Box>
          )}
          <Box className="flex flex-1 flex-row flex-auto justify-start h-5/6 mt-5 ml-5">
            <PrivateRoomsContainer
              privateRooms={privateRooms}
              isCreateRoom={false}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "35%",
            minWidth: 200,
            height: "90vh",
            overflow: "hidden",
          }}
          className={"mr-2 mt-4 w-1/3"}
        >
          <ChatModal
            chatHistory={chatHistoryList}
            targetUser={{
              name: friend?.username,
              uid: friend?._id,
              email: friend?.email,
            }}
            onSend={handleSendChat}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default FriendsPage;
