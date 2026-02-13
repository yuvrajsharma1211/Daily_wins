import React from 'react';
import { Check, Trash2, Timer } from 'lucide-react'; // Changed Calendar to Timer

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-slate-400 flex flex-col items-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                    <Timer className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg">No tasks yet. Plan your day!</p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${task.completed
                            ? 'bg-slate-800/30 border-slate-800 opacity-60'
                            : 'bg-slate-700/40 border-slate-600/40 hover:border-indigo-500/50 hover:bg-slate-700/60'
                        }`}
                >
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => onToggleComplete(task.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'border-slate-400 hover:border-indigo-400'
                                }`}
                        >
                            {task.completed && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div className="flex flex-col">
                            <span
                                className={`text-lg font-medium transition-all ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                                    }`}
                            >
                                {task.text}
                            </span>
                            <span className="text-sm text-indigo-400 font-mono flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {task.duration}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-400/10"
                        title="Delete task"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
