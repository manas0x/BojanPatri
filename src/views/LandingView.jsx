import { useState, useEffect } from 'react';

const SupportItem = ({ title, desc }) => (
    <div className="flex gap-4">
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <div>
            <h4 className="text-sm font-black uppercase tracking-tight text-app-text">{title}</h4>
            <p className="text-xs text-app-muted font-bold">{desc}</p>
        </div>
    </div>
);

const FeatureCard = ({ title, desc, icon }) => (
    <div className="p-6 md:p-10 bg-app-surface border border-app-border rounded-3xl md:rounded-[3rem] hover:border-indigo-500/40 transition-all duration-500 group">
        <div className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform inline-block">{icon}</div>
        <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase tracking-tight">{title}</h3>
        <p className="text-app-muted leading-relaxed font-bold text-xs md:text-sm">{desc}</p>
    </div>
);

const IntegrationStamp = ({ name, color }) => (
    <div className={`flex items-center gap-3 p-4 bg-app-surface border border-app-border rounded-2xl`}>
        <div className={`w-3 h-3 rounded-full bg-${color}-500 shadow-[0_0_10px_rgba(0,0,0,0.2)]`}></div>
        <span className="text-xs font-black uppercase tracking-widest text-app-text">{name}</span>
    </div>
);

const LandingView = ({ onStart, theme, onToggleTheme }) => {
    return (
        <div className="min-h-screen bg-app-bg text-app-text font-sans overflow-x-hidden">
            {/* Mega Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-app-bg/80 backdrop-blur-2xl border-b border-app-border">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all duration-300 group"
                        onClick={() => onStart('landing')}
                    >
                        <div className="relative">
                            <img
                                src={theme === 'dark' ? "/logo.png" : "/logo_light.png"}
                                alt="BhojanPatri Logo"
                                className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:rotate-12 transition-transform duration-500"
                            />
                            <div className="absolute -inset-1 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <span className="text-xl md:text-3xl font-black uppercase tracking-tighter hidden min-[400px]:block bg-gradient-to-r from-app-text to-indigo-500 bg-clip-text text-transparent italic">
                            Bhojan<span className="">Patri</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-black uppercase tracking-widest text-app-muted hover:text-indigo-500 transition-colors">OS Features</a>
                        <a href="#integrations" className="text-sm font-black uppercase tracking-widest text-app-muted hover:text-indigo-500 transition-colors">Integrations</a>
                        <a href="#resti" className="text-sm font-black uppercase tracking-widest text-app-muted hover:text-indigo-500 transition-colors">Partners</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onToggleTheme}
                            className="p-2.5 bg-app-surface border border-app-border rounded-xl text-app-muted hover:text-indigo-500 transition-all active:scale-95"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                        <button
                            onClick={() => onStart('menu')}
                            className="px-4 md:px-6 py-2 md:py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex-shrink-0"
                        >
                            Store Demo
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-500/5 rounded-full blur-[120px] -z-10"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black tracking-widest uppercase mb-8">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                                Now In Early Access • Join the Elite few
                            </div>
                            <h1 className="text-5xl md:text-[7rem] font-black mb-6 md:mb-10 tracking-[ -0.05em] leading-[1] md:leading-[0.85] uppercase selection:bg-indigo-500 selection:text-white">
                                Most <span className="text-indigo-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">Reliable</span> <span className="block italic text-app-muted/20 tracking-[-0.1em]">Restaurant OS.</span>
                            </h1>
                            <p className="text-xl text-app-muted max-w-xl mb-12 leading-relaxed font-bold">
                                Ultra-lightweight system designed to run on <span className="text-app-text underline decoration-indigo-500">any device</span>.
                                From Budget Androids to iPhones—BhojanPatri works flawlessly in any mobile browser.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                                <button
                                    onClick={() => onStart('menu')}
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-indigo-600/30 active:scale-95"
                                >
                                    Store Demo
                                </button>
                                <button
                                    onClick={() => onStart('dashboard')}
                                    className="px-8 py-4 bg-app-surface border border-app-border hover:border-indigo-500/30 text-app-text rounded-2xl font-black uppercase tracking-widest text-sm transition-all active:scale-95"
                                >
                                    Admin Demo
                                </button>
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-xs text-emerald-500 font-black uppercase tracking-[0.2em] mb-1">
                                        ✨ Free Modification
                                    </span>
                                    <span className="text-[10px] text-app-muted font-bold uppercase tracking-widest opacity-60">
                                        Built uniquely for your workflow
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[3rem] p-4 border border-white/10 backdrop-blur-xl shadow-3xl">
                                <div className="bg-app-bg rounded-[2.5rem] overflow-hidden border border-app-border shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
                                        className="w-full h-full object-cover opacity-80"
                                        alt="Dashboard Preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section id="resti" className="py-16 md:py-24 px-6 bg-app-surface/30 border-y border-app-border">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px]">Onboarding In Progress</span>
                    <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6 md:mb-8 uppercase tracking-tighter">Connecting <span className="text-indigo-500">Industry Leaders</span></h2>
                    <p className="text-app-muted text-sm md:text-lg max-w-2xl mx-auto font-bold uppercase tracking-widest leading-loose">
                        We are currently onboarding our first wave of top-tier restaurants.
                        Live client stats and success stories will be featured here in the coming weeks.
                        <br />
                        <span className="text-emerald-500 text-[10px] md:text-xs mt-4 block">Early Access Slots Available</span>
                    </p>
                </div>
            </section>

            {/* Services & Ecosystem Section */}
            <section id="services" className="py-16 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <span className="text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px]">The BhojanPatri Ecosystem</span>
                        <h2 className="text-4xl md:text-7xl font-black mt-4 mb-6 md:mb-8 uppercase tracking-tighter leading-tight md:leading-none">Complete <span className="text-indigo-500 italic">Full-Stack</span> Control.</h2>
                        <p className="text-app-muted text-sm md:text-lg max-w-3xl mx-auto font-bold uppercase tracking-widest leading-relaxed opacity-60">
                            Everything from a single outlet to a national franchise chain managed from one cloud-native dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Service Item 1 */}
                        <div className="p-8 md:p-12 bg-app-surface border border-app-border rounded-3xl md:rounded-[4rem] flex flex-col justify-between hover:border-indigo-500/40 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">Multi-Outlet <span className="text-indigo-500">Sync</span></h3>
                                <p className="text-app-muted text-xs md:text-sm font-bold leading-relaxed mb-6 md:mb-8">Manage multiple menus, taxes, and staff permissions across all your branches from a central location.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Master Menu Control</li>
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Branch-wise Analytics</li>
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Staff Roles & Permissions</li>
                                </ul>
                            </div>
                        </div>

                        {/* Service Item 2 */}
                        <div className="p-8 md:p-12 bg-app-surface border border-app-border rounded-3xl md:rounded-[4rem] flex flex-col justify-between hover:border-indigo-500/40 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" /><path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" /></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">Smart <span className="text-emerald-500">Inventory</span></h3>
                                <p className="text-app-muted text-xs md:text-sm font-bold leading-relaxed mb-6 md:mb-8">Real-time stock consumption tracking based on recipe mapping. Reduce wastage by up to 30%.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Low-Stock Alerts</li>
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Supplier Management</li>
                                    <li className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Recipe Cost Analysis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section id="features" className="py-16 md:py-32 px-6 bg-app-surface/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-none">Built for <span className="text-indigo-500 underline decoration-indigo-500/20">Speed.</span></h2>
                        <p className="text-app-muted font-bold text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest opacity-60">Engineered for high-volume environments where every second counts.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Zero-Install"
                            desc="No heavy apps to download. Works instantly in Chrome, Safari, or any browser."
                            icon="📂"
                        />
                        <FeatureCard
                            title="Low-Spec Ready"
                            desc="Optimized for budget phones. High performance even with low RAM and slow internet."
                            icon="⚡"
                        />
                        <FeatureCard
                            title="Any-Device Sync"
                            desc="Seamless experience across laptops, tablets, and mobile browsers simultaneously."
                            icon="📱"
                        />
                        <FeatureCard
                            title="Billing & POS"
                            desc="Superfast offline-first billing with GST, service charges, and discount logic."
                            icon="🧾"
                        />
                        <FeatureCard
                            title="KDS Dashboard"
                            desc="Digital Kitchen Display System to manage orders without paper chaos."
                            icon="🍳"
                        />
                        <FeatureCard
                            title="Hardward Sync"
                            desc="Native support for SUNMI terminals, Epson printers, and Zebra scanners."
                            icon="�️"
                        />
                    </div>
                </div>
            </section>

            {/* Integration Hub Preview */}
            <section id="integrations" className="py-32 px-6 bg-app-surface/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-indigo-500 font-black uppercase tracking-[0.2em] text-[10px]">Integration Hub</span>
                            <h2 className="text-5xl font-black mt-4 mb-8 uppercase tracking-tighter leading-none">Connect what <span className="text-indigo-500 underline">you love.</span></h2>
                            <p className="text-app-muted text-lg leading-relaxed mb-12">
                                BhojanPatri plays well with others. Integrate your favorite payment gateways and messaging tools in one click.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <IntegrationStamp name="Razorpay" color="indigo" />
                                <IntegrationStamp name="PhonePe" color="emerald" />
                                <IntegrationStamp name="WhatsApp" color="emerald" />
                                <IntegrationStamp name="Stripe" color="indigo" />
                            </div>
                        </div>
                        <div className="bg-app-bg p-8 rounded-[4rem] border border-app-border shadow-4xl rotate-2">
                            {/* Mini Mockup of Settings */}
                            <div className="space-y-4">
                                <div className="h-4 w-40 bg-app-surface rounded-full mb-8"></div>
                                <div className="h-12 w-full bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center px-4 justify-between">
                                    <span className="text-[10px] font-black text-indigo-400">RAZORPAY ACTIVE</span>
                                    <div className="w-8 h-4 bg-indigo-500 rounded-full"></div>
                                </div>
                                <div className="h-12 w-full bg-app-surface rounded-2xl border border-app-border"></div>
                                <div className="h-12 w-full bg-app-surface rounded-2xl border border-app-border"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Metrics Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        <div>
                            <span className="text-5xl font-black text-indigo-500 tracking-tighter">15%</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-app-muted mt-2">Avg. Revenue Increase</p>
                        </div>
                        <div>
                            <span className="text-5xl font-black text-indigo-500 tracking-tighter">24/7</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-app-muted mt-2">Priority Support</p>
                        </div>
                        <div>
                            <span className="text-5xl font-black text-indigo-500 tracking-tighter">0.3s</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-app-muted mt-2">KOT Push Speed</p>
                        </div>
                        <div>
                            <span className="text-5xl font-black text-indigo-500 tracking-tighter">50+</span>
                            <p className="text-[10px] font-black uppercase tracking-widest text-app-muted mt-2">Native Integrations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support & Training Section */}
            <section className="py-32 px-6 bg-emerald-500/5 border-y border-emerald-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="text-emerald-500 font-black uppercase tracking-[0.2em] text-[10px]">Unmatched Support</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 mb-8 uppercase tracking-tighter">We stay <span className="text-emerald-500">online</span> so you can stay <span className="italic block">serving.</span></h2>
                        <div className="space-y-6">
                            <SupportItem title="24/7 Priority Support" desc="Call, WhatsApp, or Screen-share with our engineers anytime." />
                            <SupportItem title="Free Custom Modifications" desc="We build features specifically for your unique restaurant workflow." />
                            <SupportItem title="On-Site Training" desc="Local agents to train your staff right on the floor." />
                        </div>
                    </div>
                    <div className="flex-1 bg-app-bg p-8 rounded-[4rem] border border-app-border shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xl">M</div>
                            <div>
                                <h4 className="text-sm font-black uppercase">Manas Arora</h4>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Platform Architect</p>
                            </div>
                        </div>
                        <p className="text-xl font-bold tracking-tight text-app-text mb-8 italic">
                            "We didn't just build a software; we built a safety net for restaurateurs. Every line of code is optimized for the rush hour."
                        </p>
                        <button
                            onClick={() => window.open('https://wa.me/+919411388136', '_blank')}
                            className="px-8 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer"
                        >
                            Chat with Support
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-32 px-6">
                <div className="max-w-7xl mx-auto bg-indigo-600 rounded-3xl md:rounded-[4rem] p-8 md:p-16 text-center text-white shadow-3xl shadow-indigo-600/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 uppercase tracking-tighter leading-none">Ready to <span className="italic">scale?</span></h2>
                    <button
                        onClick={() => onStart('menu')}
                        className="px-8 md:px-12 py-4 md:py-6 bg-white text-indigo-600 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-sm md:text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                    >
                        Join BhojanPatri Today
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-app-border text-center bg-app-bg">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-app-muted text-sm font-black uppercase tracking-widest">© 2026 BhojanPatri.in - The Future of Food Tech</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingView;
