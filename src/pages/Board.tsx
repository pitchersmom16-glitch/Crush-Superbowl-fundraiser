import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
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
  const [chiefsScore, setChiefsScore] = useState('');
  const [eaglesScore, setEaglesScore] = useState('');
  const [winnerMessage, setWinnerMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      // Load squares
      const { data: squaresData, error: squaresError } = await supabase
        .from('squares')
        .select('*')
        .order('position');

      if (squaresError) throw squaresError;

      // If no squares exist, create them
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

        // Reload squares
        const { data: reloadedSquares } = await supabase
          .from('squares')
          .select('*')
          .order('position');

        setSquares(reloadedSquares || []);
      } else {
        setSquares(squaresData);
      }

      // Load board config
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

    // Subscribe to real-time updates
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

    const checkWinner = (chiefsScore: number | null, eaglesScore: number | null) => {
      if (chiefsScore === null || eaglesScore === null) return;
      if (!boardConfig.chiefs_numbers || !boardConfig.eagles_numbers) return;

      const chiefsDigit = chiefsScore % 10;
      const eaglesDigit = eaglesScore % 10;

      const chiefsIndex = boardConfig.chiefs_numbers.indexOf(chiefsDigit);
      const eaglesIndex = boardConfig.eagles_numbers.indexOf(eaglesDigit);

      if (chiefsIndex !== -1 && eaglesIndex !== -1) {
        const position = eaglesIndex * 10 + chiefsIndex;
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
    if (!chiefsScore || !eaglesScore) {
      alert('Please enter both scores');
      return;
    }
    if (!boardConfig?.numbers_assigned || !boardConfig.chiefs_numbers || !boardConfig.eagles_numbers) {
      alert('Numbers must be randomized first');
      return;
    }

    const chiefsDigit = parseInt(chiefsScore) % 10;
    const eaglesDigit = parseInt(eaglesScore) % 10;

    const chiefsIndex = boardConfig.chiefs_numbers.indexOf(chiefsDigit);
    const eaglesIndex = boardConfig.eagles_numbers.indexOf(eaglesDigit);

    if (chiefsIndex !== -1 && eaglesIndex !== -1) {
      const position = eaglesIndex * 10 + chiefsIndex;
      const winningSquare = squares.find(s => s.position === position);
      
      if (winningSquare?.buyer_name) {
        setWinnerMessage(`🎉 ${winningSquare.buyer_name} WINS ${currentQuarter} for West Cobb Crush 2014 Haney/Woodman!`);
      } else {
        setWinnerMessage(`Square #${position} wins ${currentQuarter} for West Cobb Crush 2014 Haney/Woodman!`);
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Home size={24} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl font-bold">Super Bowl Squares</h1>
        </div>

        {/* Game Status Banner */}
        <div className="mb-6 text-center">
          {!allClaimed ? (
            <div className="bg-blue-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">CLAIM YOUR SQUARE! {claimedCount}/100 claimed</span>
              <p className="text-sm mt-1">West Cobb Crush 2014 Haney/Woodman</p>
            </div>
          ) : !boardConfig?.numbers_assigned ? (
            <div className="bg-yellow-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">ALL SQUARES CLAIMED! Ready to randomize</span>
              <p className="text-sm mt-1">West Cobb Crush 2014 Haney/Woodman</p>
            </div>
          ) : (
            <div className="bg-green-500 text-white py-3 px-6 rounded-lg inline-block">
              <span className="text-xl font-bold">GAME LOCKED & READY! Enter scores to find winners</span>
              <p className="text-sm mt-1">West Cobb Crush 2014 Haney/Woodman</p>
            </div>
          )}
        </div>

        {/* Randomize Button */}
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

        {/* Score Tracker (only show after randomization) */}
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
                <label className="block text-sm font-medium mb-1">Chiefs Score</label>
                <input
                  type="number"
                  value={chiefsScore}
                  onChange={(e) => setChiefsScore(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Eagles Score</label>
                <input
                  type="number"
                  value={eaglesScore}
                  onChange={(e) => setEaglesScore(e.target.value)}
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

        {/* Board */}
        <div className="bg-white rounded-lg p-4 shadow-lg overflow-x-auto">
          {/* Chiefs Header (Top) */}
          <div className="grid grid-cols-11 gap-1 mb-1">
            <div className="bg-red-600 text-white font-bold p-2 text-center rounded">
              Chiefs
            </div>
            {boardConfig?.numbers_assigned && boardConfig.chiefs_numbers ? (
              boardConfig.chiefs_numbers.map((num, idx) => (
                <div key={idx} className="bg-red-100 text-red-800 font-bold p-2 text-center rounded">
                  {num}
                </div>
              ))
            ) : (
              Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 p-2 text-center rounded text-gray-500">
                  ?
                </div>
              ))
            )}
          </div>

          {/* Grid with Eagles header (left) */}
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-11 gap-1 mb-1">
              {/* Eagles Header Cell */}
              {rowIdx === 0 ? (
                <div className="bg-green-600 text-white font-bold p-2 text-center rounded row-span-1">
                  Eagles
                </div>
              ) : rowIdx === 1 && boardConfig?.numbers_assigned && boardConfig.eagles_numbers ? (
                <div className="bg-green-100 text-green-800 font-bold p-2 text-center rounded">
                  {boardConfig.eagles_numbers[rowIdx]}
                </div>
              ) : boardConfig?.numbers_assigned && boardConfig.eagles_numbers ? (
                <div className="bg-green-100 text-green-800 font-bold p-2 text-center rounded">
                  {boardConfig.eagles_numbers[rowIdx]}
                </div>
              ) : rowIdx === 0 ? null : (
                <div className="bg-gray-200 p-2 text-center rounded text-gray-500">
                  ?
                </div>
              )}

              {/* Square cells */}
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

        {/* Stats - Simple version */}
        <div className="mt-6 text-center text-gray-600">
          <p>Claimed: {claimedCount} | Available: {100 - claimedCount}</p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 border-t pt-6">
          <p className="font-semibold text-lg">West Cobb Crush 2014 Haney/Woodman</p>
          <p className="text-sm mt-1">Softball Team Fundraiser</p>
        </div>
      </div>

      {/* Claim Modal */}
      {selectedSquare !== null && (
        <ClaimModal
          squareNumber={selectedSquare}
          onClose={() => setSelectedSquare(null)}
          onSuccess={loadData}
        />
      )}

      {/* Square Details Modal */}
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
