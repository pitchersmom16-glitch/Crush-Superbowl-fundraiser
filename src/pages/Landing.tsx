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
              Chiefs vs Eagles
            </p>
            <p className="text-lg flex items-center justify-center gap-2">
              <Calendar size={20} />
              February 9, 2025
            </p>
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
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Click "Buy Squares" below to see the board</li>
              <li>Choose an available square (gray) and claim it</li>
              <li>Pay $20 via Venmo to @WCCRUSH2014</li>
              <li>Numbers will be randomly assigned before the game</li>
              <li>Win based on the last digit of each team's score!</li>
            </ol>
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
