import React from 'react'

const Header = ({ shopname, cartCount, onCartClick, onBack, isRoot = true, theme, onToggleTheme, isSelfOrder, hasOrders, onMyOrdersClick }) => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-app-bg/80 border-b border-app-border">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!isRoot && (
                        <button
                            onClick={onBack}
                            className="p-2 bg-app-surface rounded-xl text-app-muted hover:text-app-text border border-app-border active:scale-95 transition-transform"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <h1 className="text-xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-tighter">
                        {shopname}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    {isSelfOrder && hasOrders && (
                        <button
                            onClick={onMyOrdersClick}
                            className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500 hover:bg-indigo-500/20 transition-all border border-indigo-500/20 active:scale-95 flex items-center gap-2 pr-3"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">My Orders</span>
                        </button>
                    )}

                    <button
                        onClick={onToggleTheme}
                        className="p-2 bg-app-surface rounded-xl text-app-muted hover:text-app-text transition-colors border border-app-border"
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                        )}
                    </button>

                    <button
                        onClick={onCartClick}
                        className="relative p-2 bg-app-surface rounded-full text-app-muted hover:text-app-text transition-colors border border-app-border shadow-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-app-bg animate-bounce">
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
