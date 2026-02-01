import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  tier: {
    amount: number;
    name: string;
  };
  onClose: () => void;
}

const paymentMethods = [
  {
    name: 'Venmo',
    handle: '@Kimberly-Tarnovska',
    copyText: '@Kimberly-Tarnovska',
    link: 'venmo://paycharge?txn=pay&recipients=Kimberly-Tarnovska'
  },
  {
    name: 'Cash App',
    handle: '$ktarnovska',
    copyText: '$ktarnovska',
    link: 'https://cash.app/$ktarnovska'
  },
  {
    name: 'Zelle',
    handle: '407-844-3834',
    copyText: '4078443834',
    link: null
  },
  {
    name: 'PayPal',
    handle: '@ktarnovska',
    copyText: '@ktarnovska',
    link: 'https://paypal.me/ktarnovska'
  }
];

export function PaymentModal({ tier, onClose }: PaymentModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-card border-2 border-primary rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center">Complete Your Donation</h2>
        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-primary">${tier.amount} — {tier.name}</div>
        </div>

        <div className="bg-accent/10 border border-accent rounded-lg p-4 mb-6 text-center">
          <p className="font-semibold mb-2">Choose Your Payment Method</p>
          <p className="text-sm text-muted-foreground mb-2">
            After completing your contribution, return to this page to claim your Founding Member badge.
          </p>
          <p className="text-xs text-accent font-semibold">
            💰 Remember: You'll get 2× back (${tier.amount * 2}) when we launch!
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="border border-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-lg">{method.name}</div>
                  <div className="text-muted-foreground">{method.handle}</div>
                </div>
                <button
                  onClick={() => handleCopy(method.copyText, index)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded transition-all"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              {method.link && (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Open {method.name} →
                </a>
              )}
            </div>
          ))}

          {import.meta.env.VITE_STRIPE_PUBLIC_KEY && (
            <div className="border border-primary rounded-lg p-4">
              <div className="font-bold text-lg mb-2">Credit/Debit Card</div>
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded transition-all">
                Pay with Stripe
              </button>
            </div>
          )}
        </div>

        <div className="bg-muted/20 border border-border rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold">Personal Promise from Kimberly:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>I will personally return 2× your contribution once we launch and generate revenue</li>
            <li>You'll keep your lifetime premium access and founding member benefits</li>
            <li>This is not an investment or equity offering — it's a personal promise</li>
            <li>Contributions are voluntary and support finishing the MVP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
