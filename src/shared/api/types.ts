export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ConfirmRequest {
  username: string;
  code: string;
}

export interface LoginRequest {
  username: string;
  password: string;  
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

// Response types
export interface RegisterResponse {
  username: string;
  message: string;
}

export interface ConfirmResponse {
  message: string;
}

export interface LoginResponse {
  access_token: string;
  refreshToken: string;
  token_type: 'bearer';
}

export interface ApiSuccess<T> {
  status: 'success';
  data: T;
}

export interface ApiError {
  status: 'error';
  error: string;
}

export interface ConfirmRequest {
  username: string;
  code: string;
}

export interface ConfirmResponse {
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;