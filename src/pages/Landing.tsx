import { Trophy } from 'lucide-react';
import { DonationTiers } from '../components/DonationTiers';
import { BadgeWall } from '../components/BadgeWall';
import logo from '../../softballproai-brand/client/src/assets/logo.jpg';

// Shannon Action Shots - HERO IMAGES
import shannonHero from '../Images/UseHeroImageShannon.jpg';
import shannonHitting from '../Images/UseHittingImageShannon.jpg';

// Personal Photos - Me & Shannon
import meAndShannon1 from '../Images/Use 1 me and Shannon.jpg';
import meAndShannon2 from '../Images/Use 2 me and Shannon.jpg';
import meAndShannon3 from '../Images/Use 3 me and shannon.jpg';

// Product/Context Photos
import softballMoms from '../Images/UseSoftballMoms.jpg';
import techPhoto from '../Images/UseTechPhoto1.jpg';

export function Landing() {

  const scrollToTiers = () => {
    document.getElementById('donation-tiers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-background via-card to-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* SoftballProAI Logo */}
          <div className="text-center mb-12">
            <img 
              src={logo} 
              alt="SoftballProAI Logo" 
              className="w-72 md:w-96 mx-auto drop-shadow-neon"
            />
          </div>

          {/* Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary leading-tight">
              Softball Pro AI
            </h1>
            <p className="text-2xl md:text-4xl font-semibold mb-6 text-foreground leading-tight">
              Built by a mom for young softball players
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto">
              AI-powered biomechanics analysis helping girls ages 8U–16U train smarter and safer
            </p>
            <button
              onClick={scrollToTiers}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 px-16 rounded-lg text-2xl shadow-neon transition-all hover:scale-105"
            >
              Become a Founding Member
            </button>
          </div>

          {/* SHANNON HERO IMAGE - MOST PROMINENT */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative rounded-3xl overflow-hidden border-4 border-primary shadow-[0_0_50px_rgba(57,255,20,0.9)]">
              <img 
                src={shannonHero} 
                alt="Shannon - The inspiration behind SoftballProAI" 
                className="w-full h-[700px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-10">
                <p className="text-4xl md:text-5xl font-bold text-primary mb-3">Shannon — Every Feature Built For Her</p>
                <p className="text-xl md:text-2xl text-white">This is why we're building SoftballProAI</p>
              </div>
            </div>
          </div>

          {/* Shannon Hitting - Secondary Hero */}
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/70 shadow-[0_0_35px_rgba(57,255,20,0.7)]">
              <img 
                src={shannonHitting} 
                alt="Shannon hitting - Training smarter with AI" 
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-2xl md:text-3xl font-bold text-primary">Shannon at the Plate</p>
                <p className="text-lg md:text-xl text-white">Real-time biomechanics analysis in action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONAL STORY SECTION */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Why I'm Building This</h2>
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed">
            Hi, I'm Kimberly — a single mom, lifelong softball supporter, and Shannon's #1 fan. 
            For years, Lyme disease and fibromyalgia made even basic tasks feel impossible. 
            But after starting HRT therapy, my focus returned stronger than ever.
          </p>
          
          {/* Me & Shannon Photos - All Centered and Even */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="overflow-hidden rounded-2xl border-4 border-primary/50 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShannon1} 
                  alt="Kimberly and Shannon" 
                  className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Our Journey Together</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-2xl border-4 border-primary/50 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShannon2} 
                  alt="Every practice matters" 
                  className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Every Practice Counts</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-2xl border-4 border-primary/50 hover:border-primary transition-all shadow-lg">
                <img 
                  src={meAndShannon3} 
                  alt="Building her future" 
                  className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Building Her Future</p>
            </div>
          </div>

          {/* Community Context */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group">
              <div className="overflow-hidden rounded-xl border-3 border-accent/50 hover:border-accent transition-all shadow-lg">
                <img 
                  src={softballMoms} 
                  alt="Softball community - parents and coaches" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">Built for the Softball Community</p>
            </div>
            <div className="group">
              <div className="overflow-hidden rounded-xl border-3 border-accent/50 hover:border-accent transition-all shadow-lg">
                <img 
                  src={techPhoto} 
                  alt="SoftballProAI technology platform" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-center text-base text-muted-foreground mt-4 font-medium">AI-Powered Biomechanics Analysis</p>
            </div>
          </div>

          {/* Urgent Need */}
          <div className="bg-accent/10 border-2 border-accent rounded-2xl p-10 max-w-4xl mx-auto">
            <p className="font-bold text-2xl mb-4 text-accent">🚨 We're 30 days away from a wall.</p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Rent and essentials are due, and I've maxed out free trials on the AI tools needed to finish the MVP. 
              I'm asking for help to cover one month of rent & living expenses, paid AI tool credits, and enough runway 
              to polish the product and get it into coaches' and parents' hands.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING SECTION */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">It's Already Real</h2>
          <p className="text-center text-2xl md:text-3xl text-primary font-bold mb-16">
            Real-time swing & pitch analysis
          </p>
          
          <div className="bg-primary/10 border-3 border-primary rounded-2xl p-10 max-w-5xl mx-auto mb-16">
            <p className="font-bold text-2xl mb-6 text-center">The platform analyzes:</p>
            <ul className="space-y-4 text-muted-foreground text-lg">
              <li className="flex items-start gap-4">
                <span className="text-primary mt-1 text-2xl font-bold">✓</span>
                <span>Arm slot, knee flexion, torque separation, hip-shoulder-elbow sequencing</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary mt-1 text-2xl font-bold">✓</span>
                <span>Injury risk flags with prevention recommendations</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary mt-1 text-2xl font-bold">✓</span>
                <span>Personalized drills, mindset coaching, and strength plans</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary mt-1 text-2xl font-bold">✓</span>
                <span>Progress tracking across sessions</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-6">This isn't charity — it's a bridge.</p>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto">
              I'll personally return 2× your contribution once we launch + you keep lifetime access
            </p>
            <button
              onClick={scrollToTiers}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6 px-16 rounded-lg text-2xl shadow-neon transition-all hover:scale-105"
            >
              Support This Mission →
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
