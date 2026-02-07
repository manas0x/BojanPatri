import React from 'react'

const OrderHistoryView = ({ orders, onBack }) => {
    return (
        <div className="animate-fade-in p-6">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center gap-2 text-app-muted hover:text-app-text transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Menu</span>
                </button>

                <h2 className="text-4xl font-black text-app-text uppercase tracking-tighter mb-8 leading-none">
                    My <br /> Orders
                </h2>

                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-app-surface/30 rounded-[3rem] border border-app-border border-dashed">
                        <p className="text-app-muted font-bold uppercase tracking-widest text-xs">No orders found yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((order) => (
                            <div key={order.id} className="bg-app-surface/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-app-border/40 shadow-xl relative group overflow-hidden transition-all hover:scale-[1.02]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${order.status === 'ready' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`}></span>
                                            <h4 className="text-app-text font-black uppercase text-sm">Order #{order.displayId || (order.id ? order.id.slice(0, 5) : '...')}</h4>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${order.paymentMethod === 'UPI' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {order.paymentMethod || 'CASH'}
                                            </span>
                                            {order.tableNumber && (
                                                <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-emerald-500/20 text-emerald-400">
                                                    Table {order.tableNumber}
                                                </span>
                                            )}
                                            <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-app-bg text-app-muted">
                                                {new Date(order.timestamp).toLocaleDateString()}
                                            </span>
                                            <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter bg-app-bg text-app-muted">
                                                {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-app-text">₹{order.total}</span>
                                </div>

                                <div className="space-y-2 mb-6 bg-app-bg/30 p-4 rounded-2xl border border-app-border/20">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-[11px] font-bold">
                                            <span className="text-app-text uppercase truncate max-w-[150px]">{item.itemname}</span>
                                            <span className="text-app-muted shrink-0">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <a
                                        href={`/invoice/${order.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-indigo-600/10 text-indigo-500 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-center border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-600/5 active:scale-95"
                                    >
                                        View Invoice
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderHistoryView
