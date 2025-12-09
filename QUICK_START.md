# 🚀 Quick Start - Run Without Android Studio

## ✅ You Have an Emulator Running!

I can see your emulator is connected: `emulator-5554`

---

## Fastest Way to Run

### Option 1: Use the Script (Easiest)
```powershell
.\run-app.ps1
```

### Option 2: Manual Commands

**Terminal 1 - Start Metro:**
```powershell
npm start
```

**Terminal 2 - Build & Run:**
```powershell
npm run android
```

---

## What You Need

✅ **Already have:**
- ✅ Node.js
- ✅ Java JDK 17
- ✅ Android SDK
- ✅ Emulator running

❌ **Don't need:**
- ❌ Android Studio (optional!)

---

## Complete Workflow

1. **Start Emulator** (if not running):
   ```powershell
   $env:LOCALAPPDATA\Android\Sdk\emulator\emulator -avd YOUR_EMULATOR_NAME
   ```

2. **Run the App:**
   ```powershell
   npm run android
   ```
   
   This automatically:
   - Starts Metro bundler (if not running)
   - Builds the app
   - Installs on emulator
   - Launches the app

---

## Troubleshooting

### Metro Already Running?
If you see "A dev server is already running", that's fine! Just continue.

### Build Errors?
```powershell
.\gradlew.bat clean
npm run android
```

### ADB Not Found?
```powershell
$env:Path += ";C:\Users\SiddharthChauhan\AppData\Local\Android\Sdk\platform-tools"
```

---

## Summary

**You can run 100% without Android Studio!**

Just use:
- `npm run android` - Build and run
- `npm start` - Start Metro bundler separately (optional)

That's it! 🎉


