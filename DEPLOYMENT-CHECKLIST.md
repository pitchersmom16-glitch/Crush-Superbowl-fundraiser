# Deployment Checklist for SoftballProAI Fundraiser

## Pre-Deployment Steps

### ✅ 1. Verify Local App Works
- [ ] Run `npm run dev` locally
- [ ] Test claiming a square
- [ ] Test editing a square
- [ ] Test unclaiming a square
- [ ] Test randomize numbers (if all 100 claimed)
- [ ] Test score tracker
- [ ] Check all pages (Landing, Board, Admin)
- [ ] Verify mobile responsiveness

### ✅ 2. Check Environment Variables
- [ ] `.env` file has correct Supabase URL
- [ ] `.env` file has correct Supabase Anon Key
- [ ] Copy these values - you'll need them for deployment

### ✅ 3. Database Ready
- [ ] Supabase tables created (`squares`, `board_config`)
- [ ] Test database connection
- [ ] Verify realtime updates work

### ✅ 4. Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors

---

## Deployment Steps (Choose Vercel or Netlify)

### OPTION A: Vercel Deployment

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

3. **Import Project**
   - Click "New Project" on Vercel
   - Select your GitHub repository
   - Vercel auto-detects Vite

4. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `VITE_SUPABASE_URL` = (your Supabase URL)
   - Add: `VITE_SUPABASE_ANON_KEY` = (your Supabase key)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-5 minutes
   - Get your live URL!

---

## Post-Deployment Checklist

### ✅ Test Deployed App
- [ ] Visit your live URL
- [ ] Test on desktop browser
- [ ] Test on mobile phone
- [ ] Claim a test square
- [ ] View claimed square details
- [ ] Edit square info
- [ ] Unclaim square
- [ ] Check all branding shows correctly
- [ ] Test Admin page login (password: softballproai2024)

### ✅ Create Short Link
- [ ] Go to https://bit.ly
- [ ] Paste your live URL
- [ ] Create custom link: `bit.ly/SoftballProAI` (or similar)
- [ ] Test short link 3 times
- [ ] Share with 2-3 friends to test

### ✅ Prepare Facebook Post
- [ ] Copy one of the Facebook post templates
- [ ] Replace link with your bit.ly link
- [ ] Spell check
- [ ] Test link in post preview
- [ ] Schedule for Thursday/Friday 6-9 PM

---

## Emergency Contacts & Info

**Supabase Dashboard:** https://supabase.com/dashboard
**Deployment URL:** (fill in after deployment)
**Short Link:** (fill in after creation)
**Admin Password:** softballproai2024
**Venmo:** @Kimberly-Tarnovska

---

## Troubleshooting

### App shows blank page after deployment:
- Check browser console for errors
- Verify environment variables are set correctly
- Check Supabase connection

### Database not connecting:
- Verify Supabase URL and key in environment variables
- Check Supabase RLS policies allow public access

### Changes not showing:
- Clear browser cache
- Redeploy from Vercel/Netlify dashboard

---

## Ready to Launch?

Answer YES to all:
- [ ] ✅ App works locally
- [ ] ✅ App deployed successfully
- [ ] ✅ Live URL tested on desktop
- [ ] ✅ Live URL tested on mobile
- [ ] ✅ Short link created and tested
- [ ] ✅ Facebook post ready
- [ ] ✅ Someone monitoring Venmo
- [ ] ✅ Ready to respond to questions

**WHEN ALL CHECKED: YOU'RE READY TO POST! 🚀**
