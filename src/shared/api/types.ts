import { AxiosResponse } from 'axios';

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

export interface ConfirmResponse {
  message: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface AuthApi {
  register: (data: RegisterRequest) => Promise<AxiosResponse<ApiSuccess<RegisterResponse>>>;
  confirm: (data: ConfirmRequest) => Promise<AxiosResponse<ApiSuccess<ConfirmResponse>>>;
  login: (data: LoginRequest) => Promise<AxiosResponse<ApiSuccess<LoginResponse>>>;
  refresh: (data: RefreshRequest) => Promise<AxiosResponse<ApiSuccess<{ access_token: string }>>>;
  logout: (data: LogoutRequest) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
  forgotPassword: (data: { email: string }) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
   sendPasswordResetCode: (email: string) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
  getProfile: () => Promise<AxiosResponse<ApiSuccess<UserProfile>>>;
  updateProfile: (data: UpdateProfileRequest) => Promise<AxiosResponse<ApiSuccess<UserProfile>>>;
  changePassword: (data: ChangePasswordRequest) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
  uploadAvatar: (formData: FormData) => Promise<AxiosResponse<ApiSuccess<{ avatarUrl: string }>>>; 
}

export interface GoalsApi {
  fetchGoals: (params: {
    page?: number;
    size?: number;
    status?: string;
    sort?: string;
    order?: string;
  }) => Promise<AxiosResponse<ApiSuccess<PageResponse<any>>>>;
  createGoal: (data: any) => Promise<AxiosResponse<ApiSuccess<any>>>;
  updateGoal: (id: number, data: any) => Promise<AxiosResponse<ApiSuccess<any>>>;
  deleteGoal: (id: number) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
}

export interface TasksApi {
  getTasks: (goalId: number) => Promise<AxiosResponse<ApiSuccess<any[]>>>;
  createTask: (goalId: number, data: any) => Promise<AxiosResponse<ApiSuccess<any>>>;
  updateTask: (goalId: number, taskId: number, data: any) => Promise<AxiosResponse<ApiSuccess<any>>>;
  deleteTask: (goalId: number, taskId: number) => Promise<AxiosResponse<ApiSuccess<{ message: string }>>>;
}

export interface Api {
  authApi: AuthApi;
  goalsApi: GoalsApi;
  tasksApi?: TasksApi;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
}


export interface UpdateProfileRequest {
  username?: string;
  email?: string;
}


export interface ChangePasswordRequest {
  oldPassword: string;  
  newPassword: string;
}