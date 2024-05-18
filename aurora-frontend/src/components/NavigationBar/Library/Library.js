import React, { useEffect, useState } from "react";
import "./Library.css";
import LibraryHeader from "./LibraryHeader";
import LibPlaylist from "./LibPlaylist";
import LibArtist from "./LibArtist";
import CreatePlaylistForm from "./CreatePlaylistForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKEND_BASE_URL from "../../../config";
import { getAuthToken } from "../../../utilities";
import PlaylistSkeleton from "../../PlaylistSkeleton";

function Library() {
  const navigate = useNavigate();
  const [createPlaylistForm, setCreatePlaylistForm] = useState(false);
  const [library, setLibrary] = useState(null);
  const [activeLibItem, setActiveLibItem] = useState();

  const createPlaylist = async (values) => {
    const endpoint_url = `${BACKEND_BASE_URL}playlist/create?name=${values.playlistName}`;
    const token = getAuthToken();
    await axios
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
        fetchLibrary();
      })
      .catch((error) => {
        console.error("Error creating playlist : ", error);
        //TODO : Handle Exception
      });

    setCreatePlaylistForm(false);
  };

  const onCreatePlaylistCancel = () => {
    setCreatePlaylistForm(false);
  };

  const fetchLibrary = async () => {
    const endpoint_url = `${BACKEND_BASE_URL}user_profile/get-home-library`;
    const token = getAuthToken();
    await axios
      .get(endpoint_url, {
        headers: {
          Authorization: token,
        },

      })
      .then((result) => {
        if (!result || !result.data) {
          return;
        }

        setLibrary(result.data);
      })
      .catch((error) => {
        console.error("Error fetching Library : ", error);
        //TODO : Handle Exception
      });
  };

  useEffect(() => {
    fetchLibrary();
  }, [navigate]);

  return (
    <div className="library-container">
      <LibraryHeader
        onCreatePlaylist={() => {
          setCreatePlaylistForm(true);
        }}
      />
      <div className="playlist-container">
        {library && library.length > 0
          ? library.map((data) =>
              data.type === "playlist" ? (
                <LibPlaylist key={data.id} libPlaylistData={data} />
              ) : (
                <LibArtist key={data.id} libArtistData={data} />
              )
            )
          : Array.from({ length: 9 }).map((_, index) => (
              <PlaylistSkeleton key={index} />
            ))}
      </div>
      {createPlaylistForm && (
        <CreatePlaylistForm
          onCancel={onCreatePlaylistCancel}
          onCreate={createPlaylist}
        />
      )}
    </div>
  );
}

export default Library;
