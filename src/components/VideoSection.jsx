import React from 'react';

export default function VideoSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto reveal" id="intro-video">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container/30 border border-primary/30 text-primary text-xs md:text-sm font-semibold mb-3">
          <span className="material-symbols-outlined text-primary text-base">play_circle</span>
          Resin Art Masterclass Preview
        </div>
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary font-bold mb-3">
          Watch the Masterclass in Action
        </h2>
        <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
          Get a glimpse into our step-by-step video workshop. Learn the exact resin mixing ratios, color pouring, wave creation, and finishing techniques.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-outline-variant/30 shadow-2xl bg-surface-container aspect-video group">
        <video 
          controls 
          preload="metadata" 
          playsInline 
          className="w-full h-full object-cover rounded-3xl"
        >
          <source src={`${import.meta.env.BASE_URL}videos/resin-masterclass-video.mp4`} type="video/mp4" />
          <source src={`${import.meta.env.BASE_URL}videos/RESIN_VIDEO.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}