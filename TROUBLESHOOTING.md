# 🔧 Login Troubleshooting Guide

## ✅ Current Status

**Backend API:** ✅ Working (Tested successfully)
**Frontend:** ✅ Running on http://localhost:3000
**Database:** ✅ Users loaded with correct credentials

---

## 🔐 Valid Login Credentials

### Admin Accounts (Full Access)
```
Username: smadmin
Password: Smbank@1234
---
Username: demo
Password: demo123
```

### Customer Account (Pay Now Only)
```
Username: smcust
Password: Smbank@1234
```

---

## 🧪 Backend API Test Results

### ✅ Admin Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smadmin","password":"Smbank@1234"}'
```
**Result:** ✅ SUCCESS - Returns token and user data

### ✅ Customer Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smcust","password":"Smbank@1234"}'
```
**Result:** ✅ SUCCESS - Returns token and user data

---

## 🔍 If Login Still Not Working

### Step 1: Check Browser Console
1. Open browser: http://localhost:3000
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Try to login
5. Look for any error messages (red text)

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Try to login
3. Look for the `/api/auth/login` request
4. Click on it to see:
   - **Request:** What was sent
   - **Response:** What was received
   - **Status Code:** Should be 200 for success

### Step 3: Clear Browser Cache
```
Press: Ctrl + Shift + Delete
Or: Ctrl + Shift + R (hard refresh)
```

### Step 4: Check if Servers are Running
```bash
# Check backend (should return server info)
curl http://localhost:5000/api/health

# Check frontend (should return HTML)
curl http://localhost:3000
```

### Step 5: Restart Both Servers

**Stop servers:**
```bash
# Kill backend
lsof -ti:5000 | xargs kill -9

# Kill frontend
lsof -ti:3000 | xargs kill -9
```

**Start servers:**
```bash
# Terminal 1 - Backend
cd /home/som/Documents/work/smbank/backend
npm start

# Terminal 2 - Frontend
cd /home/som/Documents/work/smbank/frontend
npm run dev
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid credentials" error
**Solution:** 
- Make sure you're using the exact credentials (case-sensitive)
- Username: `smadmin` (not SmAdmin or SMADMIN)
- Password: `Smbank@1234` (capital S, @ symbol, numbers)

### Issue 2: Network error / Cannot connect
**Solution:**
- Check if backend is running: `curl http://localhost:5000/api/health`
- Make sure port 5000 is not blocked by firewall
- Restart backend server

### Issue 3: Page doesn't load
**Solution:**
- Check if frontend is running on port 3000
- Try accessing: http://localhost:3000
- Clear browser cache (Ctrl + Shift + R)

### Issue 4: Login button doesn't respond
**Solution:**
- Check browser console for JavaScript errors
- Make sure both fields are filled
- Try refreshing the page

### Issue 5: "Token expired" or "Invalid token"
**Solution:**
- Clear localStorage: Open Console and run: `localStorage.clear()`
- Refresh page and try again

---

## 📊 Server Status Check

### Check Backend Status
```bash
# Method 1: Health check
curl http://localhost:5000/api/health

# Method 2: Check process
lsof -i :5000

# Method 3: Check logs
# Look at terminal where backend is running
```

### Check Frontend Status
```bash
# Method 1: Check if accessible
curl -I http://localhost:3000

# Method 2: Check process
lsof -i :3000

# Method 3: Check Vite logs
# Look at terminal where frontend is running
```

---

## 🔬 Manual Login Test

If you want to test login manually without the UI:

### Using curl:
```bash
# Test admin login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smadmin","password":"Smbank@1234"}' | jq .

# Test customer login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smcust","password":"Smbank@1234"}' | jq .
```

### Expected Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "3",
    "email": "smadmin@smbank.com",
    "username": "smadmin",
    "fullName": "SM Bank Admin",
    "balance": 500000,
    "role": "admin"
  }
}
```

---

## 📝 What to Check in Browser

### 1. Console Errors
Look for:
- CORS errors
- Network errors
- JavaScript errors
- API endpoint errors

### 2. Network Requests
Check:
- Request URL: Should be `http://localhost:5000/api/auth/login`
- Request Method: Should be `POST`
- Status Code: Should be `200 OK`
- Response: Should contain `success: true`

### 3. Application Tab
Check:
- Local Storage: Should store `token` and `user` after successful login
- If old data exists, clear it: `localStorage.clear()`

---

## 🆘 Still Having Issues?

### Provide These Details:

1. **What happens when you try to login?**
   - Error message shown?
   - Button doesn't respond?
   - Page reloads?
   - Nothing happens?

2. **Browser Console Errors:**
   - Open F12 > Console
   - Copy any red error messages

3. **Network Tab:**
   - F12 > Network
   - Try login
   - Is there a request to `/api/auth/login`?
   - What's the status code?
   - What's the response?

4. **Server Logs:**
   - Check terminal running backend
   - Any error messages?

---

## ✅ Quick Verification

Run these commands to verify everything:

```bash
# 1. Check backend is running
curl http://localhost:5000/api/health

# 2. Check frontend is running
curl -I http://localhost:3000

# 3. Test login API
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"smadmin","password":"Smbank@1234"}'

# All should return successful responses
```

---

## 📞 Contact Information

If login is still not working after trying all these steps, please provide:
1. Browser console errors (F12 > Console)
2. Network tab screenshot (F12 > Network)
3. Backend terminal output
4. Frontend terminal output

This will help diagnose the exact issue!

