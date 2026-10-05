import React from 'react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/travelData';
import { ShieldCheck, Clock, Award, Users, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-5 h-5 text-amber-600" />;
      case 1:
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 2:
        return <Users className="w-5 h-5 text-amber-600" />;
      case 3:
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 4:
        return <HeartHandshake className="w-5 h-5 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-400 mb-2">
            04. MENGAPA MEMILIH KAMI?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Dedikasi Nyata dalam Standar &ldquo;Service Of Priority&rdquo;
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Kepercayaan Anda adalah prioritas mutlak kami. Setiap detil perjalanan dirancang
            agar Anda dapat menikmati liburan yang tenang, nyaman, dan berkesan tanpa beban.
          </p>
        </div>

        {/* 5 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.number}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                index === 0
                  ? 'bg-slate-800/80 border-amber-500/40 shadow-lg'
                  : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  {getIconForIndex(index)}
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {item.number}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                {item.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Claim-to-Proof Quantitative Metrics Strip (Tabular discipline) */}
        <div className="pt-10 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANY_INFO.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
