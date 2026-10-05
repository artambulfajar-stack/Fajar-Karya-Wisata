import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/travelData';
import { MapPin, Calendar, Compass, ArrowRight, Check } from 'lucide-react';
import { DestinationRegion } from '../types/travel';

interface DestinationsSectionProps {
  onSelectDestinationForConsult: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestinationForConsult,
}) => {
  const [activeTab, setActiveTab] = useState<string>(DESTINATIONS_DATA[0].id);

  const currentDest = DESTINATIONS_DATA.find((d) => d.id === activeTab) || DESTINATIONS_DATA[0];

  return (
    <section id="destinasi" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
            06. DESTINASI WISATA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Jelajahi Berbagai Destinasi Menarik
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Temukan pengalaman perjalanan tak terlupakan bersama Fajar Karya Wisata. Dari pesona
            pegunungan Jawa Timur hingga keanggunan budaya Yogyakarta dan sejuknya dataran Sunda.
          </p>
        </div>

        {/* Region Tabs (Segmented control) */}
        <div className="flex items-center gap-2 p-1 bg-slate-200/70 rounded-xl overflow-x-auto mb-8 max-w-3xl">
          {DESTINATIONS_DATA.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveTab(dest.id)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === dest.id
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>

        {/* Active Region Spotlight Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Side */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
            <img
              src={currentDest.image}
              alt={currentDest.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                  {currentDest.badge}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  {currentDest.name}
                </h3>
                <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                  {currentDest.cities.map((city, idx) => (
                    <span key={city} className="flex items-center gap-1">
                      <span>{city}</span>
                      {idx < currentDest.cities.length - 1 && <span className="text-amber-400">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Eksplorasi Wilayah</span>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                Pesona Wisata {currentDest.name}
              </h4>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {currentDest.description}
              </p>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Spot Wisata Unggulan:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentDest.featuredSpots.map((spot, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{spot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Waktu Kunjungan Terbaik: {currentDest.bestSeason}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Tersedia paket 1D, 2D1N, 3D2N, hingga Custom Trip
              </span>
              <button
                onClick={() => onSelectDestinationForConsult(currentDest.name)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Pilih Wilayah Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Summary Overview */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESTINATIONS_DATA.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setActiveTab(dest.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                activeTab === dest.id
                  ? 'bg-amber-50/60 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900">{dest.name}</span>
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                {dest.cities.join(' • ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
