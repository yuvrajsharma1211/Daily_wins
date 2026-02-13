import React, { useState } from 'react';
import { Plus, Timer } from 'lucide-react';

const DURATION_PRESETS = ['10m', '15m', '30m', '1h'];

const TaskInput = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState('');
    const [duration, setDuration] = useState('');
    const [customDuration, setCustomDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalDuration = customDuration || duration;
        if (!taskName.trim()) return; // Removed duration check

        onAddTask({ text: taskName, duration: finalDuration });
        setTaskName('');
        setDuration('');
        setCustomDuration('');
    };

    const handlePresetClick = (preset) => {
        setDuration(preset === duration ? '' : preset); // Toggle
        setCustomDuration(''); // Clear custom if preset selected
    };

    const handleCustomChange = (e) => {
        setCustomDuration(e.target.value);
        setDuration(''); // Clear preset if custom typing
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
            <div className="flex flex-col gap-6">
                {/* Task Name Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="What is today's goal?"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full bg-slate-900/50 text-white placeholder-slate-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700 transition-all text-lg"
                    />
                </div>

                {/* Duration Selection */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {DURATION_PRESETS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => handlePresetClick(preset)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${duration === preset
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/30'
                                    }`}
                            >
                                {preset}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Timer className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Custom (e.g. 45m)"
                            value={customDuration}
                            onChange={handleCustomChange}
                            className={`w-full bg-slate-900/50 text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700 transition-all text-sm ${customDuration ? 'border-indigo-500 ring-1 ring-indigo-500' : ''}`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!taskName.trim()}
                        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-indigo-500/25"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default TaskInput;
