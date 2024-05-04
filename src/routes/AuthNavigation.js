import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash";
import Exit from "../screens/exit";
import Login from "../screens/login";
import SignUp from "../screens/signUp";
import ForgotPassword from "../screens/forgotPassword";
import NewPassword from "../screens/newPassword";
import AppNavigation from "./AppNavigation";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Exit" component={Exit} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="AppNavigation" component={AppNavigation} />
    </Stack.Navigator>
  );
}
