# 🚀 SM Bank - GitHub Pages Deployment Guide

Complete guide to deploy your SM Bank application to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js 18+ installed

## 🎯 Deployment Options

### Option 1: Automatic Deployment (Recommended)

Uses GitHub Actions to automatically build and deploy on every push.

#### Step 1: Update Configuration

1. **Update `vite.config.js`** - Change the base path to match your repo name:

```javascript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // ⚠️ Change this!
  // ... rest of config
});
```

#### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SM Bank frontend-only"

# Create main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically run and deploy

#### Step 4: Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

### Option 2: Manual Deployment with gh-pages

Deploy manually using the gh-pages package.

#### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### Step 2: Update Configuration

Update `vite.config.js` with your repo name:

```javascript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',
  // ... rest of config
});
```

#### Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

#### Step 4: Deploy

```bash
npm run deploy
```

This command:
1. Builds your application
2. Creates a `gh-pages` branch
3. Pushes the built files to that branch

#### Step 5: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select branch: **gh-pages**
4. Select folder: **/ (root)**
5. Click **Save**

---

## 🔧 Configuration Details

### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/smdemobnk/',  // ⚠️ Must match your repo name
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## 🐛 Troubleshooting

### Issue: 404 Error on GitHub Pages

**Solution**: Make sure the `base` path in `vite.config.js` matches your repository name exactly.

```javascript
// If your repo is: github.com/username/my-bank
base: '/my-bank/'  // Must include leading and trailing slashes
```

### Issue: Blank Page After Deployment

**Solutions**:
1. Check browser console for errors
2. Verify `base` path is correct
3. Clear browser cache
4. Check that `.nojekyll` file exists in `public/` folder

### Issue: GitHub Actions Workflow Fails

**Solutions**:
1. Check that GitHub Pages is enabled in Settings
2. Verify workflow permissions:
   - Go to **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, select **Read and write permissions**
3. Check the Actions tab for detailed error logs

### Issue: Assets Not Loading

**Solution**: Ensure all asset imports use relative paths and the `base` path is configured correctly.

---

## 📦 Build Process

### What Happens During Build?

1. **Vite Build**: Compiles React code, optimizes assets
2. **Output**: Creates `dist/` folder with:
   - `index.html` - Main HTML file
   - `assets/` - JS, CSS, and other assets
3. **Deploy**: Uploads `dist/` contents to GitHub Pages

### Build Command

```bash
npm run build
```

Output:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── .nojekyll
```

---

## 🔐 Security Notes

### Client-Side Authentication

⚠️ **Important**: This application uses client-side authentication for demo purposes only.

**For production use:**
- Implement proper backend authentication
- Use secure token storage
- Add HTTPS
- Implement rate limiting
- Add CSRF protection

### Password Storage

Passwords in `mockData.js` are stored in plain text for demo purposes. **Never do this in production!**

---

## 🌐 Custom Domain (Optional)

### Add a Custom Domain

1. **Buy a domain** from a domain registrar
2. **Add CNAME file** to `public/` folder:
   ```
   yourdomain.com
   ```
3. **Configure DNS** at your registrar:
   - Add a CNAME record pointing to: `YOUR-USERNAME.github.io`
4. **Enable custom domain** in GitHub Pages settings

---

## 📊 Monitoring Deployment

### Check Deployment Status

1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. View build and deployment logs

### Deployment Workflow

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Install dependencies
    ↓
Build application
    ↓
Upload to GitHub Pages
    ↓
Deploy
    ↓
Site live! 🎉
```

---

## 🔄 Updating Your Site

### Make Changes and Redeploy

```bash
# Make your changes to the code

# Test locally
npm run dev

# Commit changes
git add .
git commit -m "Update: description of changes"

# Push to GitHub
git push origin main

# Automatic deployment will trigger
# OR manually deploy:
npm run deploy
```

---

## 📝 Deployment Checklist

Before deploying, ensure:

- [ ] `vite.config.js` has correct `base` path
- [ ] All dependencies are installed (`npm install`)
- [ ] Application builds successfully (`npm run build`)
- [ ] Application works locally (`npm run preview`)
- [ ] `.nojekyll` file exists in `public/` folder
- [ ] `.gitignore` excludes `node_modules/` and `dist/`
- [ ] GitHub repository is created
- [ ] GitHub Pages is enabled in settings

---

## 🎉 Success!

Once deployed, your SM Bank application will be live and accessible to anyone with the URL!

**Example URLs:**
- `https://username.github.io/smdemobnk/`
- `https://yourdomain.com` (with custom domain)

---

## 📞 Need Help?

- Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Check [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- Open an issue on GitHub

---

**Happy Deploying! 🚀**

