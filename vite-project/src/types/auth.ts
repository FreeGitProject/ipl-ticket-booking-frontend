export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    createdAt: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginData {
    name: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }