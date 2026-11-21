# Mindeased

Mindeased is a mental health app built with React Native and Expo. It combines mood tracking, guided journaling, challenges, breathing exercises, and community support in one app.

## Features

- Mood logging with reasons and history
- Guided journal entries
- Daily challenges, habits, and journey progress
- Breathing and rescue exercises
- Progress reports and achievements
- Community feed and therapist directory
- Email/password and Google sign-in
- Android, iOS, and web

## Tech stack

React Native 0.81, Expo 54, TypeScript, Zustand, React Navigation, Firebase Auth and Firestore.

## Getting started

Requirements: Node.js 22 or newer, npm, and Expo CLI. Android builds need Android Studio. iOS builds need macOS and Xcode.

```bash
git clone https://github.com/shipschematic/mindeased-app.git
cd mindeased-app
npm install
cp .env.example .env
```

Fill the Firebase web values in `.env`. Native Firebase config is in `google-services.json` and `GoogleService-Info.plist` for the `mindeased` project. Replace both files when using your own Firebase project.

Run the app:

```bash
npm start       # Expo dev server
npm run web
npm run android
npm run ios
```

## Builds

```bash
npm run build:web
eas build --platform android --profile preview
```

Deploy the web build:

```bash
firebase deploy --only hosting
```

## CI

`.github/workflows/release.yml` builds Android, iOS, and web. Add the repository secrets `EXPO_TOKEN` and `FIREBASE_SERVICE_ACCOUNT_MINDEASED`. Set the repository variable `ENABLE_IOS_BUILD` to `true` once Apple credentials exist.

## License

[MIT](LICENSE)
