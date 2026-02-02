import { useState, useEffect } from 'react';
import { ClaimBadgeModal } from './ClaimBadgeModal';

interface FoundingMember {
  id: number;
  name: string;
  tier: string;
  created_at: string;
}

export function BadgeWall() {
  const [members, setMembers] = useState<FoundingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const totalBadges = 100;

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await fetch('/api/founding-members');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Failed to load founding members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimBadge = (index: number) => {
    setSelectedBadgeIndex(index);
    setShowClaimModal(true);
  };

  const handleClaimSuccess = () => {
    setShowClaimModal(false);
    setSelectedBadgeIndex(null);
    loadMembers();
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum': return 'border-purple-500 bg-purple-500/10';
      case 'gold': return 'border-yellow-500 bg-yellow-500/10';
      case 'silver': return 'border-gray-400 bg-gray-400/10';
      case 'bronze': return 'border-orange-600 bg-orange-600/10';
      default: return 'border-primary bg-primary/10';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl">Loading Founding Members...</div>
      </div>
    );
  }

  const claimedCount = members.filter(m => m !== null).length;

  return (
    <>
      <div id="badge-wall" className="mb-12">
        <h2 className="text-4xl font-bold text-center mb-4">Founding Member Wall</h2>
        <p className="text-center text-muted-foreground mb-2">
          {claimedCount} of {totalBadges} badges claimed
        </p>
        <div className="w-full bg-muted rounded-full h-4 mb-8">
          <div 
            className="bg-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${(claimedCount / totalBadges) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: totalBadges }, (_, index) => {
            const member = members[index];
            
            if (member) {
              return (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-4 text-center ${getTierColor(member.tier)} shadow-neon`}
                >
                  <div className="font-bold text-lg mb-1 truncate">{member.name}</div>
                  <div className="text-sm text-primary font-semibold">{member.tier}</div>
                  <div className="text-xs text-muted-foreground mt-1">Founding Member</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    #{index + 1}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => handleClaimBadge(index)}
                className="border-2 border-dashed border-primary rounded-lg p-4 text-center hover:bg-primary/5 transition-all group"
              >
                <div className="text-sm text-muted-foreground mb-2">Available</div>
                <div className="text-xs text-primary font-semibold group-hover:underline">
                  Claim Badge #{index + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showClaimModal && selectedBadgeIndex !== null && (
        <ClaimBadgeModal
          badgeNumber={selectedBadgeIndex + 1}
          onClose={() => {
            setShowClaimModal(false);
            setSelectedBadgeIndex(null);
          }}
          onSuccess={handleClaimSuccess}
        />
      )}
    </>
  );
}
