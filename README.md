# Call Monitor - React Native Android App

A React Native application that monitors incoming phone calls and sends unknown numbers to a Flask backend.

## ✅ Project Restored

All essential configuration files have been recreated:
- ✅ `build.gradle` - Root build configuration
- ✅ `settings.gradle` - Project settings
- ✅ `gradle.properties` - Gradle properties with Java 17 config
- ✅ `package.json` - Dependencies
- ✅ `app.json` - App configuration
- ✅ `index.js` - React Native entry point
- ✅ `App.js` - Main React component
- ✅ `babel.config.js` - Babel configuration
- ✅ `metro.config.js` - Metro bundler configuration
- ✅ `react-native.config.js` - React Native CLI configuration

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

**Option A: Using npm**
```bash
npm run android
```

**Option B: Using Android Studio**
1. Open Android Studio
2. File → Open → Select `android` folder
3. Start emulator (Tools → Device Manager)
4. Click Run button (▶️)

## 📋 Prerequisites

- Node.js 18+
- Java JDK 17+
- Android Studio
- Android SDK API 34

## 🔧 Configuration

- **Backend URL**: Update `API_URL` in `App.js`
- **Java Version**: Set to JDK 17 in `gradle.properties`
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)

## 📱 Features

- Monitors incoming phone calls
- Checks if caller is in contacts
- Sends unknown numbers to backend API
- Simple UI with start/stop controls

## 🔐 Permissions

- `READ_PHONE_STATE` - Call detection
- `READ_CONTACTS` - Contact checking
- `INTERNET` - Backend communication

## 🐛 Troubleshooting

### ADB Not Found
Add to PATH: `C:\Users\SiddharthChauhan\AppData\Local\Android\Sdk\platform-tools`

### Build Errors
1. Build → Clean Project
2. Build → Rebuild Project

### Gradle Sync Issues
1. File → Invalidate Caches → Invalidate and Restart
2. File → Sync Project with Gradle Files

## 📝 Notes

- All native modules are auto-linked
- Hermes JavaScript engine enabled
- Debug keystore included for testing


