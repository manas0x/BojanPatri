import React from 'react'

const PublicInvoiceView = ({ order, config }) => {
    if (!order) return <div className="p-10 text-center text-slate-500">Invoice not found</div>

    return (
        <div className="min-h-screen bg-white text-slate-900 p-6 font-sans">
            <div className="max-w-xl mx-auto border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-slate-950 p-8 text-white">
                    <h1 className="text-2xl font-black uppercase tracking-tighter mb-1">{config.shopname}</h1>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Digital Invoice</p>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</h3>
                            <p className="font-bold text-lg">{order.customer.name}</p>
                            <p className="text-slate-500 text-sm">{order.customer.phone}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</h3>
                            <p className="font-bold">{new Date(order.timestamp).toLocaleDateString()}</p>
                            <p className="text-slate-500 text-sm">{new Date(order.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Order Items</h3>
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-slate-300">{item.quantity}x</span>
                                    <span className="font-bold">{item.itemname}</span>
                                </div>
                                <span className="font-bold">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
                        <span className="font-black uppercase tracking-widest text-xs text-slate-500">Total Amount</span>
                        <span className="text-3xl font-black text-slate-950">₹{order.total}</span>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-xs italic mb-4">Thank you for shopping with us!</p>
                        <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 pb-10">
                <button
                    onClick={() => window.print()}
                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                    Print Invoice
                </button>
            </div>
        </div>
    )
}

export default PublicInvoiceView
