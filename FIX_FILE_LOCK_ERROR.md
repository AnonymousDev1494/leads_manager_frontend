# Fix: File Lock Error

## Error Explanation

### The Problem:
```
The process cannot access the file because it is being used by another process
```

### What's Happening:
- A Gradle daemon or Java process has a **lock** on a cache file
- Windows prevents deleting/modifying files that are in use
- This commonly happens when:
  - Gradle daemon is still running
  - Android Studio has the file open
  - Another build process is running
  - Previous build didn't clean up properly

### Why It Happens:
- Gradle daemon keeps files open for faster builds
- Multiple processes trying to access the same cache
- Build was interrupted/crashed, leaving locks

## Solutions

### ✅ Solution 1: Stop Gradle Daemon (Already Done)

```powershell
.\gradlew.bat --stop
```

This stops all Gradle daemon processes.

### ✅ Solution 2: Kill Java/Gradle Processes (Already Done)

Stopped any running Java or Gradle processes.

### ✅ Solution 3: Clean Cache After Stopping (Already Done)

Cleaned the locked cache directory.

### 🔧 Solution 4: Close Android Studio

**Important:** If the error persists:
1. **Close Android Studio completely**
2. Wait a few seconds
3. Try cleaning again

### 🔧 Solution 5: Restart Computer (If Nothing Works)

If files are still locked:
1. Save your work
2. Restart your computer
3. This releases all file locks

## Prevention

### To Avoid This Error:

1. **Always stop Gradle before cleaning:**
   ```powershell
   .\gradlew.bat --stop
   .\gradlew.bat clean
   ```

2. **Close Android Studio before manual cache cleanup**

3. **Use Android Studio's built-in clean:**
   - **Build** → **Clean Project** (safer than manual deletion)

4. **Don't run multiple builds simultaneously**

## Quick Fix Commands

```powershell
# Complete fix sequence
.\gradlew.bat --stop
Get-Process | Where-Object {$_.ProcessName -like "*java*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force .gradle\caches\jars-9 -ErrorAction SilentlyContinue
.\gradlew.bat clean
```

## After Fixing

Try building again:
```powershell
.\gradlew.bat assembleDebug
```

Or in Android Studio:
- **Build** → **Rebuild Project**


