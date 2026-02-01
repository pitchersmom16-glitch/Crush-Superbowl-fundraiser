import { Trophy } from 'lucide-react';
import { DonationTiers } from '../components/DonationTiers';
import { BadgeWall } from '../components/BadgeWall';
import logo from '../../softballproai-brand/client/src/assets/logo.jpg';

// Personal Photos - Shannon Action Shots
import shannonPitching from '../Images/Shannon pitching.png';
import meAndShay from '../Images/Me and Shay.jpg';
import meAndShay2 from '../Images/Me and Shay 2.jpg';
import meAndShay4 from '../Images/Me and shay 4.jpg';

// Product Screenshots
import heroImage from '../Images/hero.jpg';
import bioScreenshot1 from '../Images/SoftballImage 1.jfif';
import bioScreenshot2 from '../Images/SoftballImage5.jfif';

export function Landing() {

  const scrollToTiers = () => {
    document.getElementById('donation-tiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* HERO SECTION - Full Width with Logo and Branding */}
      <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          
          {/* SoftballProAI Logo - Centered at Top */}
          <div className="text-center mb-12">
            <img 
              src={logo} 
              alt="SoftballProAI Logo" 
              className="w-64 md:w-80 mx-auto drop-shadow-neon"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Hero Text */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
                Softball Pro AI
              </h1>
              <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground leading-tight">
                Built by a mom for young softball players
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                AI-powered biomechanics analysis helping girls ages 8U–16U train smarter and safer
              </p>
              <button
                onClick={scrollToTiers}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-12 rounded-lg text-2xl shadow-neon transition-all hover:scale-105"
              >
                Become a Founding Member
              </button>
            </div>
            
            {/* Hero Product Image */}
            <div className="flex justify-center">
              <img 
                src={heroImage} 
                alt="SoftballProAI Platform - Real-time biomechanics analysis" 
                className="w-full max-w-lg rounded-xl shadow-[0_0_30px_rgba(57,255,20,0.6)] border-4 border-primary object-cover"
              />
            </div>
          </div>

          {/* SHANNON PITCHING - HERO ACTION SHOT - MOST PROMINENT */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary shadow-[0_0_40px_rgba(57,255,20,0.8)]">
              <img 
                src={shannonPitching} 
                alt="Shannon pitching - The inspiration behind every feature" 
                className="w-full h-[600px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">Shannon — In Action</p>
                <p className="text-lg md:text-xl text-white">Every feature built with her dreams in mind</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL SECTION - Me & Shannon Photos */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Why I'm Building This</h2>
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto">
            Hi, I'm Kimberly — a single mom, lifelong softball supporter, and Shannon's #1 fan. 
            For years, Lyme disease and fibromyalgia made even basic tasks feel impossible. 
            But after starting HRT therapy, my focus returned stronger than ever.
          </p>
          
          {/* Me & Shannon Together - Photo Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="overflow-hidden rounded-xl border-3 border-primary/40 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShay} 
                  alt="Kimberly and Shannon - Our journey together" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">Our Journey</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-xl border-3 border-primary/40 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShay2} 
                  alt="Every practice matters" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">Every Practice Counts</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-xl border-3 border-primary/40 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShay4} 
                  alt="Building for the next generation" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">Building Her Future</p>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent rounded-xl p-8 max-w-4xl mx-auto">
            <p className="font-semibold text-xl mb-3">🚨 We're 30 days away from a wall.</p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Rent and essentials are due, and I've maxed out free trials on the AI tools needed to finish the MVP. 
              I'm asking for help to cover one month of rent & living expenses, paid AI tool credits, and enough runway 
              to polish the product and get it into coaches' and parents' hands.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION - Biomechanics Screenshots */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">It's Already Real</h2>
          <p className="text-center text-xl md:text-2xl text-primary font-semibold mb-16">
            Real-time swing & pitch analysis
          </p>
          
          {/* Product Screenshots - Even sizing with glow */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="group">
              <div className="overflow-hidden rounded-xl border-4 border-primary shadow-[0_0_25px_rgba(57,255,20,0.5)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] transition-all">
                <img 
                  src={bioScreenshot1} 
                  alt="SoftballProAI — Live Biomechanics Dashboard" 
                  className="w-full h-96 object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Live Biomechanics Dashboard</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-xl border-4 border-primary shadow-[0_0_25px_rgba(57,255,20,0.5)] hover:shadow-[0_0_40px_rgba(57,255,20,0.8)] transition-all">
                <img 
                  src={bioScreenshot2} 
                  alt="Real-time metrics: arm slot, knee flexion, injury prevention" 
                  className="w-full h-96 object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Real-time Analysis & Metrics</p>
            </div>
          </div>

          <div className="bg-primary/10 border-2 border-primary rounded-xl p-8 max-w-4xl mx-auto mb-12">
            <p className="font-semibold text-xl mb-4">The platform analyzes:</p>
            <ul className="space-y-3 text-muted-foreground text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span>Arm slot, knee flexion, torque separation, hip-shoulder-elbow sequencing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span>Injury risk flags with prevention recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span>Personalized drills, mindset coaching, and strength plans</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1 text-xl">✓</span>
                <span>Progress tracking across sessions</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-3xl font-bold mb-4">This isn't charity — it's a bridge.</p>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              I'll personally return 2× your contribution once we launch + you keep lifetime access
            </p>
            <button
              onClick={scrollToTiers}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-5 px-12 rounded-lg text-xl shadow-neon transition-all hover:scale-105"
            >
              Support on GoFundMe →
            </button>
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section id="donation-tiers" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <Trophy className="inline mr-3 text-primary" size={36} />
            Founding Member Tiers
          </h2>
          <DonationTiers />
        </div>
      </section>

      {/* Badge Wall */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <BadgeWall />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-primary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground mb-4">
            #SoftballProAI #SoftballParents #AIforSoftball #WomenInTech
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by Kimberly (Shannon's mom) in Atlanta, GA
          </p>
        </div>
      </footer>
    </div>
  );
}
