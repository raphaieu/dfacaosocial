#!/bin/bash

# Start PHP Backend
echo "Starting PHP Backend on http://localhost:8080..."
php -S localhost:8080 -t backend/public &

# Start Next.js Frontend
echo "Starting Frontend on http://localhost:3000..."
cd frontend && npm run dev
