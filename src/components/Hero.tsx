import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, ShieldCheck, Bus, Award } from 'lucide-react';
import heroBromo from '../assets/images/hero_travel_bromo_1791223504621.jpg';
import { COMPANY_INFO } from '../data/travelData';
import { CompanySettings } from '../types/dashboard';

interface HeroProps {
  onOpenConsultation: () => void;
  settings?: CompanySettings;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, settings }) => {
  const companyName = settings?.companyName || COMPANY_INFO.name;
  const tagline = settings?.tagline || COMPANY_INFO.tagline;
  const headline = settings?.headline || 'Solusi Perjalanan Wisata yang Nyaman, Aman, dan Terpercaya';
  const heroImageSrc = settings?.heroImageUrl || heroBromo;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageSrc}
          alt={`Pesona Wisata bersama ${companyName}`}
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-700 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim ensuring WCAG AA legibility across all media frames */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Clean Kicker Badge (Zero-Pill compliant: quiet unboxed text or subtle tag) */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{companyName} · {tagline}</span>
        </div>

        {/* Unmistakable Headline with balanced wrap */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance max-w-4xl mx-auto drop-shadow-sm">
          {headline.includes('Nyaman, Aman') ? (
            <>
              {headline.split('Nyaman, Aman')[0]}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                Nyaman, Aman,
              </span>{' '}
              {headline.split('Nyaman, Aman')[1]?.replace(/^[,\s]+/, '')}
            </>
          ) : (
            headline
          )}
        </h1>

        {/* Concrete Value Proposition */}
        <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
          PT Fajar Karya Wisata hadir sebagai mitra perjalanan untuk kebutuhan wisata individu,
          keluarga, sekolah, instansi, perusahaan, komunitas, dan berbagai kebutuhan perjalanan
          lainnya dengan standar pelayanan prioritas.
        </p>

        {/* Dual Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#paket-wisata"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/25 hover:-translate-y-0.5 active:translate-y-0 rounded-lg shadow-lg shadow-amber-950/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap"
          >
            <span>Jelajahi Paket Wisata</span>
            <ArrowDown className="w-4 h-4 ml-2" />
          </a>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shadow-sm"
          >
            <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Hubungi Kami</span>
          </button>
        </div>

        {/* Claim-to-Proof Quantitative Trust Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-sm">Resmi & Berizin</div>
              <div className="text-slate-400 text-xs mt-0.5">Legalitas lengkap & terverifikasi</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Bus className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-sm">Armada Prima</div>
              <div className="text-slate-400 text-xs mt-0.5">Standar pariwisata nyaman</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-sm">Service Of Priority</div>
              <div className="text-slate-400 text-xs mt-0.5">Dedikasi kepuasan peserta</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-white font-semibold text-sm">Itinerary Fleksibel</div>
              <div className="text-slate-400 text-xs mt-0.5">Dapat disesuaikan budget</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
