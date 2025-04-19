import { Booking } from './booking';
import { Event } from './events';
import {  Payment } from './payment';
import { User } from './auth';
import { EventWithSeats } from './events';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface BookingState {
  currentBooking: Booking | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

export interface EventState {
  events: Event[];
  featuredEvents: Event[];
  selectedEvent: EventWithSeats | null;
  loading: boolean;
  error: string | null;
}

export interface PaymentState {
  currentPayment: Payment | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  booking: BookingState;
  event: EventState;
  payment: PaymentState;
}