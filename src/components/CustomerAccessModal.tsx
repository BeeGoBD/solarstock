import React, { useState } from 'react';
import {
  X,
  Building2,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  Send,
  UserCheck,
  Lock,
  Mail,
  Phone,
  Globe,
  FileText,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SolarStockEmblem } from './SolarStockLogo';

interface CustomerAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const CustomerAccessModal: React.FC<CustomerAccessModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin
}) => {
  const {
    currentCustomer,
    loginCustomer,
    submitCustomerSignup,
    logoutCustomer,
    customerAccounts
  } = useStore();

  const [activeTab, setActiveTab] = useState<'signin' | 'request'>('signin');
  
  // Sign-in state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Request state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [businessType, setBusinessType] = useState('EPC Contractor');
  const [taxOrRegNumber, setTaxOrRegNumber] = useState('');
  const [complianceDocNotes, setComplianceDocNotes] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestTrackingId, setRequestTrackingId] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(null);

    const res = loginCustomer(loginEmail, loginPassword);
    if (res.success) {
      setLoginSuccess(res.message);
      setTimeout(() => {
        setLoginSuccess(null);
        onClose();
      }, 1200);
    } else {
      setLoginError(res.message);
    }
  };

  const handleQuickDemoLogin = (emailToUse: string) => {
    setLoginEmail(emailToUse);
    setLoginError(null);
    const res = loginCustomer(emailToUse);
    if (res.success) {
      setLoginSuccess(res.message);
      setTimeout(() => {
        setLoginSuccess(null);
        onClose();
      }, 1000);
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(null);

    if (!companyName.trim() || !contactName.trim() || !email.trim() || !taxOrRegNumber.trim()) {
      setRequestError('Please complete all required fields including Company Name, Contact Person, Email, and Tax/Registration Number.');
      return;
    }

    const res = submitCustomerSignup({
      companyName: companyName.trim(),
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      businessType: businessType.trim(),
      taxOrRegNumber: taxOrRegNumber.trim(),
      complianceDocNotes: complianceDocNotes.trim()
    });

    if (res.success) {
      setRequestSubmitted(true);
      setRequestTrackingId(`REQ-${Math.floor(100000 + Math.random() * 900000)}`);
    } else {
      setRequestError(res.message);
    }
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setTaxOrRegNumber('');
    setComplianceDocNotes('');
    setRequestSubmitted(false);
    setRequestTrackingId(null);
    setRequestError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 border border-neutral-200">
        
        {/* Header Ribbon */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-1 shadow-md">
              <SolarStockEmblem className="w-8 h-8" theme="dark" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
                  Customer Access Portal
                </h2>
                <span className="bg-amber-400/20 text-amber-400 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-amber-400/30">
                  B2B & C&I
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Sign in to your approved account or request commercial onboarding
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Customer is Currently Logged In */}
        {currentCustomer ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-emerald-950">
                      {currentCustomer.companyName}
                    </h3>
                    <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Verified Approved
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    Contact: {currentCustomer.contactName} • {currentCustomer.email}
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Business Type: <strong>{currentCustomer.businessType}</strong> ({currentCustomer.country})
                  </p>
                </div>
              </div>
              <button
                onClick={logoutCustomer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Unlocked Customer Privileges:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="font-bold text-xs text-neutral-900 mb-1">Wholesale Pricing</div>
                  <div className="text-[11px] text-neutral-600">Access to container-tier quotes and protected product rates.</div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="font-bold text-xs text-neutral-900 mb-1">Direct Warehouse Allocation</div>
                  <div className="text-[11px] text-neutral-600">Priority stock holding at SolarStock Dhaka & regional depots.</div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="font-bold text-xs text-neutral-900 mb-1">Engineering Submittals</div>
                  <div className="text-[11px] text-neutral-600">Download single-line diagrams, factory test sheets & SLDs.</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold transition-colors"
              >
                Continue Browsing Catalog
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Nav Tabs */}
            <div className="flex border-b border-neutral-200 bg-neutral-50">
              <button
                onClick={() => {
                  setActiveTab('signin');
                  setLoginError(null);
                }}
                className={`flex-1 py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === 'signin'
                    ? 'border-amber-500 text-neutral-950 bg-white font-extrabold shadow-2xs'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`}
              >
                <UserCheck className="w-4 h-4 text-amber-500" />
                <span>Approved Customer Sign In</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('request');
                  setRequestError(null);
                }}
                className={`flex-1 py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === 'request'
                    ? 'border-amber-500 text-neutral-950 bg-white font-extrabold shadow-2xs'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`}
              >
                <FileCheck className="w-4 h-4 text-amber-500" />
                <span>Request Customer Approval</span>
              </button>
            </div>

            {/* TAB 1: Approved Customer Sign In */}
            {activeTab === 'signin' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-base font-extrabold text-neutral-950 mb-1">
                    Sign in to Your SolarStock Account
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Approved EPC partners, commercial clients, and dealers can sign in immediately to unlock project pricing.
                  </p>
                </div>

                {loginSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{loginSuccess}</span>
                  </div>
                )}

                {loginError && (
                  <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold">{loginError}</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('request')}
                        className="text-amber-700 underline font-bold hover:text-amber-900 inline-block"
                      >
                        Submit a Customer Approval Request →
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Business Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. client@texstyle-bd.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-neutral-700">
                        Password or Access Key
                      </label>
                      <span className="text-[11px] text-neutral-400">
                        (Leave blank or enter password)
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Sign In to Customer Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick 1-Click Demo Accounts for instant tester convenience */}
                <div className="pt-4 border-t border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Quick Demo Logins (Approved Accounts)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customerAccounts.map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleQuickDemoLogin(acc.email)}
                        className="text-left p-2.5 rounded-xl border border-neutral-200 hover:border-amber-400 bg-neutral-50 hover:bg-amber-50/50 transition-colors group"
                      >
                        <div className="text-xs font-bold text-neutral-900 group-hover:text-amber-900 truncate">
                          {acc.companyName}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {acc.email}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Request Customer Approval */}
            {activeTab === 'request' && (
              <div className="p-6 sm:p-8 space-y-6">
                {requestSubmitted ? (
                  <div className="text-center py-6 space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-neutral-950">
                        Compliance Application Submitted!
                      </h3>
                      <p className="text-xs text-neutral-600 max-w-md mx-auto">
                        Your enterprise credentials for <strong>{companyName}</strong> have been logged.
                        Tracking Reference: <span className="font-mono font-bold text-amber-600">{requestTrackingId}</span>
                      </p>
                    </div>

                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                      <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>SolarStock Enterprise Review Process:</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        SolarStock compliance officers review commercial applications from the admin panel before granting access. Once approved, you can immediately log in using <strong>{email}</strong> without waiting for an activation email.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      {onOpenAdmin && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenAdmin();
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs transition-colors shadow-2xs"
                        >
                          Review in Admin Panel →
                        </button>
                      )}
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-bold text-xs transition-colors"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-base font-extrabold text-neutral-950 mb-1">
                        Request SolarStock Customer Approval
                      </h3>
                      <p className="text-xs text-neutral-500">
                        New customers must submit company details and compliance documents; SolarStock reviews applications from the admin panel before granting wholesale access.
                      </p>
                    </div>

                    {requestError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{requestError}</span>
                      </div>
                    )}

                    <form onSubmit={handleRequestSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Company / Entity Name *
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. Meghna Solar Engineering Ltd."
                              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Authorized Representative *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. Md. Tariqul Islam"
                            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Corporate Email *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. procurement@meghnasolar.com"
                              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Direct Phone / WhatsApp *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +880 1712-000000"
                              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Business Type
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium bg-white"
                          >
                            <option value="EPC Contractor">Tier-1 EPC Contractor</option>
                            <option value="Solar Installer / Dealer">Solar Installer / Local Dealer</option>
                            <option value="Textile & Garment Factory">Textile & Garment Factory</option>
                            <option value="Commercial & Industrial Client">Commercial & Industrial Client</option>
                            <option value="Agricultural Solar Project">Agricultural Solar Project</option>
                            <option value="Reseller / Distributor">Reseller / Regional Distributor</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-700 mb-1">
                            Tax / Registration Number (BIN / TIN / Trade Lic) *
                          </label>
                          <input
                            type="text"
                            required
                            value={taxOrRegNumber}
                            onChange={(e) => setTaxOrRegNumber(e.target.value)}
                            placeholder="e.g. BIN: 001928374-0101 / Trade Lic: 49202"
                            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Compliance Documents & Certification Notes
                        </label>
                        <textarea
                          rows={2}
                          value={complianceDocNotes}
                          onChange={(e) => setComplianceDocNotes(e.target.value)}
                          placeholder="Provide details on your company compliance: e.g. SREDA license number, ISO 9001, Fire Safety clearance certificate, or Trade License registration doc reference."
                          className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-medium"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500">
                          Reviewed by SolarStock compliance desk.
                        </span>
                        <button
                          type="submit"
                          className="py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit for Review</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
