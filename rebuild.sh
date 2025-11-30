#!/bin/bash
set -e  # exit on error

echo "🔹 Pulling latest changes..."
git pull origin main

echo "🔹 Updating dependencies..."
cd Frontend
npm install

echo "🔹 Building frontend..."
npm run build

echo "🔹 Reloading nginx..."
sudo systemctl reload nginx

echo "✅ Frontend updated successfully!"