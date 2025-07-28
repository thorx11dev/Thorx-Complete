#!/bin/bash

# Thorx Platform - GitHub Setup Script
# This script helps set up your GitHub repository

echo "🚀 Setting up GitHub repository for Thorx Platform..."

# Clean up any existing lock files
echo "Cleaning up Git lock files..."
rm -f .git/config.lock
rm -f .git/index.lock
rm -f .git/HEAD.lock
rm -f .git/refs/heads/main.lock

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Configure Git user (you may need to update these)
echo "Configuring Git user..."
git config user.name "Thorx Developer"
git config user.email "dev@thorx.live"

# Add all files to staging
echo "Adding files to staging..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Thorx Platform - Cosmic earning platform with advanced email verification and team management"

# Add remote repository
echo "Adding GitHub remote..."
git remote add origin https://github.com/thorx11dev/Thorx-Platform.git

# Set main branch
echo "Setting main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "✅ GitHub repository setup complete!"
echo "Your repository is now available at: https://github.com/thorx11dev/Thorx-Platform"