import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Save, Shuffle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Square, BoardConfig } from '../types/index';

export function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [squares, setSquares] = useState<Square[]>([]);
  const [boardConfig, setBoardConfig] = useState<BoardConfig | null>(null);
  const [scores, setScores] = useState({
    q1_chiefs: '',
    q1_eagles: '',
    q2_chiefs: '',
    q2_eagles: '',
    q3_chiefs: '',
    q3_eagles: '',
    final_chiefs: '',
    final_eagles: '',
  });

  const loadData = async () => {
    const { data: squaresData } = await supabase
      .from('squares')
      .select('*')
      .order('position');

    const { data: configData } = await supabase
      .from('board_config')
      .select('*')
      .single();

    if (squaresData) setSquares(squaresData);
    if (configData) {
      setBoardConfig(configData);
      setScores({
        q1_chiefs: configData.q1_chiefs_score?.toString() || '',
        q1_eagles: configData.q1_eagles_score?.toString() || '',
        q2_chiefs: configData.q2_chiefs_score?.toString() || '',
        q2_eagles: configData.q2_eagles_score?.toString() || '',
        q3_chiefs: configData.q3_chiefs_score?.toString() || '',
        q3_eagles: configData.q3_eagles_score?.toString() || '',
        final_chiefs: configData.final_chiefs_score?.toString() || '',
        final_eagles: configData.final_eagles_score?.toString() || '',
      });
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'softballproai2024') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const markAsPaid = async (squareId: string) => {
    const { error } = await supabase
      .from('squares')
      .update({ payment_confirmed: true, paid_at: new Date().toISOString() })
      .eq('id', squareId);

    if (error) {
      alert('Failed to mark as paid');
    } else {
      loadData();
    }
  };

  const assignNumbers = async () => {
    if (!confirm('Are you sure? This will randomly assign numbers to rows and columns.')) return;

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
      alert('Numbers assigned successfully!');
      loadData();
    }
  };

  const updateScores = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('board_config')
      .update({
        q1_chiefs_score: scores.q1_chiefs ? parseInt(scores.q1_chiefs) : null,
        q1_eagles_score: scores.q1_eagles ? parseInt(scores.q1_eagles) : null,
        q2_chiefs_score: scores.q2_chiefs ? parseInt(scores.q2_chiefs) : null,
        q2_eagles_score: scores.q2_eagles ? parseInt(scores.q2_eagles) : null,
        q3_chiefs_score: scores.q3_chiefs ? parseInt(scores.q3_chiefs) : null,
        q3_eagles_score: scores.q3_eagles ? parseInt(scores.q3_eagles) : null,
        final_chiefs_score: scores.final_chiefs ? parseInt(scores.final_chiefs) : null,
        final_eagles_score: scores.final_eagles ? parseInt(scores.final_eagles) : null,
      })
      .eq('id', boardConfig?.id);

    if (error) {
      alert('Failed to update scores');
    } else {
      alert('Scores updated!');
      loadData();
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
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
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Assign Numbers Button */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Board Configuration</h2>
          <button
            onClick={assignNumbers}
            disabled={boardConfig?.numbers_assigned}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Shuffle size={20} />
            {boardConfig?.numbers_assigned ? 'Numbers Already Assigned' : 'Assign Random Numbers'}
          </button>
        </div>

        {/* Score Entry */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Update Scores</h2>
          <form onSubmit={updateScores} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Q1 Patriots Score</label>
              <input
                type="number"
                value={scores.q1_chiefs}
                onChange={(e) => setScores({ ...scores, q1_chiefs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Q1 Seahawks Score</label>
              <input
                type="number"
                value={scores.q1_eagles}
                onChange={(e) => setScores({ ...scores, q1_eagles: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Q2 Patriots Score</label>
              <input
                type="number"
                value={scores.q2_chiefs}
                onChange={(e) => setScores({ ...scores, q2_chiefs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Q2 Seahawks Score</label>
              <input
                type="number"
                value={scores.q2_eagles}
                onChange={(e) => setScores({ ...scores, q2_eagles: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Q3 Patriots Score</label>
              <input
                type="number"
                value={scores.q3_chiefs}
                onChange={(e) => setScores({ ...scores, q3_chiefs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Q3 Seahawks Score</label>
              <input
                type="number"
                value={scores.q3_eagles}
                onChange={(e) => setScores({ ...scores, q3_eagles: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Final Patriots Score</label>
              <input
                type="number"
                value={scores.final_chiefs}
                onChange={(e) => setScores({ ...scores, final_chiefs: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Final Seahawks Score</label>
              <input
                type="number"
                value={scores.final_eagles}
                onChange={(e) => setScores({ ...scores, final_eagles: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <Save size={20} />
                Save Scores
              </button>
            </div>
          </form>
        </div>

        {/* Squares List */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">All Squares</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Square #</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {squares.filter(s => s.buyer_name).map((square) => (
                  <tr key={square.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">#{square.position}</td>
                    <td className="p-2">{square.buyer_name}</td>
                    <td className="p-2">{square.buyer_email}</td>
                    <td className="p-2">
                      {square.payment_confirmed ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                          Paid
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      {!square.payment_confirmed && (
                        <button
                          onClick={() => markAsPaid(square.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
