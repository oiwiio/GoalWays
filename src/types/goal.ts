// types/goal.ts
export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    progress: number; // 0-100
    priority: 'high' | 'medium' | 'low';
    deadline?: string | null;
    goalId?: string; // для связи с родительской целью
};

export type Goal = {
    id: string;
    title: string;
    description?: string;
    category?: string;
    deadline: string | null;
    progress: number;
    priority: 'high' | 'medium' | 'low';
    status: 'in_progress' | 'completed' | 'frozen' | 'archived';
    createdAt?: string;
    tasks?: Task[]; 
};