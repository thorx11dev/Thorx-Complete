# Bolt.new Setup Guide for Thorx Platform

## Import Status: ✅ SUCCESS
Your Thorx platform has been successfully imported to Bolt.new!
URL: `thorxlive-3d12.w-credentialless-staticblitz.com`

## Current Issue: Database Configuration
**Error**: `DATABASE_URL must be set. Did you forget to provision a database?`

## Solution: Configure Environment Variables

### Step 1: Set up Database Environment Variable

In your Bolt.new project, you need to add the `DATABASE_URL` environment variable:

#### Option A: Use Neon Database (Recommended)
1. Go to https://console.neon.tech/
2. Create a new project or use existing one
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/database?sslmode=require
   ```

#### Option B: Use Supabase Database
1. Go to https://supabase.com/dashboard
2. Create new project
3. Go to Settings > Database
4. Copy the connection string

### Step 2: Add Environment Variables in Bolt.new

Add these environment variables in your Bolt.new project settings:

```bash
# Database Configuration
DATABASE_URL=your_database_connection_string_here

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email Service (Optional - for production features)
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Step 3: Required Environment Variables

**Essential (Required for app to run):**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens (any secure random string)

**Optional (For full functionality):**
- `EMAIL_USER` - Email service username
- `EMAIL_PASS` - Email service password/app password
- `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (usually 587)

### Step 4: Database Setup Commands

Once environment variables are set, run these commands in Bolt.new terminal:

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start the application
npm run dev
```

## Expected Results After Setup

### ✅ Working Features:
- Landing page with cosmic theme
- User authentication (register/login)
- Dashboard with earnings interface
- Team collaboration system
- New Cosmic Weekly Journey chart
- Mobile responsive design

### ✅ Database Tables Created:
- `users` - User accounts and authentication
- `team_members` - Team member management
- `contact_messages` - Contact form submissions
- `team_chats` - Team communication
- `ban_reports` - User moderation

## Quick Database Setup Example

### Using Neon Database:
1. Visit https://console.neon.tech/
2. Click "Create Project"
3. Name: "Thorx Platform"
4. Copy the connection string
5. Add to Bolt.new environment variables as `DATABASE_URL`

### Sample Environment Variables:
```bash
DATABASE_URL=postgresql://thorx_user:password123@ep-cool-star-123456.us-east-1.aws.neon.tech/thorx_db?sslmode=require
JWT_SECRET=thorx_super_secret_key_2025_cosmic_platform
```

## Verification Steps

### After setting up environment variables:
1. ✅ App loads without database errors
2. ✅ Registration/login works
3. ✅ Dashboard displays properly
4. ✅ Cosmic chart renders correctly
5. ✅ Team features accessible

## Troubleshooting

### Common Issues:
- **"Connection refused"**: Check DATABASE_URL format
- **"SSL required"**: Ensure `?sslmode=require` at end of URL
- **"Authentication failed"**: Verify database credentials
- **"Schema not found"**: Run `npm run db:push`

### Quick Fixes:
```bash
# Reset database schema
npm run db:push

# Check environment variables
echo $DATABASE_URL

# Restart application
npm run dev
```

## Success Indicators

When properly configured, you should see:
- ✅ No database connection errors
- ✅ Thorx cosmic landing page loads
- ✅ Registration/login functionality works
- ✅ Dashboard displays with charts
- ✅ Team collaboration features active

Your Thorx platform is now ready to run in Bolt.new with full functionality!