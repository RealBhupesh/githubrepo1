# Focus Timer - Advanced Pomodoro Timer

An advanced, feature-rich Pomodoro timer built with React, TypeScript, and Vite. Boost your productivity with customizable themes, beautiful backgrounds, and comprehensive statistics tracking.

![Focus Timer](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop)

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/focus-timer)

**Or via CLI:**
```bash
npm i -g vercel && vercel --prod
```

**Live in under 2 minutes!** See [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) for complete guide.

## Features

### Core Timer Functionality
- **Pomodoro Technique**: Work in focused 25-minute sessions with short and long breaks
- **Customizable Durations**: Adjust work and break periods to fit your workflow
- **Auto-start Options**: Automatically start breaks or work sessions
- **Session Counter**: Track your current session number
- **Visual & Audio Notifications**: Stay informed when sessions complete

### Customization
- **6 Beautiful Themes**: Choose from Sunset, Ocean, Forest, Midnight, Cherry, and Lavender
- **Background Images**: Select from stunning preset images or use your own custom URL
- **Theme Transitions**: Smooth animations between theme changes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Productivity Features
- **Statistics Tracking**:
  - Total pomodoros completed
  - Total breaks taken
  - Total focus time
  - Daily session count
  - Average sessions per day
- **Local Storage**: Your settings and statistics persist across sessions
- **Browser Notifications**: Get notified even when the app is in the background
- **Sound Alerts**: Customizable volume with pleasant notification sounds

### User Experience
- **Keyboard Shortcuts**:
  - `Space` - Start/Pause timer
  - `R` - Reset current timer
  - `S` - Skip to next session
  - `C` - Open settings
  - `F` - Toggle fullscreen
  - `Esc` - Close panels/Exit fullscreen
- **Fullscreen Mode**: Distraction-free focus environment
- **Smooth Animations**: Polished UI with delightful transitions
- **Accessibility**: Keyboard navigation and focus indicators

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd githubrepo1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Usage

### Getting Started
1. Select your preferred timer mode: Pomodoro, Short Break, or Long Break
2. Click "Start" or press `Space` to begin
3. Focus on your work until the timer completes
4. Take breaks when prompted
5. Track your progress in the Statistics panel

### Customizing Settings
1. Click the Settings button (gear icon) or press `C`
2. Adjust timer durations for each mode
3. Configure auto-start preferences
4. Enable/disable sound and notifications
5. Choose your favorite theme
6. Select a background image or use a custom URL

### Viewing Statistics
1. Click the "Stats" button in the header
2. View your daily and total session counts
3. See your total focus time
4. Track your productivity trends

## Project Structure

