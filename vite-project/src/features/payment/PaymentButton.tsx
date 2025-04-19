/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import apiClient from '../../api/axiosClient';
import { toast } from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentButton = ({ 
  eventId,
  holdId,
  seatIds
}: {
  eventId: string;
  holdId: string;
  seatIds: string[];
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create booking
      const bookingResponse = await apiClient.post('/bookings', {
        eventId,
        holdId,
        seatIds
      });
      const booking = bookingResponse.data;

      // 2. Create Razorpay order
      const paymentResponse = await apiClient.post('/payments/create-order', {
        bookingId: booking.id,
        amount: booking.totalAmount,
        currency: 'INR'
      });
      const paymentOrder = paymentResponse.data;

      // 3. Load Razorpay script if not loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // 4. Open Razorpay checkout
      const options = {
        key: paymentOrder.razorpayKey,
        amount: paymentOrder.amount * 100,
        currency: paymentOrder.currency,
        order_id: paymentOrder.razorpayOrderId,
        name: 'IPL Ticket Booking',
        description: 'Ticket Purchase',
        handler: async function(response: any) {
          try {
            // 5. Verify payment
            await apiClient.post('/payments/verify', {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: booking.id
            });
            toast.success('Payment successful! Booking confirmed.');
          } catch (error) {
            toast.error('Payment verification failed');
            console.log(error);
            
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
        console.log(error);
      toast.error('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : 'Proceed to Payment'}
    </button>
  );
};

export default PaymentButton;