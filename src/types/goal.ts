export type Goal = {
    id: string;
    title: string;
    description?: string;       
    category?: string;           
    deadline: string | null;
    progress: number;
    createdAt?: string;          
    status: 'active' | 'archived' | 'completed';
};