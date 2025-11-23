# Production Deployment Guide

## Overview

This guide covers deploying the Focus Timer application to production with all enterprise-grade features enabled.

## Production Features

### 🔒 Security
- Content Security Policy (CSP) headers
- XSS Protection
- Frame Options (anti-clickjacking)
- Secure referrer policy
- HTTPS-only cookies (when implemented)

### 📱 Progressive Web App (PWA)
- Service Worker for offline functionality
- Web App Manifest for installability
- App shortcuts for quick actions
- Splash screens and icons
- Background sync (future)

### 🚀 Performance
- React component memoization
- Optimized re-renders with useCallback
- Code splitting ready
- Lazy loading capabilities
- Asset optimization with Vite
- Gzip compression
- Tree shaking

### ♿ Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML
- Color contrast compliance

### 📊 Analytics Ready
- Analytics infrastructure in place
- Event tracking structure
- Google Analytics 4 integration ready
- Sentry error tracking ready
- Custom event tracking

### 🎨 User Experience
- Toast notifications for feedback
- Error boundaries for graceful failures
- Loading states
- Smooth animations
- Responsive design
- Dark mode support via themes

## Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run build` and verify build success
- [ ] Test in production mode: `npm run preview`
- [ ] Verify all environment variables are set
- [ ] Test PWA installation
- [ ] Test offline functionality
- [ ] Run accessibility audit (Lighthouse)
- [ ] Run performance audit (Lighthouse)
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

### Environment Variables

Create a `.env.production` file:

```bash
# Required
VITE_APP_NAME=Focus Timer
VITE_APP_VERSION=1.0.0

# Optional - Analytics
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Optional - Error Tracking
VITE_ENABLE_ERROR_REPORTING=true
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Optional - API (for future features)
VITE_API_URL=https://api.yourdomain.com
```

### Build Configuration

The application is optimized for production with:

- **Minification**: JavaScript and CSS are minified
- **Tree Shaking**: Unused code is removed
- **Code Splitting**: Automatic chunk splitting
- **Asset Optimization**: Images and assets are optimized
- **Gzip Compression**: Assets are compressed

### Recommended Hosting Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Benefits:**
- Automatic HTTPS
- CDN distribution
- Instant cache invalidation
- Zero configuration

#### Netlify
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### AWS S3 + CloudFront
1. Build: `npm run build`
2. Upload `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Set up SSL certificate

#### Docker
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Post-Deployment

- [ ] Verify production URL works
- [ ] Test PWA installation from production
- [ ] Verify analytics tracking
- [ ] Set up error monitoring
- [ ] Configure DNS and SSL
- [ ] Set up CDN (if not using Vercel/Netlify)
- [ ] Configure caching headers
- [ ] Set up monitoring/uptime checks
- [ ] Submit PWA to app stores (optional)

## Performance Optimization

### Lighthouse Scores Target
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- PWA: Yes

### Optimization Tips

1. **Images**: Use WebP format with fallbacks
2. **Fonts**: Use system fonts for faster load
3. **JavaScript**: Already optimized with code splitting
4. **CSS**: Critical CSS is inlined
5. **Caching**: Configure aggressive caching for static assets

### Recommended Headers

```nginx
# nginx.conf
add_header X-Frame-Options "DENY";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";

# Content Security Policy
add_header Content-Security-Policy "default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https: data:;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com;";

# Cache Control
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

## Monitoring

### Analytics

Integrate Google Analytics 4:

```typescript
// src/utils/analytics.ts - Already set up!
// Just add your tracking ID to .env.production
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Error Tracking

Integrate Sentry:

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 1.0,
  });
}
```

### Uptime Monitoring

Recommended services:
- UptimeRobot (free)
- Pingdom
- StatusCake
- Better Uptime

## SEO Optimization

### Already Implemented
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Semantic HTML
- ✅ robots.txt
- ✅ Proper heading hierarchy

### Additional Steps
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add structured data (JSON-LD)
- [ ] Optimize meta descriptions
- [ ] Add canonical URLs

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Environment Variables**: Never commit secrets
3. **CSP**: Implement Content Security Policy
4. **Updates**: Keep dependencies updated
5. **Audit**: Regular security audits with `npm audit`

## Scaling

### Current Capacity
The app is entirely client-side and can handle unlimited users with proper CDN configuration.

### If Adding Backend
- Use load balancer (ALB, NGINX)
- Implement rate limiting
- Add Redis for caching
- Use database connection pooling
- Implement horizontal scaling

## Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### PWA Not Installing
- Verify manifest.json is accessible
- Check service-worker.js is served correctly
- Ensure HTTPS is enabled
- Check browser console for errors

### Performance Issues
- Run Lighthouse audit
- Check Network tab in DevTools
- Verify CDN is working
- Check for unnecessary re-renders

## Support

For issues or questions:
- GitHub Issues: https://github.com/yourusername/focus-timer/issues
- Documentation: See README.md

## License

See LICENSE file for details.
