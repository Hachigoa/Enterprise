# Contributing to Health Advisor

Thank you for considering contributing to Health Advisor! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Set up your environment variables (see `.env.example`)
5. Run the development server: `npm run dev`

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
Use clear and descriptive commit messages:
- `feat: add new health metric tracking`
- `fix: resolve login authentication issue`
- `docs: update README with deployment instructions`
- `style: improve responsive design for mobile`

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

### Testing
- Test all new features manually
- Ensure the application works on both desktop and mobile
- Verify authentication flows work correctly
- Test AI chat functionality if changes affect it

## Project Structure

```
health-advisor/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Express backend
├── shared/          # Shared types and schemas
└── docs/           # Documentation
```

## Areas for Contribution

- **UI/UX Improvements**: Enhance the design and user experience
- **Feature Development**: Add new health tracking features
- **Performance**: Optimize loading times and responsiveness
- **Documentation**: Improve code documentation and user guides
- **Testing**: Add automated tests
- **Accessibility**: Improve accessibility features

## Questions?

If you have questions about contributing, please open an issue or contact the maintainers.

Thank you for contributing!