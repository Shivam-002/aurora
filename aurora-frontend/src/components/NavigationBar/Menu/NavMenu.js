import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import "./NavMenu.css";
import MenuItem from "./MenuItem";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { usePanelContext } from "../../Panels/PanelContext";
import { NAV_HOME, NAV_SEARCH } from "../../../utilities";
import { useNavContext } from "../../Panels/NavProvider";

function NavMenu() {
  const theme = useTheme();
  const { activePanel, handlePanelChange } = usePanelContext();
  const { nav,addNav } = useNavContext();

  return (
    <div className="card">
      <MenuItem
        Icon={HomeIcon}
        title={NAV_HOME}
        isActive={activePanel.panelName === NAV_HOME}
        onClick={() => {
          const newPanel = {
            panelName: NAV_HOME,
            id: null,
          };
          handlePanelChange(newPanel);
          addNav(newPanel);

        }}
        activeColor={theme.palette.text.primary}
        inactiveColor={theme.palette.text.disabled}
      />
      <MenuItem
        Icon={SearchIcon}
        title={NAV_SEARCH}
        isActive={activePanel.panelName === NAV_SEARCH}
        onClick={() => {
          const newPanel = {
            panelName: NAV_SEARCH,
            id: null,
          };
          handlePanelChange(newPanel);
          addNav(newPanel);

        }}
        activeColor={theme.palette.text.primary}
        inactiveColor={theme.palette.text.disabled}
      />
    </div>
  );
}

export default NavMenu;
