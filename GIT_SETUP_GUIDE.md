# Git Setup Guide for Thorx Platform

## Prerequisites
1. Make sure you have a GitHub account
2. Create a new repository on GitHub named "Thorx-Platform" (or the name you prefer)
3. Keep the repository public or private as per your preference

## Step-by-Step Setup

### 1. Initialize Git Repository (if not already done)
```bash
git init
```

### 2. Configure Git User (if not already configured)
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 3. Add All Files to Staging
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "Initial commit: Thorx Platform with cosmic-inspired design system"
```

### 5. Add Remote Repository
```bash
git remote add origin https://github.com/thorx11dev/Thorx-Platform.git
```

### 6. Rename Branch to Main (if needed)
```bash
git branch -M main
```

### 7. Push to GitHub
```bash
git push -u origin main
```

## Alternative: Using GitHub CLI (if available)
If you have GitHub CLI installed:
```bash
gh repo create thorx11dev/Thorx-Platform --public
git remote add origin https://github.com/thorx11dev/Thorx-Platform.git
git push -u origin main
```

## Verification
After pushing, verify your repository is set up correctly:
```bash
git remote -v
git status
```

## Future Updates
For future commits:
```bash
git add .
git commit -m "Your commit message"
git push
```

## Project Structure Overview
The repository includes:
- `/client` - React frontend with TypeScript
- `/server` - Express.js backend
- `/shared` - Shared types and schemas
- `/attached_assets` - Development assets (ignored in production)
- Configuration files for TypeScript, Tailwind, Vite, and Drizzle

## Important Notes
- The `.env` file is already in `.gitignore` to protect sensitive information
- Development-only files and test files are excluded
- The repository is configured for deployment on Replit