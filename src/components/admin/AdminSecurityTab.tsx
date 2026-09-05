import React, { useState } from 'react';
import {
  KeyRound,
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Crown,
  UserCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSecurityTab: React.FC = () => {
  const { adminRole, managerPassword, setManagerPassword, closeAdmin } = useStore();

  const [newManagerPass, setNewManagerPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isBoss = adminRole === 'boss';

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBoss) {
      setMessage({
        type: 'error',
        text: 'Access Denied: Only Master Admin (using Main Key SS@Admin@2026#SolarSS) can reset the Manager password.'
      });
      return;
    }

    if (!newManagerPass || newManagerPass.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.'
      });
      return;
    }

    if (newManagerPass !== confirmPass) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match. Please re-enter.'
      });
      return;
    }

    setManagerPassword(newManagerPass);
    setNewManagerPass('');
    setConfirmPass('');
    setMessage({
      type: 'success',
      text: 'Manager password successfully updated and securely persisted in local storage!'
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Current Role Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isBoss
                  ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                  : 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
              }`}
            >
              {isBoss ? <Crown className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {isBoss ? 'Master Administrator (Boss)' : 'Store Operations Manager'}
                </h3>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    isBoss
                      ? 'bg-amber-400 text-neutral-950'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {isBoss ? 'Master Key Tier' : 'Operational Tier'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isBoss
                  ? 'Authorized with Main Key (SS@Admin@2026#SolarSS). Unlimited system privilege.'
                  : 'Authorized with Manager Key (ID: admin@workforsolarstock.com). Content, product & catalog privileges.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAdmin}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            title="Lock Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock / Exit</span>
          </button>
        </div>
      </div>

      {/* Password Reset Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            Manager Password Management
          </h4>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Per company policy, the Main Key (<code className="text-amber-300 font-mono">SS@Admin@2026#SolarSS</code>)
            is permanent and cannot be changed. It exists specifically to reset and recover the Store Manager key.
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {isBoss ? (
          <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1">
                Current Manager Password Active
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={managerPassword}
                  className="bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 px-3 py-2 rounded-lg w-full max-w-xs outline-none"
                />
                <span className="text-[11px] text-neutral-500 font-mono">(ID: admin@workforsolarstock.com, Default Pass: SolarStock@2026#SS)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  New Manager Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newManagerPass}
                    onChange={(e) => setNewManagerPass(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white px-3 py-2 pr-9 rounded-lg outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white px-3 py-2 rounded-lg outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Lock className="w-4 h-4" />
              <span>Update Manager Password</span>
            </button>
          </form>
        ) : (
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-400 text-xs space-y-2">
            <p className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Lock className="w-4 h-4" />
              Manager Password Reset Locked
            </p>
            <p>
              You are currently signed in with the Manager role. To reset the Manager credentials,
              please log in using the administrative Main Key (<span className="font-mono text-white">SS@Admin@2026#SolarSS</span>).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
