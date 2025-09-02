#!/bin/bash

# Production startup script for Todo App
echo "Starting Todo App production setup..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Push database schema
echo "Setting up database..."
npm run db:push

# Start the application
echo "Starting the application..."
node dist/index.js