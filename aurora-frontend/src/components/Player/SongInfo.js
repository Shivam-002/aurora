import React, { useEffect, useState } from "react";
import "./SongInfo.css";
import FavroiteIcon from "@material-ui/icons/Favorite";
import { useTheme } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { useTrackContext } from "./TrackProvider";
import BACKEND_BASE_URL from "../../config";
import { getAuthToken } from "../../utilities";
import axios from "axios";
import { useUserProfileContext } from "../UserProfileProvider";

function SongInfo() {
  const theme = useTheme();
  const { activeTrack } = useTrackContext();

  const { userProfile, handleUserProfileChange } = useUserProfileContext();

  const likeTrack = async () => {
    const trackId = activeTrack.id;
    if (!trackId || trackId === "") return;

    const endpoint_url = `${BACKEND_BASE_URL}track/like?id=${trackId}`;
    console.log("endpoint_url", endpoint_url);
    const token = getAuthToken();
    const response = await axios
      .post(
        endpoint_url,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((result) => {
        handleUserProfileChange({
          likedTracks: [...userProfile?.likedTracks, trackId],
        });
      })
      .catch((error) => {
        console.error("Error liking track:", error);
        //TODO : Handle Exception
      });
  };

  const unlikeTrack = async () => {
    const trackId = activeTrack.id;
    if (!trackId || trackId === "") return;

    const endpoint_url = `${BACKEND_BASE_URL}track/unlike?id=${trackId}`;
    console.log("endpoint_url", endpoint_url);
    const token = getAuthToken();
    const response = await axios
      .post(
        endpoint_url,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((result) => {
        console.log("unlike track response", result);
        const newLikedTracks = userProfile?.likedTracks.filter(
          (track) => track !== trackId
        );
        handleUserProfileChange({
          likedTracks: newLikedTracks,
        });
      })
      .catch((error) => {
        console.error("Error unliking track:", error);
        //TODO : Handle Exception
      });
  };

  return (
    <div className="song-info">
      <div className="song-thumbnail-container">
        <FavroiteIcon />
      </div>
      <div className="song-info-text">
        <p className="song-name">
          {activeTrack?.name ? activeTrack?.name : "Song Name"}
        </p>
        <p className="artists">
          {activeTrack?.artistName ? activeTrack?.artistName : "Artist's Name"}
        </p>
      </div>
      {!userProfile?.likedTracks.includes(activeTrack?.id) ? (
        <FavoriteBorderOutlined className="like-btn" onClick={likeTrack} />
      ) : (
        <FavroiteIcon className="like-btn" onClick={unlikeTrack} />
      )}
    </div>
  );
}

export default SongInfo;
