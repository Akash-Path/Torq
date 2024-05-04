import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomNavigation";
import ShareScreen from "../screens/share";
import PreStalking from "../screens/preStalking";
import States from "../screens/states";
import TopUsers from "../screens/topUsers";
import DailyBonus from "../screens/dailyBonus";
import EarningCal from "../screens/earningCal";
import userDetails from "../screens/userDetails";
import PersonalDetails from "../screens/KYC/personalDetails";
import SelfieVerification from "../screens/KYC/selfieVerification";
import UploadDocuments from "../screens/KYC/uploadDocuments";
import KycStatus from "../screens/KYC/kycStatus";
import AllBadges from "../screens/allBadges";
import Profile from "../screens/profile";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="UserDetails" component={userDetails} />
      <Stack.Screen name="PreStalking" component={PreStalking} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
      <Stack.Screen name="SelfieVerification" component={SelfieVerification} />
      <Stack.Screen name="KycStatus" component={KycStatus} />
      <Stack.Screen name="States" component={States} />
      <Stack.Screen name="TopUsers" component={TopUsers} />
      <Stack.Screen name="DailyBonus" component={DailyBonus} />
      <Stack.Screen name="EarningCal" component={EarningCal} />
      <Stack.Screen name="allBadges" component={AllBadges} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
