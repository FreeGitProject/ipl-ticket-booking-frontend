export interface CreatePaymentDto {
    bookingId: string;
    amount: number;
    currency?: string;
    notes?: Record<string, string>;
  }
  
  export interface PaymentResponse {
    razorpayKey: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    bookingId: string;
  }
  
  export interface VerifyPaymentDto {
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
    bookingId: string;
  }
  
  export interface PaymentVerificationResult {
    success: boolean;
    message?: string;
    paymentId?: string;
    bookingId?: string;
  }
  
  export interface Payment {
    id: string;
    bookingId: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    amount: number;
    currency: string;
    status: 'created' | 'captured' | 'refunded' | 'failed';
    notes?: Record<string, string>;
    createdAt: string;
    updatedAt?: string;
  }