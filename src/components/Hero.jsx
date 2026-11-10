import React from 'react';

export default function Hero({ onOpenModal }) {
  return (
    <section className="relative min-h-[85vh] pt-28 pb-16 flex items-center overflow-hidden bg-surface">

      {/* Background Image across entire Hero width */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/artisan.jpg)` }}
      ></div>

      {/* Gradient Mask Overlay: Fades from solid/opaque on left to transparent on right for flawless text contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-surface via-surface/90 sm:via-surface/80 to-surface/30 md:to-transparent"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-surface via-transparent to-surface/30"></div>

      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Heading & Value Proposition overlay */}
          <div className="lg:col-span-7 space-y-6 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/30 backdrop-blur-md border border-primary/30 text-primary text-xs md:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Live Step-by-Step Workshop • Basics to Advanced
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] text-on-surface leading-[1.15] font-extrabold">
              Master the Art of <span className="text-primary italic font-serif">Premium Resin Art</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed font-medium">
              From creative beginner to professional resin artist. Learn ocean wave clocks, floral preservation jewellery, geode coasters, keychains, and custom resin keepsakes with 100% practical step-by-step guidance!
            </p>

            {/* Offer Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-w-lg py-1">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 backdrop-blur-md border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">support_agent</span>
                <span className="text-xs md:text-sm font-semibold text-on-surface">Trainer Support</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 backdrop-blur-md border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                <span className="text-xs md:text-sm font-semibold text-on-surface">Verified Certificate</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 backdrop-blur-md border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">all_inclusive</span>
                <span className="text-xs md:text-sm font-semibold text-on-surface">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 backdrop-blur-md border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">storefront</span>
                <span className="text-xs md:text-sm font-semibold text-on-surface">Wholesaler Vendor Details</span>
              </div>
            </div>

            {/* Action Buttons & Special Pricing */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenModal('discovery')}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md hover:scale-105 transition-all active:scale-95 btn-primary-shadow flex items-center justify-center gap-2 shadow-lg"
              >
                <span className="material-symbols-outlined">calendar_today</span>
                Book a Call / Enroll
              </button>

              <a
                href="https://wa.me/917905713069?text=Hi%2C%20I%20am%20interested%20in%20the%20Resin%20Art%20Course"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface/90 backdrop-blur-md border-2 border-secondary text-secondary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xs font-semibold"
              >
                <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"></path>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Micro value badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                Practical Learning
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">groups</span>
                Creative Community
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">trending_up</span>
                Turn Skill Into Income
              </div>
            </div>
          </div>

          {/* Right Column: Empty or subtle floating highlight card allowing background resin art to shine */}
          <div className="lg:col-span-5 hidden lg:block"></div>

        </div>
      </div>
    </section>
  );
}
