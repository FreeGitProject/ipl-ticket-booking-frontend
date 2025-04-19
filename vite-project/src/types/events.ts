export interface Stadium {
    id: string;
    name: string;
    location: string;
    capacity: number;
  }
  
  export interface StadiumSection {
    id: string;
    name: string;
    description: string;
  }
  
  export interface Event {
    id: string;
    name: string;
    description: string;
    dateTime: string;
    duration: number;
    basePrice: number;
    stadium: Stadium;
    category: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  }
  
  export interface EventWithSeats extends Event {
    availableSeats: Seat[];
  }
  
  export interface EventFilters {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
  }