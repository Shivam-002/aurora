import React from "react";
import "./SongRow.css";
import { DeleteOutline, FavoriteBorderOutlined } from "@material-ui/icons";
import { MusicNote } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  favoriteIcon: {
    width: "20%",
    color: "#e3e3e3",
  },
}));

function SongRow({ track }) {
  const classes = styles();
  return (
    <div className="playlist-song-row">
      <span className="song-row-number">{track?.index}</span>

      <div className="song-row-title">
        <div className="song-img-container">
          <MusicNote style={{ color: "#7b7b7b" }} />
        </div>
        <div className="song-info-container">
          <p className="song-title-text">{track?.song_name}</p>
          <span className="song-artists-text">{track?.artist}</span>
        </div>
      </div>
      <span className="song-row-album">{track?.album}</span>
      <span className="song-row-date-added">{track?.date_added}</span>
      <div className="song-row-duration">
        <FavoriteBorderOutlined className={classes.favoriteIcon} />
        <span style={{ color: "#e3e3e3" }}>{track?.duration}</span>
        <DeleteOutline style={{ width: "20%", color: "#e3e3e3" }} />
      </div>
    </div>
  );
}

export default SongRow;
