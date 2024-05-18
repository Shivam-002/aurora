import { createContext, useContext, useState } from "react";

const TopSongContext = createContext();

export const useTopSongContext = () => useContext(TopSongContext);

export const TopSongProvider = ({ children }) => {
  const [topSongs, setTopSongs] = useState([]);

  const handleTopSongsChange = (topSongs) => {
    setTopSongs(topSongs);
  };

  return (
    <TopSongContext.Provider value={{ topSongs, handleTopSongsChange }}>
      {children}
    </TopSongContext.Provider>
  );
};
