import { createContext, useContext, useState } from "react";
import { NAV_ARTIST, NAV_HOME, NAV_PLAYLIST, NAV_USER_PROFILE } from "../../utilities";

const PanelContext = createContext();

export const usePanelContext = () => useContext(PanelContext);

export const PanelProvider = ({ children }) => {
  const [activePanel, setActivePanel] = useState({ panelName: NAV_HOME, id: null });

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
  };

  return (
    <PanelContext.Provider value={{ activePanel, handlePanelChange }}>
      {children}
    </PanelContext.Provider>
  );
};
