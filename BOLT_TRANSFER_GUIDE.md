# Thorx Platform - Bolt.new Transfer Guide

## Project Overview
Thorx is a modern cosmic-themed earning platform with React frontend, Node.js backend, and PostgreSQL database. The application features team collaboration, role-based access control, and advanced data visualization.

## Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Shadcn/ui + Radix UI

## File Structure for Bolt.new Transfer

### Root Configuration Files
```
package.json              # Dependencies and scripts
tsconfig.json            # TypeScript configuration
vite.config.ts           # Vite build configuration
tailwind.config.ts       # Tailwind CSS configuration
postcss.config.js        # PostCSS configuration
drizzle.config.ts        # Database configuration
components.json          # Shadcn/ui configuration
```

### Essential Folders
```
client/                  # Frontend React application
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── utils/          # Helper utilities
│   ├── assets/         # Static assets
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles

server/                  # Backend Node.js application
├── index.ts            # Express server setup
├── routes.ts           # API routes
├── storage.ts          # Database operations
├── db.ts               # Database connection
└── vite.ts             # Vite integration

shared/                  # Shared types and schemas
└── schema.ts           # Database schema with Drizzle

attached_assets/         # User uploaded assets
```

## Key Dependencies

### Production Dependencies
```json
{
  "@neondatabase/serverless": "PostgreSQL connectivity",
  "drizzle-orm": "Type-safe ORM",
  "express": "Backend framework",
  "react": "Frontend framework",
  "framer-motion": "Animations",
  "@radix-ui/react-*": "UI primitives",
  "tailwindcss": "CSS framework",
  "wouter": "React routing",
  "@tanstack/react-query": "Server state management",
  "recharts": "Chart components",
  "lucide-react": "Icons"
}
```

### Development Dependencies
```json
{
  "vite": "Build tool",
  "typescript": "Type checking",
  "@types/*": "Type definitions",
  "drizzle-kit": "Database migrations",
  "autoprefixer": "CSS processing"
}
```

## Environment Variables Required
```
DATABASE_URL=postgresql://...
NODE_ENV=development
```

## Database Setup
1. The application uses Neon Database (serverless PostgreSQL)
2. Schema is defined in `shared/schema.ts` using Drizzle ORM
3. Run migrations with: `npm run db:push`

## Build Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run db:push     # Push database schema
```

## Important Features
- **Authentication**: JWT-based with team member support
- **Role-based Access**: CEO, Marketing, Social Media, Admin roles
- **Responsive Design**: Mobile-first with cosmic theme
- **Charts & Analytics**: Advanced data visualization
- **Email System**: Professional email templates
- **Performance Optimized**: Fast loading with modern techniques

## Transfer Checklist
- [ ] Copy all source files maintaining folder structure
- [ ] Install dependencies with `npm install`
- [ ] Set up environment variables
- [ ] Configure database connection
- [ ] Test development server with `npm run dev`
- [ ] Verify all pages and functionality work
- [ ] Check responsive design on mobile

## Notes
- The application is fully functional with no critical errors
- All performance optimization issues have been resolved
- Database schema is stable and production-ready
- Email verification system has been removed for simplicity
- All components use modern React patterns with TypeScript