/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNotification } from "./NotificationProvider.jsx";
import { useMusic } from "./MusicProvider.jsx";

const context = createContext({});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { getCurrentUser } = useAuth();
  console.log(getCurrentUser);
  const notify = useNotification();
  const { playMusic, pauseMusic } = useMusic();

  useEffect(() => {
    if (getCurrentUser()) {
      const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

      const newSocket = io(SOCKET_SERVER_URL, {
        auth: {
          token: getCurrentUser().accessToken,
        },
      });

      newSocket.on("song", (song) => {
        playMusic(song.id, song.time);
        const audioContext = new AudioContext();
        if (audioContext?.state === "suspended") {
          notify("Music is suspended by browser", [
            {
              text: "PLAY",
              onClick: () => playMusic(song.id, song.time),
              closeOnClick: true,
            },
          ]);
        }
      });

      newSocket.on("new-song", (song) => {
        playMusic(song.id, song.time);
      });

      newSocket.on("message-notification", (data) => {
        notify(`${data.senderName} sent you a message!`);
      });

      newSocket.on("connect_error", (err) => {
        pauseMusic();
      });

      newSocket.on("disconnect", () => {
        pauseMusic();
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        pauseMusic();
      };
    }
  }, [getCurrentUser()]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
