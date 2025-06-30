# Health Advisor - AI-Powered Health Tracking App

A modern health tracking application that combines AI-powered insights with comprehensive health data monitoring. Built with React, TypeScript, and Google's Gemini AI.

## 🌟 Features

- **AI Health Assistant**: Get personalized health advice powered by Google Gemini AI
- **Health Data Tracking**: Monitor heart rate, steps, sleep duration, and stress levels
- **User Authentication**: Secure login and registration system
- **Real-time Chat**: Interactive AI conversations about your health
- **Data Visualization**: Charts and insights for health trends
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and build
- **Tailwind CSS** with shadcn/ui components
- **TanStack React Query** for state management
- **Wouter** for routing
- **Chart.js** for data visualization

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Session-based authentication**
- **Google Gemini AI** integration

### Database
- **PostgreSQL** (Neon Database)
- **Drizzle ORM** for type-safe database operations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/health-advisor.git
cd health-advisor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_database_url
GEMINI_API_KEY=your_google_gemini_api_key
SESSION_SECRET=your_session_secret
```

**Note**: If deploying from GitHub, the `GEMINI_API_KEY` should be set as a repository secret.

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🗄️ Database Schema

The application uses the following main tables:
- **users**: User authentication and profile information
- **user_preferences**: User settings and preferences
- **health_data**: Daily health metrics and tracking data
- **chat_messages**: AI conversation history

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## 🌐 Deployment

This application is designed to be deployed on platforms like:
- **Render** (recommended)
- **Vercel**
- **Netlify**
- **Railway**

### Render Deployment

1. Connect your GitHub repository to Render
2. Set up environment variables in Render dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `GEMINI_API_KEY` - Will be automatically pulled from GitHub secrets
   - `SESSION_SECRET` - Generate a secure random string
3. Deploy as a Node.js web service

### GitHub Actions Deployment

The project is configured to work with GitHub secrets:
- `GEMINI_API_KEY` is already configured as a repository secret
- Other environment variables should be set in your deployment platform

## 🔑 API Keys Setup

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables as `GEMINI_API_KEY`

### Database Setup (Neon)
1. Create account at [Neon](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string to `DATABASE_URL`

## 🎨 UI Components

The application uses a modern design system with:
- Glassmorphism effects
- Smooth animations and transitions
- Gradient backgrounds
- Responsive layouts
- Accessible components from Radix UI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Neon Database](https://neon.tech/) for PostgreSQL hosting
- [Render](https://render.com/) for deployment platform

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### AI Chat Interface
![Chat Screenshot](./screenshots/chat.png)

### Health Analytics
![Analytics Screenshot](./screenshots/analytics.png)

---

**Note**: This is a student project demonstrating modern web development practices and AI integration.