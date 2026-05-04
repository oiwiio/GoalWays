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
  ApiResponse,
  UserProfile,           
  UpdateProfileRequest,  
  ChangePasswordRequest  
} from './types';

export const authApi = {
  // Регистрация
  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<RegisterResponse>>('/api/v1/auth/register', data), 

  // Подтверждение email
  confirm: (data: ConfirmRequest) =>
    apiClient.post<ApiResponse<ConfirmResponse>>('/api/v1/auth/confirm', data),   

  // Повторная отправка кода
  resendCode: (email: string) =>
    apiClient.post<ApiResponse<{ message: string }>>('/api/v1/auth/resend', { email }), 

  // Вход
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', data),      

  // Обновление токена
  refresh: (data: RefreshRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/refresh', data),     

  // Выход
  logout: (data: LogoutRequest) =>
    apiClient.post<ApiResponse<null>>('/api/v1/auth/logout', data), 
  
   getProfile: () =>
    apiClient.get<ApiResponse<UserProfile>>('/api/v1/users/profile'),

  // Обновить профиль
  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.put<ApiResponse<UserProfile>>('/api/v1/users/profile', data),

  // Сменить пароль
  changePassword: (data: ChangePasswordRequest) =>
    apiClient.post<ApiResponse<{ message: string }>>('/api/v1/users/change-password', data),

  // Загрузить аватар
  uploadAvatar: (formData: FormData) =>
    apiClient.post<ApiResponse<{ avatarUrl: string }>>('/api/v1/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};