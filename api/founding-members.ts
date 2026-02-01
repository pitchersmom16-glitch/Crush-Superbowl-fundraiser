import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('founding_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Create array of 100 members, filling in blanks with null
      const members = Array(100).fill(null);
      
      if (data) {
        data.forEach((member: any) => {
          if (member.badge_number && member.badge_number >= 1 && member.badge_number <= 100) {
            members[member.badge_number - 1] = member;
          }
        });
      }

      return res.status(200).json(members);
    } catch (error: any) {
      console.error('Error fetching founding members:', error);
      return res.status(500).json({ error: 'Failed to fetch founding members' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, tier, email, badge_number } = req.body;

      // Validation
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      if (!tier || !['Bronze', 'Silver', 'Gold', 'Platinum'].includes(tier)) {
        return res.status(400).json({ error: 'Valid tier is required' });
      }

      if (!badge_number || badge_number < 1 || badge_number > 100) {
        return res.status(400).json({ error: 'Valid badge number is required' });
      }

      // Check if badge is already claimed
      const { data: existing } = await supabase
        .from('founding_members')
        .select('id')
        .eq('badge_number', badge_number)
        .single();

      if (existing) {
        return res.status(409).json({ error: 'This badge has already been claimed' });
      }

      // Insert new founding member
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
    } catch (error: any) {
      console.error('Error creating founding member:', error);
      return res.status(500).json({ error: 'Failed to create founding member' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
