import React, { useState } from 'react';
import {
  Compass,
  GraduationCap,
  Users,
  Bus,
  Hotel,
  MapPin,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/travelData';
import { ServiceItem } from '../types/travel';

interface ServicesSectionProps {
  services?: ServiceItem[];
  onSelectServiceForConsult: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceForConsult,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const allServices = services || SERVICES_DATA;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-600" />;
      case 'Bus':
        return <Bus className="w-6 h-6 text-amber-600" />;
      case 'Hotel':
        return <Hotel className="w-6 h-6 text-amber-600" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600" />;
      default:
        return <Compass className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="layanan" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
            02. LAYANAN KAMI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Solusi Lengkap untuk Segala Kebutuhan Perjalanan
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Dari study tour sekolah hingga liburan keluarga dan rombongan instansi, kami hadirkan
            layanan terintegrasi dengan standar Service Of Priority.
          </p>
        </div>

        {/* 7 Services Grid with Asymmetric Marquee Card for Custom Trip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, index) => {
            const isCustomTrip = service.id === 'custom-trip';
            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 border transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                  isCustomTrip
                    ? 'border-amber-400 ring-1 ring-amber-400/40 shadow-md md:col-span-2 lg:col-span-1 bg-gradient-to-br from-white to-amber-50/60'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    {service.targetAudience}
                  </div>
                  <button
                    onClick={() => onSelectServiceForConsult(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors focus:outline-none focus-visible:underline"
                  >
                    <span>Konsultasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
