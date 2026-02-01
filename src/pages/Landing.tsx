import { Trophy, DollarSign, Target, Users, Shield, HelpCircle } from 'lucide-react';
import logo from '../../softballproai-brand/client/src/assets/logo.jpg';
import { DonationTiers } from '../components/DonationTiers';
import { BadgeWall } from '../components/BadgeWall';
import meAndShay from '../Images/Me and Shay.jpg';
import softballImage from '../Images/SoftballImage 1.jfif';
import heroImage from '../Images/hero.jpg';

export function Landing() {

  const scrollToTiers = () => {
    document.getElementById('donation-tiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-card to-background py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <img src={logo} alt="SoftballProAI Logo" className="w-64 mx-auto mb-8 drop-shadow-neon" />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              SoftballProAI
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Your kid's private, always-on softball coach — powered by AI and real biomechanics
            </h2>
          </div>

          {/* Personal Story */}
          <div className="bg-card border-2 border-primary/30 rounded-lg p-8 mb-8 text-left max-w-4xl mx-auto">
            <p className="text-lg mb-4">
              Hi, I'm <strong className="text-primary">Kimberly</strong> — a single mom, lifelong softball supporter, and Shannon's #1 fan.
            </p>
            
            <p className="text-muted-foreground mb-4">
              For years, Lyme disease and fibromyalgia made even basic tasks — like sitting at a computer for more than 20 minutes — feel impossible. But after starting HRT therapy, something changed. My focus returned, stronger than ever.
            </p>
            
            <p className="text-muted-foreground mb-4">
              In the past few weeks I've poured 10+ hours a day into learning AI and building <strong className="text-foreground">Softball Pro AI</strong> — the world's first AI-powered softball coach designed specifically for girls 8U–16U.
            </p>

            <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-6">
              <p className="font-semibold text-lg mb-3">It's already real:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Players upload a short video swing or pitch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The app analyzes biomechanics in real time (arm slot, knee flexion, torque separation, hip-shoulder-elbow sequencing, and more)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>It flags injury risks, tracks progress, suggests personalized drills, mindset coaching, and strength plans</span>
                </li>
              </ul>
            </div>

            {/* Product Screenshots */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-primary/30 rounded-lg overflow-hidden">
                <img src={heroImage} alt="SoftballProAI Hero - AI-powered coaching platform" className="w-full h-auto" />
                <p className="text-xs text-center text-muted-foreground p-2">Platform Hero</p>
              </div>
              <div className="border-2 border-primary/30 rounded-lg overflow-hidden">
                <img src={softballImage} alt="Real-time biomechanics analysis dashboard" className="w-full h-auto object-cover" />
                <p className="text-xs text-center text-muted-foreground p-2">Biomechanics Analysis</p>
              </div>
              <div className="border-2 border-primary/30 rounded-lg overflow-hidden">
                <img src={meAndShay} alt="Kimberly and Shannon - The reason behind SoftballProAI" className="w-full h-auto object-cover" />
                <p className="text-xs text-center text-muted-foreground p-2">Me & Shannon</p>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent rounded-lg p-6">
              <p className="font-semibold text-lg mb-3">🚨 We're 30 days away from a wall.</p>
              <p className="text-muted-foreground mb-4">
                Rent and essentials are due, and I've maxed out free trials on the AI tools needed to finish the MVP. I'm asking for help to cover one month of rent & living expenses, paid AI tool credits, and enough runway to polish the product and get it into coaches' and parents' hands.
              </p>
              <p className="text-foreground font-semibold">
                This isn't charity — it's a bridge. I've promised to personally return double every contribution once the product launches and generates revenue. You'll also receive Founding Member lifetime access + a special badge on the site.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/20 border-2 border-primary px-6 py-3 rounded-full mb-4">
              <Shield className="text-primary" size={24} />
              <span className="font-bold text-lg">Double Payback Promise: I will return 2× your contribution once we launch</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToTiers}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-4 rounded-lg shadow-neon transition-all hover:scale-105"
            >
              Become a Founding Member
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              This is not charity — it's a bridge. Help us finish what we started.
            </p>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold mb-4 text-center">
            <Target className="inline mr-3 text-primary" size={36} />
            What is SoftballProAI?
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A smart, personalized training tool that helps girls improve faster and safer
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-3 text-primary">📹 Upload a Video</h3>
              <p className="text-muted-foreground">
                Short clip of a swing or pitch — get instant biomechanical analysis of arm slot, knee flexion, torque separation, hip-shoulder-elbow chain, and more
              </p>
            </div>
            
            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-3 text-primary">📊 Live Metrics & Risk Flags</h3>
              <p className="text-muted-foreground">
                See real-time metrics, injury risk indicators, and progression tracking over time
              </p>
            </div>
            
            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-3 text-primary">🎯 Personalized Training</h3>
              <p className="text-muted-foreground">
                Receive custom drills, mental focus tips, cross-training ideas, and accountability goals tailored to your player
              </p>
            </div>
            
            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-3 text-primary">🧠 Expert Knowledge</h3>
              <p className="text-muted-foreground">
                Trained on the best coaching knowledge, rulebooks, age-specific techniques, and motivational strategies
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary/10 border-2 border-primary rounded-lg p-8 text-center">
            <p className="text-xl font-semibold mb-2">
              It's like having a private coach in your pocket
            </p>
            <p className="text-muted-foreground">
              One that never sleeps, never gets tired, and is obsessed with helping your player reach her potential (college dreams included)
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <DollarSign className="inline mr-3 text-primary" size={36} />
            Current Status (Feb 2026)
          </h2>
          
          <div className="bg-card border-2 border-primary rounded-lg p-8 mb-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl mb-2">✅</div>
                <div className="font-bold">Player Mode Built</div>
                <div className="text-sm text-muted-foreground">Real-time video analysis working</div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-bold">AI Brain Trained</div>
                <div className="text-sm text-muted-foreground">Rules, drills, techniques loaded</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-bold">Next: Coach Dashboard</div>
                <div className="text-sm text-muted-foreground">Team features & polished UI</div>
              </div>
            </div>

            <p className="text-center text-muted-foreground mb-4">
              We're seeing real results with Shannon's analysis — arm slot, knee flexion, torque separation, the whole biomechanics breakdown is working. Now we need to finish the coach dashboard, team features, and polish the UI.
            </p>
          </div>

          <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Why I'm Fundraising</h3>
            <p className="text-muted-foreground mb-4">
              We're 30 days from serious financial pressure. I need help to cover:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-3">
                <span className="text-destructive">•</span>
                <span><strong>One month of rent & essentials</strong> — keeping a roof over our heads</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive">•</span>
                <span><strong>Paid AI tool credits</strong> — Lovable, Replit, API access to keep building</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive">•</span>
                <span><strong>Enough runway to finish the MVP</strong> — and get it into the hands of players & coaches</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <Users className="inline mr-3 text-primary" size={36} />
            How You Can Help
          </h2>
          
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">This is NOT charity — it's a bridge</h3>
            <p className="text-center text-lg mb-6">
              I'm offering something unprecedented:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-primary rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="text-xl font-bold mb-2">Double Payback Promise</h4>
                <p className="text-muted-foreground">
                  I will personally return <strong className="text-primary">2× whatever you contribute</strong> once the product launches and generates revenue
                </p>
              </div>
              <div className="bg-card border border-accent rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="text-xl font-bold mb-2">Founding Member Benefits</h4>
                <p className="text-muted-foreground">
                  Lifetime free account + special badge on the site + your name in the credits (if you'd like)
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-neon">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your Tier</h3>
              <p className="text-muted-foreground">
                From $25 to $250 — every contribution helps keep the lights on and the code flowing
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-neon">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Make Your Contribution</h3>
              <p className="text-muted-foreground">
                Use Venmo, Cash App, Zelle, PayPal, or credit card — whatever works for you
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-neon">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Claim Your Badge</h3>
              <p className="text-muted-foreground">
                Get recognized on our Founding Member wall and receive your lifetime access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section id="donation-tiers" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <Trophy className="inline mr-3 text-primary" size={36} />
            Founding Member Tiers
          </h2>
          <DonationTiers />
        </div>
      </section>

      {/* Badge Wall */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-7xl">
          <BadgeWall />
        </div>
      </section>

      {/* Transparency & FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <HelpCircle className="inline mr-3 text-primary" size={36} />
            Let's Build This Together
          </h2>

          <div className="bg-card border-2 border-primary rounded-lg p-8 mb-8 text-center">
            <p className="text-xl mb-4">
              If you're a softball parent, coach, travel ball family, or just believe in second chances and big dreams — your support means everything.
            </p>
            <p className="text-lg text-muted-foreground">
              Thank you for reading. Thank you for believing.
            </p>
            <p className="text-lg font-semibold mt-4">
              — Kimberly (Shannon's mom)<br/>
              Atlanta, GA<br/>
              February 2026
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How will I get my 2× payback?</h3>
              <p className="text-muted-foreground">
                Once SoftballProAI launches and generates revenue (through subscriptions or other monetization), I will personally track down every founding member and return double their contribution. You'll keep your lifetime premium access and founding member benefits.
              </p>
            </div>

            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What if the product doesn't launch?</h3>
              <p className="text-muted-foreground">
                I'm being honest about the financial pressure we're facing. If we can't finish the MVP, I'll be transparent about what happened and work with contributors on a case-by-case basis. But I'm fighting with everything I have to make this work.
              </p>
            </div>

            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Is this an investment or equity?</h3>
              <p className="text-muted-foreground">
                No. This is a personal promise from me to you. Not a legal investment, not equity. Just a mom building something she believes in and promising to pay back double when it works.
              </p>
            </div>

            <div className="bg-card border border-primary/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Can I help in other ways besides money?</h3>
              <p className="text-muted-foreground">
                Yes! If you're a softball coach, developer, or have connections in youth sports, please reach out. Advice, testing, connections — it all helps.
              </p>
            </div>
          </div>

          <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-6 mt-8 text-sm">
            <p className="font-semibold mb-2">Legal Notice:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• This is a personal promise, not a legal contract or investment</li>
              <li>• 2× payback commitment is contingent on product launch and revenue generation</li>
              <li>• No specific timeline is guaranteed</li>
              <li>• Contributions are voluntary and support MVP development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-primary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <img src={logo} alt="SoftballProAI Logo" className="w-32 mx-auto mb-4 opacity-80" />
          <p className="text-lg font-semibold mb-2">Building the Future of Softball Coaching</p>
          <p className="text-sm text-muted-foreground mb-4">Your kid's private, always-on softball coach</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>2× payback promise once product launches and generates revenue</p>
            <p>© 2026 SoftballProAI. Built with ❤️ in Atlanta, GA</p>
            <p className="text-xs mt-4">#Softball #YouthSports #AISports #SoftballTraining #Biomechanics</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
