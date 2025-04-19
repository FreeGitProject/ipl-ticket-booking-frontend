export type SeatType = 'standard' | 'premium' | 'vip';
export type SeatStatus = 'available' | 'held' | 'booked';

export interface Seat {
  id: string;
  number: string;
  type: SeatType;
  status: SeatStatus;
  price: number;
  section: string;
  row: string;
  xPosition: number;
  yPosition: number;
}

export interface SeatHold {
  id: string;
  eventId: string;
  seatIds: string[];
  expiresAt: string;
}

export interface SeatSelection {
  seatId: string;
  price: number;
  type: SeatType;
}