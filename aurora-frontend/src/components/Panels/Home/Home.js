import { useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Home.css";
import Section from "../Section";
import BACKEND_BASE_URL from "../../../config";
import { NAV_ARTIST, NAV_PLAYLIST, getAuthToken } from "../../../utilities";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePanelContext } from "../PanelContext";
import { useTrackContext } from "../../Player/TrackProvider";
import {
  fetchArtistProfilePhoto,
  fetchTrack,
  fetchTrackCoverPhoto,
  fetchUserProfile,
} from "../../../api";
import { useUserProfileContext } from "../../UserProfileProvider";
import { useNavContext } from "../NavProvider";
import { useTopSongContext } from "../../../provider/TopSongProvider";
import { useTopArtistsContext } from "../../../provider/TopArtistProvider";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { topArtists, handleTopArtistsChange } = useTopArtistsContext();
  const { topSongs, handleTopSongsChange } = useTopSongContext();
  const { userProfile, handleUserProfileChange } = useUserProfileContext();
  const { activePanel, handlePanelChange } = usePanelContext();
  const { activeTrack, handleTrackChange } = useTrackContext();

  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const { nav, addNav } = useNavContext();
  const [fetchingUserProfile, setFetchingUserProfile] = useState(true);

  const fetchTrackById = async (id) => {
    const endpoint_url = `${BACKEND_BASE_URL}track/get-by-id?id=${id}`;
    const token = getAuthToken();
    const response = await axios
      .get(endpoint_url, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        const data = result.data;
      })
      .catch((error) => {
        console.error("Error fetching track:", error);
        //TODO : Handle Exception
      });
  };

  const fetchTopArtists = async () => {
    const endpoint_url = `${BACKEND_BASE_URL}artist/get-top-artist`;

    const token = getAuthToken();
    const response = await axios
      .get(endpoint_url, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        const data = result.data;
        handleTopArtistsChange(data);
        data.forEach((artist) => {
          fetchArtistProfilePhoto(
            artist.id,
            (blobUrl) => {
              handleTopArtistsChange((prevData) => {
                return prevData.map((prevArtist) => {
                  if (prevArtist.id === artist.id) {
                    prevArtist.url = blobUrl;
                  }
                  return prevArtist;
                });
              });
            },
            (error) => {
              console.error("Error fetching artist profile photo:", error);
              //TODO : Handle Exception
            }
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching top artists:", error);
        //TODO : Handle Exception
      });
  };

  const fetchTopSongs = async () => {
    const endpoint_url = `${BACKEND_BASE_URL}track/get-top-tracks`;

    const token = getAuthToken();
    const response = await axios
      .get(endpoint_url, {
        headers: {
          Authorization: token,
        },
      })
      .then((result) => {
        const data = result.data;
        handleTopSongsChange(data);

        data.forEach((track) => {
          fetchTrackCoverPhoto(
            track.id,
            (blobUrl) => {
              handleTopSongsChange((prevData) => {
                return prevData.map((prevTrack) => {
                  if (prevTrack.id === track.id) {
                    prevTrack.url = blobUrl;
                  }
                  return prevTrack;
                });
              });
            },
            (error) => {
              console.error("Error fetching track cover photo :", error);
              //TODO : Handle Exception
            }
          );
        });
      })
      .catch((error) => {
        console.error("Error fetching top songs:", error);
        //TODO : Handle Exception
      });
  };

  const onArtistClicked = (id) => {
    const newPanel = {
      panelName: NAV_ARTIST,
      id: id,
    };

    handlePanelChange(newPanel);
    addNav(activePanel);
  };

  const onArtistPlayed = (id) => {
    //TODO : Get All top tracks of artist(random)

    const newPanel = {
      panelName: NAV_ARTIST,
      id: id,
    };

    handlePanelChange(newPanel);
    addNav(activePanel);
  };

  const onTrackClicked = async (id) => {
    await fetchTrack(
      id,
      (data) => {
        handleTrackChange({
          id: data.id,
          name: data.name,
          duration: data.duration,
          views: data.views,
          likes: data.likes,
          dislikes: data.dislikes,
          artistCredit: data.artistCredit,
        });
      },
      (error) => {
        console.error("Error fetching track:", error);
        //TODO : Handle Exception
      }
    );
    // handlePanelChange({
    //   panelName: NAV_PLAYLIST,
    //   id: id,
    // });
  };

  useEffect(() => {
    if (!userProfile) {
      fetchUserProfile(
        (data) => {
          handleUserProfileChange(data);
          setFetchingUserProfile(false);
        },
        (error) => {
          console.error("Error fetching user profile:", error);
          setFetchingUserProfile(false);
        }
      );
    } else {
      setFetchingUserProfile(false);
    }
    if (topArtists.length == 0) fetchTopArtists();
    if (topSongs.length == 0) fetchTopSongs();
  }, []);

  return (
    <div className="home">
      <div className="section-container3">
        {
          <Section
            title={"Top Artists"}
            songs={topArtists}
            onclick={onArtistClicked}
            onplay={onArtistPlayed}
          />
        }

        {
          <Section
            title={"Top Songs"}
            songs={topSongs}
            onclick={onTrackClicked}
            onplay={onTrackClicked}
          />
        }
        {(fetchingUserProfile ||
          (userProfile && userProfile.recentTracks.length > 0)) && (
          <Section
            title={"Recently Played"}
            songs={userProfile?.recentTracks}
          />
        )}
        {/* <Section title={"Top Albums"} songs={[1, 2, 3]} /> */}
      </div>
    </div>
  );
}

export default Home;
