import { SeatType } from "./seats";

export interface BookedSeat {
    seatId: string;
    price: number;
    type: SeatType;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    eventId: string;
    event?: Event; // Optional nested event data
    seats: BookedSeat[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateBookingDto {
    eventId: string;
    holdId: string;
    seatIds: string[];
  }
  
  export interface BookingResult {
    success: boolean;
    message?: string;
    bookingId?: string;
    totalAmount?: number;
  }