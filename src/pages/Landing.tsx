import { Trophy } from 'lucide-react';
import { DonationTiers } from '../components/DonationTiers';
import { BadgeWall } from '../components/BadgeWall';
import logo from '../../softballproai-brand/client/src/assets/logo.jpg';

// Hero & Personal Photos
import heroPhoto from '../Images/Me and Shay.jpg';
import meAndShay2 from '../Images/Me and Shay 2.jpg';
import meAndShay3 from '../Images/Me and Shay 3.jpg';
import heroImage from '../Images/hero.jpg';

// Product Screenshots
import bioScreenshot1 from '../Images/SoftballImage 1.jfif';
import bioScreenshot2 from '../Images/SoftballImage5.jfif';

export function Landing() {

  const scrollToTiers = () => {
    document.getElementById('donation-tiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* HERO SECTION - Full Width with Prominent Branding */}
      <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          
          {/* Logo at top */}
          <div className="text-center mb-8">
            <img src={logo} alt="SoftballProAI Logo" className="w-48 md:w-64 mx-auto drop-shadow-neon" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary leading-tight">
                Softball Pro AI
              </h1>
              <p className="text-3xl md:text-4xl font-semibold mb-6 text-foreground leading-tight">
                Built by a mom for young softball players
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                Helping girls 8U–16U train smarter and safer with AI-powered biomechanics analysis
              </p>
              <button
                onClick={scrollToTiers}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-12 rounded-lg text-2xl shadow-neon transition-all hover:scale-105"
              >
                Become a Founding Member
              </button>
            </div>
            
            {/* Hero Brand Image - Large and Prominent */}
            <div className="order-1 md:order-2">
              <img 
                src={heroImage} 
                alt="SoftballProAI - AI-powered softball coaching platform" 
                className="w-full rounded-xl shadow-neon border-4 border-primary"
              />
              <p className="text-center text-sm text-muted-foreground mt-3">Real-time biomechanics analysis for pitchers and hitters</p>
            </div>
          </div>

          {/* Me & Shannon Photo Below */}
          <div className="mt-16 max-w-2xl mx-auto">
            <img 
              src={heroPhoto} 
              alt="Kimberly and Shannon - The heart behind SoftballProAI" 
              className="w-full rounded-lg shadow-neon border-2 border-primary/30"
            />
            <p className="text-center text-lg text-muted-foreground mt-4">
              <strong className="text-primary">Me & Shannon</strong> — Every feature built with her in mind
            </p>
          </div>
        </div>
      </section>

      {/* PERSONAL SECTION - Me & Shannon Photos */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Why I'm Building This</h2>
          <p className="text-center text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Hi, I'm Kimberly — a single mom, lifelong softball supporter, and Shannon's #1 fan. 
            For years, Lyme disease and fibromyalgia made even basic tasks feel impossible. 
            But after starting HRT therapy, my focus returned stronger than ever.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <img 
                src={heroPhoto} 
                alt="Me and Shannon – why I'm building this" 
                className="w-full rounded-lg border-2 border-primary/30 mb-2"
              />
              <p className="text-center text-sm text-muted-foreground">Me and Shannon – why I'm building this</p>
            </div>
            <div>
              <img 
                src={meAndShay2} 
                alt="Every practice, every dream" 
                className="w-full rounded-lg border-2 border-primary/30 mb-2"
              />
              <p className="text-center text-sm text-muted-foreground">Every practice, every dream</p>
            </div>
            <div>
              <img 
                src={meAndShay3} 
                alt="Building for the next generation of players" 
                className="w-full rounded-lg border-2 border-primary/30 mb-2"
              />
              <p className="text-center text-sm text-muted-foreground">Building for the next generation</p>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent rounded-lg p-6 mt-8 max-w-3xl mx-auto">
            <p className="font-semibold text-lg mb-2">🚨 We're 30 days away from a wall.</p>
            <p className="text-muted-foreground">
              Rent and essentials are due, and I've maxed out free trials on the AI tools needed to finish the MVP. 
              I'm asking for help to cover one month of rent & living expenses, paid AI tool credits, and enough runway 
              to polish the product and get it into coaches' and parents' hands.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION - Biomechanics Screenshots */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">It's Already Real</h2>
          <p className="text-center text-xl text-primary font-semibold mb-8">
            Real-time swing & pitch analysis
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img 
                src={bioScreenshot1} 
                alt="Biomechanics dashboard with video analysis" 
                className="w-full rounded-lg border-2 border-primary shadow-neon"
              />
            </div>
            <div>
              <img 
                src={bioScreenshot2} 
                alt="Real-time metrics: arm slot, knee flexion, injury flags" 
                className="w-full rounded-lg border-2 border-primary shadow-neon"
              />
            </div>
          </div>

          <div className="bg-primary/10 border border-primary rounded-lg p-6 max-w-3xl mx-auto">
            <p className="font-semibold text-lg mb-3">The platform analyzes:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Arm slot, knee flexion, torque separation, hip-shoulder-elbow sequencing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Injury risk flags with prevention recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Personalized drills, mindset coaching, and strength plans</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Progress tracking across sessions</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-semibold mb-4">This isn't charity — it's a bridge.</p>
            <p className="text-lg text-muted-foreground mb-6">
              I'll personally return 2× your contribution once we launch + you keep lifetime access
            </p>
            <button
              onClick={scrollToTiers}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-12 rounded-lg text-xl shadow-neon transition-all"
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
