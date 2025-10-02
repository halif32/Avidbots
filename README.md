## Avidbots Mobile - Developer Setup

### Prerequisites
- Node.js 20+
- Java 17, Android Studio (SDK Platform 36), Android NDK r27 (auto-installed by RN 0.81)
- Xcode 15+ and CocoaPods (macOS only)
- Yarn or npm

### Clone and install
```sh
git clone <repo-url>
cd Avidbots
npm ci
```

If you hit peer resolution issues, we pin `@rneui/*` and use a clean tree. Avoid `--legacy-peer-deps` after the initial alignment above.

### Firebase configuration
- Android: place your `google-services.json` for the package `com.avidbots` at `android/app/google-services.json`.
- iOS: add `GoogleService-Info.plist` to `ios/Avidbots/` and to the Xcode project (if building iOS).
- Ensure the Android `applicationId` in `android/app/build.gradle` matches your Firebase Android package.

### Environment variables
- None required for local dev. Domain selection is handled in-app.

### Start Metro
```sh
npm start -- --reset-cache
```

### Run Android
```sh
npx react-native run-android
```

### Run iOS (macOS)
```sh
cd ios && pod install && cd ..
npx react-native run-ios
```

### Common issues
- Export syntax error during bundling: ensure `babel.config.js` uses only `module:@react-native/babel-preset`.
- Firebase “[DEFAULT] app not created”: ensure `google-services.json` matches `applicationId` and Gradle has `apply plugin: 'com.google.gms.google-services'` in `android/app/build.gradle`.
- SafeAreaView deprecation: we use `react-native-safe-area-context` already.

### Lint and tests
```sh
npm run lint
npm test
```

### Build cache reset
```sh
npm start -- --reset-cache
cd android && gradlew clean && cd ..
```
