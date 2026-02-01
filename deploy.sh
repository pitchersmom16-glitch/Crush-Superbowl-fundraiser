#!/bin/bash

# SoftballProAI Fundraiser - Quick Deploy Script
# Run this after setting up Supabase and environment variables

echo "🚀 SoftballProAI Fundraiser - Deployment Preparation"
echo "=================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env created. Please edit it with your Supabase credentials."
    echo ""
    echo "You need to add:"
    echo "  - VITE_SUPABASE_URL"
    echo "  - VITE_SUPABASE_ANON_KEY"
    echo ""
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check if environment variables are set
if grep -q "your-supabase-url" .env || grep -q "your-supabase-anon-key" .env; then
    echo "⚠️  Warning: .env still contains placeholder values"
    echo "Please update with your actual Supabase credentials before deploying"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Ensure Supabase database is set up (run supabase-schema.sql)"
    echo "2. Update .env with your Supabase credentials"
    echo "3. Deploy to Vercel:"
    echo "   • Install: npm install -g vercel"
    echo "   • Login: vercel login"
    echo "   • Deploy: vercel --prod"
    echo ""
    echo "Or deploy via Vercel Dashboard:"
    echo "   • Go to vercel.com"
    echo "   • Import your GitHub repository"
    echo "   • Add environment variables"
    echo "   • Click Deploy"
    echo ""
    echo "📖 See DEPLOYMENT-GUIDE.md for detailed instructions"
else
    echo ""
    echo "❌ Build failed. Check errors above."
    exit 1
fi
