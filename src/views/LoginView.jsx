import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

const LoginView = ({ onLoginSuccess }) => {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Map 'username' to the target email internally
            const email = loginData.username.includes('@') ? loginData.username : 'admin@manas0x.site'
            await signInWithEmailAndPassword(auth, email, loginData.password)
            onLoginSuccess()
        } catch (err) {
            setError('Invalid credentials. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            await signInWithPopup(auth, googleProvider)
            onLoginSuccess()
        } catch (err) {
            setError('Google login failed.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-in">
            <div className="w-full max-w-md bg-app-surface border border-app-border p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-app-text uppercase tracking-tighter mb-2">Admin Portal</h2>
                    <p className="text-app-muted text-[10px] font-black uppercase tracking-[0.2em]">Secure Access Required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-app-muted uppercase tracking-widest mb-2 px-1">Username</label>
                        <input
                            required
                            type="text"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            className="w-full bg-app-bg border border-app-border rounded-2xl py-4 px-6 text-app-text focus:border-indigo-500 outline-none transition-all"
                            placeholder="Your username"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-app-muted uppercase tracking-widest mb-2 px-1">Password</label>
                        <input
                            required
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full bg-app-bg border border-app-border rounded-2xl py-4 px-6 text-app-text focus:border-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide text-center bg-red-500/10 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 py-4 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-app-border"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold px-3 bg-app-surface text-app-muted">Or continue with</div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full border border-app-border bg-app-bg py-4 rounded-2xl text-app-text font-black uppercase tracking-widest hover:bg-app-surface transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </button>
            </div>
        </div>
    )
}

export default LoginView
