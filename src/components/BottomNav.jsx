import React from 'react'

const BottomNav = ({ currentView, onViewChange, isAdmin }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-app-bg/80 backdrop-blur-xl border-t border-app-border pb-safe transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-around">
                <button
                    onClick={() => onViewChange('menu')}
                    className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'menu' ? 'text-indigo-500' : 'text-app-muted hover:text-app-text'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-[9px] font-black uppercase tracking-widest">Store</span>
                </button>

                <button
                    onClick={() => onViewChange('dashboard')}
                    className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'dashboard' ? 'text-indigo-500' : 'text-app-muted hover:text-app-text'}`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m2 0h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[9px] font-black uppercase tracking-widest">Admin</span>
                </button>
            </div>
        </nav>
    )
}

export default BottomNav
