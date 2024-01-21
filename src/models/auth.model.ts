export interface LoginResponse {
  token: string;
  item2: UserDetails;
}

export interface UserDetails {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  telephone: string;
  isActive: boolean;
  securityId: number;
  user: string;
  password: string;
  role: number;
}