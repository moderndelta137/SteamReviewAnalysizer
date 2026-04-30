@echo off
setlocal

cd /d "%~dp0"

if not exist "node_modules" (
  echo node_modules missing
  echo run: npm install
  pause
  exit /b 1
)

echo deploying to Cloudflare...
call npm run deploy
set "DEPLOY_EXIT=%ERRORLEVEL%"

if not "%DEPLOY_EXIT%"=="0" (
  echo.
  echo deploy failed
  pause
  exit /b %DEPLOY_EXIT%
)

echo.
echo deploy complete
pause

endlocal
