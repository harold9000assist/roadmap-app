import React, { useState } from 'react';
import { Plus, Calendar, Check, Edit2, Trash2 } from 'lucide-react';

// Types
interface Task {
  id: number;
  text: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
}

interface Phase {
  id: number;
  title: string;
  duration: string;
  dueDate: string;
  tasks: Task[];
}

const RoadmapComponent: React.FC = () => {
  // State
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: 1,
      title: "Foundation",
      duration: "4-6",
      dueDate: "2024-12-31",
      tasks: [
        {
          id: 1,
          text: "Project setup",
          status: "completed",
          dueDate: "2024-12-15",
          assignee: "Amin",
          priority: "high"
        }
      ]
    }
  ]);

  const [projectTitle, setProjectTitle] = useState<string>("Project Roadmap");
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [showAddPhase, setShowAddPhase] = useState<boolean>(false);
  const [newPhase, setNewPhase] = useState<Omit<Phase, 'id' | 'tasks'>>({
    title: "",
    duration: "",
    dueDate: ""
  });

  // Team members
  const teamMembers = ["Amin", "Salim", "Vinc"];
  const priorities = ["low", "medium", "high"];

  const handleAddPhase = () => {
    if (newPhase.title && newPhase.duration) {
      const phase: Phase = {
        id: Math.max(...phases.map(p => p.id), 0) + 1,
        ...newPhase,
        tasks: []
      };
      setPhases([...phases, phase]);
      setNewPhase({ title: "", duration: "", dueDate: "" });
      setShowAddPhase(false);
    }
  };

  const handleUpdatePhase = () => {
    if (editingPhase) {
      setPhases(phases.map(phase =>
        phase.id === editingPhase.id ? editingPhase : phase
      ));
      setEditingPhase(null);
    }
  };

  const handleEditTask = (phaseId: number, taskId: number, updates: Partial<Task>) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: phase.tasks.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
          )
        };
      }
      return phase;
    }));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="text-2xl font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
          />
          <button
            onClick={() => setShowAddPhase(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={16} /> Add Phase
          </button>
        </div>
      </div>

      {/* Modal d'ajout de phase */}
      {showAddPhase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add New Phase</h2>
            <div className="space-y-4">
              <input
                placeholder="Phase Title"
                value={newPhase.title}
                onChange={(e) => setNewPhase({ ...newPhase, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Duration (weeks)"
                value={newPhase.duration}
                onChange={(e) => setNewPhase({ ...newPhase, duration: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={newPhase.dueDate}
                onChange={(e) => setNewPhase({ ...newPhase, dueDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowAddPhase(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAddPhase}
                >
                  Add Phase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition de phase */}
      {editingPhase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Phase</h2>
            <div className="space-y-4">
              <input
                placeholder="Phase Title"
                value={editingPhase.title}
                onChange={(e) => setEditingPhase({ ...editingPhase, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Duration (weeks)"
                value={editingPhase.duration}
                onChange={(e) => setEditingPhase({ ...editingPhase, duration: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={editingPhase.dueDate}
                onChange={(e) => setEditingPhase({ ...editingPhase, dueDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setEditingPhase(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleUpdatePhase}
                >
                  Update Phase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Liste des phases */}
      <div className="space-y-6">
        {phases.map(phase => (
          <div key={phase.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-xl flex items-center gap-2">
                {phase.title}
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => setEditingPhase(phase)}
                >
                  <Edit2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {phase.duration} weeks
                </span>
                <span>Due: {new Date(phase.dueDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              {phase.tasks.map(task => (
                <div
                  key={task.id}
                  className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 border border-gray-100"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => handleEditTask(phase.id, task.id, {
                          status: task.status === 'completed' ? 'pending' :
                            task.status === 'pending' ? 'in-progress' : 'completed'
                        })}
                        className="cursor-pointer"
                      >
                        {task.status === 'completed' ? (
                          <Check size={16} className="text-green-500" />
                        ) : task.status === 'in-progress' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) => handleEditTask(phase.id, task.id, { text: e.target.value })}
                        className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={task.priority}
                      onChange={(e) => handleEditTask(phase.id, task.id, { priority: e.target.value as any })}
                      className="border rounded px-3 py-1.5 w-24 text-center"
                    >
                      {priorities.map(p => (
                        <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                      ))}
                    </select>

                    <select
                      value={task.assignee || ''}
                      onChange={(e) => handleEditTask(phase.id, task.id, { assignee: e.target.value || undefined })}
                      className="border rounded px-3 py-1.5 w-24 text-center"
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map(member => (
                        <option key={member} value={member}>{member}</option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={task.dueDate}
                      onChange={(e) => handleEditTask(phase.id, task.id, { dueDate: e.target.value })}
                      className="border rounded px-3 py-1.5 w-36 text-center"
                    />

                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                      onClick={() => {
                        setPhases(phases.map(p =>
                          p.id === phase.id
                            ? { ...p, tasks: p.tasks.filter(t => t.id !== task.id) }
                            : p
                        ));
                      }}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newTask: Task = {
                    id: Math.max(...phase.tasks.map(t => t.id), 0) + 1,
                    text: "New Task",
                    status: "pending",
                    dueDate: "",
                    priority: "medium"
                  };
                  setPhases(phases.map(p =>
                    p.id === phase.id
                      ? { ...p, tasks: [...p.tasks, newTask] }
                      : p
                  ));
                }}
                className="mt-4 text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                <Plus size={16} /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapComponent;
