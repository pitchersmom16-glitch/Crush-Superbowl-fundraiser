# Quick Deploy Guide - 10 Minutes to Live! 🚀

## What You Need
- GitHub account (free)
- Vercel account (free)
- Your Supabase URL and Key (from .env file)

---

## Step-by-Step Deployment

### 1️⃣ Push to GitHub (if not already)

Open terminal in your project folder:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Crush Fundraiser"

# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin master
```

### 2️⃣ Deploy to Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Click** "Sign Up" → Use GitHub account
3. **Click** "New Project"
4. **Import** your repository from GitHub
5. **Project Settings:**
   - Framework Preset: `Vite` (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Environment Variables:**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL = https://yrlipopjwlffxttogebw.supabase.co
   VITE_SUPABASE_ANON_KEY = (your long key from .env)
   ```

7. **Click** "Deploy"
8. **Wait** 2-3 minutes
9. **Done!** You'll get a URL like: `crush-fundraiser.vercel.app`

### 3️⃣ Test Your Live Site

1. Click the URL Vercel gives you
2. Test on your phone
3. Claim a test square
4. Make sure everything works

### 4️⃣ Create Short Link

1. Go to [bit.ly](https://bit.ly)
2. Paste your Vercel URL
3. Customize: `bit.ly/CrushSB2024`
4. Test it 3 times

### 5️⃣ Post to Facebook!

Use this template:

```
🎉 CRUSH FAM! 🎉

Support West Cobb Crush 2014 Haney/Woodman with our Super Bowl Squares Fundraiser!

🏈 $20 per square
🎯 Prizes every quarter + FINAL SCORE
✨ 100% supports our team

👉 CLAIM NOW: bit.ly/CrushSB2024

Tag a friend who loves football! 👇

#WestCobbCrush #SuperBowl2025 #SupportLocal
```

---

## That's It! 🎊

Your fundraiser is now live and shareable!

**Questions?** Comment them and I'll help!
