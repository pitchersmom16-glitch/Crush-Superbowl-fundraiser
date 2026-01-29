export interface Square {
  id: string;
  position: number;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_phone: string | null;
  venmo_username: string | null;
  claimed_at: string | null;
  payment_confirmed: boolean;
  paid_at: string | null;
}

export interface BoardConfig {
  id: string;
  numbers_assigned: boolean;
  chiefs_numbers: number[] | null;
  eagles_numbers: number[] | null;
  q1_chiefs_score: number | null;
  q1_eagles_score: number | null;
  q2_chiefs_score: number | null;
  q2_eagles_score: number | null;
  q3_chiefs_score: number | null;
  q3_eagles_score: number | null;
  final_chiefs_score: number | null;
  final_eagles_score: number | null;
}
