# Git Lock File Fix Guide

## The Problem
You're seeing this error:
```
error: could not lock config file .git/config: File exists
error: unable to write upstream branch configuration
```

This happens when Git's configuration file is locked, usually due to an interrupted Git operation.

## Solution Steps

### Step 1: Remove the Lock File
In the Shell tab, run:
```bash
rm -f .git/config.lock
```

### Step 2: Remove Any Other Lock Files
Check for and remove other potential lock files:
```bash
rm -f .git/index.lock
rm -f .git/HEAD.lock
rm -f .git/refs/heads/main.lock
```

### Step 3: Verify Git Status
```bash
git status
```

### Step 4: Fix Upstream Branch Configuration
After removing the lock files, set the upstream branch:
```bash
git branch --set-upstream-to=origin/main
```

### Step 5: Complete the GitHub Setup
Now you can complete the GitHub repository setup:
```bash
# Add all files
git add .

# Commit if needed
git commit -m "Initial commit: Thorx Platform - Fixed Git configuration"

# Push to GitHub
git push -u origin main
```

## Alternative: Fresh Git Setup
If the above doesn't work, you can start fresh:

```bash
# Remove the problematic .git directory
rm -rf .git

# Initialize a new repository
git init

# Add remote
git remote add origin https://github.com/thorx11dev/Thorx-Platform.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Thorx Platform - Cosmic earning platform"

# Create main branch and push
git branch -M main
git push -u origin main
```

## Prevention Tips
- Don't interrupt Git operations with Ctrl+C
- Wait for Git commands to complete fully
- Only run one Git operation at a time
- Use `git status` to check repository state before operations

## Verification
After fixing, verify everything is working:
```bash
git status
git remote -v
git branch -vv
```

You should see your repository is clean and properly connected to GitHub.