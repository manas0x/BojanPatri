import React from 'react'

const Header = ({ shopname, cartCount, onCartClick, onBack, isRoot = true, theme, onToggleTheme, isSelfOrder, hasOrders, onMyOrdersClick, currentView, onHome }) => {
    if (currentView === 'landing') return null;
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-glass-bg border-b border-glass-border">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!isRoot && (
                        <button
                            onClick={onBack}
                            className="p-2.5 bg-app-surface/50 rounded-2xl text-app-muted hover:text-app-text border border-app-border active:scale-90 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <div
                        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all duration-300 group"
                        onClick={onHome}
                    >
                        <div className="relative">
                            <img
                                src={theme === 'dark' ? "/logo.png" : "/logo_light.png"}
                                alt="Logo"
                                className="w-9 h-9 object-contain group-hover:rotate-12 transition-transform duration-500"
                            />
                            <div className="absolute -inset-1 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter hidden min-[400px]:block bg-gradient-to-r from-app-text to-indigo-500 bg-clip-text text-transparent italic">
                            Bhojan<span className="">Patri</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isSelfOrder && hasOrders && (
                        <button
                            onClick={onMyOrdersClick}
                            className="p-2.5 bg-indigo-500/10 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-all border border-indigo-500/20 active:scale-90 flex items-center gap-2 group"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">My Orders</span>
                        </button>
                    )}

                    <button
                        onClick={onToggleTheme}
                        className="p-2.5 bg-app-surface/50 rounded-2xl text-app-muted hover:text-app-text transition-all border border-app-border active:scale-90"
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </button>

                    <button
                        onClick={onCartClick}
                        className="relative p-2.5 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/25 active:scale-90 active:rotate-3 group"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-500 shadow-xl animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
