import React from 'react';
import { CheckCircle2, Award, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';
import tourBus from '../assets/images/tour_bus_fleet_1791223520045.jpg';
import { CompanySettings } from '../types/dashboard';

interface AboutSectionProps {
  settings?: CompanySettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const companyName = settings?.companyName || 'PT Fajar Karya Wisata';
  const tagline = settings?.tagline || 'Service Of Priority';
  const aboutImageSrc = settings?.aboutImageUrl || tourBus;

  return (
    <section id="tentang-kami" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
            01. TENTANG KAMI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Perjalanan Lebih Mudah Bersama {companyName}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {companyName} merupakan perusahaan yang bergerak di bidang jasa perjalanan wisata dengan
            menyediakan berbagai kebutuhan perjalanan secara terintegrasi.
          </p>
        </div>

        {/* Two-Column Grid: Text & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Column 1: Descriptive Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-center gap-2.5 text-amber-700 font-semibold text-sm mb-2">
                <Award className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Komitmen {tagline}</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                Kami berkomitmen memberikan pelayanan yang profesional, nyaman, aman, dan mengutamakan
                kepuasan pelanggan. <span className="font-semibold text-slate-900">{tagline}</span> menjadi
                fondasi kami dalam memberikan pelayanan terbaik kepada setiap pelanggan dalam setiap jengkal perjalanan.
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dengan dukungan jaringan mitra perjalanan dan tim yang berpengalaman, kami membantu pelanggan
              merencanakan perjalanan mulai dari pemilihan destinasi, transportasi, akomodasi, hingga pelaksanaan
              perjalanan di lapangan secara presisi.
            </p>

            {/* Core Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-slate-900">Pelayanan Terintegrasi</span>
                  <p className="text-xs text-slate-500 mt-0.5">Satu pintu untuk transport, hotel, tiket, dan konsumsi.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-slate-900">Keamanan & Kenyamanan</span>
                  <p className="text-xs text-slate-500 mt-0.5">Standar armada laik jalan dengan asuransi resmi.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-slate-900">Kemitraan Luas</span>
                  <p className="text-xs text-slate-500 mt-0.5">Akses langsung ke hotel dan pengelola destinasi wisata.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-slate-900">Transparan & Terpercaya</span>
                  <p className="text-xs text-slate-500 mt-0.5">Tanpa biaya tersembunyi dengan rincian fasilitas jelas.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Legalitas Badan Usaha Resmi (PT)
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <MapPin className="w-4 h-4 text-amber-600" />
                Basis Layanan Seluruh Indonesia
              </span>
            </div>
          </div>

          {/* Column 2: Media Asset with Quality Proof */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={aboutImageSrc}
                alt={`Armada & Layanan ${companyName}`}
                className="w-full h-80 object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                    Standar Armada Eksekutif
                  </div>
                  <p className="text-sm font-medium text-slate-200">
                    Kendaraan modern terawat dengan kru profesional, mengedepankan keamanan dan kenyamanan di setiap rute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
