import { createContext, useContext, useState } from "react";
import {
  NAV_ARTIST,
  NAV_HOME,
  NAV_PLAYLIST,
  NAV_USER_PROFILE,
} from "../../utilities";

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
  const [nav, setNav] = useState({
    back: [],
    current: {
      panelName: NAV_HOME,
      id: null,
    },
    forward: [],
  });

  const addNav = (panel) => {
    if (nav.forward.length === 0) {
      nav.back.push(nav.current);
    } else {
      nav.back.push(...nav.forward);
      nav.forward = [];
    }
    nav.current = panel;
  };

  const back = () => {
    if (nav.back.length === 0) return;

    nav.forward.push(nav.current);
    nav.current = nav.back.pop();
    return nav.current;
  };

  const forward = () => {
    if (nav.forward.length === 0) return;

    nav.back.push(nav.current);
    nav.current = nav.forward.pop();
    // console.log("nav.current : ", nav.current);
    // console.log("nav.back : ", nav.back);
    // console.log("nav.forward : ", nav.forward);
    return nav.current;
  };

  return (
    <NavContext.Provider value={{ nav, addNav, back, forward }}>
      {children}
    </NavContext.Provider>
  );
};
