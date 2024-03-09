import { useState, createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

const context = createContext({});

const MusicProvider = ({ children }) => {
  const [videoId, setVideoId] = useState("");
  const [time, setTime] = useState(0);
  const [playList, setPlayList] = useState([]);
  const [volume, setVolume] = useState(50);
  const youtubeRef = useRef(null);

  const playMusic = (id, time) => {
    setVideoId(id);
    setTime(time);

    youtubeRef.current?.internalPlayer?.playVideo();
  };

  const startPlayList = (songs) => {
    setPlayList(songs);
    const firstSong = songs[0];
    playMusic(firstSong.id, 0);
  };

  const playPreviousMusic = () => {
    const index = playList.findIndex((song) => song?.id === videoId);
    if (index !== -1) {
      const previousSong =
        playList[(index - 1 + playList?.length) % playList?.length];
      playMusic(previousSong.id, 0);
    }
  };

  const playNextMusic = () => {
    // if no playlist, then keep playing the current music
    if (playList?.length === 0) {
      youtubeRef.current.internalPlayer?.playVideo();
      return;
    }

    const index = playList.findIndex((song) => song.id === videoId);
    if (index !== -1) {
      const nextSong = playList[(index + 1) % playList.length];
      playMusic(nextSong.id, 0);
    }
  };

  const changeVolume = (volume) => {
    youtubeRef.current?.internalPlayer?.setVolume(volume);
    setVolume(volume);
  };

  const pauseMusic = () => {
    youtubeRef.current?.internalPlayer?.pauseVideo();
  };

  const continueMusic = () => {
    youtubeRef.current.internalPlayer?.playVideo();
  };

  const stopMusic = () => {
    youtubeRef.current.internalPlayer?.stopVideo();
  };

  return (
    <context.Provider
      value={{
        startPlayList,
        playPreviousMusic,
        playNextMusic,
        changeVolume,
        playMusic,
        continueMusic,
        pauseMusic,
        stopMusic,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1000px",
          left: "-1000px",
          zIndex: "-1000",
        }}
      >
        <YouTube
          ref={youtubeRef}
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              start: time,
            },
          }}
          onReady={(event) => {
            changeVolume(volume);
            event.target?.pauseVideo();
          }}
          onEnd={playNextMusic}
        />
      </div>
      {children}
    </context.Provider>
  );
};

export default MusicProvider;

export const useMusic = () => {
  return useContext(context);
};
