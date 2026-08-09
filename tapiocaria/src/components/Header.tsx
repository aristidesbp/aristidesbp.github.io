import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { Clock, MapPin, Heart, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-[#eee7e3] h-64 md:h-80 flex items-end justify-center overflow-hidden rounded-b-2xl shadow-sm">
      {/* Background Hero Image */}
      <img
        src={RESTAURANT_INFO.heroBannerUrl}
        alt="Tapioca deliciosa na chapa"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 text-center pb-6 px-4 w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Logo Badge */}
        <div className="relative mb-3">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#fff8f5] shadow-lg bg-white overflow-hidden flex items-center justify-center p-1">
            <img
              src={RESTAURANT_INFO.logoUrl}
              alt={RESTAURANT_INFO.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-[#c2410c] text-white p-1 rounded-full shadow-md">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </span>
        </div>

        {/* Tagline */}
        <span className="inline-flex items-center gap-1.5 bg-[#712c00] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#ffb693]" />
          {RESTAURANT_INFO.tagline}
        </span>

        {/* Title & Description */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-md tracking-tight">
          {RESTAURANT_INFO.name}
        </h1>
        <p className="text-[#eee7e3] text-sm md:text-base mt-1 max-w-md font-medium">
          {RESTAURANT_INFO.subtitle}
        </p>

        {/* Operational info pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-white/90">
          <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#ffb693]" />
            {RESTAURANT_INFO.openingHours}
          </span>
          <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#ffb693]" />
            {RESTAURANT_INFO.whatsappDisplay}
          </span>
        </div>
      </div>
    </header>
  );
};
