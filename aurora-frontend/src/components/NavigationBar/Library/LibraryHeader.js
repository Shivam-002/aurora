import React from "react";
import "./LibraryHeader.css";

import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core";

function LibraryHeader({onCreatePlaylist}) {
  const theme = useTheme();
  return (
    <div className="library_title">
      <div style={{ display: "flex", gap: "10px" }}>
        <LibraryMusicIcon style={{ color: theme.palette.primary.main }} />
        <h3 style={{ color: theme.palette.primary.main }}>Your Library</h3>
      </div>
      <AddIcon style={{ color: "#7b7b7b" }} onClick={onCreatePlaylist} />
    </div>
  );
}

export default LibraryHeader;
