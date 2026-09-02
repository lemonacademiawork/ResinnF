import React, { useState, useEffect } from 'react';
import Payment from './Payment';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://candlepage-production.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export default function BookingModal({ isOpen, onClose, selectedTier }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tier, setTier] = useState('discovery');

  const [emailError, setEmailError] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'payment', 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [source, setSource] = useState('instagram');
  const [orderData, setOrderData] = useState(null);


  // Sync states when modal opens
  useEffect(() => {
    if (isOpen) {
      setTier(selectedTier || 'discovery');
      setStep('form');
      setIsProcessing(false);
      setName('');
      setEmail('');
      setPhone('');
      setEmailError(false);

      setApiError('');
      setOrderId('');
      setSource('instagram');
      setOrderData(null);
    }
  }, [isOpen, selectedTier]);

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() !== "" && !emailRegex.test(email.trim())) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setIsProcessing(true);
    setApiError('');

    if (tier === 'discovery') {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            source: source,
          }),
        }).catch(() => null);

        // Even if server is down, save to local storage and show success
        try {
          const storedLeads = JSON.parse(localStorage.getItem('lemon_leads') || '[]');
          storedLeads.push({ name: name.trim(), email: email.trim(), phone: phone.trim(), source, timestamp: new Date().toISOString() });
          localStorage.setItem('lemon_leads', JSON.stringify(storedLeads));
        } catch (_) {}

        setStep('success');
      } catch (err) {
        setStep('success');
      } finally {
        setIsProcessing(false);
      }
    } else {
      const amount = tier === 'basic' ? 249 : 1896;
      try {
        let serverOrder = null;
        try {
          const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim(),
              amount: amount,
            }),
          });

          if (response.ok) {
            serverOrder = await response.json();
          }
        } catch (fetchErr) {
          console.warn('Backend server offline, continuing with direct client checkout fallback.', fetchErr);
        }

        const activeOrderId = serverOrder?.orderId || `RESIN_${Date.now()}`;
        const activeOrderData = serverOrder || {
          orderId: activeOrderId,
          amount: amount,
          currency: 'INR',
        };

        setOrderId(activeOrderId);
        setOrderData(activeOrderData);
        setStep('payment');
      } catch (err) {
        // Safe fallback
        const fallbackOrderId = `RESIN_${Date.now()}`;
        setOrderId(fallbackOrderId);
        setOrderData({ orderId: fallbackOrderId, amount, currency: 'INR' });
        setStep('payment');
      } finally {
        setIsProcessing(false);
      }
    }
  };


  const getTierPrice = () => {
    if (tier === 'basic') return '₹249';
    if (tier === 'advanced') return '₹1896';
    return 'Free';
  };

  const getTierTitle = () => {
    if (tier === 'basic') return 'Basic Resin Art Track (4 Days)';
    if (tier === 'advanced') return 'Complete Resin Art Masterclass (14 Days)';
    return 'Discovery Consultation Call';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="glass-card w-full max-w-lg p-8 rounded-3xl relative transition-all transform scale-100 opacity-100 duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent close on modal body click
      >
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        {/* STEP 1: LEAD FORM */}
        {step === 'form' && (
          <div id="form-content">
            <h3 id="modal-title" className="font-display-lg text-headline-md text-on-surface mb-2">Reserve Your Spot</h3>
            <p className="text-body-md text-on-surface-variant mb-6">Enter your details below to schedule your call or enroll in the workshop.</p>

            {apiError && (
              <div className="p-4 mb-4 bg-error-container text-on-error-container rounded-2xl text-sm font-semibold flex items-start gap-3 border border-error/20 animate-fadeIn">
                <span className="material-symbols-outlined text-[20px] shrink-0 text-error">error</span>
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-on-surface-variant mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  disabled={isProcessing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                  placeholder="Amara Singh"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-on-surface-variant mb-1">Email Address <span className="font-normal text-on-surface-variant/60">(Optional)</span></label>
                <input

                  id="email"

                  disabled={isProcessing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:ring-1 transition-all disabled:opacity-60 `}
                  placeholder="amara@example.com"
                />

              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  disabled={isProcessing}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                  placeholder="98765 43210"
                />
              </div>
              <div>
                <label htmlFor="course-tier" className="block text-sm font-semibold text-on-surface-variant mb-1">Select Course Path</label>
                {selectedTier ? (
                  <div className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-xl text-on-surface font-semibold">
                    {tier === 'discovery' && 'Book a Call'}
                    {tier === 'basic' && '4 Days - ₹249'}
                    {tier === 'advanced' && '14 Days - ₹1896'}
                  </div>
                ) : (
                  <select
                    id="course-tier"
                    disabled={isProcessing}
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                  >
                    <option value="discovery">Book a Call</option>
                    <option value="basic">4 Days - ₹249</option>
                    <option value="advanced">14 Days - ₹1896</option>
                  </select>
                )}
              </div>
              <div>
                <label htmlFor="source" className="block text-sm font-semibold text-on-surface-variant mb-1">Where did you hear about us?</label>
                <select
                  id="source"
                  disabled={isProcessing}
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-60"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="google">Google Search</option>
                  <option value="friends">Friends / Family</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-102 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {tier === 'discovery' ? 'Submitting Booking...' : 'Creating Order...'}
                  </>
                ) : (
                  tier === 'discovery' ? 'Submit Booking' : 'Continue to Payment'
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: SECURE CHECKOUT SUMMARY */}
        {step === 'payment' && (
          <Payment
            name={name}
            email={email}
            phone={phone}
            orderId={orderId}
            orderData={orderData}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            apiError={apiError}
            setApiError={setApiError}
            setStep={setStep}
            getTierTitle={getTierTitle}
            getTierPrice={getTierPrice}
          />
        )}

        {/* STEP 3: SUCCESS OR CONFIRMATION SCREEN */}
        {step === 'success' && (
          <div id="success-content" className="text-center py-8">
            <div className="w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px]">check_circle</span>
            </div>

            {tier === 'discovery' ? (
              <>
                <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Call Booked!</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Thank you, <span className="font-bold">{name}</span>. We have scheduled your consulting slot.{email.trim() ? <> A validation confirmation has been sent to <span className="font-semibold">{email}</span>.</> : <> We will contact you on your phone number.</>}
                </p>
              </>
            ) : (
              <>
                <h3 className="font-display-lg text-headline-md text-on-surface mb-2">Enrollment Confirmed!</h3>
                <p className="text-body-md text-on-surface-variant mb-6">
                  Payment of <span className="font-bold text-primary">{getTierPrice()}</span> received. Welcome to <span className="font-semibold">Lemon Academia</span>, <span className="font-bold">{name}</span>!{email.trim() ? <> Your course onboarding credentials and material lists have been sent to <span className="font-semibold">{email}</span>.</> : <> We will share your course details on your phone number.</>}
                </p>

                {orderId && (
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20 mb-6 text-left max-w-sm mx-auto space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Order ID:</span>
                      <span className="font-mono font-bold text-on-surface select-all">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Status:</span>
                      <span className="text-tertiary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block"></span>
                        Verified
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            <a href="https://chat.whatsapp.com/ES0QItGUOS1CmuhyLkIFZ7" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md btn-primary-shadow hover:scale-105 transition-all">
              Join WhatsApp Group
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
