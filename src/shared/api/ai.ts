// shared/api/ai.ts
import { apiClient } from './client';
import { AIPlanResponse, AIClarifyRequest, AIClarifyResponse } from './types';

export const aiApi = {
  // AI-помощь по существующей цели
  generatePlan: (goalId: number) =>
    apiClient.post<AIPlanResponse>('/api/v1/goals/ai-help', { goal_id: goalId }),

  // разложение новой цели на этапы
  decomposeGoal: (goalData: any) =>
    apiClient.post('/api/v1/goals/ai-decompose', goalData),

  // уточнения 
  clarifyPlan: (data: AIClarifyRequest) =>
    apiClient.post<AIClarifyResponse>('/api/v1/ai/plan/clarify', data), 
};