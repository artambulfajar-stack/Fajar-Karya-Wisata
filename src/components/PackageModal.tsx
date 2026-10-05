import React from 'react';
import { X, Check, XCircle, Calendar, Clock, MapPin, Users, MessageCircle } from 'lucide-react';
import { TourPackage } from '../types/travel';
import { COMPANY_INFO } from '../data/travelData';

interface PackageModalProps {
  packageItem: TourPackage | null;
  onClose: () => void;
  onBook: (pkg: TourPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ packageItem, onClose, onBook }) => {
  if (!packageItem) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-auto animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header with Visual and Close Button */}
        <div className="relative h-48 sm:h-56 shrink-0">
          <img
            src={packageItem.image}
            alt={packageItem.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Tutup rincian paket"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            {/* Zero-Pill unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <span>{packageItem.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{packageItem.duration}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {packageItem.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{packageItem.destination}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-slate-800">
          {/* Price & Summary Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Estimasi Biaya</div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {packageItem.startingPrice}{' '}
                <span className="text-xs font-normal text-slate-600 font-sans">
                  {packageItem.priceNote}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Kapasitas: {packageItem.recommendedPax}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Deskripsi Perjalanan
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {packageItem.description}
            </p>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Rencana Perjalanan (Itinerary Harian)
            </h4>
            <div className="space-y-3">
              {packageItem.itinerary.map((dayPlan) => (
                <div key={dayPlan.day} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-sm text-slate-900">
                    <span className="w-6 h-6 rounded bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      H{dayPlan.day}
                    </span>
                    <span>{dayPlan.title}</span>
                  </div>
                  <ul className="space-y-1.5 ml-8 text-xs text-slate-600 list-disc">
                    {dayPlan.activities.map((act, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30">
              <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Fasilitas Sudah Termasuk
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {packageItem.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30">
              <h5 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Belum Termasuk
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {packageItem.excluded.map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Jadwal dan destinasi dapat dikustomisasi sesuai permintaan khusus rombongan.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => onBook(packageItem)}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasikan Paket Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
