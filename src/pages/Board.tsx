import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Square as SquareType, BoardConfig } from '../types/index';
import { Square } from '../components/Square';
import { ClaimModal } from '../components/ClaimModal';
import { SquareDetailsModal } from '../components/SquareDetailsModal';

export function Board() {
  const navigate = useNavigate();
  const [squares, setSquares] = useState<SquareType[]>([]);
  const [boardConfig, setBoardConfig] = useState<BoardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [viewingSquare, setViewingSquare] = useState<SquareType | null>(null);
  const [currentQuarter, setCurrentQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'FINAL'>('Q1');
  const [patriotsScore, setPatriotsScore] = useState('');
  const [seahawksScore, setSeahawksScore] = useState('');
  const [winnerMessage, setWinnerMessage] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: squaresData, error: squaresError } = await supabase
        .from('squares')
        .select('*')
        .order('position');

      if (squaresError) throw squaresError;

      if (!squaresData || squaresData.length === 0) {
        const newSquares = Array.from({ length: 100 }, (_, i) => ({
          position: i,
          buyer_name: null,
          buyer_email: null,
          buyer_phone: null,
          venmo_username: null,
          payment_confirmed: false,
        }));

        const { error: insertError } = await supabase
          .from('squares')
          .insert(newSquares);

        if (insertError) throw insertError;

        const { data: reloadedSquares } = await supabase
          .from('squares')
          .select('*')
          .order('position');

        setSquares(reloadedSquares || []);
      } else {
        setSquares(squaresData);
      }

      const { data: configData, error: configError } = await supabase
        .from('board_config')
        .select('*')
        .single();

      if (configError && configError.code !== 'PGRST116') throw configError;
      setBoardConfig(configData);
    } catch (error: any) {
      console.error('Error loading data:', error);
      alert('Failed to load board data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const squaresSubscription = supabase
      .channel('squares-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'squares' }, () => {
        loadData();
      })
      .subscribe();

    const configSubscription = supabase
      .channel('config-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'board_config' }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      squaresSubscription.unsubscribe();
      configSubscription.unsubscribe();
    };
  }, []);

  const getWinningSquares = () => {
    if (!boardConfig?.numbers_assigned) return new Set();
    const winners = new Set<number>();

    const checkWinner = (patriotsScore: number | null, seahawksScore: number | null) => {
      if (patriotsScore === null || seahawksScore === null) return;
      if (!boardConfig.chiefs_numbers || !boardConfig.eagles_numbers) return;

      const patriotsDigit = patriotsScore % 10;
      const seahawksDigit = seahawksScore % 10;

      // Seahawks = TOP (columns) = chiefs_numbers
      // Patriots = LEFT (rows) = eagles_numbers
      const seahawksIndex = boardConfig.chiefs_numbers.indexOf(seahawksDigit);
      const patriotsIndex = boardConfig.eagles_numbers.indexOf(patriotsDigit);

      if (patriotsIndex !== -1 && seahawksIndex !== -1) {
        const position = patriotsIndex * 10 + seahawksIndex;
        winners.add(position);
      }
    };

    checkWinner(boardConfig.q1_chiefs_score, boardConfig.q1_eagles_score);
    checkWinner(boardConfig.q2_chiefs_score, boardConfig.q2_eagles_score);
    checkWinner(boardConfig.q3_chiefs_score, boardConfig.q3_eagles_score);
    checkWinner(boardConfig.final_chiefs_score, boardConfig.final_eagles_score);

    return winners;
  };

  const winningSquares = getWinningSquares();

  const claimedCount = squares.filter(s => s.buyer_name).length;
  const allClaimed = claimedCount === 100;
  const canRandomize = allClaimed && !boardConfig?.numbers_assigned;

  const handleRandomizeNumbers = async () => {
    if (!confirm('Are you sure? This will randomly assign numbers and lock the game!')) return;

    const shuffleArray = (array: number[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const chiefs_numbers = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const eagles_numbers = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const { error } = await supabase
      .from('board_config')
      .update({
        numbers_assigned: true,
        chiefs_numbers,
        eagles_numbers,
      })
      .eq('id', boardConfig?.id);

    if (error) {
      alert('Failed to assign numbers');
    } else {
      alert('🎲 Numbers randomized! Game locked!');
      loadData();
    }
  };

  const handleCheckWinner = () => {
    if (!patriotsScore || !seahawksScore) {
      alert('Please enter both scores');
      return;
    }
    if (!boardConfig?.numbers_assigned || !boardConfig.chiefs_numbers || !boardConfig.eagles_numbers) {
      alert('Numbers must be randomized first');
      return;
    }

    const patriotsDigit = parseInt(patriotsScore) % 10;
    const seahawksDigit = parseInt(seahawksScore) % 10;

    // Seahawks = TOP (columns) = chiefs_numbers
    // Patriots = LEFT (rows) = eagles_numbers
    const seahawksIndex = boardConfig.chiefs_numbers.indexOf(seahawksDigit);
    const patriotsIndex = boardConfig.eagles_numbers.indexOf(patriotsDigit);

    if (patriotsIndex !== -1 && seahawksIndex !== -1) {
      const position = patriotsIndex * 10 + seahawksIndex;
      const winningSquare = squares.find(s => s.position === position);
      
      if (winningSquare?.buyer_name) {
        setWinnerMessage(`🎉 ${winningSquare.buyer_name} is Founding Member #${position} for SoftballProAI!`);
      } else {
        setWinnerMessage(`Founding Member Spot #${position} for SoftballProAI!`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading board...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Home size={24} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl font-bold">Founding Member Board</h1>
        </div>

        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 w-full text-left font-bold text-lg text-blue-800 hover:text-blue-600"
          >
            <ChevronDown size={24} className={`transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
            📋 How to Become a Founding Member
          </button>
          
          {showInstructions && (
            <div className="mt-4 space-y-3 text-gray-700">
              <div>
                <h3 className="font-bold text-blue-900">What is SoftballProAI?</h3>
                <p>We&apos;re building the first AI-powered softball coaching platform for girls. A 10×10 grid with 100 founding member spots. Each membership costs $20 and grants you lifetime premium access.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-blue-900">How It Works:</h3>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li><strong>Step 1:</strong> Claim your spot - Enter your name, email, and phone</li>
                  <li><strong>Step 2:</strong> Contribute $20 via Venmo to @SoftballProAI</li>
                  <li><strong>Step 3:</strong> Get immediate founding member status</li>
                  <li><strong>Step 4:</strong> Once funded, receive full repayment + keep lifetime access!</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-blue-900">Founding Member Benefits:</h3>
                <ul className="space-y-1 ml-4">
                  <li>✓ <strong>Lifetime Premium Access</strong> to all features</li>
                  <li>✓ <strong>AI-Powered Training Analysis</strong> for your athletes</li>
                  <li>✓ <strong>Early Access to New Features</strong> before public release</li>
                  <li>✓ <strong>Full Donation Repayment</strong> once project is funded</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-blue-900">Our Mission:</h3>
                <p className="ml-4 bg-white p-2 rounded border border-gray-300">
                  Help us build the first AI-powered softball coaching platform for girls. Your contribution helps launch the platform, and you&apos;ll be repaid in full once we&apos;re funded while keeping all founding member benefits!
                </p>
              </div>

              <div className="bg-yellow-100 border border-yellow-400 rounded p-2 text-sm">
                <strong>💡 Remember:</strong> Only 100 founding member spots available! All donations will be fully repaid once the project is funded.
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 text-center">
          {!allClaimed ? (
            <div className="bg-blue-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">CLAIM YOUR SPOT! {claimedCount}/100 founding members</span>
              <p className="text-sm mt-1">SoftballProAI Founding Member Program</p>
            </div>
          ) : !boardConfig?.numbers_assigned ? (
            <div className="bg-yellow-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">ALL SPOTS CLAIMED! Ready to finalize</span>
              <p className="text-sm mt-1">SoftballProAI Founding Member Program</p>
            </div>
          ) : (
            <div className="bg-green-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">FOUNDING MEMBERS LOCKED IN!</span>
              <p className="text-sm mt-1">SoftballProAI — Building the future of softball coaching</p>
            </div>
          )}
        </div>

        {canRandomize && (
          <div className="mb-6 text-center">
            <button
              onClick={handleRandomizeNumbers}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all"
            >
              🎲 RANDOMIZE NUMBERS - LOCK GAME
            </button>
          </div>
        )}

        {boardConfig?.numbers_assigned && (
          <div className="mb-6 bg-white rounded-lg p-6 shadow-lg border-2 border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center">Score Tracker & Winner Finder</h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quarter</label>
                <select
                  value={currentQuarter}
                  onChange={(e) => setCurrentQuarter(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="FINAL">FINAL</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Patriots Score</label>
                <input
                  type="number"
                  value={patriotsScore}
                  onChange={(e) => setPatriotsScore(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Seahawks Score</label>
                <input
                  type="number"
                  value={seahawksScore}
                  onChange={(e) => setSeahawksScore(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="0"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleCheckWinner}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  🎯 CHECK WINNER
                </button>
              </div>
            </div>

            {winnerMessage && (
              <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-yellow-800">{winnerMessage}</p>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mb-2 sm:hidden">← Swipe to see full board →</p>
        <div className="bg-white rounded-lg p-2 sm:p-4 shadow-lg overflow-x-auto overflow-y-hidden -mx-2 sm:mx-0 board-scroll">
          <div className="min-w-[420px] w-max">
          {/* TOP HEADER: Seattle Seahawks (columns) - GREEN */}
          <div className="grid grid-cols-11 gap-0.5 sm:gap-1 mb-0.5 sm:mb-1" style={{ gridTemplateColumns: 'minmax(28px, 1fr) repeat(10, minmax(32px, 1fr))' }}>
            <div className="bg-green-600 text-white font-bold p-1 sm:p-2 text-center rounded text-[10px] sm:text-xs leading-tight">
              Seattle Seahawks
            </div>
            {boardConfig?.numbers_assigned && boardConfig.chiefs_numbers ? (
              boardConfig.chiefs_numbers.map((num, idx) => (
                <div key={idx} className="bg-green-100 text-green-800 font-bold p-1 sm:p-2 text-center rounded text-xs sm:text-sm min-w-[28px]">
                  {num}
                </div>
              ))
            ) : (
              Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 p-1 sm:p-2 text-center rounded text-gray-500 text-xs min-w-[28px]">
                  ?
                </div>
              ))
            )}
          </div>

          {/* LEFT HEADER: New England Patriots (rows) - BLUE */}
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-11 gap-1 mb-1">
              {boardConfig?.numbers_assigned && boardConfig.eagles_numbers ? (
                <div className="bg-blue-100 text-blue-800 font-bold p-1 sm:p-2 text-center rounded text-xs sm:text-sm min-w-[28px] min-h-[32px] flex items-center justify-center">
                  {boardConfig.eagles_numbers[rowIdx]}
                </div>
              ) : rowIdx === 0 ? (
                <div className="bg-blue-800 text-white font-bold p-1 sm:p-2 text-center rounded text-[10px] sm:text-xs leading-tight min-w-[28px]">
                  NE Patriots
                </div>
              ) : (
                <div className="bg-gray-200 p-1 sm:p-2 text-center rounded text-gray-500 text-xs min-w-[28px] min-h-[32px] flex items-center justify-center">
                  ?
                </div>
              )}

              {Array.from({ length: 10 }).map((_, colIdx) => {
                const position = rowIdx * 10 + colIdx;
                const square = squares.find(s => s.position === position);
                if (!square) return null;

                return (
                  <Square
                    key={position}
                    square={square}
                    onClick={() => {
                      if (square.buyer_name) {
                        setViewingSquare(square);
                      } else {
                        setSelectedSquare(position);
                      }
                    }}
                    isWinner={winningSquares.has(position)}
                  />
                );
              })}
            </div>
          ))}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>Claimed: {claimedCount} | Available: {100 - claimedCount}</p>
        </div>

        <div className="mt-8 text-center text-gray-600 border-t pt-6">
          <p className="font-semibold text-lg">SoftballProAI — Building the Future of Softball Coaching</p>
          <p className="text-sm mt-1">Super Bowl XLIX Fundraiser - Patriots vs Seahawks</p>
        </div>
      </div>

      {selectedSquare !== null && (
        <ClaimModal
          squareNumber={selectedSquare}
          onClose={() => setSelectedSquare(null)}
          onSuccess={loadData}
        />
      )}

      {viewingSquare && (
        <SquareDetailsModal
          square={viewingSquare}
          onClose={() => setViewingSquare(null)}
          onSuccess={loadData}
        />
      )}
    </div>
  );
}