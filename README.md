# Installation
The recommended expo-cli version for this app is 6+.
```
npm install
```

# Run Command
To test the dev version of the app:
```
npx expo start
```

To check if the app is working in production, change the [eas.json](./eas.json) configuration to:
```
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "production": {}
  }
}
```
Create a build file to test the app on emulator:
```
eas build -p android --profile emulatorBuild
```
This will generate an apk file. You can install it on the emulator via command prompt or you can drag and drop the apk file onto the emulator.
