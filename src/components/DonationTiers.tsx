import { useState } from 'react';
import { PaymentModal } from './PaymentModal';

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

  const handleDonate = (tier: Tier) => {
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tiers.map((tier) => (
          <div 
            key={tier.amount}
            className="bg-card border-2 border-primary rounded-lg p-6 hover:shadow-neon transition-all duration-300"
          >
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-primary mb-2">${tier.amount}</div>
              <div className="text-xl font-semibold text-foreground mb-2">{tier.name}</div>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-accent/10 border border-accent rounded p-2 mb-4 text-xs text-center">
              💰 2× Payback: Get ${tier.amount * 2} back when we launch + keep lifetime access!
            </div>

            <button
              onClick={() => handleDonate(tier)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all hover:shadow-neon"
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
        />
      )}
    </>
  );
}
