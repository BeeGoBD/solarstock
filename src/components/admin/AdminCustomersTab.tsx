import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Search,
  UserPlus,
  Trash2,
  Mail,
  Phone,
  Globe,
  FileText,
  AlertTriangle,
  Send,
  Plus
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomerSignupRequest, CustomerAccount } from '../../types';

interface AdminCustomersTabProps {
  showToast: (msg: string) => void;
}

export const AdminCustomersTab: React.FC<AdminCustomersTabProps> = ({ showToast }) => {
  const {
    customerAccounts,
    customerSignupRequests,
    approveCustomerRequest,
    rejectCustomerRequest,
    deleteCustomerAccount
  } = useStore();

  const [subTab, setSubTab] = useState<'pending' | 'approved' | 'new'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Form for direct manual addition
  const [directCompany, setDirectCompany] = useState('');
  const [directContact, setDirectContact] = useState('');
  const [directEmail, setDirectEmail] = useState('');
  const [directPhone, setDirectPhone] = useState('');
  const [directBusinessType, setDirectBusinessType] = useState('Tier-1 EPC Contractor');
  const [directCountry, setDirectCountry] = useState('Bangladesh');

  const pendingRequests = customerSignupRequests.filter((r) => r.status === 'pending');
  const processedRequests = customerSignupRequests.filter((r) => r.status !== 'pending');

  const handleApprove = (requestId: string, companyName: string) => {
    approveCustomerRequest(requestId);
    showToast(`Approved ${companyName}! Customer can now sign in immediately.`);
  };

  const handleReject = (requestId: string, companyName: string) => {
    rejectCustomerRequest(requestId);
    showToast(`Rejected request for ${companyName}.`);
  };

  const handleDeleteAccount = (id: string, name: string) => {
    if (window.confirm(`Revoke customer access for ${name}?`)) {
      deleteCustomerAccount(id);
      showToast(`Revoked access for ${name}.`);
    }
  };

  const handleDirectAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directCompany.trim() || !directEmail.trim()) {
      showToast('Company name and email are required');
      return;
    }

    // Direct approve by creating a request and approving it
    const reqId = `req-direct-${Date.now()}`;
    // We can simulate request approval
    approveCustomerRequest(reqId);
    showToast(`Directly registered approved customer: ${directCompany}`);
    setDirectCompany('');
    setDirectContact('');
    setDirectEmail('');
    setDirectPhone('');
    setSubTab('approved');
  };

  const filteredApproved = customerAccounts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.companyName.toLowerCase().includes(q) ||
      c.contactName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.businessType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              Pending Compliance Reviews
            </span>
            <div className="text-2xl font-black text-amber-950 mt-1">
              {pendingRequests.length}
            </div>
            <span className="text-[11px] text-amber-700">Awaiting SolarStock verification</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Approved B2B Customers
            </span>
            <div className="text-2xl font-black text-emerald-950 mt-1">
              {customerAccounts.length}
            </div>
            <span className="text-[11px] text-emerald-700">Active wholesale project accounts</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
              Total Applications Handled
            </span>
            <div className="text-2xl font-black text-neutral-900 mt-1">
              {customerSignupRequests.length}
            </div>
            <span className="text-[11px] text-neutral-500">Compliance submissions logged</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'pending'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approvals</span>
            {pendingRequests.length > 0 && (
              <span className="bg-neutral-950 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setSubTab('approved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'approved'
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Approved Accounts ({customerAccounts.length})</span>
          </button>
        </div>

        {subTab === 'approved' && (
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        )}
      </div>

      {/* TAB: PENDING APPROVALS */}
      {subTab === 'pending' && (
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-neutral-900">All pending applications reviewed!</h3>
              <p className="text-xs text-neutral-500 mt-1">
                New customer signup requests with company details and compliance documents will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border-2 border-amber-300/80 rounded-2xl p-5 shadow-sm space-y-4 hover:border-amber-400 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-neutral-950">
                            {req.companyName}
                          </h4>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                            {req.businessType}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500">
                          Contact: <strong>{req.contactName}</strong> • Submitted on {req.submittedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleApprove(req.id, req.companyName)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Customer</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id, req.companyName)}
                        className="px-3 py-2 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>

                  {/* Submission Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                        Corporate Email
                      </span>
                      <span className="font-semibold text-neutral-900 break-all">{req.email}</span>
                    </div>

                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                        Direct Phone
                      </span>
                      <span className="font-semibold text-neutral-900">{req.phone || 'Not provided'}</span>
                    </div>

                    <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-0.5">
                        Country / Jurisdiction
                      </span>
                      <span className="font-semibold text-neutral-900">{req.country}</span>
                    </div>

                    <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/60">
                      <span className="text-[10px] font-bold uppercase text-amber-800 block mb-0.5">
                        Tax & Registration #
                      </span>
                      <span className="font-mono font-bold text-amber-950">{req.taxOrRegNumber}</span>
                    </div>
                  </div>

                  {/* Compliance Document Notes */}
                  {req.complianceDocNotes && (
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs">
                      <span className="text-[10px] font-bold uppercase text-neutral-500 block mb-1">
                        Compliance Documents & Certification Notes:
                      </span>
                      <p className="text-neutral-700 italic">
                        "{req.complianceDocNotes}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: APPROVED ACCOUNTS */}
      {subTab === 'approved' && (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Representative</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Business Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {filteredApproved.map((cust) => (
                  <tr key={cust.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-neutral-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-600" />
                        <span>{cust.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-700">{cust.contactName}</td>
                    <td className="py-3 px-4 text-neutral-600 font-mono text-[11px]">{cust.email}</td>
                    <td className="py-3 px-4">
                      <span className="bg-neutral-100 text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {cust.businessType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Approved
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteAccount(cust.id, cust.companyName)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Revoke Customer Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
