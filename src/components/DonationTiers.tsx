import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { ClaimBadgeModal } from './ClaimBadgeModal';

interface Tier {
  amount: number;
  name: string;
  description: string;
  benefits: string[];
}

const tiers: Tier[] = [
  {
    amount: 25,
    name: 'Bronze Founding Member',
    description: 'Help keep the lights on',
    benefits: ['2× Payback ($50 returned)', 'Lifetime Free Access', 'Founding Member Badge', 'Your Name in Credits']
  },
  {
    amount: 50,
    name: 'Silver Founding Member',
    description: 'Keep the code flowing',
    benefits: ['2× Payback ($100 returned)', 'All Bronze Benefits', 'Early Feature Access', 'Priority Support']
  },
  {
    amount: 100,
    name: 'Gold Founding Member',
    description: 'Help us finish the MVP',
    benefits: ['2× Payback ($200 returned)', 'All Silver Benefits', 'Beta Tester Access', 'Direct Feedback Line']
  },
  {
    amount: 250,
    name: 'Platinum Founding Member',
    description: 'Change a girl\'s softball future',
    benefits: ['2× Payback ($500 returned)', 'All Gold Benefits', 'Lifetime VIP Status', 'Personal Thank You Call']
  }
];

export function DonationTiers() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleDonate = (tier: Tier) => {
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };

  const handleClaimBadge = () => {
    setShowClaimModal(true);
  };

  const handleClaimSuccess = () => {
    setShowClaimModal(false);
    setSelectedTier(null);
    // Scroll to badge wall
    const badgeWall = document.getElementById('badge-wall');
    if (badgeWall) {
      badgeWall.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {tiers.map((tier) => (
          <div 
            key={tier.amount}
            className="bg-card border-2 border-primary rounded-lg p-4 sm:p-6 hover:shadow-neon transition-all duration-300 flex flex-col"
            role="article"
            aria-label={`${tier.name} donation tier`}
          >
            <div className="text-center mb-4">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">${tier.amount}</div>
              <div className="text-lg sm:text-xl font-semibold text-foreground mb-2">{tier.name}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">{tier.description}</p>
            </div>

            <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="text-xs sm:text-sm flex items-start gap-2">
                  <span className="text-primary flex-shrink-0 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-accent/10 border border-accent rounded p-2 mb-4 text-xs text-center">
              💰 2× Payback: Get ${tier.amount * 2} back when we launch + keep lifetime access!
            </div>

            <button
              onClick={() => handleDonate(tier)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] text-sm sm:text-base"
              aria-label={`Donate ${tier.amount} dollars for ${tier.name}`}
            >
              Donate
            </button>
          </div>
        ))}
      </div>

      {showPaymentModal && selectedTier && (
        <PaymentModal
          tier={selectedTier}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedTier(null);
          }}
          onClaimBadge={handleClaimBadge}
        />
      )}

      {showClaimModal && selectedTier && (
        <ClaimBadgeModal
          preselectedTier={selectedTier.name.split(' ')[0]} // Extract tier name (Bronze, Silver, etc.)
          onClose={() => {
            setShowClaimModal(false);
            setSelectedTier(null);
          }}
          onSuccess={handleClaimSuccess}
        />
      )}
    </>
  );
}
