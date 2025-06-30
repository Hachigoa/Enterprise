# Health Advisor Application

## Overview

This is a modern health tracking application that combines AI-powered insights with comprehensive health data monitoring. The application features a React frontend with TypeScript, an Express.js backend, and integrates with Google's Gemini AI for intelligent health recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store
- **API Structure**: RESTful endpoints with proper error handling

### Key Features
- **AI Health Assistant**: Google Gemini integration for personalized health advice
- **Health Data Tracking**: Heart rate, steps, sleep duration, and stress levels
- **User Authentication**: Secure login/signup with session management
- **Real-time Chat**: AI-powered health conversations
- **Data Visualization**: Charts and insights for health trends
- **Dark Mode Support**: User preference-based theming
- **Responsive Design**: Mobile-first approach with desktop optimization

## Key Components

### Database Schema
- **Users**: Authentication and profile information
- **User Preferences**: Dark mode, notifications, and sync settings
- **Health Data**: Daily health metrics with timestamps
- **Chat Messages**: AI conversation history

### Authentication System
- Session-based authentication with secure password handling
- User registration with email validation
- Profile management with customizable display names

### AI Integration
- Google Gemini API for health advice and recommendations
- Context-aware responses based on user health data
- Chat history persistence for continuous conversations

### Health Monitoring
- Daily health metrics tracking (heart rate, steps, sleep, stress)
- Historical data visualization and trends
- Health score calculation based on multiple factors

## Data Flow

1. **User Authentication**: Users sign up/login through secure forms
2. **Health Data Input**: Manual entry or potential future device integration
3. **AI Processing**: Health data analyzed by Gemini AI for insights
4. **Data Storage**: All information persisted in PostgreSQL database
5. **Real-time Updates**: React Query ensures fresh data across components
6. **Responsive UI**: Tailwind CSS provides consistent styling across devices

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI components
- **chart.js**: Data visualization
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- Vite development server for frontend hot reload
- tsx for backend TypeScript execution
- Concurrent development with proper proxy setup

### Production Build
- Frontend: Vite builds optimized static assets
- Backend: esbuild bundles server code for Node.js execution
- Database: Drizzle migrations for schema management

### Environment Configuration
- Database URL configuration for different environments
- API key management for Google Gemini
- Session secret configuration for security

## Recent Changes
- June 30, 2025: Formatted project for GitHub deployment
  - Added comprehensive README.md with installation and deployment instructions
  - Created LICENSE file with MIT license
  - Added .env.example for environment variable setup
  - Enhanced .gitignore for proper file exclusions
  - Created CONTRIBUTING.md for contributor guidelines
  - Added GitHub Actions workflow for automated deployment
  - Integrated GitHub secrets for GEMINI_API_KEY
  - Removed temporary attached assets files
  - Project is now ready for GitHub upload and public deployment

## Changelog
- June 30, 2025: Initial setup and complete GitHub formatting

## User Preferences

Preferred communication style: Simple, everyday language.
GitHub Integration: GEMINI_API_KEY configured as repository secret.
Deployment Target: Render platform with GitHub integration.
Project Level: Year 12 student project (appropriate complexity level).