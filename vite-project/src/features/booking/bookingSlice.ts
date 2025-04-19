import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../types/booking';

interface BookingState {
  currentBooking: Booking | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  loading: false,
  error: null
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    startBooking(state) {
      state.loading = true;
      state.error = null;
    },
    bookingSuccess(state, action: PayloadAction<Booking>) {
      state.currentBooking = action.payload;
      state.loading = false;
    },
    bookingFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadBookingsSuccess(state, action: PayloadAction<Booking[]>) {
      state.bookings = action.payload;
    }
  }
});

export const { 
  startBooking, 
  bookingSuccess, 
  bookingFailure,
  loadBookingsSuccess
} = bookingSlice.actions;

export default bookingSlice.reducer;