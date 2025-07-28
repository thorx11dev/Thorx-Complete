#!/bin/bash

# Thorx Platform - Connect to New GitHub Repository
# Repository: https://github.com/thorx11dev/Thorx-Platform.git

echo "🚀 Connecting Thorx Platform to GitHub repository..."

# Clean up any existing lock files
echo "Cleaning up Git lock files..."
rm -f .git/config.lock
rm -f .git/index.lock
rm -f .git/HEAD.lock
rm -f .git/refs/heads/main.lock

# Check current git status
echo "Checking current Git status..."
git status

# Remove existing remote if it exists
echo "Removing existing remote origin..."
git remote remove origin 2>/dev/null || echo "No existing remote found"

# Add the new GitHub remote
echo "Adding new GitHub remote..."
git remote add origin https://github.com/thorx11dev/Thorx-Platform.git

# Verify remote was added
echo "Verifying remote configuration..."
git remote -v

# Configure user (update these if needed)
echo "Configuring Git user..."
git config user.name "Thorx Developer"
git config user.email "dev@thorx.live"

# Add all files to staging
echo "Adding all files to staging..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit, repository is up to date"
else
    echo "Creating commit..."
    git commit -m "Initial commit: Thorx Platform - Advanced cosmic earning platform with team collaboration features"
fi

# Set main branch
echo "Setting main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully connected to GitHub repository!"
echo "Repository URL: https://github.com/thorx11dev/Thorx-Platform.git"
echo "You can now view your project at: https://github.com/thorx11dev/Thorx-Platform"