export interface Phase {
  id: string;
  title: string;
  duration: number;
  dueDate: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee: 'Amin' | 'Salim' | 'Vinc';
  priority: 'low' | 'medium' | 'high';
}
