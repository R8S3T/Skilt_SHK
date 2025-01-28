import 'dotenv/config'; // Load environment variables from .env file

export default {
  expo: {
    name: "Skilt_SHK",
    slug: "Skilt_SHK",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
/*       image: "./assets/splash.png", */
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      newArchEnabled: true
    },
    android: {
      package: "com.yourcompanyname.skiltshk",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.INTERNET"
      ],
      newArchEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    assetBundlePatterns: [
      "assets/fonts/**/*",
      "assets/images/**/*",
      "assets/icons/**/*",
      "assets/*.db"
    ],
    plugins: [
      "expo-font"
    ],
    extra: {
      eas: {
        projectId: "ec8271bd-0e41-4a36-ad84-fddfffb1cce9"
      },
      DATABASE_MODE: process.env.DATABASE_MODE || "production"
    }
  }
};
