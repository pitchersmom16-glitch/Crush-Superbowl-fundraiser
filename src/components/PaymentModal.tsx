import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentModalProps {
  tier: {
    amount: number;
    name: string;
  };
  onClose: () => void;
  onClaimBadge?: () => void;
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

export function PaymentModal({ tier, onClose, onClaimBadge }: PaymentModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 sm:p-6 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-card border-2 border-primary rounded-lg w-full max-w-full sm:max-w-2xl p-4 sm:p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
          aria-label="Close donation modal"
        >
          <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 
          id="payment-modal-title"
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center pr-8"
        >
          Complete Your Donation
        </h2>
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
            ${tier.amount} — {tier.name}
          </div>
        </div>

        <div className="bg-accent/10 border border-accent rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-center">
          <p className="font-semibold mb-2 text-sm sm:text-base">Choose Your Payment Method</p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            After completing your contribution, return to this page to claim your Founding Member badge.
          </p>
          <p className="text-xs sm:text-sm text-accent font-semibold">
            💰 Remember: You'll get 2× back (${tier.amount * 2}) when we launch!
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="border border-primary rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base sm:text-lg">{method.name}</div>
                  <div className="text-sm sm:text-base text-muted-foreground break-all">{method.handle}</div>
                </div>
                <button
                  onClick={() => handleCopy(method.copyText, index)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 sm:py-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] w-full sm:w-auto whitespace-nowrap"
                  aria-label={`Copy ${method.name} handle`}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={16} />
                      <span className="text-sm sm:text-base">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="text-sm sm:text-base">Copy</span>
                    </>
                  )}
                </button>
              </div>
              {method.link && (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                  aria-label={`Open ${method.name} in new tab`}
                >
                  Open {method.name} →
                </a>
              )}
            </div>
          ))}

          {import.meta.env.VITE_STRIPE_PUBLIC_KEY && (
            <div className="border border-primary rounded-lg p-3 sm:p-4">
              <div className="font-bold text-base sm:text-lg mb-3">Credit/Debit Card</div>
              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] text-sm sm:text-base">
                Pay with Stripe
              </button>
            </div>
          )}
        </div>

        {onClaimBadge && (
          <button
            onClick={() => {
              onClose();
              onClaimBadge();
            }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/50 min-h-[48px] text-base sm:text-lg mb-4 sm:mb-6"
            aria-label="Proceed to claim your founding member badge"
          >
            ✓ I Completed My Donation — Claim My Badge Now
          </button>
        )}

        <div className="bg-muted/20 border border-border rounded-lg p-3 sm:p-4 text-xs sm:text-sm space-y-2">
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
