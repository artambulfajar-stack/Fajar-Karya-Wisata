import React from 'react';
import { TESTIMONIALS_DATA } from '../data/travelData';
import { TestimonialItem } from '../types/travel';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const allTestimonials = testimonials || TESTIMONIALS_DATA;

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
            09. TESTIMONI PELANGGAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Pengalaman nyata para guru, pimpinan instansi, dan kepala keluarga yang telah mempercayakan
            perjalanan mereka kepada PT Fajar Karya Wisata.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/60 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div>
                {/* Rating & Trip Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.date}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <span title="Terverifikasi" className="inline-flex">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">{item.role}</div>
                <div className="text-xs text-amber-800 font-semibold">{item.organization}</div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Trip: {item.tripType} · {item.destination}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
