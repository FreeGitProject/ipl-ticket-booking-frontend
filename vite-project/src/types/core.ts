// Base interface for all API responses
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  // Pagination type
  export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }