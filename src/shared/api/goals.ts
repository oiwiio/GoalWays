import { apiClient } from './client';
import { Goal } from '../../types/goal';
import { ApiResponse } from './types';


// Тип для ответа с пагинацией
interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const goalsApi = {
  // получить список целей (с пагинацией)
  fetchGoals: (params?: {
    page?: number;
    size?: number;
    status?: string;
    priority?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) =>
    apiClient.get<ApiResponse<PageResponse<Goal>>>('/api/v1/goals', {
      params: { page: 0, size: 10, ...params }
    }),

  // получить цель по ID
  fetchGoalById: (id: number) =>
    apiClient.get<ApiResponse<Goal>>(`/api/v1/goals/${id}`),

  // создать цель
  createGoal: (data: any) =>
    apiClient.post<ApiResponse<Goal>>('/api/v1/goals', data),

  // обновить цель
  updateGoal: (id: number, data: any) =>
    apiClient.patch<ApiResponse<Goal>>(`/api/v1/goals/${id}`, data),

  // удалить цель
  deleteGoal: (id: number) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/v1/goals/${id}`),
};