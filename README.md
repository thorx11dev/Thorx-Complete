# Thorx - Cosmic Earning Platform

A sophisticated full-stack web application with advanced email verification and access control systems, built for the cosmic age of digital income.

## 🚀 Key Features

- **Advanced Email Verification**: Comprehensive email validation with real-time verification status polling
- **Access Control System**: Visual feedback with red underlines, lock icons, and tooltips for restricted navigation
- **Team Management**: Role-based access control with JWT authentication
- **Cosmic UI Design**: Modern dark theme with animated clouds, 3D elements, and professional branding
- **Performance Optimized**: 100x speed improvements with GPU acceleration and caching
- **Mobile Responsive**: Optimized for all devices with consistent 2-column mobile layouts

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom cosmic design system
- **Framer Motion** for smooth animations
- **TanStack Query** for server state management
- **React Three Fiber** for 3D graphics
- **Wouter** for client-side routing

### Backend
- **Node.js** with Express.js
- **PostgreSQL** with Neon Database (serverless)
- **Drizzle ORM** for type-safe database operations
- **JWT Authentication** with secure token storage
- **Professional Email Service** with Nodemailer

### UI Components
- **Shadcn/ui** components with Radix UI primitives
- **Lucide React** icons
- **Custom ThorxLogo** SVG component
- **Responsive design** with mobile-first approach

## 📁 Project Structure

```
thorx/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── 3d/            # 3D animated components
│   │   │   ├── analytics/     # Analytics components
│   │   │   └── icons/         # Icon components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility libraries
│   │   ├── pages/             # Page components
│   │   ├── performance/       # Performance optimization
│   │   └── utils/             # Utility functions
│   └── index.html             # Main HTML file
├── server/                    # Backend Express application
│   ├── routes/                # API route handlers
│   ├── emailService.production.ts  # Production email service
│   ├── storage.ts             # Database storage interface
│   └── index.ts               # Server entry point
├── shared/                    # Shared TypeScript types
│   └── schema.ts              # Database schema and types
├── attached_assets/           # Project assets and documentation
├── components.json            # Shadcn/ui configuration
├── drizzle.config.ts         # Database configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── replit.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (Neon Database recommended)
- Git for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/thorx11dev/Thorx-Platform.git
   cd Thorx-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@domain.com
   EMAIL_PASS=your_email_password
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   ```

4. **Initialize the database:**
   ```bash
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`
- Email service credentials (for verification emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thorx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```env
   DATABASE_URL=your_neon_database_url
   EMAIL_APP_PASSWORD=your_email_service_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## 📧 Email Verification System

The application includes a comprehensive email verification system:

### Features
- **Real-time email validation** with quality scoring
- **Professional email branding** with Thorx logo
- **Instant delivery** to all major email providers
- **Verification status polling** for real-time updates
- **Access control** with visual feedback for unverified users

### Components
- `EmailVerificationPrompt` - Dashboard header prompt
- `RestrictedNavigation` - Navigation access control
- `EmailVerificationPage` - Dedicated verification page
- `useEmailVerificationStatus` - Real-time status hook

## 🔐 Authentication & Access Control

### User Authentication
- JWT-based authentication with secure token storage
- Password strength validation
- Session persistence with localStorage
- Protected routes with automatic redirection

### Team Management
- Role-based access control (CEO, Marketing, Social Media, Admin)
- Team dashboard with user management
- Secure password hashing with bcrypt
- Team chat and collaboration features

### Access Control Features
- Visual feedback with red underlines and lock icons
- Hover tooltips explaining restrictions
- Real-time verification status checking
- Automatic navigation blocking for unverified users

## 🎨 Design System

### Cosmic Theme
- **Dark-first design** with cosmic-inspired elements
- **Animated clouds** with parallax scrolling
- **Professional glass morphism** effects
- **3D animated elements** with React Three Fiber

### Color Palette
- **Nebula Blue**: #5A67D8
- **Galactic Purple**: #805AD5
- **Cosmic Teal**: #38B2AC
- **Slate backgrounds**: Various shades for depth

### Typography
- Custom font system with CSS variables
- Responsive sizing with mobile-first approach
- Consistent spacing and hierarchy

## 📱 Mobile Optimization

- **Responsive design** with 2-column mobile layouts
- **Touch-friendly** interactions and navigation
- **Optimized performance** for mobile devices
- **Consistent experience** across all screen sizes

## 🔧 Database Schema

### Core Tables
- `users` - User authentication and profiles
- `tasks` - Task management system
- `payouts` - Payment processing
- `team_members` - Team management
- `contact_messages` - Contact form submissions
- `team_chats` - Team communication

### Email Verification
- `email_verification_tokens` - JWT-based verification tokens
- Automatic cleanup of expired tokens
- Email verification status tracking

## 🚀 Performance Optimizations

- **100x speed improvements** with GPU acceleration
- **Lazy loading** for heavy 3D components
- **IndexedDB caching** for offline support
- **Bundle optimization** with code splitting
- **Memory management** with React optimization patterns

## 🔒 Security Features

- **JWT authentication** with secure token handling
- **Password hashing** with bcrypt
- **Email verification** requirements
- **Access control** with role-based permissions
- **Secure email delivery** with TLS encryption

## 📞 Support & Contact

- **Email Support**: support@thorx.live
- **WhatsApp Community**: [Join our community](https://chat.whatsapp.com/J7Jvr6XBYs82rlF9RGGlTa)
- **Help Center**: Available in the application

## 🛡️ License

This project is licensed under the MIT License.

## 🧑‍💻 Development Team

- **Aon Imran** - CEO & Lead Developer
- **Zain Abbas** - Marketing Specialist
- **Zohaib Nadeem** - Social Media Manager
- **Prof. Muhammad Jahangeer** - Technical Admin

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Changelog

View the detailed changelog in [replit.md](./replit.md) for complete development history and architectural decisions.

---

**Built with ❤️ for the cosmic digital universe**