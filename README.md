
# Health AI Advisor 🏥

A modern, AI-powered health companion web application that provides personalized health insights, tracks wellness metrics, and offers intelligent health recommendations through an intuitive interface.

## 🌟 Features

### Core Functionality
- **AI Health Assistant**: Interactive chat interface powered by Gemini AI for personalized health advice
- **Health Dashboard**: Real-time display of key health metrics (heart rate, sleep, steps, stress levels)
- **User Authentication**: Secure login system with session management
- **Personalized Settings**: Customizable user preferences including dark mode and display names
- **Health Insights**: Dedicated insights page with interactive charts and analytics
- **Responsive Design**: Modern, mobile-friendly interface with smooth animations

### Technical Features
- **Modern UI/UX**: Glass-morphism design with smooth animations and transitions
- **Session Management**: Secure authentication using sessionStorage
- **Real-time Updates**: Dynamic content updates without page refresh
- **Interactive Charts**: Health data visualization using Chart.js
- **Progressive Enhancement**: Graceful degradation for accessibility
- **Cross-platform**: Works on desktop, tablet, and mobile devices

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Vanilla JavaScript for dynamic functionality
- **Chart.js**: Interactive data visualization
- **Google Fonts**: Inter font family for modern typography

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing middleware

### AI Integration
- **Gemini AI API**: External AI service for health recommendations
- **RESTful API**: Clean API design for AI interactions

## 📁 Project Structure

```
health-ai-advisor/
├── 📄 index.html          # Main dashboard page
├── 📄 Setting.html        # User settings page
├── 📄 Setting.js          # Settings page functionality
├── 📄 Insight.html        # Health insights and analytics
├── 📄 Signup.html         # User registration page
├── 📄 script.js           # Main application logic
├── 📄 style.css           # Application styles
├── 📄 Index.js            # Node.js server
├── 📄 Data.js             # Data handling utilities
├── 📄 package.json        # Node.js dependencies
├── 📄 .replit             # Replit configuration
└── 🖼️ assets/             # Images and static files
    ├── close.png          # Modal close icon
    ├── VectorArt.png      # Application logo
    └── image_*.png        # Additional graphics
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (included in Replit environment)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features

### Installation & Setup

1. **Clone or Fork the Project**
   ```bash
   # If running locally, clone the repository
   git clone <repository-url>
   cd health-ai-advisor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm run start
   ```
   The server will start on `http://localhost:5000` (or `http://0.0.0.0:5000` in Replit)

4. **Access the Application**
   - Open your browser and navigate to the application URL
   - Click "Login" to access the full dashboard
   - Use any email/password combination for demo purposes

## 📱 Application Pages

### 1. Dashboard (`index.html`)
**Purpose**: Main landing page and health dashboard
**Features**:
- Welcome message with feature highlights
- AI chat interface for health questions
- Real-time health metrics display
- Animated metric cards with live data
- Responsive design with glassmorphism effects

**Key Elements**:
- Navigation header with login/logout functionality
- Modal-based authentication system
- AI response area with loading states
- Health metrics grid (Heart Rate, Sleep, Steps, Stress)

### 2. Settings (`Setting.html`)
**Purpose**: User preference management
**Features**:
- Display name customization
- Dark mode toggle
- Settings persistence using localStorage
- Authentication requirement check

**Configuration Options**:
- **Display Name**: Personalize how your name appears
- **Dark Mode**: Toggle between light and dark themes
- **Auto-save**: Settings saved instantly with confirmation

### 3. Insights (`Insight.html`)
**Purpose**: Health analytics and data visualization
**Features**:
- Interactive charts showing health trends
- Weekly/monthly health summaries
- Goal tracking and progress indicators
- Comparative health metrics

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The application uses:
- **Session Storage**: For login state management
- **Local Storage**: For user preferences and settings
- **External API**: Gemini AI endpoint for health advice

