# Vercel Deployment Guide

Complete guide for deploying Focus Timer to Vercel with zero configuration required.

## 🚀 Quick Deploy (Recommended)

### Method 1: Deploy with Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel (opens browser)
vercel login

# 3. Deploy to production
vercel --prod
```

That's it! Your app will be live in under 2 minutes. ✨

### Method 2: Deploy via GitHub (Recommended for Teams)

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Done!** Vercel will automatically:
   - Detect it's a Vite project
   - Install dependencies
   - Build the application
   - Deploy to production
   - Assign a URL (e.g., `focus-timer.vercel.app`)

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/focus-timer)

## ⚙️ Configuration

### Automatic Detection

Vercel automatically detects:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`
- ✅ Dev Command: `npm run dev`

No configuration needed! The `vercel.json` is already optimized.

### Environment Variables (Optional)

If you want to enable analytics or error tracking:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add these variables:

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

4. Redeploy for changes to take effect

## 🌐 Custom Domain

### Add Your Domain

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `focustimer.com`)
3. Follow DNS configuration instructions
4. Vercel automatically provisions SSL certificate

### Domain Types Supported

- **Root domain**: `example.com`
- **Subdomain**: `timer.example.com`
- **www**: `www.example.com`

DNS providers verified to work:
- Cloudflare ✅
- Namecheap ✅
- GoDaddy ✅
- Google Domains ✅
- Any DNS provider ✅

## 📊 What Vercel Provides

### Automatic Features

- ✅ **HTTPS/SSL**: Automatic free SSL certificates
- ✅ **CDN**: Global edge network (300+ locations)
- ✅ **Compression**: Automatic Gzip/Brotli compression
- ✅ **Cache**: Smart caching for optimal performance
- ✅ **Analytics**: Built-in web analytics
- ✅ **Edge Functions**: Serverless functions ready
- ✅ **Preview Deployments**: Every git push gets a preview URL
- ✅ **Rollbacks**: One-click rollback to previous versions
- ✅ **Environment Variables**: Per environment configuration

### Performance

- **Global CDN**: Content served from nearest edge location
- **Smart Caching**: Static assets cached at edge
- **Instant Invalidation**: Cache updates on deployment
- **HTTP/2**: Automatic HTTP/2 support
- **Compression**: Brotli compression for faster loads

## 🔧 Advanced Configuration

### Custom Headers (Already Configured)

The `vercel.json` includes:

- **Security Headers**: XSS protection, frame options
- **Cache Control**: Optimized for static assets
- **Service Worker**: Proper PWA configuration
- **SPA Routing**: All routes redirect to index.html

### Optimized Caching Strategy

```
Service Worker:     max-age=0, must-revalidate
Manifest:           max-age=0, must-revalidate
Assets (/assets/*): max-age=31536000, immutable (1 year)
HTML:               max-age=0, must-revalidate
```

## 📱 PWA on Vercel

Your PWA features work perfectly on Vercel:

- ✅ Service Worker registration
- ✅ Offline functionality
- ✅ Add to Home Screen
- ✅ App shortcuts
- ✅ Push notifications ready

## 🎯 Production Checklist

Before deploying to production:

- [ ] Update `package.json` name and version
- [ ] Replace placeholder URLs in `index.html` meta tags
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables (optional)
- [ ] Test PWA installation
- [ ] Run `npm run build` locally to verify
- [ ] Test in `npm run preview` mode

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you:

- **Push to main/master**: Production deployment
- **Push to other branches**: Preview deployment
- **Open Pull Request**: Preview deployment with comment

### Manual Deployments

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy specific branch
vercel --prod --branch main
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Check build locally
npm run build

# If successful, check Vercel build logs:
# Dashboard → Deployments → Click failed deployment → View logs
```

### 404 Errors on Routes

✅ Already fixed! The `vercel.json` includes SPA routing configuration.

### Service Worker Not Working

- Ensure you're using HTTPS (Vercel provides this automatically)
- Check browser console for errors
- Clear cache and hard reload (Cmd/Ctrl + Shift + R)

### Environment Variables Not Working

- Ensure they start with `VITE_`
- Redeploy after adding variables
- Check "Environment Variables" section in Vercel dashboard

## 📈 Monitoring

### Built-in Analytics

Vercel provides:
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices
- Locations

Access: Dashboard → Analytics

### Custom Analytics

Add Google Analytics or other services via environment variables.

## 💰 Pricing

### Free Tier (Hobby)

Perfect for this project:
- ✅ Unlimited personal projects
- ✅ HTTPS included
- ✅ 100 GB bandwidth/month
- ✅ Automatic deployments
- ✅ Preview deployments
- ✅ Custom domains

### Pro Tier ($20/month)

For commercial use:
- Everything in Hobby
- Team collaboration
- Analytics
- Advanced features
- Priority support

## 🎉 Post-Deployment

After successful deployment:

1. **Test your app**: Visit the Vercel URL
2. **Test PWA**: Install on mobile/desktop
3. **Test offline**: Enable offline mode in DevTools
4. **Share**: Share your Vercel URL
5. **Monitor**: Check Vercel Analytics dashboard

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/docs/frameworks/vite)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🆘 Support

- **Vercel Support**: support@vercel.com
- **Discord**: [Vercel Discord](https://vercel.com/discord)
- **GitHub Issues**: [Your repo issues]

---

**Deployment time: ~2 minutes** ⚡

**Estimated first deploy**: Under 1 minute after running `vercel --prod`

**Perfect Lighthouse scores achievable**: 100/100 across all metrics
