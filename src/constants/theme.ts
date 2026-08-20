/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  background: "#FFFFFF",
  surface: "#F9F9F9",
  surfaceSecondary: "#F3F3F3",

  primary: "#E53935",
  primaryDark: "#C62828",
  primarySoft: "#FDECEC",

  text: "#171717",
  textSecondary: "#666666",
  textMuted: "#9A9A9A",

  border: "#EAEAEA",

  success: "#22A06B",
  warning: "#D98A00",
  danger: "#E53935",

  white: "#FFFFFF",
  black: "#000000",
};

export const Typography = {
  heading: 30,
  title: 20,
  body: 16,
  small: 14,
  caption: 12,
};