### Server Configuration
The Node.js server (`Index.js`) provides:
- Static file serving for the frontend
- CORS middleware for cross-origin requests
- Express.js routing for API endpoints
- Error handling and logging

### API Integration
```javascript
// AI Service Endpoint
const AI_ENDPOINT = "https://enterprise-zc5x.onrender.com/ask";

// Example API call
async function getHealthAdvice(prompt) {
  const response = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  return response.json();
}
```

## 🎨 Styling Guide

### CSS Architecture
- **CSS Custom Properties**: For consistent theming
- **Mobile-First Design**: Responsive layouts using CSS Grid and Flexbox
- **Modern Effects**: Glassmorphism, shadows, and smooth transitions
- **Dark Mode Support**: Complete dark theme implementation

### Key Style Features
```css
:root {
  --primary-color: #2b7a78;
  --secondary-color: #3aafa9;
  --accent-color: #def2f1;
  --gradient-primary: linear-gradient(135deg, #2b7a78, #3aafa9);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.1);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Animation Classes
- `.fade-in`: Smooth fade-in effect
- `.slide-up`: Upward slide animation
- `.loading`: Pulsing loading indicator
- `.shake`: Error feedback animation

## 🔒 Security Features

### Authentication System
- **Session-based Authentication**: Using sessionStorage for secure login state
- **Frontend Validation**: Input validation and sanitization
- **Error Handling**: Secure error messages without sensitive data exposure
- **CORS Protection**: Proper cross-origin request handling

### Data Protection
- **Local Storage**: User preferences stored locally (non-sensitive data only)
- **No Password Storage**: Demo authentication without persistent credentials
- **Secure Headers**: Proper HTTP headers for security

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login/logout functionality works correctly
- [ ] AI chat responds to health questions
- [ ] Settings save and persist across sessions
- [ ] Dark mode toggles properly
- [ ] Responsive design works on mobile devices
- [ ] All navigation links function correctly
- [ ] Health metrics display properly
- [ ] Error handling works for invalid inputs

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Replit Deployment
The application is configured for Replit with:
- **Automatic deployment**: Configured in `.replit` file
- **Port forwarding**: Port 5000 mapped to web access
- **Workflow setup**: "Start Health AI Server" workflow for easy running

### Production Considerations
- **SSL/HTTPS**: Ensure secure connections in production
- **API Rate Limiting**: Implement rate limiting for AI endpoints
- **Error Monitoring**: Add comprehensive error tracking
- **Performance Optimization**: Implement caching and optimization

## 🔧 Troubleshooting

### Common Issues

**1. AI Chat Not Working**
- Check internet connection
- Verify AI API endpoint is accessible
- Check browser console for errors

**2. Settings Not Saving**
- Ensure localStorage is enabled in browser
- Check for browser privacy settings blocking storage

**3. Login Issues**
- Clear browser cache and cookies
- Verify sessionStorage functionality
- Try in incognito/private browsing mode

**4. Styling Issues**
- Ensure all CSS files are loading correctly
- Check for conflicting browser extensions
- Verify font loading from Google Fonts

### Debug Mode
Add `?debug=true` to the URL for additional console logging:
```javascript
const DEBUG_MODE = new URLSearchParams(window.location.search).get('debug') === 'true';
if (DEBUG_MODE) console.log('Debug information...');
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Submit a pull request

### Code Style Guidelines
- Use consistent indentation (2 spaces)
- Follow semantic HTML practices
- Use modern JavaScript features (ES6+)
- Maintain accessibility standards
- Document new features thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Phillip Chou** - Health AI Advisor Developer

## 🙏 Acknowledgments

- **Replit**: For hosting and development environment
- **Google Fonts**: For the Inter font family
- **Gemini AI**: For intelligent health recommendations
- **Chart.js**: For data visualization capabilities

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review browser console for error messages

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Active Development  

🌟 **Star this repository if you find it helpful!**
