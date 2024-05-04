import React, { useEffect } from "react";
import RootNavigation from "./src/routes/RootNavigation";
import { Alert, Linking, LogBox } from "react-native";
import "./firebase.config";
import {
  notificatonListener,
  requestUserPermission,
} from "./src/api/notifications";
import { UserProvider } from "./context/UserContext";
import VersionCheck from "react-native-version-check";

const App = () => {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    requestUserPermission();
    notificatonListener();
    CheckAppUpdate();
  }, []);

  const CheckAppUpdate = async () => {
    VersionCheck.needUpdate().then((res) => {
      console.log(res, "check version");
      if (res.isNeeded) {
        Alert.alert(
          "Hold on!",
          "There is updated version on app store do you want to update",
          [
            {
              text: "YES",
              onPress: () => {
                Linking.openURL(res.storeUrl);
              },
            },
          ]
        );
      }
    });
  };

  return (
    <UserProvider>
      <RootNavigation />
    </UserProvider>
  );
};

export default App;
