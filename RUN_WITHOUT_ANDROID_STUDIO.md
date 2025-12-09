# Running the Project Without Android Studio

## ✅ Yes, You Can Run Without Android Studio!

You can build and run the React Native Android app entirely from the command line.

---

## Prerequisites

1. **Node.js 18+** installed
2. **Java JDK 17+** installed and in PATH
3. **Android SDK** installed (can use Android Studio SDK Manager or standalone)
4. **Android device** or **emulator** running

---

## Step-by-Step Guide

### Step 1: Start Android Emulator (If Using Emulator)

**Option A: Using Command Line**
```powershell
# List available emulators
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator -list-avds

# Start an emulator (replace NAME with your emulator name)
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator -avd Pixel_5_API_34
```

**Option B: Using Android Studio (Just for Emulator)**
- Open Android Studio
- Tools → Device Manager → Start emulator
- Keep Android Studio open (just for emulator)
- Close the project in Android Studio

**Option C: Use Physical Device**
- Enable USB debugging on your phone
- Connect via USB
- That's it!

---

### Step 2: Verify Device/Emulator is Connected

```powershell
# Add ADB to PATH for this session (if not already in PATH)
$env:Path += ";C:\Users\SiddharthChauhan\AppData\Local\Android\Sdk\platform-tools"

# Check connected devices
adb devices
```

Should show your device/emulator listed.

---

### Step 3: Start Metro Bundler

**Terminal 1:**
```powershell
cd android
npm start
```

Keep this terminal open - Metro needs to keep running.

---

### Step 4: Build and Run the App

**Terminal 2 (New Terminal):**
```powershell
cd android
npm run android
```

This will:
- ✅ Build the Android app
- ✅ Install it on your device/emulator
- ✅ Launch the app automatically
- ✅ Connect to Metro bundler

---

## Alternative: Build APK Only (Without Installing)

If you just want to build the APK without installing:

```powershell
cd android
.\gradlew.bat assembleDebug
```

APK will be at: `app/build/outputs/apk/debug/app-debug.apk`

---

## Complete Workflow (No Android Studio Needed)

```powershell
# Terminal 1: Start Metro
cd android
npm start

# Terminal 2: Start emulator (if using emulator)
$env:LOCALAPPDATA\Android\Sdk\emulator\emulator -avd YOUR_EMULATOR_NAME

# Terminal 3: Build and run
cd android
npm run android
```

---

## Troubleshooting

### "adb not found"
Add to PATH:
```powershell
$env:Path += ";C:\Users\SiddharthChauhan\AppData\Local\Android\Sdk\platform-tools"
```

Or add permanently to system PATH.

### "No devices found"
- Make sure emulator is fully booted
- Or physical device is connected with USB debugging enabled
- Run `adb devices` to verify

### "Metro bundler not found"
- Start Metro first: `npm start`
- Keep that terminal open

### Build errors
```powershell
# Clean and rebuild
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

## Advantages of Command Line

✅ **Faster** - No IDE overhead
✅ **Scriptable** - Can automate builds
✅ **Lightweight** - Don't need Android Studio open
✅ **CI/CD Friendly** - Works in automated pipelines

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Start Metro | `npm start` |
| Build & Run | `npm run android` |
| Build APK | `.\gradlew.bat assembleDebug` |
| Clean Build | `.\gradlew.bat clean` |
| Check Devices | `adb devices` |
| Start Emulator | `$env:LOCALAPPDATA\Android\Sdk\emulator\emulator -avd NAME` |

---

## Summary

**Yes, you can run completely without Android Studio!**

You only need:
1. ✅ Android SDK (can install separately)
2. ✅ Java JDK 17
3. ✅ Node.js
4. ✅ Device/Emulator running

Android Studio is **optional** - it's just a convenient IDE, but not required for building/running.


