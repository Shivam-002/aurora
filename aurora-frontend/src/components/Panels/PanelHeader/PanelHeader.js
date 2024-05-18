import React from "react";
import "./PanelHeader.css";
import NavButton from "../NavButton";
import { Avatar, makeStyles, useTheme } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { usePanelContext } from "../PanelContext";
import { NAV_SEARCH, NAV_USER_PROFILE } from "../../../utilities";
import { useNavContext } from "../NavProvider";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.primary.logo,
    transition: "transform 0.1s ease",
    "&:hover": {
      transform: "scale(1.02)",
      cursor: "pointer",
    },
  },
}));

function PanelHeader() {
  const theme = useTheme();
  const { activePanel, handlePanelChange } = usePanelContext();
  const { nav, addNav } = useNavContext();

  const classes = useStyles();

  const userProfile = () => {
    const newPanel = {
      panelName: NAV_USER_PROFILE,
      id: null,
    };

    handlePanelChange(newPanel);
    addNav(activePanel);
  };

  return (
    <div className="panel-header">
      <div className="nav-flex-container">
        <NavButton />
        {activePanel.panelName === NAV_SEARCH && <SearchBar />}
      </div>
      {activePanel.panelName !== NAV_USER_PROFILE && (
        <Avatar className={classes.avatar} onClick={userProfile}>
          S
        </Avatar>
      )}
    </div>
  );
}

export default PanelHeader;
