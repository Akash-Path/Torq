import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { images } from "./images";
import { Alert } from "react-native";

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const data = [
  {
    id: 1,
    title: "Unlock Authentic Experience",
    desc: "Discover, immerse, and create memories with local guides.",
    image: images.onboard1,
  },
  {
    id: 2,
    title: "Guide, Connect, Expertise",
    desc: "Showcase your knowledge, connect with travelers, and make an impact",
    image: images.onboard2,
  },
  {
    id: 3,
    title: "Be Both: Traveler and Guide",
    desc: "Experience, connect, and explore as a traveler and guide",
    image: images.onboard3,
  },
];
export const profileSettings = [
  {
    id: 1,
    title: "Personal Information",
    desc: "Manage your kyc.",
    image: images.personalInfo,
  },
  // {
  //     id: 2,
  //     title: "Push Notifications",
  //     desc: "Customize your push notification settings.",
  //     image: images.pushNoti
  // },
  // {
  //     id: 3,
  //     title: "Email Notifications",
  //     desc: "Customize your email notification settings.",
  //     image: images.emailNoti
  // },
  // {
  //     id: 4,
  //     title: "Privacy",
  //     desc: "Manage your information here.",
  //     image: images.privacy
  // },
];
export const legalSettings = [
  {
    id: 5,
    title: "Term of service",
    desc: "Review our term of service.",
    image: images.terms,
  },
  {
    id: 6,
    title: "Privacy Policy",
    desc: "Learn about privacy service.",
    image: images.policy,
  },
];

export const supportSettings = [
  {
    id: 7,
    title: "Send Feedback",
    desc: "Share your thoughts with us",
    image: images.feedback,
  },
  {
    id: 8,
    title: "Invite a Friend",
    desc: "Earn extra Torq by inviting your friends.",
    image: images.inviteFriend,
  },
  {
    id: 9,
    title: "Delete Account",
    desc: "Erase your account",
    image: images.del,
  },
  {
    id: 10,
    title: "Log Out",
    desc: "Sign off and take a break.",
    image: images.logout2,
  },
];

export const dummyData = [
  // {
  //     title: 'Nickname',
  //     body: 'Set it and share it with Your friends.',
  //     icon: images.nickname
  // },
  {
    title: "Start earning",
    body: "Your first check-in session.",
    icon: images.startEarning,
  },
  {
    title: "Profile picture",
    body: "Upload you profile image.",
    icon: images.profilePic,
  },
  {
    title: "Follow us on Twitter",
    body: "Let’s keep in touch, follow us on Twitter.",
    icon: images.twitter,
    onPress: () => {
      Alert.alert("you click on twitter");
    },
  },
  {
    title: "Join Telegram",
    body: "Be part of our community and join now.",
    icon: images.telegram,
    onPress: () => {
      Alert.alert("Telegram");
    },
  },
  {
    title: "Invite 5 Friends",
    body: "Grow your team and increase your earnings.",
    icon: images.invite5friends,
  },
];