```
src/
├── components/         # React components
│   ├── TimerDisplay.tsx
│   ├── ModeSelector.tsx
│   ├── TimerControls.tsx
│   ├── SettingsPanel.tsx
│   ├── StatisticsPanel.tsx
│   └── FullscreenButton.tsx
├── hooks/             # Custom React hooks
│   ├── useTimer.ts
│   ├── useKeyboardShortcuts.ts
│   └── useFullscreen.ts
├── utils/             # Utility functions
│   ├── constants.ts
│   ├── storage.ts
│   └── helpers.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Main application component
├── App.css            # Application styles
├── index.css          # Global styles
└── main.tsx           # Application entry point
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Web Audio API** - Sound generation
- **Notification API** - Browser notifications
- **Local Storage API** - Data persistence

## Production Features

### 🚀 Performance
- **React optimization**: Memoized components and callbacks for optimal rendering
- **Code splitting ready**: Dynamic imports support for lazy loading
- **Build optimization**: Minification, tree shaking, and asset optimization
- **Fast loading**: Optimized bundle size (69KB gzipped)

### 📱 Progressive Web App (PWA)
- **Installable**: Add to home screen on mobile and desktop
- **Offline support**: Service worker caching for offline functionality
- **App shortcuts**: Quick actions from home screen
- **Native experience**: Standalone mode with custom theme colors

### 🔒 Security
- **Content Security Policy**: XSS protection and frame options
- **Secure headers**: X-Content-Type-Options, X-Frame-Options
- **HTTPS ready**: Secure referrer policy configured
- **Input validation**: Sanitized user inputs

### ♿ Accessibility (WCAG 2.1 AA Compliant)
- **ARIA labels**: Comprehensive screen reader support
- **Keyboard navigation**: Full keyboard control (Space, R, S, C, F, Esc)
- **Focus management**: Proper focus indicators and tab order
- **Semantic HTML**: Proper heading hierarchy and landmarks

### 🎯 User Experience
- **Toast notifications**: Non-intrusive user feedback
- **Error boundaries**: Graceful error handling with recovery options
- **Loading states**: Smooth transitions and feedback
- **Responsive design**: Mobile-first approach with breakpoints

### 📊 Analytics & Monitoring
- **Analytics ready**: Google Analytics 4 integration structure
- **Event tracking**: User interaction and conversion tracking
- **Error tracking**: Sentry-ready error logging structure
- **Performance monitoring**: Web Vitals tracking ready

### 🌐 SEO Optimized
- **Meta tags**: Complete Open Graph and Twitter Card tags
- **Structured data ready**: Schema.org markup structure
- **Sitemap ready**: robots.txt configured
- **Social sharing**: Optimized preview cards for social media

## Advanced Features

### Timer Logic
- Automatic progression through pomodoro cycles
- Configurable long break intervals (every N pomodoros)
- Pause and resume functionality
- Skip to next session
- Reset current timer

### Persistence
All settings and statistics are automatically saved to browser local storage:
- Timer preferences
- Selected theme and background
- Sound and notification settings
- Completed sessions
- Total focus time

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers (1920px and above)
- Laptops (1024px - 1920px)
- Tablets (768px - 1024px)
- Mobile phones (320px - 768px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

Note: Browser notifications require user permission.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### ESLint Configuration

The project uses ESLint with TypeScript support. To customize the linting rules, modify `eslint.config.js`.

## Deployment

### Vercel (Recommended) - Zero Configuration

**Method 1: CLI (2 minutes)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login (opens browser)
vercel login

# Deploy to production
vercel --prod
```

**Method 2: GitHub Integration**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repo
5. Click "Deploy"

**What You Get Automatically:**
- ✅ HTTPS/SSL certificate
- ✅ Global CDN (300+ locations)
- ✅ Automatic compression (Gzip/Brotli)
- ✅ Edge caching
- ✅ Preview deployments for every PR
- ✅ Built-in analytics
- ✅ Zero downtime deployments
- ✅ Instant rollbacks

**Complete Vercel Guide:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

### Other Platforms

**Netlify**
```bash
npm run build
# Upload dist/ folder or connect GitHub
```

**AWS S3 + CloudFront**
```bash
npm run build
# Upload dist/ to S3 bucket
```

**Docker**
```bash
docker build -t focus-timer .
docker run -p 80:80 focus-timer
```

### Environment Variables (Optional)

For analytics and monitoring, add to Vercel dashboard or `.env.production`:

```bash
# Analytics (Optional)
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Error Tracking (Optional)
VITE_ENABLE_ERROR_REPORTING=true
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# App Info
VITE_APP_NAME=Focus Timer
VITE_APP_VERSION=1.0.0
```

### Production Checklist

- ✅ PWA manifest configured
- ✅ Service worker ready
- ✅ Error boundaries implemented
- ✅ Analytics structure in place
- ✅ SEO optimized
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ Performance optimized (69KB gzipped)
- ✅ Security headers configured
- ✅ Vercel configuration ready

**Deployment Guides:**
- Complete guide: [PRODUCTION.md](PRODUCTION.md)
- Vercel-specific: [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by the Pomodoro Technique® developed by Francesco Cirillo
- Background images from Unsplash
- Icons from Lucide React

## Future Enhancements

Potential features for future releases:
- Task management integration
- Pomodoro history calendar
- Export statistics to CSV
- Cloud sync across devices
- Ambient background sounds
- Achievement system
- Integration with productivity apps
- Multiple timer profiles
- Team collaboration features

---

Built with ❤️ using React + TypeScript + Vite
