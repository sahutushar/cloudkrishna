@echo off
echo ========================================
echo   Cloud Krishna - Project Startup
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend...
start cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Admin Dashboard...
start cmd /k "cd admin-dashboard && npm run dev"

echo.
echo ========================================
echo   All services started successfully!
echo ========================================
echo.
echo Backend:  http://localhost:5555
echo Frontend: http://localhost:5173
echo Admin:    http://localhost:3001
echo.
echo Press any key to exit...
pause >nul
