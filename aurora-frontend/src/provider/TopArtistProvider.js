import { createContext, useContext, useState } from "react";

const TopArtistsContext = createContext();

export const useTopArtistsContext = () => useContext(TopArtistsContext);

export const TopArtistsProvider = ({ children }) => {
  const [topArtists, setTopArtists] = useState([]);

  const handleTopArtistsChange = (topArtists) => {
    setTopArtists(topArtists);
  };

  return (
    <TopArtistsContext.Provider value={{ topArtists, handleTopArtistsChange }}>
      {children}
    </TopArtistsContext.Provider>
  );
};
