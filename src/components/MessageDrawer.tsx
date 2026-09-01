import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, Headphones } from 'lucide-react';

export const MessageDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      setIsOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Floating Vertical "Message" tab on right edge matching video (00:00 - 02:28) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-3 px-2 rounded-l-xl shadow-xl flex flex-col items-center gap-1.5 transition-all group focus:outline-none"
        title="Live Message / Support"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border border-amber-700" />
        </div>
        <span className="[writing-mode:vertical-rl] tracking-widest uppercase text-[11px] font-black group-hover:scale-105 transition-transform">
          Message
        </span>
      </button>

      {/* Slide-in Message Modal matching video (02:26) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95">
            {/* Close Button matching video */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Message Sent to Solar Engineering Desk!
                </h3>
                <p className="text-xs text-neutral-500">
                  Our solar engineer will respond to {email} shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Header text matching video (02:26) */}
                <div className="pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-5 h-5 text-amber-500" />
                    <h3 className="text-base font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                      Solarstock Live Support
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Please fill out the form below and we will get back to you as soon as possible.
                  </p>
                </div>

                {/* Form matching video (02:26) */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="* Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="* Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="* Message (e.g. Inverter capacity required for 3 ACs, tubular battery price...)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </button>
                </form>

                <div className="text-center pt-2 border-t border-neutral-100">
                  <span className="text-[11px] text-neutral-400">
                    Powered by Solarstock Live Desk
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
