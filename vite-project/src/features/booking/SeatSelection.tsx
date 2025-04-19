import { useState, useEffect } from 'react';
import apiClient from '../../api/axiosClient';
import { toast } from 'react-hot-toast';

interface Seat {
  id: string;
  number: string;
  type: 'standard' | 'premium' | 'vip';
  status: 'available' | 'held' | 'booked';
  price: number;
}

const SeatSelection = ({ eventId }: { eventId: string }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [holdId, setHoldId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await apiClient.get(`/events/${eventId}/seats`);
        setSeats(response.data);
      } catch (error) {
        toast.error('Failed to load seats');
      }
    };
    fetchSeats();
  }, [eventId]);

  const handleSeatSelect = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const holdSeats = async () => {
    try {
      const response = await apiClient.post(`/events/${eventId}/seats/hold`, {
        seatIds: selectedSeats
      });
      setHoldId(response.data.holdId);
      toast.success('Seats held for 15 minutes');
    } catch (error) {
      toast.error('Failed to hold seats');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
      
      <div className="grid grid-cols-10 gap-2 mb-8">
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => handleSeatSelect(seat.id)}
            disabled={seat.status !== 'available'}
            className={`p-2 rounded text-center ${
              selectedSeats.includes(seat.id) ? 'bg-green-500 text-white' :
              seat.status === 'available' ? 'bg-gray-200 hover:bg-gray-300' :
              'bg-red-200 cursor-not-allowed'
            }`}
          >
            {seat.number}
            <div className="text-xs">₹{seat.price}</div>
          </button>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">
            Selected Seats: {selectedSeats.length}
          </h3>
          <p className="mb-4">
            Total: ₹{selectedSeats.reduce((total, seatId) => {
              const seat = seats.find(s => s.id === seatId);
              return total + (seat?.price || 0);
            }, 0)}
          </p>
          {!holdId ? (
            <button
              onClick={holdSeats}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Hold Seats
            </button>
          ) : (
            <PaymentButton 
              eventId={eventId}
              holdId={holdId}
              seatIds={selectedSeats}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;