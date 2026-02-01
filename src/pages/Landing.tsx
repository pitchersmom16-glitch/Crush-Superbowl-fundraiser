import { useNavigate } from 'react-router-dom';
import { Trophy, DollarSign, Calendar } from 'lucide-react';
import heroImage from '../../../softballproai-brand/client/src/assets/hero.jpg';
import logo from '../../../softballproai-brand/client/src/assets/logo.jpg';
import { Button } from '../../../softballproai-brand/client/src/components/ui/button';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#2ecc71]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center text-white mb-12">
            <img src={logo} alt="SoftballProAI Logo" className="w-48 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              SoftballProAI
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Become a Founding Member
            </h2>
            <p className="text-xl md:text-2xl mb-2">
              Help us build the first AI-powered softball coaching platform for girls
            </p>
            <p className="text-lg flex items-center justify-center gap-2">
              <Calendar size={20} />
              All donations fully repaid once funded
            </p>
          </div>

          {/* Instructions - How the program works */}
          <div className="bg-white rounded-lg p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>Claim your spot</strong> — Click &quot;Claim Your Spot Now!&quot; below, pick an available square, and enter your name, email, and phone.</li>
              <li><strong>Contribute $20</strong> — Venmo <strong>@SoftballProAI</strong> with your name in the note.</li>
              <li><strong>Get founding member status</strong> — You&apos;ll receive lifetime premium access and exclusive founding member benefits.</li>
              <li><strong>Full repayment guaranteed</strong> — Once the project is funded, all donations will be <strong>fully repaid</strong> to founding members, and you&apos;ll keep your lifetime premium access!</li>
            </ol>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold">$20 Founding Member</h3>
              </div>
              <p className="text-gray-700">
                Venmo <strong>@SoftballProAI</strong> with your name in the note after claiming your spot.
              </p>
              <p className="text-sm text-green-700 font-semibold mt-2">
                💰 100% repaid once funded!
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-600" size={32} />
                <h3 className="text-2xl font-bold">Member Benefits</h3>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li><strong>✓</strong> Lifetime Premium Access</li>
                <li><strong>✓</strong> AI-Powered Coaching</li>
                <li><strong>✓</strong> Early Feature Access</li>
                <li><strong>✓</strong> Full Donation Repayment</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">Limited to first 100 founding members</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={() => navigate('/board')}
              size="lg"
              className="text-2xl px-12 py-6 font-bold"
            >
              Become a Founding Member
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-white mt-12">
            <p className="text-lg font-semibold">Building the Future of Softball Coaching</p>
            <p className="text-sm mt-2 opacity-90">The first AI-powered platform for girls softball</p>
            <p className="text-xs mt-2 opacity-75">All donations fully repaid once project is funded</p>
          </div>
        </div>
      </div>
    </div>
  );
}
