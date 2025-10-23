@echo off
echo 🚀 Starting ERP Backend...

REM Go to current directory
cd /d %~dp0

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Run server
echo ▶️ Starting server...
node server.js

pause
