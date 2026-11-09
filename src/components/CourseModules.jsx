import React from 'react';

export default function CourseModules({ onOpenModal }) {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal" id="course">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/20 border border-primary/30 text-primary text-xs md:text-sm font-semibold mb-4">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          Complete 14-Day Step-by-Step Curriculum
        </div>
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
          Resin Art Masterclass Curriculum
        </h2>
        <p className="text-body-lg text-on-surface-variant">
          From basic resin ratio measurements to luxury ocean clocks, geode art, resin table tops, and 3D Varmala floral preservation!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Basic Course Card (Col 4) */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-3xl border-2 border-transparent hover:border-primary/20 transition-all duration-300 flex flex-col justify-between shadow-lg">
          <div>
            <div className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm relative group">
              <img 
                src={`${import.meta.env.BASE_URL}images/artisan.jpg`} 
                alt="Basic Resin Art Course Showcase" 
                className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/20">
                FOUNDATION TRACK • 4 DAYS
              </div>
            </div>

            <h3 className="font-display-lg text-headline-md mb-1 text-on-surface">Basic Resin Art Course</h3>
            <p className="text-secondary font-label-md uppercase tracking-wider text-xs mb-6">Fundamentals & Starter Projects</p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">D1</div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Day 1: Resin Basics & Ratios</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Epoxy resin mixing ratios, measurements, safety guidelines & basic tools.</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">D2</div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Day 2: Resin Keychain</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Step-by-step keychain creation from initial pouring to smooth demoulding.</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">D3</div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Day 3: Floral Resin Earrings</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Designing aesthetic resin jewellery using real rose petals & gold flakes.</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">D4</div>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Day 4: Resin Mantra Coaster</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Techniques to embed vinyl stickers, mantra typography & clear top coats.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-headline-md text-primary font-bold text-3xl">₹299</span>
              <span className="text-body-md text-on-surface-variant line-through opacity-60">₹499</span>
            </div>
            <button onClick={() => onOpenModal('basic')} className="w-full bg-primary text-on-primary px-6 py-3.5 rounded-full font-label-md text-label-md hover:scale-102 transition-all active:scale-95 btn-primary-shadow">
              Enroll in Basic Track (4 Days)
            </button>
          </div>
        </div>

        {/* Full Masterclass Card (Col 7) */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border-2 border-primary-container relative flex flex-col justify-between shadow-xl">
          <div className="absolute -top-4 left-8 bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold shadow-md">
            FULL MASTERCLASS • 14 DAYS
          </div>

          <div>
            <div className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/20 shadow-sm relative group">
              <img 
                src={`${import.meta.env.BASE_URL}images/masterclass-banner.jpg`} 
                alt="Complete Resin Art Masterclass Showcase" 
                className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                BASIC INCLUDED
              </div>
            </div>

            <h3 className="font-display-lg text-headline-md mb-1 text-on-surface">Complete 14-Day Resin Art Masterclass</h3>
            <p className="text-secondary font-label-md uppercase tracking-wider text-xs mb-6">Basics + Advanced Ocean &amp; Geode Art + Table Tops &amp; Varmala Preservation</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Module 2: Advanced Resin Art */}
              <div className="bg-surface-container-low/60 p-5 rounded-2xl border border-outline-variant/20 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-[20px]">water_drop</span>
                  <span>Module 2: Advance Resin Art (4 Days)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D1:</strong>
                    <span><strong className="text-on-surface">Ocean Resin Art</strong> — Base making &amp; mixing ocean pigment shades.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D2:</strong>
                    <span><strong className="text-on-surface">Ocean Resin Clock</strong> — Wave lacing, fitting clock machine &amp; top coat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D3:</strong>
                    <span><strong className="text-on-surface">Geode Resin Base</strong> — Crafting geode base outlines &amp; resin pours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D4:</strong>
                    <span><strong className="text-on-surface">Completing Geode</strong> — Placing raw crystals &amp; metallic marker detailing.</span>
                  </li>
                </ul>
              </div>

              {/* Module 3: Table Top & Varmala */}
              <div className="bg-surface-container-low/60 p-5 rounded-2xl border border-outline-variant/20 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-[20px]">chair</span>
                  <span>Module 3: Table Top &amp; Varmala (6 Days)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D1-D2:</strong>
                    <span><strong className="text-on-surface">Resin Table Top</strong> — Multi-color resin table pour &amp; high-gloss final coating.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D3:</strong>
                    <span><strong className="text-on-surface">Varmala Flower Drying</strong> — Flower drying, arrangement &amp; 1st pour layer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D4:</strong>
                    <span><strong className="text-on-surface">2nd Layer Pour</strong> — Embedding motis, pearls &amp; decorative items.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary shrink-0">D5-D6:</strong>
                    <span><strong className="text-on-surface">Customization &amp; Box Finish</strong> — Sanding, name &amp; date placement, last pour &amp; box assembly.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md text-primary font-bold text-3xl">₹1896</span>
                  <span className="text-body-md text-on-surface-variant line-through opacity-60">₹1999</span>
                  <span className="text-xs bg-tertiary-container/30 text-tertiary font-bold px-2 py-0.5 rounded-md">SAVE 35%</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">Includes Verified Certificate, Vendor List &amp; Lifetime Recordings</p>
              </div>

              <button onClick={() => onOpenModal('advanced')} className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-md text-label-md hover:scale-105 transition-all active:scale-95 btn-primary-shadow shadow-lg shrink-0">
                Enroll in Complete Masterclass
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
