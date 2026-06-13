import { useState } from 'react';
import { Activity, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'info@devopsinsiders.com' && password === 'P@ssw01rd@123') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 flex flex-col items-center">
          <img src="/logo.png" alt="AXION Systems" className="h-16 object-contain mb-4" />
          <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">System 1 Asset Management</p>
        </div>

        <div className="bg-[#171717] border border-[#404040] rounded-lg p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-slate-400" />
            <h2 className="text-lg font-semibold text-white">Secure Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#404040] rounded-md px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#404040] rounded-md px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-md p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8 text-xs text-slate-500">
          &copy; 2026 Axion Systems. All rights reserved.
        </div>
      </div>
    </div>
  );
}
