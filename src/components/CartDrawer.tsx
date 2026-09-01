import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');

  // Customer Checkout Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'emi'>('cod');

  if (!isOpen) return null;

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.includeBundle && item.product.bundleOffer) {
      itemPrice += item.product.bundleOffer.offerPrice;
    }
    if (item.selectedCarePlanId && item.product.carePlans) {
      const plan = item.product.carePlans.find(p => p.id === item.selectedCarePlanId);
      if (plan) itemPrice += plan.price;
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 50000 ? 0 : 450;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SOLAR2026') {
      const discount = Math.round(subtotal * 0.05);
      setDiscountAmount(discount);
      setCouponMessage('Coupon applied! 5% solar discount saved.');
    } else if (couponCode.trim().toUpperCase() === 'FREEFREIGHT') {
      setDiscountAmount(deliveryFee);
      setCouponMessage('Free delivery coupon applied!');
    } else {
      setCouponMessage('Invalid or expired coupon code.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill out your delivery name, phone, and full address.');
      return;
    }
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-neutral-900 font-['Outfit',sans-serif]">
              Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          /* Empty State matching video (00:45) */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 border border-amber-200">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">
              No items in cart
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Your solar equipment cart is currently empty. Explore our latest hybrid inverters and solar panels!
            </p>
            <button
              onClick={() => {
                onContinueShopping();
                onClose();
              }}
              className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-neutral-100">
            {cartItems.map((item, idx) => {
              let itemUnitPrice = item.product.price;
              if (item.includeBundle && item.product.bundleOffer) {
                itemUnitPrice += item.product.bundleOffer.offerPrice;
              }
              if (item.selectedCarePlanId && item.product.carePlans) {
                const plan = item.product.carePlans.find(p => p.id === item.selectedCarePlanId);
                if (plan) itemUnitPrice += plan.price;
              }

              return (
                <div key={idx} className="py-3 flex gap-3 items-start">
                  {/* Image */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-neutral-50 border border-neutral-200 shrink-0 p-1"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {item.product.name}
                    </h4>

                    {/* Variant tags */}
                    <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-neutral-500">
                      {item.selectedCapacity && (
                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded font-medium">
                          {item.selectedCapacity}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded font-medium">
                          {item.selectedColor}
                        </span>
                      )}
                      {item.includeBundle && (
                        <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          + Cable Bundle
                        </span>
                      )}
                      {item.selectedCarePlanId && (
                        <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                          + SolarCare+
                        </span>
                      )}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-2">
                      <strong className="text-xs sm:text-sm font-extrabold text-neutral-950">
                        ৳ {(itemUnitPrice * item.quantity).toLocaleString()}
                      </strong>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-neutral-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="w-5 h-5 rounded flex items-center justify-center hover:bg-white text-neutral-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-neutral-400 hover:text-red-500 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer with Subtotal & Checkout Trigger */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3">
            {/* Coupon Code input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. SOLAR2026)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-neutral-300 uppercase outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-neutral-900 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className="text-[11px] font-semibold text-amber-700">{couponMessage}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <strong className="text-neutral-900">৳ {subtotal.toLocaleString()}</strong>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>- ৳ {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Shipping:</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `৳ ${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Total Amount:</span>
                <span className="text-base text-amber-600 font-black">৳ {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-amber-400/30 transition-all"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal Flow */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'form' ? (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                      Complete Your Solar Order
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Total Payable: <strong className="text-amber-600 font-bold">৳ {total.toLocaleString()}</strong>
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Ashraful Islam"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Phone Number (for Courier & Solar Technician) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Delivery Address & District *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Plot, Road, Area, Thana, District"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1.5">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 ${
                        paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50 font-bold' : 'border-neutral-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-amber-500"
                      />
                      <span>Cash On Delivery</span>
                    </label>

                    <label
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 ${
                        paymentMethod === 'bkash' ? 'border-amber-500 bg-amber-50 font-bold' : 'border-neutral-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="accent-amber-500"
                      />
                      <span>bKash / Nagad</span>
                    </label>

                    <label
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 ${
                        paymentMethod === 'emi' ? 'border-amber-500 bg-amber-50 font-bold' : 'border-neutral-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'emi'}
                        onChange={() => setPaymentMethod('emi')}
                        className="accent-amber-500"
                      />
                      <span>0% EMI Installment</span>
                    </label>

                    <label
                      className={`p-2.5 rounded-lg border cursor-pointer flex items-center gap-2 ${
                        paymentMethod === 'nagad' ? 'border-amber-500 bg-amber-50 font-bold' : 'border-neutral-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMethod === 'nagad'}
                        onChange={() => setPaymentMethod('nagad')}
                        className="accent-amber-500"
                      />
                      <span>Card / NetBanking</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-4"
                >
                  CONFIRM ORDER (৳ {total.toLocaleString()})
                </button>
              </form>
            ) : (
              /* Success confirmation */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-neutral-950 font-['Outfit',sans-serif]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Thank you <strong>{customerName}</strong>! Your order ID is <span className="font-mono font-bold text-amber-700">#SS-{(Math.random() * 90000 + 10000).toFixed(0)}</span>. Our solar technician will call <strong className="text-neutral-900">{customerPhone}</strong> within 15 minutes to confirm dispatch.
                </p>
                <div className="p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500">
                  SolarCare+ Warranty Certificate and Invoice will be included in the box.
                </div>
                <button
                  onClick={() => {
                    onClearCart();
                    setShowCheckoutModal(false);
                    onClose();
                  }}
                  className="bg-neutral-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-neutral-800 transition-colors"
                >
                  Done & Back to Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
