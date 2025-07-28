# Thorx Platform - Bolt.new Transfer Checklist

## Pre-Transfer Verification ✅
- [x] All performance issues resolved
- [x] No critical errors in application
- [x] Authentication system working
- [x] All pages rendering correctly
- [x] Database schema stable
- [x] Charts and visualizations functional
- [x] Mobile responsiveness confirmed
- [x] Role-based access control working

## Essential Files to Transfer (75+ files)

### Root Configuration (8 files)
- [ ] `package.json` - Dependencies and scripts
- [ ] `package-lock.json` - Dependency lock file
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `vite.config.ts` - Build tool configuration
- [ ] `tailwind.config.ts` - CSS framework configuration
- [ ] `postcss.config.js` - CSS processing
- [ ] `drizzle.config.ts` - Database configuration
- [ ] `components.json` - UI component configuration

### Backend Files (5 files)
- [ ] `server/index.ts` - Express server setup
- [ ] `server/routes.ts` - API routes
- [ ] `server/storage.ts` - Database operations
- [ ] `server/db.ts` - Database connection
- [ ] `server/vite.ts` - Vite integration

### Shared Schema (1 file)
- [ ] `shared/schema.ts` - Database schema and types

### Frontend Core (4 files)
- [ ] `client/index.html` - HTML entry point
- [ ] `client/src/main.tsx` - React entry point
- [ ] `client/src/App.tsx` - Main app component
- [ ] `client/src/index.css` - Global styles

### Pages (22 files)
- [ ] `client/src/pages/LandingPage.tsx`
- [ ] `client/src/pages/AuthPage.tsx`
- [ ] `client/src/pages/Dashboard_Simple.tsx`
- [ ] `client/src/pages/EarningsInterface.tsx`
- [ ] `client/src/pages/WorkPortal.tsx`
- [ ] `client/src/pages/PayoutSystem.tsx`
- [ ] `client/src/pages/SettingsHub.tsx`
- [ ] `client/src/pages/AboutPage.tsx`
- [ ] `client/src/pages/ContactPage.tsx`
- [ ] `client/src/pages/FeaturesPage.tsx`
- [ ] `client/src/pages/HelpCenterPage.tsx`
- [ ] `client/src/pages/BlogPage.tsx`
- [ ] `client/src/pages/BlogPostPage.tsx`
- [ ] `client/src/pages/UpdatesPage.tsx`
- [ ] `client/src/pages/TeamDashboard.tsx`
- [ ] `client/src/pages/TeamLoginPage.tsx`
- [ ] `client/src/pages/TeamHubPage.tsx`
- [ ] `client/src/pages/UserCarePage.tsx`
- [ ] `client/src/pages/InboxPage.tsx`
- [ ] `client/src/pages/LinkagePage.tsx`
- [ ] `client/src/pages/DigitalMarketPage.tsx`
- [ ] `client/src/pages/LandingPageBackup.tsx`

### Components (17+ files)
- [ ] `client/src/components/Navbar.tsx`
- [ ] `client/src/components/TeamNavbar.tsx`
- [ ] `client/src/components/TeamSidebar.tsx`
- [ ] `client/src/components/AuthProvider.tsx`
- [ ] `client/src/components/TeamAuthProvider.tsx`
- [ ] `client/src/components/ThemeProvider.tsx`
- [ ] `client/src/components/ThemeSwitcher.tsx`
- [ ] `client/src/components/ProtectedRoute.tsx`
- [ ] `client/src/components/TeamProtectedRoute.tsx`
- [ ] `client/src/components/ThorxLogo.tsx`
- [ ] `client/src/components/ThorxBrandVariants.tsx`
- [ ] `client/src/components/ThorxEmailLogo.tsx`
- [ ] `client/src/components/AnimatedLogo.tsx`
- [ ] `client/src/components/TransactionError.tsx`
- [ ] `client/src/components/analytics/RealTimeAnalytics.tsx`
- [ ] `client/src/components/analytics/ChartVisibilityAnalysis.tsx`
- [ ] `client/src/components/analytics/MobileLayoutAnalysis.tsx`

### Hooks & Utilities (7 files)
- [ ] `client/src/hooks/useAuth.ts`
- [ ] `client/src/hooks/useTeamAuth.ts`
- [ ] `client/src/hooks/useTheme.ts`
- [ ] `client/src/hooks/use-toast.ts`
- [ ] `client/src/lib/queryClient.ts`
- [ ] `client/src/utils/emailValidation.ts`
- [ ] `client/src/vite-env.d.ts`

### Assets (2+ files)
- [ ] `client/src/assets/thorx-logo.jpg`
- [ ] `attached_assets/` (optional user files)

## Bolt.new Setup Steps

### 1. Initial Setup
- [ ] Create new Bolt.new project
- [ ] Upload/paste all essential files
- [ ] Maintain exact folder structure
- [ ] Copy package.json dependencies

### 2. Environment Configuration
- [ ] Set up environment variables
- [ ] Configure DATABASE_URL
- [ ] Set NODE_ENV=development

### 3. Installation & Testing
- [ ] Run `npm install`
- [ ] Verify no dependency errors
- [ ] Test `npm run dev`
- [ ] Check server starts on port 5000
- [ ] Verify frontend loads correctly

### 4. Database Setup
- [ ] Configure Neon Database connection
- [ ] Run `npm run db:push` for schema
- [ ] Test database connectivity
- [ ] Verify authentication works

### 5. Feature Verification
- [ ] Test landing page loads
- [ ] Verify registration/login works
- [ ] Check dashboard functionality
- [ ] Test earnings interface with new chart
- [ ] Verify team authentication
- [ ] Check responsive design
- [ ] Test all navigation links

### 6. Final Validation
- [ ] Test all user flows
- [ ] Verify cosmic theme consistency
- [ ] Check mobile responsiveness
- [ ] Validate chart functionality
- [ ] Test role-based access
- [ ] Confirm no console errors

## Post-Transfer Tasks
- [ ] Update any hardcoded URLs
- [ ] Configure production database
- [ ] Set up deployment environment
- [ ] Test production build
- [ ] Update documentation

## Key Features to Verify
- **Cosmic Weekly Journey Chart**: New unique chart in Earnings > Breakdown
- **Role-based Access**: CEO, Marketing, Social Media, Admin roles
- **Mobile Responsive**: All pages work on mobile devices
- **Authentication**: User and team member login systems
- **Dark Theme**: Consistent cosmic dark mode throughout
- **Navigation**: Main nav, team nav, and sidebar work properly

## Dependencies Count
- **Total NPM packages**: 100+ packages
- **Core dependencies**: ~40 packages
- **Dev dependencies**: ~20 packages
- **Type definitions**: ~25 packages

## Estimated Transfer Time
- File transfer: 15-30 minutes
- Setup and testing: 30-60 minutes
- Total: 1-1.5 hours

---

**Status**: Ready for transfer - All files organized and functional ✅