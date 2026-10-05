import React, { useState } from 'react';
import { PROMOS_DATA } from '../data/travelData';
import { Tag, Copy, Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { PromoItem } from '../types/travel';

interface PromoSectionProps {
  promos?: PromoItem[];
  onClaimPromo: (promo: PromoItem) => void;
}

export const PromoSection: React.FC<PromoSectionProps> = ({ promos, onClaimPromo }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const allPromos = promos || PROMOS_DATA;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promo" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
              07. PROMO & PENAWARAN KHUSUS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Dapatkan Penawaran Menarik
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Nikmati berbagai promo dan penawaran khusus dari Fajar Karya Wisata untuk rombongan
              sekolah, instansi kantor, maupun keluarga.
            </p>
          </div>
        </div>

        {/* Promos Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allPromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out relative group"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{promo.badge}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>s/d {promo.validUntil}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {promo.title}
                </h3>

                <div className="text-base font-extrabold text-amber-700 mb-3">
                  {promo.discount}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {promo.description}
                </p>

                {/* Terms preview */}
                <div className="space-y-1 mb-6 text-[11px] text-slate-500">
                  {promo.terms.map((term, i) => (
                    <div key={i} className="flex items-start gap-1">
                      <span className="text-slate-400">•</span>
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code & Action Box */}
              <div className="pt-4 border-t border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-dashed border-slate-300">
                  <div className="font-mono text-xs font-bold text-slate-800 tracking-wider">
                    {promo.code}
                  </div>
                  <button
                    onClick={() => handleCopy(promo.code)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:text-amber-800 transition-colors focus:outline-none"
                    title="Salin kode promo"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Kode</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => onClaimPromo(promo)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <span>Klaim Promo Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
