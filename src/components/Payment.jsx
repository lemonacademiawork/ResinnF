import React from 'react';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://candlepage-production.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Payment({
  name,
  email,
  phone,
  orderId,
  orderData,
  isProcessing,
  setIsProcessing,
  apiError,
  setApiError,
  setStep,
  getTierTitle,
  getTierPrice,
}) {

  const handlePaymentSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    setIsProcessing(true);
    setApiError('');

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setApiError('Razorpay Checkout SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    const isClientOrder = orderData?.orderId && orderData.orderId.startsWith('RESIN_');
    const amountVal = orderData?.amount ? Math.round(orderData.amount * 100) : 24900;

    const logoUrl = typeof window !== 'undefined' ? `${window.location.origin}/images/logo.png` : '/images/logo.png';

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T0cB0EYllXBVHc',
      amount: amountVal,
      currency: orderData?.currency || 'INR',
      name: 'Lemon Academia',
      description: getTierTitle ? getTierTitle() : 'Resin Art Course',
      image: logoUrl,
      ...(isClientOrder ? {} : (orderData?.orderId ? { order_id: orderData.orderId } : {})),
      handler: async function (paymentResponse) {
        setIsProcessing(true);
        setApiError('');
        try {
          if (API_BASE_URL) {
            const rzpOrderId = paymentResponse.razorpay_order_id || orderData?.orderId || orderId;
            const rzpPayId = paymentResponse.razorpay_payment_id;
            const rzpSig = paymentResponse.razorpay_signature;

            await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: rzpOrderId,
                paymentId: rzpPayId,
                signature: rzpSig,
                razorpayOrderId: rzpOrderId,
                razorpayPaymentId: rzpPayId,
                razorpaySignature: rzpSig,
                razorpay_order_id: rzpOrderId,
                razorpay_payment_id: rzpPayId,
                razorpay_signature: rzpSig,
                email: email ? email.trim() : '',
                phone: phone ? phone.trim() : '',
                name: name ? name.trim() : '',
              }),
            }).catch((verifyErr) => {
              console.warn('Backend verification call error:', verifyErr);
            });
          }
        } catch (_) {}
        setStep('success');
        setIsProcessing(false);
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        },
      },
      prefill: {
        name: name ? name.trim() : '',
        email: email ? email.trim() : '',
        contact: phone ? phone.trim() : '',
      },
      theme: {
        color: '#8e4e00',
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (paymentFailedResponse) {
        setApiError(paymentFailedResponse.error?.description || 'Payment transaction was not completed.');
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay open error:', err);
      setApiError('Failed to initialize Razorpay checkout popup. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="payment-content">
      <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Secure Checkout</h3>
      <p className="text-body-md text-on-surface-variant mb-6">Complete your payment securely using Razorpay. Supports UPI, Cards, Netbanking, and Wallets.</p>

      {apiError && (
        <div className="p-4 mb-4 bg-error-container text-on-error-container rounded-2xl text-sm font-semibold flex items-start gap-3 border border-error/20 animate-fadeIn">
          <span className="material-symbols-outlined text-[20px] shrink-0 text-error">error</span>
          <span>{apiError}</span>
        </div>
      )}

      {/* Purchase Summary */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 mb-6 space-y-4">
        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider">Item Selected</p>
            <p className="font-semibold text-on-surface text-base">{getTierTitle()}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-on-surface-variant uppercase tracking-wider">Total Price</p>
            <p className="font-bold text-primary text-xl">{getTierPrice()}</p>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-on-surface-variant">
            <span>Name:</span>
            <span className="font-semibold text-on-surface">{name}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Email:</span>
            <span className="font-semibold text-on-surface">{email}</span>
          </div>
          {orderId && (
            <div className="flex justify-between text-on-surface-variant">
              <span>Order Reference:</span>
              <span className="font-mono text-on-surface">{orderId}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handlePaymentSubmit}
        disabled={isProcessing}
        className="w-full bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-102 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Checkout...
          </>
        ) : (
          `Pay ${getTierPrice()} with Razorpay`
        )}
      </button>

      <button
        type="button"
        disabled={isProcessing}
        onClick={() => setStep('form')}
        className="w-full text-center text-xs font-bold text-on-surface-variant hover:text-primary transition-colors py-4 disabled:opacity-30"
      >
        Go Back to Details
      </button>
    </div>
  );
}
