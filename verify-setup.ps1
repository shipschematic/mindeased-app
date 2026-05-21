# Mental Health App - Quick Start Script
# Run this to verify your setup is ready

Write-Host "🚀 Mental Health App - Setup Verification" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
$npmVersion = npm --version
if ($npmVersion) {
    Write-Host "✅ npm installed: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
    exit 1
}

# Check if node_modules exists
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Dependencies not installed. Run: npm install" -ForegroundColor Red
    exit 1
}

# Check Expo
Write-Host "Checking Expo..." -ForegroundColor Yellow
$expoVersion = npx expo --version
if ($expoVersion) {
    Write-Host "✅ Expo installed: $expoVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  Expo not found, will install on first run" -ForegroundColor Yellow
}

# Check src folder structure
Write-Host "Checking project structure..." -ForegroundColor Yellow
$requiredFolders = @(
    "src/config",
    "src/state",
    "src/intents",
    "src/execute",
    "src/layers/components",
    "src/layers/screens",
    "assets/illustrations",
    "assets/icons",
    "assets/images"
)

$allFoldersExist = $true
foreach ($folder in $requiredFolders) {
    if (Test-Path $folder) {
        Write-Host "  ✅ $folder" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $folder - Missing!" -ForegroundColor Red
        $allFoldersExist = $false
    }
}

if (-not $allFoldersExist) {
    Write-Host "❌ Some folders are missing!" -ForegroundColor Red
    exit 1
}

# Check key files
Write-Host "Checking key files..." -ForegroundColor Yellow
$requiredFiles = @(
    "package.json",
    "app.json",
    "tsconfig.json",
    "App.tsx",
    "src/app.tsx",
    "src/config/theme.ts",
    "src/state/store.ts",
    "src/execute/supabase.ts"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - Missing!" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host "❌ Some files are missing!" -ForegroundColor Red
    exit 1
}

# Check assets
Write-Host "Checking assets..." -ForegroundColor Yellow
$assetCount = (Get-ChildItem -Path "assets" -Recurse -File | Measure-Object).Count
Write-Host "  ✅ $assetCount asset files found" -ForegroundColor Green

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete! You're ready to run!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update src/execute/env.ts with your Supabase credentials" -ForegroundColor White
Write-Host "2. Run: npm start" -ForegroundColor White
Write-Host "3. Press 'i' for iOS or 'a' for Android" -ForegroundColor White
Write-Host ""
Write-Host "For more info, see GETTING_STARTED.md" -ForegroundColor Cyan
