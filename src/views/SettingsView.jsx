import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const SettingsView = ({ onBack }) => {
    const [addons, setAddons] = useState({
        payments: { enabled: false, provider: 'razorpay', config: { key: '', secret: '' } },
        messaging: { enabled: false, provider: 'whatsapp', config: { apiKey: '', phoneId: '' } },
        ai: { enabled: false, provider: 'openai', config: { key: '' } },
        analytics: { enabled: false, provider: 'google', config: { id: '' } },
        hardware: { thermalPrinter: false, barcodeScanner: false }
    });
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'addons'), (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                // Ensure nested structure exists for older records
                const migration = {
                    ...addons,
                    ...data,
                    payments: {
                        ...addons.payments,
                        ...data.payments,
                        config: { ...addons.payments.config, ...(data.payments?.config || {}) }
                    },
                    messaging: {
                        ...addons.messaging,
                        ...data.messaging,
                        config: { ...addons.messaging.config, ...(data.messaging?.config || {}) }
                    },
                    ai: {
                        ...addons.ai,
                        ...data.ai,
                        config: { ...addons.ai.config, ...(data.ai?.config || {}) }
                    }
                };
                setAddons(migration);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleUpdate = async (newAddons) => {
        setSaveStatus('Saving...');
        try {
            await setDoc(doc(db, 'settings', 'addons'), newAddons);
            setSaveStatus('Saved!');
            setTimeout(() => setSaveStatus(''), 2000);
        } catch (err) {
            alert("Failed to update settings.");
            setSaveStatus('Error');
        }
    };

    const toggleAddon = (category) => {
        const updated = { ...addons, [category]: { ...addons[category], enabled: !addons[category].enabled } };
        setAddons(updated);
        handleUpdate(updated);
    };

    const updateProvider = (category, provider) => {
        const updated = { ...addons, [category]: { ...addons[category], provider } };
        setAddons(updated);
        handleUpdate(updated);
    };

    const updateConfig = (category, field, value) => {
        const updated = {
            ...addons,
            [category]: {
                ...addons[category],
                config: { ...addons[category].config, [field]: value }
            }
        };
        setAddons(updated);
        // We don't auto-save on every keystroke for config to avoid excessive writes
    };

    if (loading) return <div className="p-10 text-center font-black uppercase animate-pulse">Loading Integration Hub...</div>;

    return (
        <div className="animate-fade-in px-4 pb-32 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-3 bg-app-surface rounded-2xl border border-app-border shadow-lg hover:scale-105 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-4xl font-black text-app-text tracking-tighter uppercase leading-none">Integrations</h2>
                        <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mt-1">SaaS Control Center</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {saveStatus && <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 animate-pulse">{saveStatus}</span>}
                    <button
                        onClick={() => handleUpdate(addons)}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Payments Section */}
                <IntegrationCard
                    title="💳 Payments & Fintech"
                    icon={<PaymentIcon />}
                    enabled={addons.payments.enabled}
                    onToggle={() => toggleAddon('payments')}
                >
                    <div className="space-y-6 mt-6 pt-6 border-t border-app-border/50">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-app-muted">Choose Gateway</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['razorpay', 'phonepe', 'paytm'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => updateProvider('payments', p)}
                                        className={`py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${addons.payments.provider === p ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg' : 'bg-app-bg border-app-border text-app-muted'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Merchant Key / API Key"
                                value={addons.payments.config.key}
                                onChange={(e) => updateConfig('payments', 'key', e.target.value)}
                                placeholder="rzp_live_..."
                            />
                            <InputField
                                label="Merchant Secret"
                                value={addons.payments.config.secret}
                                onChange={(e) => updateConfig('payments', 'secret', e.target.value)}
                                placeholder="••••••••"
                                type="password"
                            />
                        </div>
                    </div>
                </IntegrationCard>

                {/* Messaging Section */}
                <IntegrationCard
                    title="💬 Communication"
                    icon={<MsgIcon />}
                    enabled={addons.messaging.enabled}
                    onToggle={() => toggleAddon('messaging')}
                >
                    <div className="space-y-6 mt-6 pt-6 border-t border-app-border/50">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-app-muted">Message Provider</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['whatsapp', 'twilio', 'msg91'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => updateProvider('messaging', p)}
                                        className={`py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${addons.messaging.provider === p ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg' : 'bg-app-bg border-app-border text-app-muted'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="API Key / Token"
                                value={addons.messaging.config.apiKey}
                                onChange={(e) => updateConfig('messaging', 'apiKey', e.target.value)}
                                placeholder="EAAW..."
                            />
                            <InputField
                                label="Phone Number ID / SID"
                                value={addons.messaging.config.phoneId}
                                onChange={(e) => updateConfig('messaging', 'phoneId', e.target.value)}
                                placeholder="1042..."
                            />
                        </div>
                    </div>
                </IntegrationCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <IntegrationCard
                        title="🧠 AI Smart Assist"
                        enabled={addons.ai.enabled}
                        onToggle={() => toggleAddon('ai')}
                    >
                        <div className="mt-4 pt-4 border-t border-app-border/30">
                            <InputField
                                label="OpenAI API Key"
                                value={addons.ai?.config?.key || ''}
                                onChange={(e) => updateConfig('ai', 'key', e.target.value)}
                                placeholder="sk-..."
                                type="password"
                            />
                        </div>
                    </IntegrationCard>

                    <IntegrationCard
                        title="📦 Hardware"
                        enabled={addons.hardware.thermalPrinter}
                        onToggle={() => {
                            const updated = { ...addons, hardware: { ...addons.hardware, thermalPrinter: !addons.hardware.thermalPrinter } };
                            setAddons(updated);
                            handleUpdate(updated);
                        }}
                    >
                        <p className="text-xs text-app-muted mt-2">Connect thermal POS and barcode scanners directly via USB/Bluetooth.</p>
                    </IntegrationCard>
                </div>
            </div>
        </div>
    );
};

const IntegrationCard = ({ title, children, enabled, onToggle, icon }) => (
    <div className={`p-8 rounded-[3rem] border transition-all duration-500 ${enabled ? 'bg-indigo-600/[0.03] border-indigo-500/40 shadow-xl' : 'bg-app-surface border-app-border'}`}>
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                {icon && <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${enabled ? 'bg-indigo-500 text-white shadow-lg' : 'bg-app-bg text-app-muted border border-app-border'}`}>{icon}</div>}
                <h3 className="text-xl font-black uppercase tracking-tight text-app-text">{title}</h3>
            </div>
            <button
                onClick={onToggle}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${enabled ? 'bg-indigo-500' : 'bg-app-muted/30'}`}
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${enabled ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-app-muted px-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-app-bg border border-app-border rounded-xl px-4 py-3 text-xs font-bold text-app-text outline-none focus:border-indigo-500 transition-all placeholder:opacity-30"
        />
    </div>
);

const PaymentIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const MsgIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);

export default SettingsView;
