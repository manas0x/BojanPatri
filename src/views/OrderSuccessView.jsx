import React, { useEffect } from 'react'

const OrderSuccessView = ({ onHome }) => {
    useEffect(() => {
        // Auto-scroll to top
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="relative mb-10">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center animate-bounce-slow">
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-app-text mb-4 uppercase tracking-tighter italic">
                Order <span className="text-emerald-500">Confirmed!</span>
            </h1>
            <p className="text-app-muted font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto leading-relaxed mb-12">
                Your flavors are being prepared with love. We'll notify you once they are ready for pickup.
            </p>

            <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
                <button
                    onClick={onHome}
                    className="w-full py-5 bg-app-surface border border-app-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-app-text hover:bg-app-surface/60 transition-all active:scale-95 shadow-xl"
                >
                    Back to Menu
                </button>
            </div>

            <div className="mt-20">
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500">Live Status Active</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccessView
