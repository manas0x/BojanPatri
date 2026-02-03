import React, { useState } from 'react'

const CheckoutForm = ({ onSubmit, onBack, customers = [] }) => {
    const [customer, setCustomer] = useState({ name: '', phone: '' })
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (customer.name && customer.phone) {
            onSubmit(customer)
        }
    }

    const handlePhoneChange = (val) => {
        setCustomer({ ...customer, phone: val })
        setShowSuggestions(val.length > 2)
    }

    const selectCustomer = (c) => {
        setCustomer({ name: c.name, phone: c.phone })
        setShowSuggestions(false)
    }

    const suggestions = customers.filter(c =>
        c.phone.replace(/\D/g, '').includes(customer.phone.replace(/\D/g, '')) ||
        c.name.toLowerCase().includes(customer.phone.toLowerCase())
    ).slice(0, 3)

    return (
        <div className="animate-slide-left p-6 flex flex-col h-full">
            <button
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">Back to Review</span>
            </button>

            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Customer <br /> Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                <div className="relative">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Phone Number</label>
                    <input
                        required
                        type="tel"
                        autoFocus
                        value={customer.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onFocus={() => customer.phone.length > 2 && setShowSuggestions(true)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-3xl py-5 px-6 text-white placeholder-slate-700 focus:border-indigo-500 outline-none transition-all shadow-xl"
                        placeholder="Type phone or name..."
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                            {suggestions.map((c, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => selectCustomer(c)}
                                    className="w-full px-6 py-4 text-left hover:bg-slate-700 transition-colors border-b border-slate-700/50 last:border-0 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-white font-bold text-sm tracking-tight">{c.name}</p>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{c.phone}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">Customer Name</label>
                    <input
                        required
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-3xl py-5 px-6 text-white placeholder-slate-700 focus:border-indigo-500 outline-none transition-all shadow-xl"
                        placeholder="Enter full name"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 py-6 rounded-[2rem] text-white font-black uppercase tracking-widest text-lg hover:bg-indigo-500 transition-all shadow-[0_20px_40px_-15px_rgba(79,70,229,0.5)] active:scale-[0.95] mt-10"
                >
                    Confirm Order
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm
