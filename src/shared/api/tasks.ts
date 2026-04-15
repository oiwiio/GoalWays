import { apiClient } from './client';
import { ApiResponse } from './types';
import { Task } from '../../types/goal';

export const tasksApi = {
  getTasks: (goalId: number) =>
    apiClient.get<ApiResponse<{ content: Task[]; totalElements: number }>>(`/api/v1/goals/${goalId}/tasks?stage=0&size=100`),

  createTask: (goalId: number, data: any) =>
    apiClient.post<ApiResponse<Task>>(`/api/v1/goals/${goalId}/tasks`, data),

  updateTask: (goalId: number, taskId: number, data: any) =>
    apiClient.patch<ApiResponse<Task>>(`/api/v1/goals/${goalId}/tasks/${taskId}`, data),

  deleteTask: (goalId: number, taskId: number) =>
    apiClient.delete<ApiResponse<{ message: string }>>(`/api/v1/goals/${goalId}/tasks/${taskId}`),
};