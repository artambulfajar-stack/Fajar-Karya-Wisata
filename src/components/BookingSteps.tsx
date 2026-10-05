import React from 'react';
import { BOOKING_STEPS } from '../data/travelData';
import { MessageSquare, CheckSquare, Compass, ShieldCheck, Smile } from 'lucide-react';

interface BookingStepsProps {
  onStartBooking: () => void;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ onStartBooking }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageSquare className="w-5 h-5 text-amber-600" />;
      case 1:
        return <CheckSquare className="w-5 h-5 text-amber-600" />;
      case 2:
        return <Compass className="w-5 h-5 text-amber-600" />;
      case 3:
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 4:
        return <Smile className="w-5 h-5 text-amber-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
            05. CARA PEMESANAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Mudah, Cepat, dan Praktis
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Hanya 5 langkah sederhana dari konsultasi awal hingga Anda tiba di destinasi impian dengan rasa tenang.
          </p>
        </div>

        {/* 5 Steps Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {BOOKING_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between hover:border-amber-400 hover:shadow-sm transition-all duration-200 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-200">
                    {getStepIcon(idx)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    LANGKAH {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <span>Tahap 0{idx + 1} dari 05</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-amber-950">
              Mulai Konsultasi Rencana Wisata Anda Hari Ini
            </h4>
            <p className="text-xs text-amber-900/80 mt-0.5">
              Konsultasikan jadwal, rute, dan penyesuaian biaya tanpa komitmen awal bersama tim kami.
            </p>
          </div>
          <button
            onClick={onStartBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap"
          >
            Mulai Konsultasi Sekarang
          </button>
        </div>
      </div>
    </section>
  );
};
