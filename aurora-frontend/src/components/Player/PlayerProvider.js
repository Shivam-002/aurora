import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const usePlayerContext = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    playlist : [],
    currentTrackIndex : 0,
    isPlaying : false,
    isShuffle : false,
    isLoop : false,
  });

  const handlePlayerChange = (player) => {
    setPlayer(player);
  };

  return (
    <PlayerContext.Provider value={{ player, handlePlayerChange }}>
      {children}
    </PlayerContext.Provider>
  );
};
