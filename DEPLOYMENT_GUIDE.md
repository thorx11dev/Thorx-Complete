# Deployment Guide for Thorx Platform

## Replit Deployment

### Prerequisites
- Replit account
- GitHub repository set up (see `GIT_SETUP_GUIDE.md`)
- Environment variables configured

### Step-by-Step Deployment

1. **Import from GitHub:**
   - Go to Replit.com
   - Click "Create Repl"
   - Choose "Import from GitHub"
   - Enter: `https://github.com/thorx11dev/Thorx-Platform.git`

2. **Configure Environment Variables:**
   In the Replit Secrets tab, add:
   ```
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=support@thorx.live
   EMAIL_PASS=your_email_password
   EMAIL_HOST=mail.privateemail.com
   EMAIL_PORT=587
   ```

3. **Initialize Database:**
   ```bash
   npm run db:push
   ```

4. **Start the Application:**
   ```bash
   npm run dev
   ```

5. **Deploy to Production:**
   - Click the "Deploy" button in Replit
   - Choose your deployment settings
   - Your app will be available at `https://your-repl-name.your-username.repl.co`

## Alternative Deployment Options

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set start command: `npm run start`

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Configure environment variables
3. Railway will automatically detect and deploy your Node.js app

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-jwt-key` |
| `EMAIL_USER` | SMTP username | `support@thorx.live` |
| `EMAIL_PASS` | SMTP password | `your-email-password` |
| `EMAIL_HOST` | SMTP host | `mail.privateemail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `NODE_ENV` | Environment mode | `production` |

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection is working
- [ ] Email service is functional
- [ ] User registration and login work
- [ ] All API endpoints respond correctly
- [ ] SSL certificate is configured
- [ ] Domain is properly configured (if custom domain)

## Monitoring and Maintenance

- Monitor application logs for errors
- Set up uptime monitoring
- Regular database backups
- Update dependencies monthly
- Monitor email delivery rates