module.exports = {
  expo: {
    // Force all cache to local project only
    cacheDirectories: [
      './.expo/cache',
      './node_modules/.cache',
    ],
  },
  // Disable native modules cache
  experimental: {
    disableNativeModulesCache: true,
  },
};
