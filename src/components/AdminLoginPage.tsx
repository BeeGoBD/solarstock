import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Server,
  Globe
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onReturnToStore: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onReturnToStore
}) => {
  const { authenticateAdmin, openAdmin } = useStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const enteredId = username.trim();
    const enteredPw = password.trim();

    if (!enteredPw) {
      setErrorMessage('Please enter your administrative security password.');
      setIsSubmitting(false);
      triggerShake();
      return;
    }

    // Authenticate with StoreContext
    const res = authenticateAdmin(enteredPw, enteredId);

    if (res.success) {
      setTimeout(() => {
        setIsSubmitting(false);
        openAdmin();
        onSuccess();
      }, 400);
    } else {
      setIsSubmitting(false);
      triggerShake();
      if (res.isWrongAdminPassword) {
        setErrorMessage('Authentication failed: Invalid credentials for solarstock.bd/admin.');
      } else {
        setErrorMessage('Access denied: Unrecognized admin credentials or security key.');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white flex flex-col justify-between selection:bg-amber-400 selection:text-neutral-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar with Domain & Return Button */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-neutral-800/80">
        <button
          onClick={onReturnToStore}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-neutral-800/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 rounded-full px-3.5 py-1 text-xs text-neutral-300 shadow-inner">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-[11px] text-amber-300 font-semibold tracking-wide">
            solarstock.bd/admin
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div
          className={`w-full max-w-md bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          {/* Subtle Top Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

          {/* Brand Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20 font-black">
              <Zap className="w-8 h-8 fill-neutral-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] tracking-tight text-white">
                SolarStock Operations
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Regional Solar Infrastructure & Administration Portal
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/60 text-neutral-300 text-[11px] font-mono px-2.5 py-1 rounded-md">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>TLS 256-Bit Encrypted Gateway</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-username-input"
                className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5"
              >
                Admin Identifier / Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  id="admin-username-input"
                  type="text"
                  autoComplete="username"
                  placeholder="admin@workforsolarstock.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5"
              >
                Administrative Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter security key or password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter Operations</span>
                </>
              )}
            </button>
          </form>

          {/* Security Banner Note */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 text-center">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Authorized personnel only. Access to <span className="text-neutral-400 font-mono">solarstock.bd/admin</span> is logged and protected by role-based operational policies.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500 border-t border-neutral-850">
        <div>
          <span>© 2026 SolarStock Bangladesh Ltd. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-400">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dhaka Regional Node: Operational</span>
          </span>
          <span className="font-mono text-neutral-600">v2.4-prod</span>
        </div>
      </footer>
    </div>
  );
};
