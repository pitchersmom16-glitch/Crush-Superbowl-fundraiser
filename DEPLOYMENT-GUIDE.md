# SoftballProAI Fundraiser - Deployment Guide

## 🚀 Quick Deploy Checklist

- [ ] Supabase project created and configured
- [ ] Database schema deployed
- [ ] Environment variables ready
- [ ] Vercel account connected to GitHub
- [ ] Domain configured (optional)
- [ ] First test deployment successful
- [ ] Production deployment live

---

## 📋 Pre-Deployment Requirements

### 1. Supabase Setup (5 minutes)

**Create Supabase Project:**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and region
4. Set database password (save it!)
5. Wait for project to provision (~2 min)

**Deploy Database Schema:**
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase-schema.sql`
4. Paste and click "Run"
5. Verify tables created: `founding_members`, `squares`, `board_config`

**Get API Credentials:**
1. Go to **Project Settings** → **API**
2. Copy `Project URL` (starts with `https://`)
3. Copy `anon public` key (under "Project API keys")
4. Save these for environment variables

---

## 🔧 Environment Variables

Create `.env` file in project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Payment Handles (Already Configured)
VITE_VENMO_HANDLE=@Kimberly-Tarnovska
VITE_CASHAPP_HANDLE=$ktarnovska
VITE_ZELLE_PHONE=4078443834
VITE_PAYPAL_HANDLE=@ktarnovska

# Optional: Stripe Integration
# VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

---

## 🌐 Vercel Deployment

### Option A: Deploy via Vercel Dashboard (Recommended)

**1. Connect Repository:**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `pitchersmom16-glitch/SoftballProAI-Fundraiser`
4. Select `softballproai-fundraiser` branch

**2. Configure Build Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**3. Add Environment Variables:**
In the "Environment Variables" section, add:
```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

**4. Deploy:**
- Click "Deploy"
- Wait ~2 minutes
- Vercel will provide a URL: `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

**1. Install Vercel CLI:**
```bash
npm install -g vercel
```

**2. Login:**
```bash
vercel login
```

**3. Deploy:**
```bash
# Test deployment
vercel

# Production deployment
vercel --prod
```

**4. Add Environment Variables:**
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

**5. Redeploy with Environment Variables:**
```bash
vercel --prod
```

---

## 🔌 Backend API Configuration

Vercel automatically deploys serverless functions from the `/api` directory.

**Verify API Endpoints:**
- `GET /api/founding-members` - Returns all badges
- `POST /api/founding-members` - Claims a badge

**Test Endpoints:**
```bash
# Test GET
curl https://your-project.vercel.app/api/founding-members

# Test POST
curl -X POST https://your-project.vercel.app/api/founding-members \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","tier":"Bronze","badge_number":1}'
```

---

## 🧪 Post-Deployment Testing

### 1. Landing Page
- [ ] Visit homepage
- [ ] Logo displays correctly
- [ ] All sections visible
- [ ] Smooth scroll to donation tiers works

### 2. Donation Flow
- [ ] Click "Donate" on any tier
- [ ] PaymentModal opens
- [ ] Payment handles display correctly
- [ ] Copy buttons work
- [ ] External links open correctly

### 3. Badge Wall
- [ ] 100 badges display in grid
- [ ] Progress bar shows correct count
- [ ] Click "Claim Badge" on available tile
- [ ] Fill out form
- [ ] Submit and verify badge appears

### 4. Mobile Testing
- [ ] Test on phone (or browser dev tools)
- [ ] All grids responsive
- [ ] Modals display correctly
- [ ] Forms are usable
- [ ] Text readable

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `fundraiser.softballproai.com`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~24 hours max)

### Recommended DNS Setup:
```
Type: CNAME
Name: fundraiser
Value: cname.vercel-dns.com
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in):
1. Go to Project → Analytics
2. View page views, unique visitors, performance

### Optional: Add Google Analytics:
1. Get GA4 Measurement ID
2. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔒 Security Checklist

- [x] Supabase RLS policies enabled
- [x] API endpoints have CORS configured
- [x] Environment variables not committed to Git
- [x] Anon key used (not service role key)
- [x] Input validation on all forms
- [x] Duplicate badge prevention implemented

---

## 🚨 Troubleshooting

### Build Fails
**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Returns 500 Error
**Check Vercel Logs:**
1. Go to Project → Deployments
2. Click latest deployment
3. Go to "Functions" tab
4. Check logs for errors

**Common Causes:**
- Environment variables not set
- Supabase credentials incorrect
- Database table doesn't exist

### Badge Wall Not Loading
**Check Browser Console:**
- Network tab → Check `/api/founding-members` response
- Verify Supabase credentials
- Check CORS headers

---

## 📱 Social Sharing Setup

### Add Open Graph Tags to `index.html`:
```html
<meta property="og:title" content="SoftballProAI — Become a Founding Member" />
<meta property="og:description" content="Help build the first AI-powered softball coaching platform. Get 2× your donation back when we launch!" />
<meta property="og:image" content="https://your-domain.vercel.app/og-image.jpg" />
<meta property="og:url" content="https://your-domain.vercel.app" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 🎉 Go Live Checklist

**Before Sharing:**
- [ ] Test all donation tiers
- [ ] Verify payment handles correct
- [ ] Test badge claiming flow
- [ ] Check mobile experience
- [ ] Verify email in ClaimBadgeModal (optional) works
- [ ] Screenshot badge wall for social posts

**Share on:**
- [ ] Your personal social media
- [ ] Softball parent groups
- [ ] Email to friends/family
- [ ] Post in relevant communities

---

## 📈 Success Metrics

**Track These Numbers:**
- Total page visits (Vercel Analytics)
- Badge claim rate (Supabase dashboard)
- Conversion rate (visits → donations)
- Average donation amount
- Social media reach

---

## 🆘 Need Help?

**Vercel Support:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

**Supabase Support:**
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

**Project Issues:**
- Check `FUNDRAISER-README.md` for setup details
- Review `REFACTORING-COMPLETE.md` for architecture

---

## 🎯 Your Deployment URL

After deployment, your fundraiser will be live at:
```
https://your-project-name.vercel.app
```

**Share this link everywhere!** 🚀

---

*Built with ❤️ by Kimberly in Atlanta, GA*
