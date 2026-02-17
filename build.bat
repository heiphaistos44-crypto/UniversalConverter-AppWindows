@echo off
setlocal
title UniversalConverter - Build

cd /d "%~dp0"

echo.
echo  === UniversalConverter v1.0.0 - Build Release ===
echo.

:: 1. Prereqs
echo [1/4] Verification npm et cargo...
where npm >nul 2>&1 || (echo ERREUR: npm introuvable & pause & exit /b 1)
where cargo >nul 2>&1 || (echo ERREUR: cargo introuvable & pause & exit /b 1)
echo  OK

:: 2. Kill
echo [2/4] Arret processus...
taskkill /F /IM universalconverter.exe >nul 2>&1
echo  OK

:: 3. Clean
echo [3/4] Nettoyage dist/...
if exist dist rmdir /s /q dist
echo  OK

:: 4. Build
echo [4/4] Compilation (peut prendre plusieurs minutes)...
echo.
npm run tauri build
set BUILD_CODE=%ERRORLEVEL%

echo.
if %BUILD_CODE% NEQ 0 (
  echo  [ERREUR] Build echoue - code %BUILD_CODE%
) else (
  echo  [OK] Build reussi \!
  echo  Sortie : src-tauri	argeteleaseundle
)

echo.
pause
exit /b %BUILD_CODE%
