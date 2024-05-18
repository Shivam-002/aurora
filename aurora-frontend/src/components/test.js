import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Library from "./Library/Library";
import NavMenu from "./Menu/NavMenu";

export const defaultDrawerWidth = 600;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = makeStyles((theme) => ({
  dragger: {
    width: "3px",
    cursor: "ew-resize",
    padding: "0 0 0",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "white",
  },
  navPanelContainer: {
    display: "flex",
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
    <div className={classes.navPanelContainer}>
      <div
        style={{
          width: drawerWidth,
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          className={classes.dragger}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <NavMenu />
          <Library />
        </div>
      </div>
    </div>
  );
}
