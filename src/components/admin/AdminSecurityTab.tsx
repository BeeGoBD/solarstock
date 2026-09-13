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
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isBoss = adminRole === 'boss';

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBoss) {
      setMessage({
        type: 'error',
        text: 'Access Denied: Only Master Admin credentials can reset the Manager password.'
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
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isBoss
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {isBoss ? <Crown className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900">
                  {isBoss ? 'Master Administrator (Boss)' : 'Store Operations Manager'}
                </h3>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    isBoss
                      ? 'bg-amber-400 text-neutral-950 shadow-2xs'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {isBoss ? 'Master Key Tier' : 'Operational Tier'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {isBoss
                  ? 'Authorized with Master Admin Key. Unlimited system privilege.'
                  : 'Authorized with Manager Key. Content, product & catalog privileges.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAdmin}
            className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-300 self-start sm:self-auto shadow-2xs"
            title="Lock Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock / Exit</span>
          </button>
        </div>
      </div>

      {/* Password Reset Section */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-500" />
            Manager Password Management
          </h4>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Per company security policy, the Master Key is permanently secret and encrypted. It exists specifically to reset and recover the Store Manager key.
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 shadow-2xs ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {isBoss ? (
          <form onSubmit={handleResetPassword} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">
                Current Manager Password Active
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="relative w-full sm:max-w-xs">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    readOnly
                    value={managerPassword}
                    className="bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-800 px-3 py-2 pr-9 rounded-lg w-full outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-800"
                    title={showCurrentPass ? 'Hide secret' : 'Reveal secret'}
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">Protected confidential credential</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  New Manager Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newManagerPass}
                    onChange={(e) => setNewManagerPass(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 px-3 py-2 pr-9 rounded-lg outline-none focus:border-amber-400 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-800"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat new password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 px-3 py-2 rounded-lg outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Lock className="w-4 h-4" />
              <span>Update Manager Password</span>
            </button>
          </form>
        ) : (
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 text-xs space-y-2">
            <p className="flex items-center gap-1.5 text-amber-700 font-bold">
              <Lock className="w-4 h-4" />
              Manager Password Reset Locked
            </p>
            <p>
              You are currently signed in with the Manager role. To reset the Manager credentials,
              please log in using the administrative Master Key.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
