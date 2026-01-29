import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Square } from '../types/index';

interface SquareDetailsModalProps {
  square: Square;
  onClose: () => void;
  onSuccess: () => void;
}

export function SquareDetailsModal({ square, onClose, onSuccess }: SquareDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: square.buyer_name || '',
    email: square.buyer_email || '',
    phone: square.buyer_phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('squares')
        .update({
          buyer_name: formData.name.trim(),
          buyer_email: formData.email.trim(),
          buyer_phone: formData.phone.trim(),
        })
        .eq('id', square.id);

      if (dbError) throw dbError;

      alert('✅ Square details updated!');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update square');
    } finally {
      setLoading(false);
    }
  };

  const handleUnclaim = async () => {
    if (!confirm('Are you sure? This will make the square available again.')) return;

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from('squares')
        .update({
          buyer_name: null,
          buyer_email: null,
          buyer_phone: null,
          claimed_at: null,
        })
        .eq('id', square.id);

      if (dbError) throw dbError;

      alert('Square returned to available!');
      onSuccess();
      onClose();
    } catch (err: any) {
      alert('Failed to unclaim square');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-center">Square #{square.position} - Claimed</h2>
        <p className="text-sm text-gray-600 text-center mb-4">West Cobb Crush 2014 Haney/Woodman</p>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name:</p>
                <p className="font-semibold">{square.buyer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email:</p>
                <p className="font-semibold">{square.buyer_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone:</p>
                <p className="font-semibold">{square.buyer_phone}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                ✏️ Edit Details
              </button>
              <button
                onClick={handleUnclaim}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                ❌ Remove / Unclaim
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEdit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
