import { apiClient } from './client';
import { AIPlanResponse, AIClarifyRequest, AIClarifyResponse, ApiSuccess, AIPlanData} from './types';

export const aiApi = {
  // AI-помощь по существующей цели
 generatePlan: (data: { goalId: number; prompt: string }) =>
    apiClient.post<ApiSuccess<AIPlanData>>('/api/v1/goals/ai-help', data),

  // разложение новой цели на этапы
  decomposeGoal: (goalData: any) =>
    apiClient.post('/api/v1/goals/ai-decompose', goalData),

  // уточнения 
  clarifyPlan: (data: AIClarifyRequest) =>
    apiClient.post<AIClarifyResponse>('/api/v1/ai/plan/clarify', data), 
};