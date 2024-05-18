import React from "react";
import "./SongCard.css";
import { PlayCircleFilled } from "@material-ui/icons";

function SongCard({ song, onclick,onplay }) {

  const handleSectionClicked = (id) => {
    onclick(id);
  };

  const handlePlay = (id) => {
    onplay(id);
  }

  return (
    <div className="song-card" onClick={() => handleSectionClicked(song.id)}>
      <div className="image-container">
        <img
          src={
            song && song.url
              ? song.url
              : "https://images.pexels.com/photos/899954/pexels-photo-899954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="album art"
        />
        <div className="action-container">
          <PlayCircleFilled style={{ width: "100%", height: "100%" }} onclick={handlePlay}  />
        </div>
      </div>
      <h3 className="title">
        {" "}
        {song && song.title
          ? song.title.length > 15
            ? `${song.title.slice(0, 12)}...`
            : song.title
          : "Unknown"}
      </h3>
      <p className="sub-title">{song && song.type ? song.type : "Artist"}</p>
    </div>
  );
}

export default SongCard;
