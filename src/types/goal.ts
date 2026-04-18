export type Task = {
  id: number;
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  progress: number;
  deadline: string | null;
  estimatedMinutes: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FROZEN' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
};


export type GoalAPI = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  deadline: string | null;
  startdate?: string;
  daily_time_minutes?: number;
  progress: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FROZEN' | 'ARCHIVED';
  createdAt?: string;
  results?: string[];
  start_date?: string;
};