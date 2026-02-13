import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Notes from './components/Notes';
import { triggerCelebration } from './lib/celebration';
import { CheckCircle2, List, StickyNote } from 'lucide-react';
import confetti from 'canvas-confetti';

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [view, setView] = useState('list');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes([{ ...newNote, id: Date.now() }, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const isCompleting = !task.completed;
        if (isCompleting) {
          triggerCelebration();

          setTimeout(() => {

            setShowCelebrationModal(true);
          }, 500);
        }
        return { ...task, completed: isCompleting };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const editNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            My Day
          </h1>
          <p className="text-slate-400 mt-1">Plan, Execute, Celebrate.</p>
        </div>

        <div className="flex bg-slate-700/50 p-1 rounded-lg">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-md transition-all ${view === 'list'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
              }`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>

          <button
            onClick={() => setView('notes')}
            className={`p-2 rounded-md transition-all ${view === 'notes'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white'
              }`}
            title="Notes"
          >
            <StickyNote className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === 'notes' ? (
        <Notes notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} onEditNote={editNote} />
      ) : (
        <>
          <TaskInput onAddTask={addTask} />

          <div className="bg-slate-900/40 rounded-2xl p-6 min-h-[300px]">
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          </div>
        </>
      )}

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowCelebrationModal(false)}>
          <div className="bg-slate-800 border border-indigo-500/50 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center transform animate-slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Hurray! 🎉</h2>
            <p className="text-slate-300 mb-8">
              Great job completing that task! Keep up the momentum!
            </p>
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
