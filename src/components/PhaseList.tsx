import React, { useState } from 'react';
import { Phase, Task } from '../types';
import { Plus, Check, Clock, Circle, Trash2, Edit2 } from 'lucide-react';

const initialPhases: Phase[] = [
  {
    id: '1',
    title: 'Foundation',
    duration: 4,
    dueDate: '2024-12-31',
    tasks: [
      {
        id: '1',
        text: 'Project setup',
        status: 'completed',
        dueDate: '2024-12-15',
        assignee: 'Amin',
        priority: 'high'
      }
    ]
  }
];

const PhaseList = () => {
  const [phases, setPhases] = useState<Phase[]>(initialPhases);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="text-green-500" />;
      case 'in-progress':
        return <Clock className="text-blue-500" />;
      default:
        return <Circle className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  interface PhaseModalProps {
    phase: Phase;
    onClose: () => void;
    onSave: (phase: Phase) => void;
  }

  const PhaseModal: React.FC<PhaseModalProps> = ({ phase, onClose, onSave }) => {
    const [formData, setFormData] = useState(phase);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">{phase.id ? 'Edit' : 'Add'} Phase</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="w-full border rounded p-2"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  interface TaskModalProps {
    task: Task;
    onClose: () => void;
    onSave: (task: Task) => void;
  }

  const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) => {
    const [formData, setFormData] = useState(task);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">{task.id ? 'Edit' : 'Add'} Task</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Text</label>
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assignee</label>
                <select
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value as Task['assignee'] })}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="Amin">Amin</option>
                  <option value="Salim">Salim</option>
                  <option value="Vinc">Vinc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Roadmap</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setEditingPhase({ id: '', title: '', duration: 0, dueDate: '', tasks: [] })}
        >
          <Plus size={20} />
          Add Phase
        </button>
      </div>

      <div className="space-y-8">
        {phases.map(phase => (
          <div key={phase.id} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">{phase.title}</h2>
                <p className="text-gray-600">Duration: {phase.duration} weeks • Due: {new Date(phase.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingPhase(phase)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => setPhases(phases.filter(p => p.id !== phase.id))}
                  className="p-2 hover:bg-gray-100 rounded text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {phase.tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <span>{task.text}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </span>
                    <span className="text-gray-600">{task.assignee}</span>
                    <span className="text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingTask(task)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setPhases(phases.map(p => 
                            p.id === phase.id 
                              ? { ...p, tasks: p.tasks.filter(t => t.id !== task.id) }
                              : p
                          ))
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button 
                className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:bg-blue-50 rounded transition w-full justify-center"
                onClick={() => setEditingTask({ 
                  id: '', 
                  text: '', 
                  status: 'pending', 
                  dueDate: '', 
                  assignee: 'Amin', 
                  priority: 'medium'
                })}
              >
                <Plus size={20} />
                Add Task
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPhase && (
        <PhaseModal 
          phase={editingPhase} 
          onClose={() => setEditingPhase(null)}
          onSave={(updatedPhase) => {
            setPhases(prev => {
              const isEditing = prev.some(p => p.id === updatedPhase.id);
              if (isEditing) {
                return prev.map(p => p.id === updatedPhase.id ? updatedPhase : p);
              }
              return [...prev, { ...updatedPhase, id: String(Date.now()) }];
            });
            setEditingPhase(null);
          }}
        />
      )}

      {editingTask && (
        <TaskModal 
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            setPhases(prev => prev.map(phase => ({
              ...phase,
              tasks: phase.tasks.some(t => t.id === updatedTask.id)
                ? phase.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
                : [...phase.tasks, { ...updatedTask, id: String(Date.now()) }]
            })));
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default PhaseList;
