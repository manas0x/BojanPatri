import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

const AdminQRView = ({ shopname }) => {
    const currentUrl = window.location.origin

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="animate-fade-in p-6">
            <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-2xl text-center border-4 border-indigo-600 relative overflow-hidden print:shadow-none print:border-8 print:p-16">
                <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600"></div>

                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-tight">
                    {shopname}
                </h2>
                <p className="text-indigo-600 font-bold uppercase tracking-widest text-[12px] mb-10">Digital Menu & Ordering</p>

                <div className="bg-slate-50 p-6 rounded-[2.5rem] inline-block mb-10 border-2 border-slate-100 shadow-inner">
                    <QRCodeSVG
                        value={currentUrl + '/self'}
                        size={220}
                        level="H"
                        includeMargin={false}
                        imageSettings={{
                            src: "/vite.svg",
                            x: undefined,
                            y: undefined,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">1</div>
                        <p className="text-slate-600 font-bold text-sm uppercase">Scan the QR</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">2</div>
                        <p className="text-slate-600 font-bold text-sm uppercase">Pick your flavors</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm">3</div>
                        <p className="text-slate-600 font-bold text-sm uppercase">ORDER INSTANTLY</p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                        Powered by BhojanPatri <br />
                        {currentUrl}
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Store QR
                </button>
                <p className="text-app-muted text-[10px] font-bold uppercase tracking-widest mt-4 italic">
                    Tip: Display this at your counter or tables.
                </p>
            </div>
        </div>
    )
}

export default AdminQRView
