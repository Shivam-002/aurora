import { createContext, useContext, useState } from "react";

const TrackContext = createContext();

export const useTrackContext = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState(null);

  const handleTrackChange = (track) => {
    setActiveTrack(track);
  };

  return (
    <TrackContext.Provider value={{ activeTrack, handleTrackChange }}>
      {children}
    </TrackContext.Provider>
  );
};
