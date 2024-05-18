import { Home, HomeOutlined, PlayArrow } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Artist.css";
import { Button } from "@material-ui/core";
import Section from "../Section";
import { usePanelContext } from "../PanelContext";
import { fetchArtist, fetchTrack, fetchTrackCoverPhoto } from "../../../api";
import playerController from "../../../PlayerController";
import { useTrackContext } from "../../Player/TrackProvider";

function Artist() {
  const { activePanel, handlePanelChange } = usePanelContext();
  const [artistData, setArtist] = useState(null);
  const { activeTrack, handleTrackChange } = useTrackContext();

  const onTrackClick = (id) => {
    console.log("Track clicked", id);

    const play_track = {
      id: id,
      howl: null,
    };

    console.log("Play track", play_track);

    playerController.set_playlist([play_track]);
    playerController.play();

    fetchTrack(
      id,
      (data) => {
        handleTrackChange({
          id: data.id,
          name: data.name,
          duration: data.duration,
          views: data.views,
          likes: data.likes,
          dislikes: data.dislikes,
          artistName : data.artists[0].name
        });

        console.log("Track data", data);
      },
      (error) => {
        console.log("Error fetching track data", error);
        //TODO : Handle Exception
      }
    );
  };

  const onTrackPlayed = (id) => {
    console.log("Track clicked", id);

    const play_track = {
      id: id,
      howl: null,
    };

    console.log("Play track", play_track);

    playerController.set_playlist([play_track]);

    playerController.play();

    fetchTrack(
      id,
      (data) => {
        handleTrackChange({
          id: data.id,
          name: data.name,
          duration: data.duration,
          views: data.views,
          likes: data.likes,
          dislikes: data.dislikes,
        });
      },
      (error) => {
        console.log("Error fetching track data", error);
        //TODO : Handle Exception
      }
    );
  };

  useEffect(() => {
    fetchArtist(
      activePanel.id,
      (data) => {
        console.log("Artist data", data);
        setArtist(data);
        data.popularTracks.forEach((track) => {
          fetchTrackCoverPhoto(
            track.id,
            (url) => {
              track.url = url;
              setArtist({ ...data });
            },
            (error) => {
              console.log("Error fetching track cover photo", error);
            }
          );
        });
      },
      (error) => {
        console.log("Error fetching artist data", error);
      }
    );
  }, [activePanel]);

  return (
    <div className="artist">
      <div className="artist-header-container">
        <h1>{artistData?.name}</h1>
        <p>{artistData?.views} views</p>
      </div>
      <div className="artist-menu">
        <div className="play-container">
          <PlayArrow
            style={{
              width: "30px",
              height: "30px",
              margin: "5px",
              color: "#121212",
            }}
          />
        </div>
        <Button
          style={{
            backgroundColor: "#282828",
            color: "#e3e3e3",
            padding: "5px 15px 5px 15px",
            borderRadius: "30px",
          }}
        >
          Follow
        </Button>
      </div>
      <div className="artist-section-container">
        <Section
          title="Popular"
          songs={artistData?.popularTracks}
          onclick={onTrackClick}
          onplay={onTrackPlayed}
        />
      </div>
    </div>
  );
}

export default Artist;
