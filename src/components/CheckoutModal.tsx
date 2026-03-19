import React, { useState } from 'react';
import { X, CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cartTotal, clearCart } = useShop();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        onClose();
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
          >
            {isSuccess ? (
              <div className="p-12 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">Order Successful!</h2>
                  <p className="text-gray-500">Thank you for your purchase. Your order is being processed.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                {/* Left Side: Form */}
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold tracking-tight">Checkout</h2>
                    <button onClick={onClose} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="alex@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Shipping Address</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="123 Street Name, City"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Card Number</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          placeholder="•••• •••• •••• ••••"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Expiry</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-gray-50 border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          placeholder="MM/YY"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isProcessing}
                      type="submit"
                      className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Pay ${cartTotal.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right Side: Info */}
                <div className="w-full md:w-64 bg-gray-50 p-8 border-l border-black/5 hidden md:block">
                  <div className="space-y-8">
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold">Free Shipping</h4>
                        <p className="text-xs text-gray-500">On all orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold">Secure Payment</h4>
                        <p className="text-xs text-gray-500">SSL encrypted checkout</p>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-black/5">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Shipping</span>
                        <span className="text-emerald-600 font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-black/5">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
