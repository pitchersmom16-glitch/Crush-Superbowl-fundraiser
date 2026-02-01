import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (!supabase) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      const { data, error } = await supabase
        .from('founding_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const members = Array(100).fill(null);
      
      if (data) {
        data.forEach((member) => {
          if (member.badge_number && member.badge_number >= 1 && member.badge_number <= 100) {
            members[member.badge_number - 1] = member;
          }
        });
      }

      return res.status(200).json(members);
    } catch (error) {
      console.error('Error fetching founding members:', error);
      return res.status(500).json({ error: 'Failed to fetch founding members' });
    }
  }

  if (req.method === 'POST') {
    try {
      if (!supabase) {
        return res.status(500).json({ error: 'Database not configured' });
      }

      const { name, tier, email, badge_number } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      if (!tier || !['Bronze', 'Silver', 'Gold', 'Platinum'].includes(tier)) {
        return res.status(400).json({ error: 'Valid tier is required' });
      }

      if (!badge_number || badge_number < 1 || badge_number > 100) {
        return res.status(400).json({ error: 'Valid badge number is required' });
      }

      const { data: existing } = await supabase
        .from('founding_members')
        .select('id')
        .eq('badge_number', badge_number)
        .single();

      if (existing) {
        return res.status(409).json({ error: 'This badge has already been claimed' });
      }

      const { data, error } = await supabase
        .from('founding_members')
        .insert([{
          name: name.trim(),
          tier,
          email: email?.trim() || null,
          badge_number
        }])
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json(data);
    } catch (error) {
      console.error('Error creating founding member:', error);
      return res.status(500).json({ error: 'Failed to create founding member' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
