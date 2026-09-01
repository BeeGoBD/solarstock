import React, { useState } from 'react';
import { Camera, ChevronRight, CheckCircle2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface PreOrderViewProps {
  onBackToHome: () => void;
}

export const PreOrderView: React.FC<PreOrderViewProps> = ({ onBackToHome }) => {
  const [productQuery, setProductQuery] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('Please accept the Terms & Conditions before submitting.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-in fade-in">
      {/* Breadcrumb matching video (00:54) */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <button onClick={onBackToHome} className="hover:text-amber-600 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-neutral-900">Pre-Order</span>
      </div>

      {submitted ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
            Pre-Order Request Received!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            Thank you <strong>{name}</strong>! Our solar procurement engineers will source the pricing and delivery timeline for <strong>{productQuery}</strong> and contact you at <strong>{phone}</strong> within 24 hours.
          </p>
          <div className="pt-2">
            <button
              onClick={onBackToHome}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8">
          {/* Header Title matching video (00:54) */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
              Looking For Something Different?
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Put Your Information In The Box...
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            {/* Product Name or URL */}
            <div>
              <input
                type="text"
                required
                placeholder="Enter product name/URL..."
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all"
              />
            </div>

            {/* Add Image Button matching video (00:54) */}
            <div>
              <label className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {uploadedImage && (
                <div className="mt-2 relative inline-block">
                  <img
                    src={uploadedImage}
                    alt="Upload Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-neutral-200 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Customer Name */}
            <div>
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                required
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <textarea
                rows={3}
                required
                placeholder="Address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-neutral-300 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Terms checkbox matching video (00:55) */}
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
              />
              <span>I accept <a href="#terms" className="underline font-semibold text-neutral-800">Terms & Conditions</a></span>
            </label>

            {/* SUBMIT Button matching video (00:56) */}
            <button
              type="submit"
              className="w-full bg-neutral-100 hover:bg-amber-400 text-neutral-950 font-black py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-xs"
            >
              SUBMIT
            </button>

            {/* BACK TO HOME matching video (00:56) */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-amber-600 uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO HOME</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
