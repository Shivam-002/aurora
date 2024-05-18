import React, { useEffect, useState } from "react";
import "./Search.css";
import Section from "../Section";
import { useUserProfileContext } from "../../UserProfileProvider";
import { fetchUserProfile } from "../../../api";

function Search() {
  const { userProfile, setUserProfile } = useUserProfileContext();
  const [fetchingUserProfile, setFetchingUserProfile] = useState(true);

  useEffect(() => {
    if (!userProfile) {
      fetchUserProfile(
        (userProfileData) => {
          setUserProfile(userProfileData);
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
  }, [userProfile]);

  const onTrackClicked = (track) => {
    //TODO : Handle Track Click
  };

  const onTrackPlayed = (track) => {
    //TODO : Handle Track Play
  };

  return (
    <div className="search-page">
      <div className="section-container">
        <Section
          title={"Top Searches"}
          songs={userProfile.searches}
          onclick={onTrackClicked}
          onplay={onTrackPlayed}
        />
      </div>
    </div>
  );
}

export default Search;
