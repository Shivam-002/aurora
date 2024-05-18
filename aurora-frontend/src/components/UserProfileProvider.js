import React, { createContext, useContext, useReducer, useState } from "react";

const UserProfileContext = createContext();

export const useUserProfileContext = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const handleUserProfileChange = (newUserProfile) => {
    setUserProfile(newUserProfile);
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, handleUserProfileChange }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
