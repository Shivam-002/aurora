import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./NavigationBar.css";
import Library from "./Library/Library";
import NavMenu from "./Menu/NavMenu";

import { useNavigate } from "react-router-dom";

export const defaultDrawerWidth = 320;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    position: "relative",
  },
  dragger: {
    width: "10px",
    cursor: "ew-resize",
    padding: "0 0 0",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: "black",
  },
}));

export default function NavigationBar() {
  const classes = useStyles();
  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  return (
    <div className="navigation-bar">
      <div
        className={classes.drawer}
        style={{
          width: drawerWidth,
          backgroundColor: "black",
          overflowY: "hidden",
        }}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          className={classes.dragger}
        />
        <div className="content-container">
          <NavMenu />
          <Library />
        </div>
      </div>
    </div>
  );
}
