import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Lock, Phone, ArrowRight, ShieldCheck, KeyRound, AlertTriangle, UserCheck, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SolarStockLogo } from './SolarStockLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCustomerAccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    authenticateAdmin,
    openAdmin,
    adminRole,
    logoutAdmin,
    isGuest,
    guestId,
    loginAsGuest,
    logoutGuest
  } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedNotice, setLoggedNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  if (!isOpen) return null;

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPassword = password.trim();
    const enteredUsername = username.trim();

    setErrorMessage(null);

    // Secret Admin check (completely invisible to regular users)
    const authResult = authenticateAdmin(enteredPassword, enteredUsername);
    if (authResult.success) {
      setPassword('');
      setUsername('');
      openAdmin();
      onClose();
      return;
    }

    if (authResult.isWrongAdminPassword) {
      setErrorMessage('Invalid phone/email or password. Please verify your credentials and try again.');
      triggerShake();
      return;
    }

    // Standard user password validation
    if (enteredPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      triggerShake();
      return;
    }

    if (username) {
      setIsLoggedIn(true);
      setLoggedNotice(`Welcome back, ${username}!`);
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  const handleGuestLogin = () => {
    const id = loginAsGuest();
    setIsLoggedIn(true);
    setLoggedNotice(`Logged in as Guest (${id})`);
    setTimeout(() => {
      onClose();
    }, 700);
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
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900">
                {loggedNotice || 'Login Successful'}
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                Access granted to your Solarstock browsing portal.
              </p>
            </div>
          </div>
        ) : isGuest && guestId ? (
          /* Active Guest Session Card */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <UserCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-neutral-900 font-['Outfit',sans-serif]">
                Logged in as Guest
              </h3>
              <div className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 text-xs font-mono font-bold text-neutral-800">
                <span>Your Guest ID:</span>
                <span className="text-amber-600 font-black">{guestId}</span>
              </div>
              <p className="text-xs text-neutral-500 font-medium max-w-xs mx-auto pt-1">
                You are browsing with an active guest session. Your orders and selections are saved to this Guest ID.
              </p>
            </div>

            <div className="space-y-2.5 pt-3">
              <button
                type="button"
                onClick={() => {
                  logoutGuest();
                  onClose();
                }}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Logout from Guest</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* If admin is currently active, allow opening dashboard directly */}
            {adminRole && (
              <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Admin Session Active</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      openAdmin();
                      onClose();
                    }}
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Open Admin Panel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => logoutAdmin()}
                    className="px-3 bg-white hover:bg-rose-50 text-rose-600 border border-neutral-300 hover:border-rose-300 font-bold py-2 rounded-lg text-xs transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Header Graphic */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">
                <SolarStockLogo
                  variant="stacked"
                  size="sm"
                  showTagline={true}
                />
              </div>
              <h2 className="text-lg font-extrabold text-neutral-950 font-['Outfit',sans-serif] mt-1">
                Account Login
              </h2>
              <p className="text-xs text-neutral-500">
                Enter your phone or email and password to log in
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div
                className={`p-3 rounded-xl border border-rose-300 bg-rose-50 text-rose-900 text-xs flex items-center gap-2 shadow-sm ${
                  isShaking ? 'animate-shake' : ''
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <p className="font-semibold text-rose-800 text-xs leading-snug">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Phone or Email */}
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Phone number or email address"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full text-xs sm:text-sm pl-4 pr-4 py-2.5 sm:py-3 rounded-xl border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
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

              <div className="flex items-center justify-end text-[11px] pt-0.5">
                <a href="#forgot" className="font-semibold text-neutral-500 hover:text-amber-600">
                  Forgot Password?
                </a>
              </div>

              {/* LOGIN Button */}
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-2xs"
              >
                LOGIN
              </button>
            </form>

            {/* Divider 'or' */}
            <div className="relative flex items-center justify-center pt-1">
              <div className="border-t border-neutral-200 w-full" />
              <span className="bg-white px-3 text-xs text-neutral-400 uppercase font-medium">or</span>
            </div>

            {/* Login as Guest Button */}
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold py-2.5 rounded-xl border border-amber-300 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-700" />
              <span>Login as Guest</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

