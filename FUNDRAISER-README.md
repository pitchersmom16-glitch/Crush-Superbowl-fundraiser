# SoftballProAI Fundraiser Platform

## 🎯 Overview

A production-grade fundraising microsite for SoftballProAI that allows founding members to donate and claim recognition badges. Built with React, TypeScript, Vite, and Supabase.

## ✨ Features

- **Landing Page** with complete mission, FAQ, and transparency sections
- **Donation Tiers** ($25-$250) with payment modal
- **Multiple Payment Methods**: Venmo, Cash App, Zelle, PayPal, and optional Stripe
- **Badge Wall** showing 100 founding member spots
- **Claim System** for donors to get recognized
- **Responsive Design** with SoftballProAI branding
- **Real-time Updates** via Supabase

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account with project created
- Payment accounts configured (Venmo, Cash App, Zelle, PayPal)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your `.env` file:**
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_VENMO_HANDLE=@Kimberly-Tarnovska
   VITE_CASHAPP_HANDLE=$ktarnovska
   VITE_ZELLE_PHONE=4078443834
   VITE_PAYPAL_HANDLE=@ktarnovska
   ```

4. **Set up Supabase database:**

   Go to your Supabase SQL Editor and run:
   ```sql
   CREATE TABLE founding_members (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     tier TEXT NOT NULL CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
     email TEXT,
     badge_number INTEGER UNIQUE CHECK (badge_number >= 1 AND badge_number <= 100),
     created_at TIMESTAMPTZ DEFAULT now()
   );

   -- Enable Row Level Security
   ALTER TABLE founding_members ENABLE ROW LEVEL SECURITY;

   -- Allow public read access
   CREATE POLICY "Allow public read access" 
   ON founding_members FOR SELECT 
   TO public 
   USING (true);

   -- Allow public insert access
   CREATE POLICY "Allow public insert access" 
   ON founding_members FOR INSERT 
   TO public 
   WITH CHECK (true);
   ```

5. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
/src
  /components
    BadgeWall.tsx           # 100-badge grid display
    ClaimBadgeModal.tsx     # Form to claim badge
    DonationTiers.tsx       # Four donation tier cards
    PaymentModal.tsx        # Payment methods modal
  /pages
    Landing.tsx             # Main fundraiser page
  /lib
    supabase.ts             # Supabase client
/api
  founding-members.ts       # Serverless API endpoint
.env.example               # Environment variable template
supabase-schema.sql        # Database schema
```

## 💳 Payment Configuration

### Venmo
- Handle: `@Kimberly-Tarnovska`
- Deep link: `venmo://paycharge?txn=pay&recipients=Kimberly-Tarnovska`

### Cash App
- Handle: `$ktarnovska`
- Link: `https://cash.app/$ktarnovska`

### Zelle
- Phone: `407-844-3834`

### PayPal
- Handle: `@ktarnovska`
- Link: `https://paypal.me/ktarnovska`

### Stripe (Optional)
To enable Stripe:
1. Get your Stripe keys from [stripe.com/dashboard](https://dashboard.stripe.com)
2. Add to `.env`:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_...
   STRIPE_SECRET_KEY=sk_...
   ```

## 🧪 Testing Checklist

### Landing Page
- [ ] Loads without console errors
- [ ] Logo and hero image display
- [ ] All sections render correctly
- [ ] "Become a Founding Member" button scrolls to tiers
- [ ] Mobile responsive

### Donation Tiers
- [ ] All 4 tiers display with correct amounts
- [ ] Benefits list shows for each tier
- [ ] "Donate" button opens payment modal

### Payment Modal
- [ ] All payment handles correct
- [ ] Copy-to-clipboard works
- [ ] External links open correctly
- [ ] Stripe only shows if configured
- [ ] Legal notice displays

### Badge Wall
- [ ] GET request loads existing members
- [ ] Grid shows 100 badges
- [ ] Claimed badges show member info
- [ ] Unclaimed badges show "Available"
- [ ] Click opens claim modal

### Claim Badge Flow
- [ ] Required fields enforced
- [ ] Email optional
- [ ] Tier dropdown works
- [ ] Confirmation checkbox required
- [ ] POST request creates member
- [ ] Badge updates visually
- [ ] Duplicate badge prevented
- [ ] Errors handled gracefully

### Mobile & Accessibility
- [ ] All sections responsive on mobile
- [ ] Buttons touch-friendly
- [ ] Modals trap focus
- [ ] ESC closes modals
- [ ] Keyboard navigation works

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add environment variables in Vercel dashboard:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Payment handles

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Custom Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder to your hosting provider**

3. **Configure environment variables on your host**

## 🔧 Configuration

### Changing Donation Amounts

Edit `/src/components/DonationTiers.tsx`:

```typescript
const tiers: Tier[] = [
  {
    amount: 25,  // Change amount here
    name: 'Bronze Founding Member',
    // ...
  },
  // ...
];
```

### Changing Badge Count

Edit `/src/components/BadgeWall.tsx`:

```typescript
const totalBadges = 100;  // Change total badges here
```

Then update database constraint:
```sql
ALTER TABLE founding_members 
DROP CONSTRAINT founding_members_badge_number_check;

ALTER TABLE founding_members 
ADD CONSTRAINT founding_members_badge_number_check 
CHECK (badge_number >= 1 AND badge_number <= 150);  -- New limit
```

### Customizing Branding

The project imports branding from the `softballproai-brand` submodule:
- Logo: `softballproai-brand/client/src/assets/logo.jpg`
- Hero: `softballproai-brand/client/src/assets/hero.jpg`
- Colors: Defined in `softballproai-brand/client/src/index.css`

## 🛡️ Security

- Payment details are NEVER stored in database
- API uses parameterized queries to prevent SQL injection
- Row Level Security enabled on Supabase
- Environment variables for sensitive data
- CORS properly configured

## 📊 Analytics

To add analytics:

1. **Google Analytics:**
   ```bash
   npm install react-ga4
   ```

   In `src/main.tsx`:
   ```typescript
   import ReactGA from 'react-ga4';
   ReactGA.initialize('G-XXXXXXXXXX');
   ```

2. **Track donations:**
   In `PaymentModal.tsx` after payment:
   ```typescript
   ReactGA.event({
     category: 'Donation',
     action: 'Payment Method Selected',
     label: method.name,
     value: tier.amount
   });
   ```

## 🐛 Troubleshooting

### "Failed to load founding members"
- Check Supabase URL and keys in `.env`
- Verify database table exists
- Check RLS policies are enabled

### Payment links not working
- Verify payment handles in `.env`
- Test links manually
- Check copy-to-clipboard permissions

### Badge won't claim
- Check for duplicate badge_number
- Verify POST endpoint working
- Check browser console for errors

## 📝 License

Private project for SoftballProAI

## 👥 Support

For questions or issues:
- Email: support@softballproai.com
- GitHub Issues: (if applicable)

---

**Built with ❤️ for SoftballProAI**
