# 🚀 Deploy SM Bank to GitHub Pages

## ✅ What's Ready

Your code is committed and ready to push! Here's what I've done:

- ✅ Fixed router conflict (removed HashRouter)
- ✅ Updated `vite.config.js` base path to `/smdemobnk/`
- ✅ Created GitHub Actions workflow for auto-deployment
- ✅ Rebuilt app with production settings
- ✅ Committed all changes
- ⏳ **Ready to push to GitHub**

---

## 🔑 Step 1: Push to GitHub

Run this command to push your code:

```bash
cd /home/som/Documents/work/smdemobnk
git push origin main
```

**You'll be prompted for**:
- **Username**: `soum-anum`
- **Password**: Your GitHub Personal Access Token (NOT your GitHub password)

### 📝 Don't Have a Token? Create One:

1. Go to: https://github.com/settings/tokens/new
2. **Name**: `smdemobnk-deploy`
3. **Expiration**: Choose your preference (e.g., 90 days or No expiration)
4. **Select scopes**:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use it as your password when pushing

---

## 🌐 Step 2: Enable GitHub Pages

After pushing, enable GitHub Pages:

### Option A: Enable via Settings (Recommended)

1. Go to your repository settings:
   **https://github.com/soum-anum/smdemobnk/settings/pages**

2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
   - (Do NOT select "Deploy from a branch")

3. Click **"Save"** if needed

### Option B: Automatic

Once you push with the workflow file, GitHub Pages should be automatically configured!

---

## ⏱️ Step 3: Wait for Deployment

1. **Monitor the deployment**:
   https://github.com/soum-anum/smdemobnk/actions

2. You'll see a workflow running:
   - 🟡 Yellow dot = In progress
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (click for logs)

3. **Deployment time**: 1-2 minutes

---

## 🎉 Step 4: Access Your Live Site

Once deployment completes, your site will be live at:

### 🌟 **https://soum-anum.github.io/smdemobnk/**

---

## 🔐 Test Your Live Site

Try logging in with these credentials:

| Username | Password | Role | Access |
|----------|----------|------|--------|
| `smadmin` | `Smbank@1234` | Admin | All pages |
| `smcust` | `Smbank@1234` | Customer | Pay Now only |
| `demo` | `demo123` | Admin | All pages |

---

## 🔧 Troubleshooting

### Issue 1: Authentication Failed When Pushing

**Solution**: Use a Personal Access Token instead of your GitHub password.
- Create one here: https://github.com/settings/tokens/new
- Make sure to select `repo` and `workflow` scopes

### Issue 2: Still Seeing Blank Page

**Solution**:
1. Make sure GitHub Pages is enabled with "GitHub Actions" as source
2. Wait for the workflow to complete (check Actions tab)
3. Clear browser cache and hard refresh: `Ctrl + Shift + R`
4. Try in incognito/private mode

### Issue 3: Workflow Failed

**Solution**:
1. Go to: https://github.com/soum-anum/smdemobnk/actions
2. Click on the failed workflow
3. Look at the logs to see what went wrong
4. Common fixes:
   - Make sure `package.json` is in the repository
   - Make sure all dependencies are listed correctly
   - Check if the workflow file is in `.github/workflows/`

### Issue 4: 404 Errors on Assets

**Solution**: Already fixed! The `vite.config.js` has the correct base path `/smdemobnk/`

---

## 🔄 Future Updates

Whenever you make changes to your code:

```bash
# 1. Make your changes

# 2. Test locally (change base to "/" in vite.config.js)
npm run dev
# Test at http://localhost:3000/

# 3. Change base back to "/smdemobnk/" for deployment

# 4. Rebuild
npm run build

# 5. Commit and push
git add .
git commit -m "Your update message"
git push origin main

# 6. Wait 1-2 minutes for auto-deployment
```

---

## 📊 What Happens After Push?

1. **GitHub Actions** automatically:
   - Checks out your code
   - Installs Node.js 18
   - Runs `npm ci` (clean install)
   - Runs `npm run build`
   - Deploys the `dist/` folder to GitHub Pages

2. **Your site goes live** at: https://soum-anum.github.io/smdemobnk/

3. **No manual steps needed** - fully automated!

---

## ✨ Features Deployed

Your live site will have:

- ✅ Login page with authentication
- ✅ Role-based access (Admin vs Customer)
- ✅ Dashboard with summary cards
- ✅ Transactions page with 500 dummy records
- ✅ Advanced filters (Country + Multi-select Cities with search)
- ✅ Statements page with account details
- ✅ Pay Now payment form
- ✅ Business Info with 3-card layout
- ✅ Fully responsive design
- ✅ Clean, modern UI

---

## 🎯 Quick Start

```bash
# Push to GitHub
cd /home/som/Documents/work/smdemobnk
git push origin main

# Then visit:
# 1. https://github.com/soum-anum/smdemobnk/actions (monitor)
# 2. https://soum-anum.github.io/smdemobnk/ (your live site!)
```

---

## 📞 Need Help?

If something goes wrong:

1. **Check GitHub Actions logs**: https://github.com/soum-anum/smdemobnk/actions
2. **Check browser console**: Press F12 → Console tab
3. **Verify GitHub Pages settings**: https://github.com/soum-anum/smdemobnk/settings/pages
4. **Make sure you pushed**: `git log --oneline -1` should show your latest commit

---

## 🎉 Success Checklist

- [ ] Pushed code to GitHub (`git push origin main`)
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Workflow completed successfully (green checkmark)
- [ ] Waited 1-2 minutes after deployment
- [ ] Visited https://soum-anum.github.io/smdemobnk/
- [ ] Cleared browser cache and hard refreshed
- [ ] Tested login with credentials
- [ ] All pages working correctly

---

## 🚀 You're Almost There!

Just run `git push origin main` and your site will be live in 2 minutes!

**Live URL**: https://soum-anum.github.io/smdemobnk/ 🎉

