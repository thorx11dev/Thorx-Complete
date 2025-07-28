# Essential Files for Bolt.new Transfer

## Core Configuration (8 files)
1. `package.json` - Dependencies and npm scripts
2. `tsconfig.json` - TypeScript configuration
3. `vite.config.ts` - Build tool configuration
4. `tailwind.config.ts` - CSS framework configuration
5. `postcss.config.js` - CSS processing
6. `drizzle.config.ts` - Database ORM configuration
7. `components.json` - UI component library setup
8. `.env` - Environment variables (DATABASE_URL)

## Frontend Application (65+ files)
### Main Application Files
- `client/index.html` - HTML entry point
- `client/src/main.tsx` - React entry point
- `client/src/App.tsx` - Main app component
- `client/src/index.css` - Global styles and Tailwind imports

### Pages (20 files)
- `client/src/pages/LandingPage.tsx` - Homepage with cosmic design
- `client/src/pages/AuthPage.tsx` - Registration/login
- `client/src/pages/Dashboard_Simple.tsx` - User dashboard
- `client/src/pages/EarningsInterface.tsx` - Earnings analytics
- `client/src/pages/WorkPortal.tsx` - Task management
- `client/src/pages/SettingsHub.tsx` - User settings
- `client/src/pages/PayoutSystem.tsx` - Payment processing
- `client/src/pages/AboutPage.tsx` - About information
- `client/src/pages/ContactPage.tsx` - Contact form
- `client/src/pages/FeaturesPage.tsx` - Feature showcase
- `client/src/pages/HelpCenterPage.tsx` - Support center
- `client/src/pages/BlogPage.tsx` - Blog listing
- `client/src/pages/BlogPostPage.tsx` - Individual blog posts
- `client/src/pages/UpdatesPage.tsx` - Platform updates
- Team Pages:
  - `client/src/pages/TeamDashboard.tsx`
  - `client/src/pages/TeamLoginPage.tsx`
  - `client/src/pages/UserCarePage.tsx`
  - `client/src/pages/InboxPage.tsx`
  - `client/src/pages/LinkagePage.tsx`
  - `client/src/pages/DigitalMarketPage.tsx`

### Components (25+ files)
- `client/src/components/Navbar.tsx` - Main navigation
- `client/src/components/TeamNavbar.tsx` - Team navigation
- `client/src/components/TeamSidebar.tsx` - Team sidebar
- `client/src/components/AuthProvider.tsx` - Authentication context
- `client/src/components/TeamAuthProvider.tsx` - Team auth context
- `client/src/components/ThemeProvider.tsx` - Theme management
- `client/src/components/ThemeSwitcher.tsx` - Theme toggle
- `client/src/components/ProtectedRoute.tsx` - Route protection
- `client/src/components/TeamProtectedRoute.tsx` - Team route protection
- `client/src/components/ThorxLogo.tsx` - Brand logo component
- `client/src/components/ThorxBrandVariants.tsx` - Logo variations
- `client/src/components/AnimatedLogo.tsx` - Animated logo
- Analytics Components:
  - `client/src/components/analytics/RealTimeAnalytics.tsx`
  - `client/src/components/analytics/ChartVisibilityAnalysis.tsx`
  - `client/src/components/analytics/MobileLayoutAnalysis.tsx`

### Hooks & Utilities (8 files)
- `client/src/hooks/useAuth.ts` - Authentication hook
- `client/src/hooks/useTeamAuth.ts` - Team authentication hook
- `client/src/hooks/useTheme.ts` - Theme management hook
- `client/src/hooks/use-toast.ts` - Toast notifications
- `client/src/lib/queryClient.ts` - React Query setup
- `client/src/utils/emailValidation.ts` - Email validation logic
- `client/src/vite-env.d.ts` - Vite type definitions

### Assets
- `client/src/assets/thorx-logo.jpg` - Logo image
- `attached_assets/` - User uploaded files (optional)

## Backend Application (5 files)
- `server/index.ts` - Express server setup and middleware
- `server/routes.ts` - API endpoints and route handlers
- `server/storage.ts` - Database operations interface
- `server/db.ts` - Database connection setup
- `server/vite.ts` - Vite development integration

## Shared Code (1 file)
- `shared/schema.ts` - Database schema and type definitions

## Documentation Files (Optional but Recommended)
- `README.md` - Project documentation
- `replit.md` - Development history and preferences
- `DEVELOPMENT.md` - Development guidelines
- `PROJECT_SUMMARY.md` - Project overview
- `BOLT_TRANSFER_GUIDE.md` - This transfer guide
- `ESSENTIAL_FILES_LIST.md` - This file list

## Total Essential Files: ~110 files
- Configuration: 8 files
- Frontend: 65+ files  
- Backend: 5 files
- Shared: 1 file
- Documentation: 6 files (optional)

## Minimum Transfer Requirements
To get the application running in Bolt.new, you need:
1. All configuration files (8)
2. All backend files (5)
3. Shared schema (1)
4. All frontend pages and components (65+)
5. Package.json with dependencies

The application will be fully functional with these essential files.