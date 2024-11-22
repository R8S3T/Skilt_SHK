module.exports = function(api) {
  api.cache(true);

  // Use `process.env.ENVFILE` to specify which .env file to load (default to `.env`)
  const envFile = process.env.ENVFILE || '.env';

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": envFile, // Dynamically use the specified env file
        "safe": false,
        "allowUndefined": true
      }]
    ],
  };
};

