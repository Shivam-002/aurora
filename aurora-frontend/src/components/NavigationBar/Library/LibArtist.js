import React, { useState } from "react";
import "./LibArtist.css";
import { useTheme } from "@material-ui/core";
import FavroiteIcon from "@material-ui/icons/Favorite";
import { NAV_ARTIST } from "../../../utilities";
import { usePanelContext } from "../../Panels/PanelContext";
import { useNavContext } from "../../Panels/NavProvider";
import { fetchArtistProfilePhoto } from "../../../api";
function LibArtist({ libArtistData }) {
  const theme = useTheme();

  const { activePanel, handlePanelChange } = usePanelContext();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { nav, addNav } = useNavContext();

  function onArtistSelected() {
    const newPanel = {
      panelName: NAV_ARTIST,
      id: libArtistData ? libArtistData.id : null,
    };
    handlePanelChange(newPanel);
    addNav(activePanel);
  }

  fetchArtistProfilePhoto(libArtistData.id, (blobUrl) => {
    setProfilePhoto(blobUrl);
  });

  return (
    <div className="lib_artist" onClick={onArtistSelected}>
      <div className="artist_thumbnail_container">
        <img
          width={"35px"}
          height={"35px"}
          src={profilePhoto}
          alt="artist_thumbnail"
        />
      </div>
      <div className="lib-artist-info-container">
        <p className="artist-name">{libArtistData?.title}</p>
        <p className="artist-info">
          {libArtistData?.type} {libArtistData?.song_count} songs
        </p>
      </div>
    </div>
  );
}

export default LibArtist;
