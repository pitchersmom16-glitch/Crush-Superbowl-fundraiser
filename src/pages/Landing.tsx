import { useNavigate } from 'react-router-dom';
import { Trophy, DollarSign, Calendar } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#2ecc71]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              West Cobb Crush
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Super Bowl Squares
            </h2>
            <p className="text-xl md:text-2xl mb-2">
              Patriots vs Seahawks
            </p>
            <p className="text-lg flex items-center justify-center gap-2">
              <Calendar size={20} />
              February 9, 2025
            </p>
          </div>

          {/* Instructions - How the game works */}
          <div className="bg-white rounded-lg p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>Claim a square</strong> — Click &quot;Buy Squares&quot; below, pick an available square, and enter your name, email, and phone.</li>
              <li><strong>Pay $20</strong> — Venmo <strong>@WCCRUSH2014</strong> with your name in the note.</li>
              <li><strong>Numbers are randomized</strong> — After all 100 squares are claimed, we randomly assign 0–9 to Patriots (columns) and Seahawks (rows).</li>
              <li><strong>Win each quarter</strong> — The last digit of each team&apos;s score (e.g. Patriots 17, Seahawks 13 → 7 and 3) finds the winning square. Payouts: <strong>Q1 $200</strong>, <strong>Q2 $200</strong>, <strong>Q3 $200</strong>, <strong>Final $300</strong>.</li>
            </ol>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold">$20 per Square</h3>
              </div>
              <p className="text-gray-700">
                Venmo <strong>@WCCRUSH2014</strong> with your name in the note after claiming a square.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-yellow-600" size={32} />
                <h3 className="text-2xl font-bold">Payouts</h3>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li><strong>Q1:</strong> $200</li>
                <li><strong>Q2:</strong> $200</li>
                <li><strong>Q3:</strong> $200</li>
                <li><strong>Final:</strong> $300</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">Patriots = columns (top). Seahawks = rows (left).</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/board')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-2xl px-12 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Buy Squares Now!
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-white mt-12">
            <p className="text-lg font-semibold">Supporting West Cobb Crush 2014 Haney/Woodman</p>
            <p className="text-sm mt-2 opacity-90">Softball Team Fundraiser</p>
          </div>
        </div>
      </div>
    </div>
  );
}
