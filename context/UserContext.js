import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userUpdated, setUserUpdated] = useState(false);
  const [popupClicked, setPopupClicked] = useState(false);
  const [wheelValue, setWheelValue] = useState("");
  const [isNotification, setIsNotification] = useState(false);
  const [globalRank, setGlobalRank] = useState("");
  const [torqConstants, setTorqConstants] = useState({});
  const [kycStatus, setKycStatus] = useState("");
  const [miningStart, setMiningStart] = useState(false);
  const [timeRemainingGlobal, setTimeRemainingGlobal] = useState(0);

  const toggleNotificationContext = () => {
    setIsNotification(!isNotification);
  };
  const toggleTimeRemainingGlobal = (time) => {
    setTimeRemainingGlobal(time);
  };
  const toggleMiningStart = (value) => {
    setMiningStart(value);
  };

  const toggleUserUpdated = () => {
    setUserUpdated(!userUpdated);
  };

  const togglePopupClicked = () => {
    setPopupClicked(!popupClicked);
  };

  // setTimeout(() => {
  //   togglePopupClicked();
  // }, 60000);

  return (
    <UserContext.Provider
      value={{
        timeRemainingGlobal,
        toggleTimeRemainingGlobal,
        setTimeRemainingGlobal,
        miningStart,
        toggleMiningStart,
        kycStatus,
        setKycStatus,
        torqConstants,
        setTorqConstants,
        isNotification,
        setIsNotification,
        globalRank,
        setGlobalRank,
        toggleNotificationContext,
        wheelValue,
        setWheelValue,
        userUpdated,
        setUserUpdated,
        popupClicked,
        setPopupClicked,
        togglePopupClicked,
        toggleUserUpdated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
