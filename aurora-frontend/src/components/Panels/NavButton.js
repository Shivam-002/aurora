import { ArrowBack, ArrowForward } from "@material-ui/icons";
import "./NavButton.css";
import React from "react";
import { useNavContext } from "./NavProvider";
import { Button, IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { usePanelContext } from "./PanelContext";

function NavButton() {
  const { nav, back, forward } = useNavContext();
  const { activePanel, handlePanelChange } = usePanelContext();

  const allowBack = () => {
    if (nav.back.length === 0) return false;

    return true;
  };

  const allowForward = () => {
    if (nav.forward.length === 0) return false;

    return true;
  };

  const navBack = () => {
    const navPanel = back();
    if (navPanel) handlePanelChange(navPanel);
  };

  const navForward = () => {
    const navPanel = forward();
    if (navPanel) handlePanelChange(navPanel);
  };

  return (
    <div className="navbtn">
      <IconButton
        aria-label="back"
        disabled={!allowBack()}
        color="inherit"
        style={{
          color: allowBack() ? "#e5e5e5" : "#636363",
        }}
        onClick={navBack}
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        aria-label="back"
        disabled={!allowForward()}
        color="inherit"
        style={{
          color: allowForward() ? "#e5e5e5" : "#636363",
        }}
        onClick={navForward}
      >
        <ArrowForward />
      </IconButton>
    </div>
  );
}

export default NavButton;
