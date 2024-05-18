import axios from "axios";
import BACKEND_BASE_URL from "./config";
import { getAuthToken } from "./utilities";

export const fetchUserProfile = async (onSuccess, onFailure) => {
  const endpoint_url = `${BACKEND_BASE_URL}user_profile/get-user-profile`;
  const token = getAuthToken();
  const response = await axios
    .get(endpoint_url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      const strResult = JSON.stringify(result.data);
      document.cookie = `userProfile=${strResult}; path=/`;

      onSuccess(result.data);
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      const userProfileCookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)userProfile\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (userProfileCookie) {
        const userProfileData = JSON.parse(userProfileCookie);
        onSuccess(userProfileData);
      } else {
        onFailure(error);
      }
    });
};

export const fetchArtistProfilePhoto = async (
  artistId,
  onSuccess,
  onFailure
) => {
  const response = await axios
    .get(`http://localhost:5333/data/profile_photos/${artistId}.jpg`, {
      responseType: "blob",
    })
    .then((result) => {
      const blobUrl = URL.createObjectURL(result.data);
      onSuccess(blobUrl);
    })
    .catch((error) => {
      onFailure(error);
    });
};
export const fetchTrackCoverPhoto = async (trackId, onSuccess, onFailure) => {
  const response = await axios
    .get(`http://localhost:5333/data/track_cover/${trackId}.jpg`, {
      responseType: "blob",
    })
    .then((result) => {
      const blobUrl = URL.createObjectURL(result.data);
      onSuccess(blobUrl);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export const fetchPlaylistCoverPhoto = async (
  playlistId,
  onSuccess,
  onFailure
) => {
  const endpoint_url = `${BACKEND_BASE_URL}playlist/get-a-track?id=${playlistId}`;
  const token = getAuthToken();
  await axios
    .get(endpoint_url, {
      headers: {
        Authorization: token,
      },
    })
    .then(async (result) => {
      console.log("fetchPlaylistCoverPhoto result", result.data);
      const trackId = result.data.track_id;
      await axios
        .get(`http://localhost:5333/data/playlist_cover/${trackId}.jpg`, {
          responseType: "blob",
        })
        .then((res) => {
          const blobUrl = URL.createObjectURL(res.data);
          onSuccess(blobUrl);
        })
        .catch((err) => {
          onFailure(err);
        });
    })
    .catch((error) => {
      onFailure(error);
    });
};

export const fetchArtist = async (artistId, onSuccess, onFailure) => {
  const endpoint_url = `${BACKEND_BASE_URL}artist/get-by-id?id=${artistId}`;
  const token = getAuthToken();
  const response = await axios
    .get(endpoint_url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      onSuccess(result.data);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export const fetchTrack = async (id, onSuccess, onFailure) => {
  const endpoint_url = `${BACKEND_BASE_URL}track/get-by-id?id=${id}`;
  const token = getAuthToken();
  await axios
    .get(endpoint_url, {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      const data = result.data;
      onSuccess(data);
    })
    .catch((error) => {
      onFailure(error);
    });
};
