import { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylistContext = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [activePlaylist, setActivePlaylist] = useState(null);

  const handleTrackChange = (playlist) => {
    setActivePlaylist(playlist);
  };

  return (
    <PlaylistContext.Provider value={{ activePlaylist, setActivePlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};
