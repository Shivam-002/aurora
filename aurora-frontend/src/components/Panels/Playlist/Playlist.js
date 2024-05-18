import React, { useEffect, useState } from "react";
import "./Playlist.css";

import { MusicNote } from "@material-ui/icons";
import SongRow from "./SongRow";
import SongHeader from "./SongHeader";
import { Divider } from "@material-ui/core";
import BACKEND_BASE_URL from "../../../config";
import { getAuthToken } from "../../../utilities";
import axios from "axios";

function Playlist({ id }) {
  const [playlist, setPlaylist] = useState({});

  const fetchPlaylist = async () => {
    const endpoint_url = `${BACKEND_BASE_URL}playlist/get-by-id?id=${id}`;
    console.log("Endpoint : ", endpoint_url);
    const token = getAuthToken();
    const response = await axios
      .get(endpoint_url, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        console.log("Playlist Data : " + result.data);
        setPlaylist(result.data);
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
      });
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);
  return (

    <div className="playlist">
      <div className="header-container">
        <div className="playlist-img-container">
          <MusicNote style={{ color: "#fff" }} />
        </div>
        <div className="playlist-info-container">
          <p>Playlist</p>
          <h1>{playlist? playlist.name : 'Unknown'}</h1>
          <span>{playlist? playlist.name : 'Unknown'} * 9 Songs</span>
        </div>
      </div>
      <div className="playlist-songs-container">
        {/* <SongRow track={dummy_track} /> */}
        <SongHeader />
        <Divider style={{ margin: "0 0 20px 0", backgroundColor: "#242424" }} />
        <div>
          {playlist &&
            playlist.tracks &&
            playlist.tracks.map((track) => (
              <SongRow key={track.id} track={track} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
