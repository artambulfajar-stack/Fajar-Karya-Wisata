import React, { useState } from 'react';
import { PACKAGES_DATA } from '../data/travelData';
import { TourPackage } from '../types/travel';
import { MapPin, Clock, ArrowRight, Sparkles, Check, Users } from 'lucide-react';
import { PackageModal } from './PackageModal';

interface PackagesSectionProps {
  packages?: TourPackage[];
  onOpenCustomBuilder: () => void;
  onSelectPackageForBooking: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  onOpenCustomBuilder,
  onSelectPackageForBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);

  const allPackages = packages || PACKAGES_DATA;

  const filterOptions = [
    { id: 'all', label: 'Semua Paket' },
    { id: 'keluarga', label: 'Paket Wisata Keluarga' },
    { id: 'study-tour', label: 'Paket Study Tour' },
    { id: 'group', label: 'Paket Wisata Group' },
    { id: 'custom', label: 'Paket Custom' },
  ];

  const filteredPackages = allPackages.filter((pkg) => {
    if (activeFilter === 'all') return true;
    return pkg.category === activeFilter;
  });

  return (
    <section id="paket-wisata" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
              03. PAKET WISATA
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Pilihan Perjalanan untuk Berbagai Kebutuhan
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Jelajahi paket wisata favorit yang terbukti memuaskan ribuan wisatawan dengan
              itinerary terencana, fasilitas lengkap, dan jaminan Service Of Priority.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={onOpenCustomBuilder}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Rancang Custom Trip Sendiri</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Control (Zero-Pill: functional buttons with clean segmented container) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto mb-10 max-w-2xl">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeFilter === opt.id
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-amber-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group"
            >
              <div>
                {/* Card Media Banner */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Clean unboxed category & duration on image overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-0.5">
                      <span>{pkg.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{pkg.destination}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2.5 group-hover:text-amber-700 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Destinasi Utama:
                    </div>
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <div className="text-xs text-slate-500 italic pl-5">
                        +{pkg.highlights.length - 3} destinasi lainnya
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer with Price and Detail Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Mulai dari</div>
                  <div className="text-base font-extrabold text-slate-900">
                    {pkg.startingPrice}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 whitespace-nowrap"
                >
                  <span>Detail Paket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Itinerary & Full Details */}
        <PackageModal
          packageItem={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={(pkg) => {
            setSelectedPackage(null);
            onSelectPackageForBooking(pkg);
          }}
        />
      </div>
    </section>
  );
};
