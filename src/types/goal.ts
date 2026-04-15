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


export type Goal = {
    id: string;
    title: string;
    description?: string;
    category?: string;
    deadline: string | null;
    startdate?: string;              
    daily_time_minutes?: number;     
    progress: number;
    priority: 'high' | 'medium' | 'low';
    status: 'in_progress' | 'completed' | 'frozen' | 'archived';
    createdAt?: string;
    // tasks?: Task[];
     results?: string[];
    // stages?: any[];
};