# Development Documentation

## 🏗️ Architecture Overview

Thorx follows a modern full-stack architecture with clear separation of concerns:

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized production builds
- **Tailwind CSS** with custom cosmic design system
- **Component-based architecture** with reusable UI components
- **Custom hooks** for state management and API interactions
- **Performance optimizations** with lazy loading and memoization

### Backend Architecture
- **Node.js** with Express.js framework
- **RESTful API** design with consistent error handling
- **JWT authentication** with secure token management
- **Database abstraction** through storage interface
- **Email service** with production-ready configuration

### Database Design
- **PostgreSQL** with Neon Database (serverless)
- **Drizzle ORM** for type-safe database operations
- **Schema-first approach** with shared TypeScript types
- **Automatic migrations** with `npm run db:push`

## 🔧 Development Setup

### Prerequisites
1. Node.js (v18+)
2. PostgreSQL database
3. Email service credentials

### Environment Configuration
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email Service
EMAIL_APP_PASSWORD=your_email_app_password

# JWT
JWT_SECRET=your_jwt_secret_key
```

### Development Commands
```bash
# Start development server
npm run dev

# Database operations
npm run db:push

# Type checking
npm run check

# Build for production
npm run build
```

## 📁 Code Organization

### Component Structure
```
components/
├── 3d/                    # 3D animated components
├── analytics/             # Analytics and charts
├── icons/                 # Custom icon components
├── EmailVerificationPrompt.tsx
├── RestrictedNavigation.tsx
├── Navbar.tsx
└── ThorxLogo.tsx
```

### Page Components
```
pages/
├── LandingPage.tsx        # Public landing page
├── Dashboard.tsx          # Main dashboard
├── AuthPage.tsx           # Authentication
├── EmailVerificationPage.tsx
├── EarningsInterface.tsx
├── PayoutSystem.tsx
├── SettingsHub.tsx
└── WorkPortal.tsx
```

### Custom Hooks
```
hooks/
├── useAuth.ts             # Authentication state
├── useEmailVerificationStatus.ts
├── usePerformance.ts      # Performance monitoring
└── useTheme.ts           # Theme management
```

## 🎨 Design System

### Color System
```css
/* Primary Colors */
--nebula-blue: #5A67D8;
--galactic-purple: #805AD5;
--cosmic-teal: #38B2AC;

/* Backgrounds */
--slate-50: #f8fafc;
--slate-900: #0f172a;

/* Semantic Colors */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
```

### Typography Scale
```css
/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
```

### Spacing System
```css
/* Spacing Scale */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
--spacing-8: 2rem;
--spacing-16: 4rem;
```

## 🔐 Authentication Flow

### User Registration
1. Email validation with quality scoring
2. Password strength checking
3. Account creation with JWT token
4. Email verification token generation
5. Professional email delivery

### Email Verification
1. Token validation and expiration check
2. Database user status update
3. Real-time status polling
4. Access control enforcement

### Access Control
1. JWT token validation
2. Email verification status check
3. Navigation restriction with visual feedback
4. Role-based permissions

## 📧 Email System

### Email Service Configuration
```typescript
// Production email service
const emailConfig = {
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'support@thorx.live',
    pass: process.env.EMAIL_APP_PASSWORD
  }
};
```

### Email Templates
- **Professional branding** with Thorx logo
- **Responsive design** for all devices
- **Dark cosmic theme** matching application
- **Security indicators** and trust badges

## 🚀 Performance Optimizations

### Frontend Optimizations
- **Lazy loading** for heavy 3D components
- **React.memo** for expensive components
- **useMemo** and **useCallback** for expensive calculations
- **Code splitting** with dynamic imports

### Backend Optimizations
- **Connection pooling** for database
- **JWT token caching** for faster validation
- **Email service pooling** for better performance
- **Gzip compression** for API responses

### Database Optimizations
- **Indexed queries** for user lookups
- **Connection pooling** with Neon Database
- **Prepared statements** for security
- **Automatic cleanup** of expired tokens

## 🧪 Testing Strategy

### Unit Testing
- Component testing with React Testing Library
- Hook testing with custom test utilities
- Utility function testing with Jest

### Integration Testing
- API endpoint testing
- Database operation testing
- Email service testing

### End-to-End Testing
- User authentication flow
- Email verification process
- Navigation access control

## 🔧 Development Tools

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

### Build Tools
- **Vite** for development server
- **esbuild** for production builds
- **PostCSS** for CSS processing
- **Tailwind CSS** for styling

### Database Tools
- **Drizzle Kit** for migrations
- **Drizzle Studio** for database inspection
- **PostgreSQL** with Neon Database

## 📱 Mobile Development

### Responsive Design
- **Mobile-first** approach
- **Flexible grid** system
- **Touch-friendly** interactions
- **Optimized performance** for mobile

### Mobile-Specific Features
- **Swipe gestures** for navigation
- **Touch animations** for interactions
- **Optimized layouts** for small screens
- **Performance monitoring** for mobile

## 🔒 Security Best Practices

### Authentication Security
- **JWT tokens** with expiration
- **Password hashing** with bcrypt
- **Secure token storage** in httpOnly cookies
- **CSRF protection** for forms

### Data Security
- **Input validation** with Zod schemas
- **SQL injection prevention** with parameterized queries
- **XSS protection** with content security policy
- **Rate limiting** for API endpoints

### Email Security
- **TLS encryption** for email delivery
- **Token-based verification** with expiration
- **Professional email domain** for trust
- **Spam prevention** measures

## 🚀 Deployment

### Production Build
```bash
# Build frontend and backend
npm run build

# Start production server
npm run start
```

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=production_database_url
EMAIL_APP_PASSWORD=production_email_password
JWT_SECRET=production_jwt_secret
```

### Performance Monitoring
- **Real-time performance** tracking
- **Error monitoring** and logging
- **Database query** optimization
- **Email delivery** monitoring

## 📊 Analytics & Monitoring

### Performance Metrics
- **Load time** tracking
- **Render time** monitoring
- **Memory usage** analysis
- **GPU acceleration** metrics

### User Analytics
- **Authentication success** rates
- **Email verification** completion
- **Navigation patterns** analysis
- **Feature usage** tracking

## 🔄 Continuous Integration

### Development Workflow
1. **Feature branches** for new development
2. **Pull requests** for code review
3. **Automated testing** on push
4. **Deployment** after approval

### Code Review Process
1. **TypeScript** compilation check
2. **ESLint** code quality check
3. **Test coverage** verification
4. **Performance impact** assessment

## 📝 Documentation

### Code Documentation
- **JSDoc comments** for functions
- **TypeScript interfaces** for data structures
- **README files** for complex components
- **Architecture decisions** in replit.md

### API Documentation
- **OpenAPI** specification for endpoints
- **Request/response** examples
- **Authentication** requirements
- **Error handling** documentation

## 🎯 Future Enhancements

### Planned Features
- **WebSocket** real-time updates
- **Progressive Web App** capabilities
- **Advanced analytics** dashboard
- **Mobile app** development

### Technical Improvements
- **Microservices** architecture
- **Caching layer** with Redis
- **CDN integration** for assets
- **Advanced monitoring** with APM tools

---

This documentation provides a comprehensive overview of the Thorx development environment and best practices for maintaining and extending the application.