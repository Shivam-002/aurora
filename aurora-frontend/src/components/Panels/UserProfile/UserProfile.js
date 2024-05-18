import React, { useEffect } from "react";

import "./UserProfile.css";
import { Button, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../../api";
import { useUserProfileContext } from "../../UserProfileProvider";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#242424",
    color: "#e3e3e3 !important",
    fontWeight: 500,
    fontSize: "1.05rem",
    padding: "5px 20px",
    border: "solid 1px #121212",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#282828",
      color: "white !important",
    },
    "&.Mui-disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
}));

function UserProfile() {
  const navigate = useNavigate();

  const { userProfile, handleUserProfileChange } = useUserProfileContext();
  useEffect(() => {
    if (!userProfile) {
      fetchUserProfile(
        (data) => {
          handleUserProfileChange(data);
        },
        (error) => {}
      );
    } else {
    }
  }, [userProfile]);

  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("jwtToken");
    document.cookie =
      "userProfile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    handleUserProfileChange(null);
    navigate("/");
  };

  console.log("User PRofile : ", userProfile);

  return (
    <div className="UserProfile">
      <h1 style={{ color: "white" }}>User Profile</h1>
      <div className="user-info-container">
        <div className="item-info">
          {userProfile && userProfile.firstName ? (
            <span className="item-text">
              Name : {userProfile.firstName} {userProfile.lastName}
            </span>
          ) : (
            <Skeleton
              variant="text"
              width={200}
              height={50}
              sx={{ bgcolor: "#242424" }}
            ></Skeleton>
          )}
        </div>
        <div className="item-info">
          {userProfile && userProfile.gender ? (
            <span className="item-text"> Gender : {userProfile.gender}</span>
          ) : (
            <Skeleton
              variant="text"
              width={200}
              height={50}
              sx={{ bgcolor: "#242424" }}
            ></Skeleton>
          )}
        </div>
        <div className="item-info">
          {userProfile && userProfile.country ? (
            <span className="item-text"> Country : {userProfile.country}</span>
          ) : (
            <Skeleton
              variant="text"
              width={200}
              height={50}
              sx={{ bgcolor: "#242424" }}
            ></Skeleton>
          )}
        </div>
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

export default UserProfile;
