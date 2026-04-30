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

echo starting local dev server...
start "" "%ComSpec%" /k "cd /d ""%~dp0"" && npm run dev"

echo opening %DEV_URL%
timeout /t 3 /nobreak >nul
start "" "%DEV_URL%"

endlocal
