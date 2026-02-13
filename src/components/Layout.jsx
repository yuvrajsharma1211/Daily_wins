import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700/50 min-h-[850px] flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Layout;
