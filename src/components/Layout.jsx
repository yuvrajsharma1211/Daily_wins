import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700/50">
                {children}
            </div>
        </div>
    );
};

export default Layout;
