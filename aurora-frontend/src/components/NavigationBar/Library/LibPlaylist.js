import React, { useEffect, useState } from "react";
import "./LibPlaylist.css";
import FavroiteIcon from "@material-ui/icons/Favorite";
import BrokenIcon from "@material-ui/icons/BrokenImage";
import { usePanelContext } from "../../Panels/PanelContext";
import { NAV_PLAYLIST } from "../../../utilities";
import { useNavContext } from "../../Panels/NavProvider";
import { fetchPlaylistCoverPhoto, fetchTrackCoverPhoto } from "../../../api";
function LibPlaylist({ libPlaylistData }) {
  const { activePanel, handlePanelChange } = usePanelContext();
  const { nav, addNav } = useNavContext();
  const [playlistThumbnail, setPlaylistThumbnail] = useState(null);
  function onPlaylistSelected() {
    const newPanel = {
      panelName: NAV_PLAYLIST,
      id: libPlaylistData ? libPlaylistData.id : null,
    };
    handlePanelChange(newPanel);
    addNav(activePanel);
  }

  useEffect(() => {
    if (libPlaylistData?.title === "Liked") {
      return;
    }
    fetchPlaylistCoverPhoto(
      libPlaylistData.id,
      (blobUrl) => {
        setPlaylistThumbnail(blobUrl);
      },
      (error) => {
        console.error("Error fetching playlist cover photo : ", error);
      }
    );
  }, [libPlaylistData]);

  return (
    <div className="lib_playlist" onClick={onPlaylistSelected}>
      <div className="thumbnail_container">
        {libPlaylistData.title === "Liked" ? (
          <FavroiteIcon />
        ) : playlistThumbnail ? (
          <img
            width={"35px"}
            height={"35px"}
            src={playlistThumbnail}
            alt="playlist_thumbnail"
          />
        ) : (
          <BrokenIcon />
        )}
      </div>
      <div className="lib-playlist-info-container">
        <p className="playlist-name">{libPlaylistData?.title}</p>
        <p className="playlist-info">
          Playlist {libPlaylistData?.song_count} Songs
        </p>
      </div>
    </div>
  );
}

export default LibPlaylist;
