import React, { useState } from 'react';
import { Plus, Trash2, StickyNote, Save } from 'lucide-react';

const Notes = ({ notes, onAddNote, onDeleteNote }) => {
    const [noteText, setNoteText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noteText.trim()) return;

        onAddNote({ text: noteText, date: new Date().toLocaleString() });
        setNoteText('');
    };

    return (
        <div className="space-y-6">
            {/* Note Input */}
            <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <div className="absolute top-4 left-4 pointer-events-none">
                            <StickyNote className="w-5 h-5 text-slate-400" />
                        </div>
                        <textarea
                            placeholder="Write a note..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full bg-slate-900/50 text-white placeholder-slate-400 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-700 transition-all text-lg min-h-[120px] resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={!noteText.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-indigo-500/25"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Note</span>
                        </button>
                    </div>
                </div>
            </form>

            {/* Notes List */}
            <div className="grid grid-cols-1 gap-4">
                {notes.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p>No notes yet.</p>
                    </div>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="bg-slate-700/30 p-6 rounded-2xl border border-slate-600/30 hover:border-indigo-500/30 transition-all group relative">
                            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{note.text}</p>
                            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                <span>{note.date}</span>
                                <button
                                    onClick={() => onDeleteNote(note.id)}
                                    className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10 opacity-0 group-hover:opacity-100"
                                    title="Delete note"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notes;
