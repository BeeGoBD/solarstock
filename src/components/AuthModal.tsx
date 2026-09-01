import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'phone'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      setIsLoggedIn(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden animate-in zoom-in-95">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              Welcome back, {username}!
            </h3>
            <p className="text-xs text-neutral-500">
              Logged in to Solarstock Account & SolarCare+ Portal.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header Graphic / Illustration matching video (00:49) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/30 mb-2">
                <User className="w-7 h-7 text-neutral-950 stroke-[2.5]" />
              </div>
              <h2 className="text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                {authMode === 'login' && 'Continue with Username'}
                {authMode === 'register' && 'Create Solarstock Account'}
                {authMode === 'phone' && 'Login with Mobile OTP'}
              </h2>
              <p className="text-xs text-neutral-500">
                Access warranty claims, orders, and trade-in history
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email / Phone */}
              <div className="relative">
                <input
                  type={authMode === 'phone' ? 'tel' : 'text'}
                  required
                  placeholder={authMode === 'phone' ? 'Phone Number (e.g. 01712345678)' : 'Email or phone number'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-4 pr-4 py-2.5 sm:py-3 rounded-xl border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                />
              </div>

              {/* Password */}
              {authMode !== 'phone' && (
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-4 pr-10 py-2.5 sm:py-3 rounded-xl border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}

              {authMode === 'login' && (
                <div className="text-right">
                  <a href="#forgot" className="text-[11px] font-semibold text-neutral-500 hover:text-amber-600">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* LOGIN Button matching video (00:49) */}
              <button
                type="submit"
                className="w-full bg-neutral-100 hover:bg-amber-400 text-neutral-950 font-black py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-2xs"
              >
                {authMode === 'login' ? 'LOGIN' : authMode === 'register' ? 'REGISTER' : 'SEND OTP'}
              </button>
            </form>

            {/* Divider 'or' matching video (00:50) */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-neutral-200 w-full" />
              <span className="bg-white px-3 text-xs text-neutral-400 uppercase font-medium">or</span>
            </div>

            {/* Alternative actions */}
            <div className="space-y-2 text-center text-xs">
              {authMode === 'login' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setAuthMode('phone')}
                    className="text-neutral-700 hover:text-amber-600 font-semibold underline block mx-auto"
                  >
                    Login with Phone number
                  </button>
                  <p className="text-neutral-600">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-amber-600 font-bold hover:underline"
                    >
                      Register
                    </button>
                  </p>
                </>
              ) : (
                <p className="text-neutral-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-amber-600 font-bold hover:underline"
                  >
                    Login
                  </button>
                </p>
              )}
            </div>

            {/* Divider 'or' */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-neutral-200 w-full" />
              <span className="bg-white px-3 text-xs text-neutral-400 uppercase font-medium">or</span>
            </div>

            {/* Login with Google matching video (00:50) */}
            <button
              type="button"
              onClick={() => {
                setUsername('google.user@solarstock.com');
                setIsLoggedIn(true);
                setTimeout(onClose, 1000);
              }}
              className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-bold py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Login with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
