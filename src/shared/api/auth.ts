import { apiClient } from './client';
import { 
  RegisterRequest,
  ConfirmRequest,
  LoginRequest,
  RefreshRequest,
  LogoutRequest,
  RegisterResponse,
  ConfirmResponse,
  LoginResponse,
  ApiResponse
} from './types';

export const authApi = {
  // Регистрация
  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<RegisterResponse>>('/api/auth/register', data),

  // Подтверждение email
  confirm: (data: ConfirmRequest) =>
    apiClient.post<ApiResponse<ConfirmResponse>>('/api/auth/confirm', data),

  // Повторная отправка кода
  resendCode: (email: string) =>
    apiClient.post<ApiResponse<{ message: string }>>('/api/auth/resend', { email }),

  // Вход
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/api/auth/login', data),

  // Обновление токена
  refresh: (data: RefreshRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/api/auth/refresh', data),

  // Выход
  logout: (data: LogoutRequest) =>
    apiClient.post<ApiResponse<null>>('/api/auth/logout', data),
};