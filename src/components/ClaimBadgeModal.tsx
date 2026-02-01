import { useState } from 'react';
import { X } from 'lucide-react';

interface ClaimBadgeModalProps {
  badgeNumber: number;
  onClose: () => void;
  onSuccess: () => void;
}

const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];

export function ClaimBadgeModal({ badgeNumber, onClose, onSuccess }: ClaimBadgeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 'Bronze',
    confirmed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.confirmed) {
      setError('Please confirm you completed your donation');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/founding-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          tier: formData.tier,
          email: formData.email.trim() || null,
          badge_number: badgeNumber
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to claim badge');
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to claim badge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-card border-2 border-primary rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">Claim Badge #{badgeNumber}</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          SoftballProAI Founding Member Program
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name / Family Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              autoFocus
              placeholder="The Smith Family"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-input border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-input border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Tier <span className="text-destructive">*</span>
            </label>
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              className="w-full px-4 py-2 bg-input border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            >
              {tiers.map(tier => (
                <option key={tier} value={tier}>{tier} Founding Member</option>
              ))}
            </select>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="confirmed"
              checked={formData.confirmed}
              onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
              className="mt-1"
              required
            />
            <label htmlFor="confirmed" className="text-sm">
              I confirm I completed my donation via Venmo, Cash App, Zelle, PayPal, or Stripe
            </label>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Claiming...' : 'Claim Badge'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
