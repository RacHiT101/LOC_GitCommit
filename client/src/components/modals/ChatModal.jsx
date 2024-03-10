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
          ((senderId === getCustomUser()?.id &&
            receiverId === (targetUser?.uid || targetUser?.id)) ||
            (senderId === (targetUser?.uid || targetUser?.id) &&
              receiverId === getCustomUser()?.id))
        );
      }
    });
  }, [chatHistory, targetUser, targetUser.username]);

  const chatRef = useRef(null);

  // Scroll to bottom of chat history when chat history changes
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current?.scrollHeight);
  }, [displayChatHistory]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setAttachedFile(file);
  };

  return (
    <div className="rounded-lg bg-white flex flex-col overflow-hidden ">
      {/* HEADER */}
      <div className=" px-4 py-2">
        <div
          onClick={() => setShowUserList((prev) => !prev)}
          onBlur={() => setShowUserList(false)}
          className="flex items-center relative cursor-pointer"
        >
          <h4 className="text-gray-700 font-semibold">
            {targetUser?.name || targetUser?.username}
          </h4>
          {userList && !showUserList && (
            <KeyboardArrowDownIcon className="ml-2" />
          )}
          {userList && showUserList && <KeyboardArrowUpIcon className="ml-2" />}
          {userList && (
            <Fade in={showUserList} unmountOnExit>
              <div className="absolute top-full  rounded-md w-1/2 z-10">
                <div className="border-b border-purple-800 m-1 mb-0 pb-1">
                  <button
                    onClick={() =>
                      onChangeTargetUser({ username: "All Users" })
                    }
                    className="bg-purple-700 py-1 font-medium px-2 w-full"
                  >
                    Group Chat
                  </button>
                </div>
                <div>
                  <ul className="overflow-y-scroll max-h-32 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {userList?.map((user) => (
                      <li
                        onClick={() => onChangeTargetUser(user)}
                        key={user.id}
                        className="px-2 py-1 hover:bg-gray-300"
                      >
                        <span className="text-white font-bold">
                          {user?.username}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Fade>
          )}
        </div>
      </div>

      {/* CHAT HISTORY */}
      <div
        className=" bg-opacity-50 flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        ref={chatRef}
      >
        {displayChatHistory.map(({ senderId, profileImageUrl, content }) => (
          <div
            key={`${+new Date()}${Math.random()}`}
            className={`flex items-end ${
              getCustomUser().id !== senderId ? "flex-row" : "flex-row-reverse"
            } py-1 px-4`}
          >
            <div className="ml-1">
              <img
                src={`/src/assets/profiles/${profileImageUrl}`}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div
              className={`ml-1 flex flex-1 ${
                getCustomUser().id !== senderId
                  ? "flex-row"
                  : "flex-row-reverse"
              } ${getCustomUser().id !== senderId ? "pr-4" : ""}`}
            >
              <div
                className={`p-1 ${
                  getCustomUser().id !== senderId
                    ? "bg-purple-700 text-white"
                    : "bg-gray-300 text-black"
                } rounded-md`}
              >
                <p className="break-all">{content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MESSAGE SEND FORM */}
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (message.trim().length === 0) return;
            onSend(message);
            setMessage("");
          }}
        >
          <div className="flex flex-col justify-start items-center mt-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              // fullWidth={true}
              className="flex-1 p-2 rounded-none outline-b-none w-[80%]"
              
            />
            <div className="mx-auto my-1 p-1">
              <Button variant="contained" color="primary" type="submit">
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
