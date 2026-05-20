@echo off
setlocal

cd /d "%~dp0"

if not exist "node_modules" (
  echo node_modules missing
  echo run: npm install
  pause
  exit /b 1
)

set "DEV_URL=http://127.0.0.1:8787"
set "XDG_CONFIG_HOME=%~dp0.wrangler-config"
set "WRANGLER_LOG=none"

echo starting local dev server...
start "" "%ComSpec%" /k "cd /d ""%~dp0"" && npm.cmd run dev -- --port 8787"

echo opening %DEV_URL%
ping 127.0.0.1 -n 4 >nul
start "" "%DEV_URL%"

endlocal
