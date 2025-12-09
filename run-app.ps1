# Quick script to run React Native Android app without Android Studio

Write-Host "🚀 Starting React Native App..." -ForegroundColor Green

# Add ADB to PATH
$env:Path += ";C:\Users\SiddharthChauhan\AppData\Local\Android\Sdk\platform-tools"

# Check if device/emulator is connected
Write-Host "`n📱 Checking for devices..." -ForegroundColor Cyan
$devices = adb devices | Select-String "device$"
if ($devices) {
    Write-Host "✅ Device/Emulator found!" -ForegroundColor Green
    adb devices
} else {
    Write-Host "❌ No device/emulator found!" -ForegroundColor Red
    Write-Host "Please start an emulator or connect a device first." -ForegroundColor Yellow
    Write-Host "`nTo start emulator:" -ForegroundColor Yellow
    Write-Host "  `$env:LOCALAPPDATA\Android\Sdk\emulator\emulator -avd YOUR_EMULATOR_NAME" -ForegroundColor Gray
    exit 1
}

Write-Host "`n🔨 Building and running app..." -ForegroundColor Cyan
Write-Host "This will start Metro bundler and install the app." -ForegroundColor Gray
Write-Host ""

# Run the app
npm run android

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ App launched successfully!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Build failed. Check errors above." -ForegroundColor Red
}


