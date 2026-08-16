// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for lucide-react-native .mjs resolution error
if (config.resolver?.sourceExts) {
  config.resolver.sourceExts.push("mjs");
}

module.exports = config;
