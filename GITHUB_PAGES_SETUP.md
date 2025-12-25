# 🚀 Quick GitHub Pages Setup

## Step-by-Step Guide to Deploy SM Bank

### 1️⃣ Update Vite Configuration

Open `vite.config.js` and change the `base` path to match your GitHub repository name:

```javascript
export default defineConfig({
  base: '/YOUR-REPO-NAME/',  // ⚠️ CHANGE THIS!
  // ... rest stays the same
});
```

**Example**: If your repo is `github.com/username/smbank`, use:
```javascript
base: '/smbank/'
```

---

### 2️⃣ Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `smbank` (or your choice)
3. Make it **Public**
4. **Don't** initialize with README (we already have one)
5. Click **Create repository**

---

### 3️⃣ Push Code to GitHub

Run these commands in your terminal:

```bash
# Navigate to project
cd /home/som/Documents/work/smbank

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "SM Bank - Frontend-only banking application"

# Rename branch to main
git branch -M main

# Add your GitHub repo as remote (CHANGE USERNAME and REPO-NAME!)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

---

### 4️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. That's it! The workflow will automatically run

---

### 5️⃣ Wait for Deployment

1. Go to **Actions** tab in your repository
2. You'll see a workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Green checkmark = Success! ✅

---

### 6️⃣ Access Your Site

Your site will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

**Example**: `https://johndoe.github.io/smbank/`

---

## 🎯 Quick Test Checklist

After deployment, test these:

- [ ] Site loads without errors
- [ ] Login page appears
- [ ] Can login with: **smadmin** / **Smbank@1234**
- [ ] Dashboard shows data
- [ ] Transactions page loads with 125 transactions
- [ ] Filters work (Country, City, Date)
- [ ] Statements page shows 6 months
- [ ] Pay Now form works
- [ ] Business Info displays correctly
- [ ] Can logout and login again

---

## 🐛 Troubleshooting

### Issue: 404 Error or Blank Page

**Solution**: Check that `vite.config.js` has the correct `base` path:
```javascript
base: '/YOUR-REPO-NAME/'  // Must match GitHub repo name!
```

Then rebuild and redeploy:
```bash
git add vite.config.js
git commit -m "Fix base path"
git push
```

### Issue: Assets Not Loading

**Solution**: Make sure you have the `.nojekyll` file in the `public/` folder. It should already be there!

### Issue: Workflow Fails

**Solution**: 
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Click **Save**
4. Re-run the workflow from the Actions tab

---

## 🔄 Update Your Site

To make changes and redeploy:

```bash
# Make your changes to the code

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Description of changes"
git push

# GitHub Actions will automatically rebuild and deploy!
```

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `vite.config.js` | Configure base path for GitHub Pages |
| `.github/workflows/deploy.yml` | Automatic deployment workflow |
| `public/.nojekyll` | Tell GitHub Pages not to use Jekyll |
| `.gitignore` | Exclude node_modules and dist from git |

---

## ✅ Deployment Checklist

Before pushing to GitHub:

- [ ] Updated `base` in `vite.config.js`
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] All files committed to git
- [ ] GitHub repository created
- [ ] Remote added with correct URL

---

## 🎉 That's It!

Your SM Bank application is now live on GitHub Pages!

**Share your link**: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## 📚 More Help

- Full deployment guide: `DEPLOYMENT_GUIDE.md`
- Feature documentation: `FEATURES.md`
- Conversion details: `CONVERSION_SUMMARY.md`
- General info: `README.md`

---

**Happy Deploying! 🚀**

